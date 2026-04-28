import { useState, useEffect } from 'react';

export default function FlashDealCountdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const secondsLeft = Math.floor((midnight - now) / 1000);

      if (secondsLeft > 0) {
        const hours = Math.floor(secondsLeft / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = secondsLeft % 60;
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft('00:00:00');
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-4 mb-8 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">⚡</span>
          <div>
            <h3 className="font-heading font-bold text-lg">Flash Deals</h3>
            <p className="text-sm text-red-100">Limited time offers ending in:</p>
          </div>
        </div>
        <div className="font-mono font-bold text-3xl bg-black/20 px-6 py-2 rounded-lg">
          {timeLeft}
        </div>
      </div>
    </div>
  );
}
