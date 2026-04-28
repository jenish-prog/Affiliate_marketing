export default function SortControls({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'discount', label: 'Discount %' },
    { value: 'popular', label: 'Popular' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sortOptions.map(option => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            sortBy === option.value
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
