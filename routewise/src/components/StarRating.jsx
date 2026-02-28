function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1 text-yellow-400 mb-2">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className="text-lg">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}


export default StarRating;
