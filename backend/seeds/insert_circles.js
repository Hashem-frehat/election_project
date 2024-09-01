/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("CIRCLES")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("CIRCLES").insert([
        { CIRCLE_ID: 1, CIRCLE_NAME: "عمان الأولى" },
        { CIRCLE_ID: 2, CIRCLE_NAME: "الزرقاء الأولى" },
        { CIRCLE_ID: 3, CIRCLE_NAME: "عمان الثالثة" },
      ]);
    });
};









