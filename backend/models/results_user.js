const db = require("../db/knex");

class User {
  static async getLocalVoteCount() {
    const result = await db("USERS")
      .count("* as count")
      .where("IS_LOCAL_VOTE", true);
    return result[0].count;
  }

  static async getVotingRateByCircle() {
    // استرجاع إجمالي المستخدمين الذين صوتوا
    const totalTrueUsers = await db("USERS")
      .select("CIRCLE_ID")
      .count("* as local_vote_users")
      .where("IS_LOCAL_VOTE", true)
      .groupBy("CIRCLE_ID");

    // استرجاع إجمالي المستخدمين الكلي
    const totalUsers = await db("USERS")
      .select("CIRCLE_ID")
      .count("* as total_users")
      .groupBy("CIRCLE_ID");

    // تحويل المجموعات إلى كائنات يمكن دمجها بناءً على CIRCLE_ID
    const totalTrueUsersMap = totalTrueUsers.reduce((acc, row) => {
      acc[row.CIRCLE_ID] = row.local_vote_users;
      return acc;
    }, {});

    const totalUsersMap = totalUsers.reduce((acc, row) => {
      acc[row.CIRCLE_ID] = row.total_users;
      return acc;
    }, {});

    // حساب معدل التصويت
    const votingRates = Object.keys(totalUsersMap).map((circleId) => {
      const localVoteUsers = totalTrueUsersMap[circleId] || 0;
      const totalUseres = totalUsersMap[circleId] || 1; // تجنب القسمة على الصفر

      return {
        circleId: circleId,
        votingRate: (localVoteUsers / totalUseres) * 100,
      };
    });

    return votingRates;
  }
  static async getThresholdByCircle() {
    const result = await db("USERS")
      .select("CIRCLE_ID")
      .count("* as local_vote_users")
      .where("IS_LOCAL_VOTE", true)
      .groupBy("CIRCLE_ID");

    return result.map((row) => ({
      circleId: row.CIRCLE_ID,
      threshold: row.local_vote_users * 0.07,
    }));
  }
}

module.exports = User;
