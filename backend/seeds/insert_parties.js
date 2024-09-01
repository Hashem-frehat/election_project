/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('PARTIES').del()
  await knex('PARTIES').insert([
    {
     PARTY_NAME: "حزب جبهة العمل الإسلامي",},
    {PARTY_NAME: "حزب الرفاه",  },
    {
      PARTY_NAME: "حزب الوحدة الوطنية",
    },
    {
      PARTY_NAME: "حزب الوسط الإسلامي",

    },
    {
      PARTY_NAME: "حزب الشعب الديمقراطي (حشد)",

    },
    { PARTY_NAME: "حزب العدالة",},
    {
      PARTY_NAME: "حزب اليسار الديمقراطي",

    },
    { PARTY_NAME: "حزب العهد",
      PARTY_NAME: "حزب التجمع الوطني الأردني",

    },
    {
      PARTY_NAME: "حزب الديمقراطي الأردني",
    
    }
  ]);
};
