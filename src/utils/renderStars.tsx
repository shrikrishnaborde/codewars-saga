const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating / 10);
  const halfStars = rating === 100 || rating % 10 === 0 ? 0 : 1;
  const emptyStars = 10 - fullStars - halfStars;

  return (
    <>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span
            key={`full-${i}`}
            className="material-icons"
            style={{ color: "#FFD700" }}
          >
            star
          </span>
        ))}

      {halfStars > 0 && (
        <span className="material-icons" style={{ color: "#FFD700" }}>
          star_half
        </span>
      )}

      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <span key={`empty-${i}`} className="material-icons">
            star_border
          </span>
        ))}
    </>
  );
};

export default renderStars;
