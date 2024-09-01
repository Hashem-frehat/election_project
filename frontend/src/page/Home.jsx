import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/2.png";
import img2 from "../assets/1.png";
import img3 from "../assets/4.png";
import img4 from "../assets/voting.jpg";
import CountdownTimer from "../comonamt/timer";
import ElectoralDistricts from "../comonamt/ElectoralDistricts";
import axios from "axios";
import ChatBox from "../chatbooks/newchat";
import { Carousel } from "flowbite-react";

const Home = () => {
  const [stats, setStats] = useState({
    localVoteCount: 0,
    listsInfo: [],
    candidatesInfo: [],
    votingRateByCircle: [],
    thresholdByCircle: [],
    listsInfoWithThreshold: {},
    topCandidates: {},
    specialSeats: {},
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const [advertisements, setAdvertisements] = useState([]);
  const [fullName, setFullName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    setRoomId(randomId + timestamp);
  };

  const handleOneAndOneCall = () => {
    if (!roomId) {
      alert("Please generate room ID first");
      return;
    }
    navigate(`room/${roomId}?type=one-on-one`);
  };

  const handleGroupCall = () => {
    if (!roomId) {
      alert("Please generate room ID first");
      return;
    }
    navigate(`room/${roomId}?type=group-call`);
  };

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/submit-advertisements"
        );
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  useEffect(() => {
    const checkLocalVoteStatus = async () => {
      try {
        const national_id = sessionStorage.getItem("national_id");
        const response = await axios.get(
          `http://localhost:5000/voting/${national_id}`
        );
        const fullNameFromResponse = `${response.data.FULL_NAME}`;
        setFullName(fullNameFromResponse);
      } catch (error) {
        console.error("Error fetching vote status:", error);
      }
    };

    checkLocalVoteStatus();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white">
      <style jsx>{`
        .bg-jordan-green {
          background-color: #06783d;
        }
        .text-jordan-green {
          color: #06783d;
        }
        .border-jordan-green {
          border-color: #06783d;
        }
        .bg-jordan-red {
          background-color: #d00d18;
        }
        .text-jordan-red {
          color: #d00d18;
        }
        .border-jordan-red {
          border-color: #d00d18;
        }
        .hover-bg-jordan-green:hover {
          background-color: #056231;
        }
        .hover-bg-jordan-red:hover {
          background-color: #b00b15;
        }
      `}</style>
      <header className="bg-white-200 bg-opacity-40 text-green-900 py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-green-900 mb-4 text-center animate-bounce">
            مرحباً بك في موقع الانتخابات
          </h1>
          <p className="text-2xl text-center text-green-800 animate-fade-in">
            {fullName ? `${fullName}` : "مرحباً بك"}
          </p>
        </div>
      </header>
      <div className="mb-8 relative">
        <CountdownTimer />

        <div className="h-[25rem] sm:h-[28rem] lg:h-[32rem] relative">
          <Carousel>
            {/* Your carousel items go here */}
            <div className="relative h-full">
              <img
                src={img1}
                alt="Slide 1"
                className="h-full w-full object-cover filter brightness-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 backdrop-filter backdrop-blur-sm bg-black/40">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  صوتك يصنع الفرق، كن جزءًا من التغيير
                </p>

                <Link
                  to="/type"
                  className="mt-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300 text-lg font-bold flex justify-center items-center"
                >
                  صوت الآن
                </Link>
              </div>
            </div>
            <div className="relative h-full">
              <img
                src={img2}
                alt="Slide 2"
                className="h-full w-full object-cover filter brightness-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 backdrop-filter backdrop-blur-sm bg-black/40">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  المشاركة واجب وطني، شارك في صنع القرار!
                </p>
                <Link
                  to="/type"
                  className="mt-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300 text-lg font-bold flex justify-center items-center"
                >
                  صوت الآن
                </Link>
              </div>
            </div>
            <div className="relative h-full">
              <img
                src={img3}
                alt="Slide 3"
                className="h-full w-full object-cover filter brightness-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 backdrop-filter backdrop-blur-sm bg-black/40">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  لأنك تستحق الأفضل، صوّت من أجل الغد
                </p>
                <Link
                  to="/type"
                  className="mt-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300 text-lg font-bold flex justify-center items-center"
                >
                  صوت الآن
                </Link>
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      <section className="mb-12 bg-white border-2 border-jordan-green p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-jordan-green">
          ما هي الانتخابات
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2 text-right mb-6 md:mb-0">
            <p className="text-lg leading-relaxed text-black leading-10">
              الانتخابات النيابية في الأردن هي عملية ديمقراطية يتم من خلالها
              اختيار أعضاء مجلس النواب، أحد المجلسين المكونين للسلطة التشريعية
              في المملكة. تعتمد هذه الانتخابات على نظام القوائم النسبية
              المفتوحة، حيث يتوزع الناخبون على دوائر انتخابية متعددة، ويختارون
              قائمة واحدة ضمن الدائرة. يتيح النظام الانتخابي الأردني للناخبين
              أيضًا تحديد تفضيلاتهم داخل القائمة. لتعزيز تمثيل المرأة والأقليات،
              يعتمد الأردن على نظام "الكوتا" لضمان حصول النساء والأقليات على عدد
              محدد من المقاعد في البرلمان، مما يساهم في تنوع وتمثيل أوسع في مجلس
              النواب{" "}
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={img4}
              alt="الناس يشاركون في عملية التصويت"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-jordan-green">
          الإعلانات الجديدة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.slice(0, 3).map((ad) => (
            <div
              key={ad.ID}
              className="bg-white border-2 border-jordan-red p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img
                src="https://kenanahnews.com/wp-content/uploads/2017/08/20631398_1294117427381344_977119165_n-1.jpg"
                alt={`TITLE ${ad.TITLE}`}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
              <h3 className="font-bold text-lg mb-2 text-jordan-green">
                {ad.TITLE}
              </h3>
              <button className="bg-jordan-red text-white px-4 py-2 rounded-lg w-full hover-bg-jordan-red transition-colors">
                {ad.DESCRIPTION}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mb-12 bg-white border-2 border-jordan-green p-6 rounded-lg shadow-lg"
        dir="rtl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-green">
          تثقيف الناخبين
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-4 font-semibold text-jordan-green">
            تعرف على حقوقك وواجباتك كناخب:
          </p>
          <ul className="list-disc list-inside space-y-2 text-black">
            <li>كيفية التحقق من تسجيلك كناخب</li>
            <li>الوثائق المطلوبة يوم الانتخاب</li>
            <li>خطوات عملية التصويت</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-jordan-green">
              حقوقك وواجباتك
            </h3>
            <ul className="list-disc list-inside pl-5 space-y-2 text-black">
              <li>الحق في التصويت دون تمييز</li>
              <li>واجب الالتزام بالقوانين الانتخابية</li>
              <li>الحق في الحصول على المعلومات الانتخابية</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12" dir="rtl">
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-green">
          الأسئلة الشائعة
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "متى موعد الانتخابات القادمة؟",
              a: "ستجرى الانتخابات في [التاريخ].",
            },
            {
              q: "كيف يمكنني التحقق من تسجيلي كناخب؟",
              a: "يمكنك التحقق عبر [الرابط] أو زيارة أقرب مركز تسجيل.",
            },
            {
              q: "ما هي الوثائق المطلوبة للتصويت؟",
              a: "تحتاج إلى بطاقة الهوية الوطنية سارية المفعول.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-jordan-green p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-jordan-green">{faq.q}</h3>
              <p className="text-black">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white border-2 border-jordan-red p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-red">
          ابدأ مناظرتك
        </h2>
        <div className="flex flex-col items-center">
          <div className="flex items-center flex  mb-4">
            <input
              type="text"
              value={roomId}
              readOnly
              placeholder="معرف الغرفة المُنشأ"
              className="border border-jordan-green p-2 rounded-r-lg w-60"
            />
            <button
              onClick={handleRoomIdGenerate}
              className="bg-jordan-green text-white p-2 rounded-l hover-bg-jordan-green transition-colors"
            >
              إنشاء
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                roomId
                  ? "bg-jordan-green text-white hover-bg-jordan-green"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!roomId}
              onClick={handleOneAndOneCall}
            >
              مكالمة فردية
            </button>
            <button
              disabled={!roomId}
              onClick={handleGroupCall}
              className={`px-4 py-2 rounded-lg transition-colors ${
                roomId
                  ? "bg-jordan-green text-white hover-bg-jordan-green"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              مكالمة جماعية
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12" dir="rtl">
        <ChatBox />
      </section>
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-green-800 border-b pb-2">
          نسبة التصويت حسب الدائرة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.votingRateByCircle.map((circle, index) => {
            const circleNames = ["عمان الأولى", "الزرقاء", "عمان الثالثة"];
            return (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">
                  دائرة {circleNames[index]}
                </h3>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white">
                    <div
                      style={{ width: `${circle.votingRate}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                    ></div>
                  </div>
                </div>
                <p className="text-right text-2xl font-bold text-green-500">
                  {circle.votingRate.toFixed(2)}%
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
