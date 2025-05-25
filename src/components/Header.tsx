import type { JSX } from "react";

/**
 * Props for the Header component.
 * @typedef {Object} HeaderProps
 * @property {React.Dispatch<React.SetStateAction<string>>} searchMovie - State updater function to set the search text
 */
type HeaderProps = {
  searchMovie: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * Header Component
 *
 * Renders a search input and a search icon.
 * Calls the `searchMovie` prop whenever the user types into the input field.
 *
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} The rendered Header component
 */
function Header({ searchMovie }: HeaderProps): JSX.Element {
  return (
    <div className="header">
      {/* Search icon using Material Icons */}
      <span className="material-icons">search</span>

      {/* Text input to filter/search movies */}
      <input
        type="text"
        onChange={(e) => searchMovie(e.target.value)} // Updates search state on change
        placeholder="Type to search.." // Placeholder text
      />
    </div>
  );
}

export default Header;
