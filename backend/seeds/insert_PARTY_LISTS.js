/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('PARTY_LISTS').del()
  await knex('PARTY_LISTS').insert([
    {
      LIST_NAME: "حزب جبهة العمل الإسلامي",
      COUNT_OF_VOTES: 25,
      IS_APROVED: true,
    },
    { LIST_NAME: "حزب الرفاه", COUNT_OF_VOTES: 45, IS_APROVED: true },
    {
      LIST_NAME: "حزب الوحدة الوطنية",
      COUNT_OF_VOTES: 15,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "حزب الوسط الإسلامي",
      COUNT_OF_VOTES: 10,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "حزب الشعب الديمقراطي (حشد)",
      COUNT_OF_VOTES: 13,
      IS_APROVED: true,
    },
    { LIST_NAME: "حزب العدالة", COUNT_OF_VOTES: 12, IS_APROVED: true },
    {
      LIST_NAME: "حزب اليسار الديمقراطي",
      COUNT_OF_VOTES: 35,
      IS_APROVED: true,
    },
    { LIST_NAME: "حزب العهد", COUNT_OF_VOTES: 30, IS_APROVED: true },
    {
      LIST_NAME: "حزب التجمع الوطني الأردني",
      COUNT_OF_VOTES: 6,
      IS_APROVED: true,
    },
    {
      LIST_NAME: "حزب الديمقراطي الأردني",
      COUNT_OF_VOTES: 9,
      IS_APROVED: true,
    }
  ]);
};
