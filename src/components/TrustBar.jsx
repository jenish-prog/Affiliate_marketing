export default function TrustBar() {
  const trustItems = [
    { icon: "🔒", text: "Secure affiliate links" },
    { icon: "🔄", text: "Updated every 6 hours" },
    { icon: "✓", text: "Verified prices" },
    { icon: "📱", text: "No app needed" }
  ];

  return (
    <div className="bg-slate-700/50 backdrop-blur-sm border-t border-b border-slate-600/30 py-4 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center md:justify-start gap-3 text-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <span className="hidden md:block text-sm font-medium">{item.text}</span>
              <span className="md:hidden text-xs font-medium text-center">{item.text.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
