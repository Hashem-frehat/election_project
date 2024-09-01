
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("PARTY_CANDIDATE")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("PARTY_CANDIDATE").insert([
            // LIST_ID: 1
      { NATIONAL_ID: 1234567890, LIST_ID: 1, IS_APROVED: true }, // سعيد رمضان
      { NATIONAL_ID: 1234567891, LIST_ID: 1, IS_APROVED: true }, // مراد العضايلة
      { NATIONAL_ID: 1234567892, LIST_ID: 1, IS_APROVED: true }, // عبدالله العكايلة
      { NATIONAL_ID: 1234567893, LIST_ID: 1, IS_APROVED: true }, // أحمد الشناق
      { NATIONAL_ID: 1234567894, LIST_ID: 1, IS_APROVED: true }, // محمود أبو عواد
  
      // LIST_ID: 2
      { NATIONAL_ID: 1234567895, LIST_ID: 2, IS_APROVED: true }, // أيمن العتوم
      { NATIONAL_ID: 1234567896, LIST_ID: 2, IS_APROVED: true }, // محمود الطيطي
      { NATIONAL_ID: 1234567897, LIST_ID: 2, IS_APROVED: true }, // سليمان الرفاعي
      { NATIONAL_ID: 1234567898, LIST_ID: 2, IS_APROVED: true }, // زينب الفواز
      { NATIONAL_ID: 1234567899, LIST_ID: 2, IS_APROVED: true }, // رياض الرشدان
  
      // LIST_ID: 3
      { NATIONAL_ID: 1234567900, LIST_ID: 3, IS_APROVED: true }, // كمال الروسان
      { NATIONAL_ID: 1234567901, LIST_ID: 3, IS_APROVED: true }, // إسماعيل السعيد
      { NATIONAL_ID: 1234567902, LIST_ID: 3, IS_APROVED: true }, // رفعت الريماوي
      { NATIONAL_ID: 1234567903, LIST_ID: 3, IS_APROVED: true }, // أحمد المجالي
      { NATIONAL_ID: 1234567904, LIST_ID: 3, IS_APROVED: true }, // فاطمة الحياري
  
      // LIST_ID: 4
      { NATIONAL_ID: 1234567905, LIST_ID: 4, IS_APROVED: true }, // عبد الله العكايلة
      { NATIONAL_ID: 1234567906, LIST_ID: 4, IS_APROVED: true }, // محمد عوض الله
      { NATIONAL_ID: 1234567907, LIST_ID: 4, IS_APROVED: true }, // نادر قاسم
      { NATIONAL_ID: 1234567908, LIST_ID: 4, IS_APROVED: true }, // سارة أبو زيد
      { NATIONAL_ID: 1234567909, LIST_ID: 4, IS_APROVED: true }, // يوسف الشواربة
  
      // LIST_ID: 5
      { NATIONAL_ID: 1234567910, LIST_ID: 5, IS_APROVED: true }, // لينا شماميان
      { NATIONAL_ID: 1234567911, LIST_ID: 5, IS_APROVED: true }, // خليل عطيه
      { NATIONAL_ID: 1234567912, LIST_ID: 5, IS_APROVED: true }, // محمد الناصر
      { NATIONAL_ID: 1234567913, LIST_ID: 5, IS_APROVED: true }, // جميل الشوابكة
      { NATIONAL_ID: 1234567914, LIST_ID: 5, IS_APROVED: true }, // سهى المومني
  
      // LIST_ID: 6
      { NATIONAL_ID: 1234567915, LIST_ID: 6, IS_APROVED: true }, // محمود الكفاوين
      { NATIONAL_ID: 1234567916, LIST_ID: 6, IS_APROVED: true }, // رانيا أبو رمان
      { NATIONAL_ID: 1234567917, LIST_ID: 6, IS_APROVED: true }, // فهد البشايرة
      { NATIONAL_ID: 1234567918, LIST_ID: 6, IS_APROVED: true }, // سامي أبو زيد
      { NATIONAL_ID: 1234567919, LIST_ID: 6, IS_APROVED: true }, // هالة عرفة
  
      // LIST_ID: 7
      { NATIONAL_ID: 1234567920, LIST_ID: 7, IS_APROVED: true }, // عمر العبداللات
      { NATIONAL_ID: 1234567921, LIST_ID: 7, IS_APROVED: true }, // سمر العمري
      { NATIONAL_ID: 1234567922, LIST_ID: 7, IS_APROVED: true }, // جميل الجمل
      { NATIONAL_ID: 1234567923, LIST_ID: 7, IS_APROVED: true }, // سلمى زكريا
      { NATIONAL_ID: 1234567924, LIST_ID: 7, IS_APROVED: true }, // معتصم الزيود
  
      // LIST_ID: 8
      { NATIONAL_ID: 1234567925, LIST_ID: 8, IS_APROVED: true }, // ناصر الشريدة
      { NATIONAL_ID: 1234567926, LIST_ID: 8, IS_APROVED: true }, // غادة عريقات
      { NATIONAL_ID: 1234567927, LIST_ID: 8, IS_APROVED: true }, // محمود الطراونة
      { NATIONAL_ID: 1234567928, LIST_ID: 8, IS_APROVED: true }, // أحمد الحسن
      { NATIONAL_ID: 1234567929, LIST_ID: 8, IS_APROVED: true }, // آية الشريف
  
      // LIST_ID: 9
      { NATIONAL_ID: 1234567930, LIST_ID: 9, IS_APROVED: true }, // فهد الدباس
      { NATIONAL_ID: 1234567931, LIST_ID: 9, IS_APROVED: true }, // مها العابد
      { NATIONAL_ID: 1234567932, LIST_ID: 9, IS_APROVED: true }, // علي الخلايلة
      { NATIONAL_ID: 1234567933, LIST_ID: 9, IS_APROVED: true }, // هالة الغرايبة
      { NATIONAL_ID: 1234567934, LIST_ID: 9, IS_APROVED: true }  // سامي الساكت
   
      ]);
    });
};
