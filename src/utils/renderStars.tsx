import type { JSX } from "react";

/**
 * Renders a 10-star rating system using Material Icons.
 * Full stars are based on integer division of the rating (out of 100).
 * A half star is shown if the rating isn't a multiple of 10 or 100.
 * The remaining are rendered as empty stars.
 *
 * @param {number} rating - A number between 0 and 100 representing the rating.
 * @returns {JSX.Element} A set of star icons representing the rating.
 */
const renderStars = (rating: number): JSX.Element => {
  // Calculate number of full stars (each full star = 10 rating points)
  const fullStars = Math.floor(rating / 10);

  // Add a half star if not a clean multiple of 10, except for 100
  const halfStars = rating === 100 || rating % 10 === 0 ? 0 : 1;

  // Calculate how many stars are left empty
  const emptyStars = 10 - fullStars - halfStars;

  return (
    <>
      {/* Render full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span
            key={`full-${i}`}
            className="material-icons"
            style={{ color: "#FFD700" }} // gold color
          >
            star
          </span>
        ))}

      {/* Render half star if needed */}
      {halfStars > 0 && (
        <span className="material-icons" style={{ color: "#FFD700" }}>
          star_half
        </span>
      )}

      {/* Render empty stars */}
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
