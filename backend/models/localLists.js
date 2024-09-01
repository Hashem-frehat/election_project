const db = require("../db/knex");

module.exports = {
  getAllLists: (circleId) => {
    return db("LOCAL_LISTS").select("*").where("CIRCLE_ID", circleId);
  },
  incrementVotes: (listId) => {
    return db("LOCAL_LISTS")
      .where("LIST_ID", listId)
      .increment("COUNT_OF_VOTES", 1);
  },
};
