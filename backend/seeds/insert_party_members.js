/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("PARTY_MEMBERS").del();
  await knex("PARTY_MEMBERS").insert([
    { NATIONAL_ID: 1234567890, PARTY_ID: 1, IS_PARTY_COMMISSIONER: true }, // سعيد رمضان
    { NATIONAL_ID: 1234567891, PARTY_ID: 1 }, // مراد العضايلة
    { NATIONAL_ID: 1234567892, PARTY_ID: 1 }, // عبدالله العكايلة
    { NATIONAL_ID: 1234567893, PARTY_ID: 1 }, // أحمد الشناق
    { NATIONAL_ID: 1234567894, PARTY_ID: 1 }, // محمود أبو عواد

    { NATIONAL_ID: 1234567895, PARTY_ID: 2, IS_PARTY_COMMISSIONER: true }, // أيمن العتوم
    { NATIONAL_ID: 1234567896, PARTY_ID: 2 }, // محمود الطيطي
    { NATIONAL_ID: 1234567897, PARTY_ID: 2 }, // سليمان الرفاعي
    { NATIONAL_ID: 1234567898, PARTY_ID: 2 }, // زينب الفواز
    { NATIONAL_ID: 1234567899, PARTY_ID: 2 }, // رياض الرشدان

    { NATIONAL_ID: 1234567900, PARTY_ID: 3, IS_PARTY_COMMISSIONER: true }, // كمال الروسان
    { NATIONAL_ID: 1234567901, PARTY_ID: 3 }, // إسماعيل السعيد
    { NATIONAL_ID: 1234567902, PARTY_ID: 3 }, // رفعت الريماوي
    { NATIONAL_ID: 1234567903, PARTY_ID: 3 }, // أحمد المجالي
    { NATIONAL_ID: 1234567904, PARTY_ID: 3 }, // فاطمة الحياري

    { NATIONAL_ID: 1234567905, PARTY_ID: 4, IS_PARTY_COMMISSIONER: true }, // عبد الله العكايلة
    { NATIONAL_ID: 1234567906, PARTY_ID: 4 }, // محمد عوض الله
    { NATIONAL_ID: 1234567907, PARTY_ID: 4 }, // نادر قاسم
    { NATIONAL_ID: 1234567908, PARTY_ID: 4 }, // سارة أبو زيد
    { NATIONAL_ID: 1234567909, PARTY_ID: 4 }, // يوسف الشواربة

    { NATIONAL_ID: 1234567910, PARTY_ID: 5, IS_PARTY_COMMISSIONER: true }, // لينا شماميان
    { NATIONAL_ID: 1234567911, PARTY_ID: 5 }, // خليل عطيه
    { NATIONAL_ID: 1234567912, PARTY_ID: 5 }, // محمد الناصر
    { NATIONAL_ID: 1234567913, PARTY_ID: 5 }, // جميل الشوابكة
    { NATIONAL_ID: 1234567914, PARTY_ID: 5 }, // سهى المومني

    { NATIONAL_ID: 1234567915, PARTY_ID: 6, IS_PARTY_COMMISSIONER: true }, // محمود الكفاوين
    { NATIONAL_ID: 1234567916, PARTY_ID: 6 }, // رانيا أبو رمان
    { NATIONAL_ID: 1234567917, PARTY_ID: 6 }, // فهد البشايرة
    { NATIONAL_ID: 1234567918, PARTY_ID: 6 }, // سامي أبو زيد
    { NATIONAL_ID: 1234567919, PARTY_ID: 6 }, // هالة عرفة

    { NATIONAL_ID: 1234567920, PARTY_ID: 7, IS_PARTY_COMMISSIONER: true }, // عمر العبداللات
    { NATIONAL_ID: 1234567921, PARTY_ID: 7 }, // سمر العمري
    { NATIONAL_ID: 1234567922, PARTY_ID: 7 }, // جميل الجمل
    { NATIONAL_ID: 1234567923, PARTY_ID: 7 }, // سلمى زكريا
    { NATIONAL_ID: 1234567924, PARTY_ID: 7 }, // معتصم الزيود

    { NATIONAL_ID: 1234567925, PARTY_ID: 8, IS_PARTY_COMMISSIONER: true }, // ناصر الشريدة
    { NATIONAL_ID: 1234567926, PARTY_ID: 8 }, // غادة عريقات
    { NATIONAL_ID: 1234567927, PARTY_ID: 8 }, // محمود الطراونة
    { NATIONAL_ID: 1234567928, PARTY_ID: 8 }, // أحمد الحسن
    { NATIONAL_ID: 1234567929, PARTY_ID: 8 }, // آية الشريف

    { NATIONAL_ID: 1234567930, PARTY_ID: 9, IS_PARTY_COMMISSIONER: true }, // فهد الدباس
    { NATIONAL_ID: 1234567931, PARTY_ID: 9 }, // مها العابد
    { NATIONAL_ID: 1234567932, PARTY_ID: 9 }, // علي الخلايلة
    { NATIONAL_ID: 1234567933, PARTY_ID: 9 }, // هالة الغرايبة
    { NATIONAL_ID: 1234567934, PARTY_ID: 9 }, // سامي الساكت
  ]);
};
