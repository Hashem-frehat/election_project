import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { useTimer } from '../adminDash/timecontext';

const ServiceForm = () => {
  const navigate = useNavigate();
  // const { timeRemaining } = useTimer();
  // const [, forceUpdate] = useState();
  // console.log('Time remaining:', timeRemaining);
  const [formType, setFormType] = useState("debate");
  const [debateFormData, setDebateFormData] = useState({
    DATE_OF_DEBATE: "",
    TOPIC: "",
    FIRST_CANDIDATE: "",
    FIRST_CANDIDATE_LIST: "",
    SECOND_CANDIDATE: "",
    SECOND_CANDIDATE_LIST: "",
    STATUS: "",
    ZOOM_LINK: "",
  });
  const [adFormData, setAdFormData] = useState({
    nationalId: "",
    listId: "",
    circleId: "",
    title: "",
    description: "",
    url: "",
    startDate: "",
    endDate: "",
    paymentId: "",
  });

  const toggleFormType = () => {
    setFormType(formType === "debate" ? "advertisement" : "debate");
  };

  const handleDebateChange = (e) => {
    setDebateFormData({ ...debateFormData, [e.target.name]: e.target.value });
  };

  const handleAdChange = (e) => {
    setAdFormData({ ...adFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formType === "debate") {
        response = await axios.post(
          "http://localhost:5000/api/debates",
          debateFormData
        );
        Swal.fire({
          title: "تم إرسال طلبك!",
          text: "تمت إضافة المناظرة بنجاح",
          icon: "success",
          confirmButtonText: "حسنا",
        });
        setDebateFormData({
          DATE_OF_DEBATE: "",
          TOPIC: "",
          FIRST_CANDIDATE: "",
          FIRST_CANDIDATE_LIST: "",
          SECOND_CANDIDATE: "",
          SECOND_CANDIDATE_LIST: "",
          STATUS: "",
          ZOOM_LINK: "",
        });
      } else {
        response = await axios.post(
          "http://localhost:5000/api/submit-advertisement",
          adFormData
        );
        // Swal.fire({
        //   title: "تم إرسال طلبك!",
        //   text: `تم إنشاء الإعلان بنجاح برقم: ${response.data.id}`,
        //   icon: "success",
        //   confirmButtonText: "حسنا",
        // });
        setAdFormData({
          nationalId: "",
          listId: "",
          circleId: "",
          title: "",
          description: "",
          url: "",
          startDate: "",
          endDate: "",
          paymentId: "",
        });
        // Navigate to the payment page
        navigate("/payment", { state: { adId: response.data.id } });
      }
    } catch (error) {
      console.error("خطأ في إرسال النموذج:", error);
      Swal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء إرسال النموذج",
        icon: "error",
        confirmButtonText: "حسنا",
      });
    }
  };

  // useEffect(() => {
  //   forceUpdate({});
  // }, [timeRemaining]);

  // if (timeRemaining !== null && timeRemaining <= 0) {
  //   return <div>انتهى الوقت. الوصول إلى هذه الصفحة غير متاح.</div>;
  // }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl"
      style={{ direction: "rtl" }}
    >
      <div className="mb-6">
        <div
          className="relative w-full h-12 rounded-full bg-gray-200 cursor-pointer"
          onClick={toggleFormType}
        >
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-green-500 rounded-full transition-transform duration-300 ease-in-out ${
              formType === "debate"
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
          ></div>
          <div className="absolute top-0 right-0 w-full h-full flex items-center justify-around text-sm font-bold">
            <span
              className={
                formType === "debate" ? "text-black" : "text-white font-bold"
              }
            >
              طلب إعلان
            </span>
            <span
              className={
                formType === "advertisement"
                  ? "text-black font-bold"
                  : "text-white font-bold"
              }
            >
              طلب مناظرة
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {formType === "debate" ? "نموذج مناظرة" : "نموذج إعلان"}
      </h2>

      {formType === "debate" ? (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="DATE_OF_DEBATE"
            >
              تاريخ المناظرة
            </label>
            <input
              type="date"
              id="DATE_OF_DEBATE"
              name="DATE_OF_DEBATE"
              value={debateFormData.DATE_OF_DEBATE}
              onChange={handleDebateChange}
              className="shadow appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-gren-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="TOPIC"
            >
              الموضوع
            </label>
            <input
              type="text"
              id="TOPIC"
              name="TOPIC"
              value={debateFormData.TOPIC}
              onChange={handleDebateChange}
              placeholder="أدخل موضوع المناظرة"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="FIRST_CANDIDATE"
            >
              المرشح الأول
            </label>
            <input
              type="text"
              id="FIRST_CANDIDATE"
              name="FIRST_CANDIDATE"
              value={debateFormData.FIRST_CANDIDATE}
              onChange={handleDebateChange}
              placeholder="أدخل اسم المرشح الأول"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="FIRST_CANDIDATE_LIST"
            >
              قائمة المرشح الأول
            </label>
            <input
              type="text"
              id="FIRST_CANDIDATE_LIST"
              name="FIRST_CANDIDATE_LIST"
              value={debateFormData.FIRST_CANDIDATE_LIST}
              onChange={handleDebateChange}
              placeholder="أدخل قائمة المرشح الأول"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="SECOND_CANDIDATE"
            >
              المرشح الثاني
            </label>
            <input
              type="text"
              id="SECOND_CANDIDATE"
              name="SECOND_CANDIDATE"
              value={debateFormData.SECOND_CANDIDATE}
              onChange={handleDebateChange}
              placeholder="أدخل اسم المرشح الثاني"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="SECOND_CANDIDATE_LIST"
            >
              قائمة المرشح الثاني
            </label>
            <input
              type="text"
              id="SECOND_CANDIDATE_LIST"
              name="SECOND_CANDIDATE_LIST"
              value={debateFormData.SECOND_CANDIDATE_LIST}
              onChange={handleDebateChange}
              placeholder="أدخل قائمة المرشح الثاني"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="STATUS"
            >
              الحالة
            </label>
            <input
              type="text"
              id="STATUS"
              name="STATUS"
              value={debateFormData.STATUS}
              onChange={handleDebateChange}
              placeholder="أدخل حالة المناظرة"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ZOOM_LINK"
            >
              رابط زوم
            </label>
            <textarea
              id="ZOOM_LINK"
              name="ZOOM_LINK"
              value={debateFormData.ZOOM_LINK}
              onChange={handleDebateChange}
              placeholder="أدخل رابط زوم للمناظرة"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              required
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nationalId"
            >
              رقم الهوية الوطنية
            </label>
            <input
              type="number"
              id="nationalId"
              name="nationalId"
              value={adFormData.nationalId}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              placeholder="أدخل رقم الهوية الوطنية"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="listId"
            >
              رقم القائمة
            </label>
            <input
              type="number"
              id="listId"
              name="listId"
              value={adFormData.listId}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="أدخل رقم القائمة"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="circleId"
            >
              رقم الدائرة
            </label>
            <input
              type="number"
              id="circleId"
              name="circleId"
              value={adFormData.circleId}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="أدخل رقم الدائرة"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              عنوان الإعلان
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={adFormData.title}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="أدخل عنوان الإعلان"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              وصف الإعلان
            </label>
            <textarea
              id="description"
              name="description"
              value={adFormData.description}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              required
              placeholder="أدخل وصف الإعلان"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              رابط الإعلان
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={adFormData.url}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="أدخل رابط الإعلان"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startDate"
            >
              تاريخ البدء
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={adFormData.startDate}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="endDate"
            >
              تاريخ الانتهاء
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={adFormData.endDate}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="paymentId"
            >
              رقم الدفع
            </label>
            <input
              type="number"
              id="paymentId"
              name="paymentId"
              value={adFormData.paymentId}
              onChange={handleAdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="أدخل رقم الدفع"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        {formType === "debate" ? "إضافة المناظرة" : "إرسال الإعلان"}
      </button>
    </form>
  );
};
export default ServiceForm;
