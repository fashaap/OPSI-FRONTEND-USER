import { useState, useEffect } from "react";

const CountdownTimer = ({ countdown, fontClass = "font-mono" }) => {
  const targetTime = new Date(countdown);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor(timeDiff / 1000) % 60;
    const minutes = Math.floor(timeDiff / (1000 * 60)) % 60;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, [targetTime]);

  const formatTime = (time) => String(time).padStart(2, "0");

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return (
      <div
        className={`flex space-x-4 justify-center items-center text-center ${fontClass}`}
      >
        <div>
          <span>00</span>
          <span> Jam</span>
        </div>
        <div>
          <span>00</span>
          <span> Menit</span>
        </div>
        <div>
          <span>00</span>
          <span> Detik</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex space-x-4 justify-center items-center text-center ${fontClass}`}
    >
      <div>
        <span>{formatTime(timeLeft.hours)}</span>
        <span> Jam</span>
      </div>
      <div>
        <span>{formatTime(timeLeft.minutes)}</span>
        <span> Menit</span>
      </div>
      <div>
        <span>{formatTime(timeLeft.seconds)}</span>
        <span> Detik</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
