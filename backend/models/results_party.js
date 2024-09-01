// const knex = require("../db/knex");

// class VotingSystem {
//   static async getPartyVoters() {
//     return await knex("USERS")
//       .where("IS_PARTY_VOTE", true)
//       .count("* as count")
//       .first();
//   }

//   static async getPartyLists() {
//     return await knex("PARTY_LISTS").select(
//       "LIST_ID",
//       "LIST_NAME",
//       "COUNT_OF_VOTES"
//     );
//   }

//   static async getCandidates() {
//     return await knex("PARTY_CANDIDATE")
//       .join("USERS", "PARTY_CANDIDATE.NATIONAL_ID", "USERS.NATIONAL_ID")
//       .select(
//         "PARTY_CANDIDATE.LIST_ID",
//         "USERS.FULL_NAME",
//         "USERS.NATIONAL_ID"
//       );
//   }
// }

// module.exports = VotingSystem;
// models/VotingSystem.js
const knex = require("../db/knex");

class VotingSystem {
  static async getPartyVoters() {
    return await knex("USERS")
      .where("IS_PARTY_VOTE", true)
      .count("* as count")
      .first();
  }

  static async getPartyLists() {
    return await knex("PARTY_LISTS").select(
      "LIST_ID",
      "LIST_NAME",
      "COUNT_OF_VOTES"
    );
  }

  static async getCandidates() {
    return await knex("PARTY_CANDIDATE")
      .join("USERS", "PARTY_CANDIDATE.NATIONAL_ID", "USERS.NATIONAL_ID")
      .select(
        "PARTY_CANDIDATE.LIST_ID",
        "USERS.FULL_NAME",
        "USERS.NATIONAL_ID"
      );
  }
}

module.exports = VotingSystem;
