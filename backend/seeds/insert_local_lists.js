/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('LOCAL_LISTS').del()
  await knex('LOCAL_LISTS').insert([
    {
      LIST_NAME: "العهد",
      CIRCLE_ID: 1,
      COUNT_OF_VOTES: 1,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الأمل",
      CIRCLE_ID: 1,
      COUNT_OF_VOTES: 6,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الوطن",
      CIRCLE_ID: 1,
      COUNT_OF_VOTES: 24,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الثقة",
      CIRCLE_ID: 1,
      COUNT_OF_VOTES: 39,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "المستقبل",
      CIRCLE_ID: 2,
      COUNT_OF_VOTES: 4,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الوعد",
      CIRCLE_ID: 2,
      COUNT_OF_VOTES: 25,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الوفاء",
      CIRCLE_ID: 2,
      COUNT_OF_VOTES: 19,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الاخلاص",
      CIRCLE_ID: 2,
      COUNT_OF_VOTES: 27,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الشباب والابتكار",
      CIRCLE_ID: 3,
      COUNT_OF_VOTES: 3,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "العمل والبناء",
      CIRCLE_ID: 3,
      COUNT_OF_VOTES: 12,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "العدالة والتنمية",
      CIRCLE_ID: 3,
      COUNT_OF_VOTES: 35,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "الوطنية والنزاهة",
      CIRCLE_ID: 3,
      COUNT_OF_VOTES: 30,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "ورقة بيضاء ",
      CIRCLE_ID: 1,
      COUNT_OF_VOTES: 10,
      IS_APROVED: true,
    },
    {
      LIST_NAME: " ورقة بيضاء",
      CIRCLE_ID: 2,
      COUNT_OF_VOTES: 25,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "ورقة بيضاء ",
      CIRCLE_ID: 3,
      COUNT_OF_VOTES: 10,
      IS_APROVED: true,
    }
  ]);
};
