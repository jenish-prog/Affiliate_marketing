export default function HeroBanner() {
  const trustStats = [
    { label: "Active Deals", value: "10,000+" },
    { label: "Stores Covered", value: "500+" },
    { label: "Money Saved", value: "₹1Cr+" }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          India's Best Deals, All in One Place
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl font-light">
          Find verified deals from top retailers, updated every 6 hours. Get the best prices with secure affiliate links—no app needed.
        </p>
        
        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {trustStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="font-heading text-2xl md:text-3xl font-bold text-amber-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
