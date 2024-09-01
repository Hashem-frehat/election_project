const express = require("express");
const app = express();
require("dotenv").config();
const candidateRequestRoutes = require("./routes/candidateRequests");
const localListRoutes = require("./routes/localLists");
const statsRoutes = require("./routes/stats");
const votingRoutes = require("./routes/votingRoutes");
const localCandidatesRoutes = require("./routes/localCandidatesRoutes");
const partyListRoutes = require("./routes/partyListRoutes");
const partyListvoteRoutes = require("./routes/partyListvoteRoutes");
const localListvoteRoutes = require("./routes/voteRoutes");
const ChatRoutes = require("./routes/contactFormRoutes");
const resultparty = require("./routes/resultpartyroutes");
const PORT = 5000;
// const register_router = require("./routes/register_router");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/voting", votingRoutes);
app.use("/api", ChatRoutes);
app.use("/api/candidate-requests", candidateRequestRoutes);
app.use("/api/local-lists", localListRoutes);
// app.use("/db/vs", register_router);
app.use("/api/local-lists", localListRoutes);
app.use("/api", partyListRoutes);
app.use("/api", localListvoteRoutes);
app.use("/api/party_list_votes", partyListvoteRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/voting", resultparty);

// console.log("register router");
// console.log("register router");
const register_router = require("./routes/register_router");
app.use("/db/vs", register_router);
// console.log("after route");

const db = require("./db/knex");

const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-payment-intent", async (req, res) => {
//   const { amount, currency } = req.body;

//   if (!amount || isNaN(amount) || amount <= 0) {
//     return res.status(400).json({ error: "Invalid amount" });
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });

//     await db("payments").insert({
//       stripe_payment_id: paymentIntent.id,
//       amount,
//       currency,
//       status: paymentIntent.status,
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating payment intent:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });
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

    const [id] = await db("ELECTION_ADVERTISEMENTS")
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
    res.status(500).json({
      error: "An error occurred while submitting the advertisement",
      details: error.message,
    });
  }
});

// New route to approve an advertisement
app.put("/api/submit-advertisement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db("ELECTION_ADVERTISEMENTS")
      .where({ ID: id })
      .update({ STATUS: "APPROVED" });
    res.json({ message: "Advertisement approved successfully" });
  } catch (error) {
    console.error("Error approving advertisement:", error);
    res.status(500).json({
      error: "An error occurred while approving the advertisement",
      details: error.message,
    });
  }
});

// New route to get all approved advertisements
app.get("/api/advertisements", async (req, res) => {
  try {
    const ads = await db("ELECTION_ADVERTISEMENTS").select("*");
    res.json(ads);
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    res.status(500).json({
      error: "An error occurred while fetching advertisements",
      details: error.message,
    });
  }
});
app.get("/api/submit-advertisements", async (req, res) => {
  try {
    const ads = await db("ELECTION_ADVERTISEMENTS").select("*");
    res.json(ads);
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    res.status(500).json({
      error: "An error occurred while fetching advertisements",
      details: error.message,
    });
  }
});

// app.use('ads', requests);

app.put("/api/approve-advertisement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db("ELECTION_ADVERTISEMENTS")
      .where({ ID: id })
      .update({ STATUS: "APPROVED" });
    res.json({ message: "Advertisement approved successfully" });
  } catch (error) {
    console.error("Error approving advertisement:", error);
    res.status(500).json({
      error: "An error occurred while approving the advertisement",
      details: error.message,
    });
  }
});

app.put("/api/toggle-advertisement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await db("ELECTION_ADVERTISEMENTS").where({ ID: id }).first();
    const newStatus = ad.STATUS === "APPROVED" ? "PENDING" : "APPROVED";
    await db("ELECTION_ADVERTISEMENTS")
      .where({ ID: id })
      .update({ STATUS: newStatus });
    res.json({
      message: "Advertisement status toggled successfully",
      newStatus,
    });
  } catch (error) {
    console.error("Error toggling advertisement status:", error);
    res.status(500).json({
      error: "An error occurred while toggling the advertisement status",
      details: error.message,
    });
  }
});

app.get("/api/incomes", async (req, res) => {
  try {
    // Test database connection
    await db.raw("SELECT 1");
    console.log("Database connection successful");

    // Attempt to query the payments table
    const incomes = await db("payments")
      .select("id", "amount", "currency", "status", "created_at")
      .orderBy("created_at", "desc");

    console.log("Query successful, number of records:", incomes.length);

    res.json(incomes);
  } catch (error) {
    console.error("Detailed error in /api/incomes route:", error);
    res.status(500).json({
      error: "An error occurred while fetching incomes",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

app.get("/api/advertisements", async (req, res) => {
  try {
    const ads = await db("ELECTION_ADVERTISEMENTS").select("*");
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Error fetching advertisements" });
  }
});

// Update advertisement approval status
app.put("/api/toggle-advertisement/:id", async (req, res) => {
  try {
    await db("ELECTION_ADVERTISEMENTS")
      .where({ ID: req.params.id })
      .update({ STATUS: "APPROVED" });
    res.json({ message: "Advertisement approved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error approving advertisement" });
  }
});

app.get("/api/overview-stats", async (req, res) => {
  try {
    const [totalVoters, totalLocalLists, totalPartyLists] = await Promise.all([
      db("USERS").count("* as count").first(),
      db("LOCAL_LISTS").count("* as count").first(),
      db("PARTY_LISTS").count("* as count").first(),
    ]);

    const [sumLocalVotes, sumPartyVotes] = await Promise.all([
      db("LOCAL_LISTS").sum("COUNT_OF_VOTES as total").first(),
      db("PARTY_LISTS").sum("COUNT_OF_VOTES as total").first(),
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

app.post("/create-payment-intent", async (req, res) => {
  const { currency } = req.body;
  const amount = 350; // Static amount of 350 cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    await db("payments").insert({
      stripe_payment_id: paymentIntent.id,
      amount,
      currency,
      status: paymentIntent.status,
      created_at: new Date(), // Add created_at timestamp
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
