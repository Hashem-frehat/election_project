// src/adminDash/TimerControl.jsx
import React, { useState } from 'react';
import { useTimer } from './timecontext';

const TimerControl = () => {
  const { timeRemaining, isActive, startTimer, stopTimer, resetTimer } = useTimer();
  const [duration, setDuration] = useState({ days: 0, hours: 0, minutes: 0,seconds:0 });

  const handleStart = () => {
    const totalSeconds = 
      duration.days * 24 * 60 * 60 + 
      duration.hours * 60 * 60 + 
      duration.minutes * 60;
    startTimer(totalSeconds);
  };

  const handleReset = () => {
    const totalSeconds = 
      duration.days * 24 * 60 * 60 + 
      duration.hours * 60 * 60 + 
      duration.minutes * 60;
    resetTimer(totalSeconds);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">تحكم المؤقت</h2>
      <div className="flex space-x-4 mb-4">
        <input 
          type="number" 
          placeholder="أيام"
          value={duration.days}
          onChange={(e) => setDuration({...duration, days: parseInt(e.target.value) || 0})}
          className="border rounded px-2 py-1 w-20"
        />
        <input 
          type="number" 
          placeholder="ساعات"
          value={duration.hours}
          onChange={(e) => setDuration({...duration, hours: parseInt(e.target.value) || 0})}
          className="border rounded px-2 py-1 w-20"
        />
        <input 
          type="number" 
          placeholder="دقائق"
          value={duration.minutes}
          onChange={(e) => setDuration({...duration, minutes: parseInt(e.target.value) || 0})}
          className="border rounded px-2 py-1 w-20"
        />
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={handleStart} 
          disabled={isActive}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          بدء
        </button>
        <button 
          onClick={stopTimer} 
          disabled={!isActive}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          إيقاف
        </button>
        <button 
          onClick={handleReset}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          إعادة تعيين
        </button>
      </div>
      {timeRemaining !== null && (
        <p className="mt-4">
          الوقت المتبقي: {Math.floor(timeRemaining / 3600)} ساعة {Math.floor((timeRemaining % 3600) / 60)} دقيقة {timeRemaining % 60} ثانية
        </p>
      )}
    </div>
  );
};

export default TimerControl;