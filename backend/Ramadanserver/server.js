const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex")(require("./knexfile").development);
const cors = require("cors");
const debatesRouter = require("./routes/router");
// const nodemailer = require('nodemailer');
// const requests = require('./routes/requests');
require("dotenv").config();
// const candidatesRouter = require('./routes/candidatefetch');

const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(bodyParser.json());

// app.use("/api/candidate-requests", candidateRequestRoutes);
// app.use("/api/local-lists", localListRoutes);

// app.use('/voting', votingRoutes);

// const transporter = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 587,
//   secure: false, // Use TLS
//   auth: {
//     user: 'mohamahasoun60@gmail.com',
//     pass: 'Mes%3alnasel6ayba'
//   }
// });

app.get("/api/overview-stats", async (req, res) => {
  try {
    const [totalVoters, totalLocalLists, totalPartyLists] = await Promise.all([
      knex("USERS").count("* as count").first(),
      knex("LOCAL_LISTS").count("* as count").first(),
      knex("PARTY_LISTS").count("* as count").first(),
    ]);

    const [sumLocalVotes, sumPartyVotes] = await Promise.all([
      knex("LOCAL_LISTS").sum("COUNT_OF_VOTES as total").first(),
      knex("PARTY_LISTS").sum("COUNT_OF_VOTES as total").first(),
    ]);

    res.json({
      totalVoters: parseInt(totalVoters.count),
      totalLocalLists: parseInt(totalLocalLists.count),
      totalPartyLists: parseInt(totalPartyLists.count),
      totalLocalVotes: parseInt(sumLocalVotes.total) || 0,
      totalPartyVotes: parseInt(sumPartyVotes.total) || 0,
    });
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/voters", async (req, res) => {
  try {
    const voters = await knex("USERS").select();
    res.json(voters);
  } catch (error) {
    console.error("Error fetching voters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/voters/:id/email", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    await knex("USERS").where({ NATIONAL_ID: id }).update({ EMAIL: email });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.use('/api/candidates', candidatesRouter);
app.get("/api/candidates", async (req, res) => {
  try {
    const localLists = await knex("LOCAL_CANDIDATE")
      .select("LOCAL_CANDIDATE.*", "USERS.NAME")
      .join("USERS", "LOCAL_CANDIDATE.NATIONAL_ID", "USERS.NATIONAL_ID");

    const partyCandidates = await knex("PARTY_CANDIDATE")
      .select(
        "PARTY_CANDIDATE.*",
        "USERS.NAME",
        "PARTY_LISTS.LIST_NAME as PARTY_NAME"
      )
      .join("USERS", "PARTY_CANDIDATE.NATIONAL_ID", "USERS.NATIONAL_ID")
      .join("PARTY_LISTS", "PARTY_CANDIDATE.LIST_ID", "PARTY_LISTS.LIST_ID");

    res.json({ localLists, partyCandidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/local-lists", async (req, res) => {
  try {
    const { NATIONAL_ID, NAME, VOTES, SEAT_TYPE } = req.body;
    const [newCandidate] = await knex("LOCAL_CANDIDATE")
      .insert({
        NATIONAL_ID,
        VOTES,
        SEAT_TYPE,
        IS_APROVED: false,
      })
      .returning("*");

    // Update or insert into USERS table
    await knex("USERS")
      .insert({ NATIONAL_ID, NAME })
      .onConflict("NATIONAL_ID")
      .merge();

    res.status(201).json(newCandidate);
  } catch (error) {
    console.error("Error adding local candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new party candidate
app.post("/api/party-candidates", async (req, res) => {
  try {
    const { NATIONAL_ID, NAME, PARTY_NAME, VOTES, SEAT_TYPE } = req.body;

    // First, ensure the party list exists or create it
    let partyList = await knex("PARTY_LISTS")
      .where("LIST_NAME", PARTY_NAME)
      .first();
    if (!partyList) {
      [partyList] = await knex("PARTY_LISTS")
        .insert({ LIST_NAME: PARTY_NAME })
        .returning("*");
    }

    const [newCandidate] = await knex("PARTY_CANDIDATE")
      .insert({
        NATIONAL_ID,
        LIST_ID: partyList.LIST_ID,
        IS_APROVED: false,
      })
      .returning("*");

    // Update or insert into USERS table
    await knex("USERS")
      .insert({ NATIONAL_ID, NAME })
      .onConflict("NATIONAL_ID")
      .merge();

    res.status(201).json(newCandidate);
  } catch (error) {
    console.error("Error adding party candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a local candidate
app.delete("/api/local-lists/:id", async (req, res) => {
  try {
    await knex("LOCAL_CANDIDATE").where("NATIONAL_ID", req.params.id).del();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting local candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a party candidate
app.delete("/api/party-candidates/:id", async (req, res) => {
  try {
    await knex("PARTY_CANDIDATE").where("NATIONAL_ID", req.params.id).del();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting party candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// elections

app.post("/api/submit-advertisement", async (req, res) => {
  try {
    const {
      nationalId,
      listId,
      circleId,
      title,
      description,
      url,
      startDate,
      endDate,
      paymentId,
    } = req.body;

    const [id] = await knex("ELECTION_ADVERTISEMENTS")
      .insert({
        NATIONAL_ID: nationalId,
        LIST_ID: listId,
        CIRCLE_ID: circleId,
        TITLE: title,
        DESCRIPTION: description,
        URL: url,
        START_DATE: startDate,
        END_DATE: endDate,
        PAYMENT_ID: paymentId,
        STATUS: "PENDING",
      })
      .returning("ID");

    res
      .status(201)
      .json({ message: "Advertisement submitted successfully", id });
  } catch (error) {
    console.error("Error submitting advertisement:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while submitting the advertisement",
        details: error.message,
      });
  }
});

// New route to approve an advertisement
app.put("/api/submit-advertisement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await knex("ELECTION_ADVERTISEMENTS")
      .where({ ID: id })
      .update({ STATUS: "APPROVED" });
    res.json({ message: "Advertisement approved successfully" });
  } catch (error) {
    console.error("Error approving advertisement:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while approving the advertisement",
        details: error.message,
      });
  }
});

// New route to get all approved advertisements
app.get("/api/advertisements", async (req, res) => {
  try {
    const ads = await knex("ELECTION_ADVERTISEMENTS").select("*");
    res.json(ads);
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching advertisements",
        details: error.message,
      });
  }
});
app.get("/api/submit-advertisements", async (req, res) => {
  try {
    const ads = await knex("ELECTION_ADVERTISEMENTS").select("*");
    res.json(ads);
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching advertisements",
        details: error.message,
      });
  }
});

// app.use('ads', requests);

app.put("/api/approve-advertisement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await knex("ELECTION_ADVERTISEMENTS")
      .where({ ID: id })
      .update({ STATUS: "APPROVED" });
    res.json({ message: "Advertisement approved successfully" });
  } catch (error) {
    console.error("Error approving advertisement:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while approving the advertisement",
        details: error.message,
      });
  }
});

app.put("/api/toggle-advertisement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await knex("ELECTION_ADVERTISEMENTS").where({ ID: id }).first();
    const newStatus = ad.STATUS === "APPROVED" ? "PENDING" : "APPROVED";
    await knex("ELECTION_ADVERTISEMENTS")
      .where({ ID: id })
      .update({ STATUS: newStatus });
    res.json({
      message: "Advertisement status toggled successfully",
      newStatus,
    });
  } catch (error) {
    console.error("Error toggling advertisement status:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while toggling the advertisement status",
        details: error.message,
      });
  }
});

app.get('/api/incomes', async (req, res) => {
  try {
    // Test database connection
    await knex.raw('SELECT 1');
    console.log('Database connection successful');

    // Attempt to query the payments table
    const incomes = await knex('payments')
      .select('id', 'amount', 'currency', 'status', 'created_at')
      .orderBy('created_at', 'desc');
    
    console.log('Query successful, number of records:', incomes.length);
    
    res.json(incomes);
  } catch (error) {
    console.error('Detailed error in /api/incomes route:', error);
    res.status(500).json({ 
      error: 'An error occurred while fetching incomes', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});



app.get('/api/advertisements', async (req, res) => {
  try {
    const ads = await knex('ELECTION_ADVERTISEMENTS').select('*');
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching advertisements' });
  }
});

// Update advertisement approval status
app.put('/api/toggle-advertisement/:id', async (req, res) => {
  try {
    await knex('ELECTION_ADVERTISEMENTS')
      .where({ ID: req.params.id })
      .update({ STATUS: 'APPROVED' });
    res.json({ message: 'Advertisement approved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error approving advertisement' });
  }
});



app.use("api", debatesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
