type HeaderProps = {
  searchMovie: React.Dispatch<React.SetStateAction<string>>;
};

function Header({ searchMovie }: HeaderProps) {
  return (
    <div className="header">
      <span className="material-icons">search</span>
      <input
        type="text"
        onChange={(e) => searchMovie(e.target.value)}
        placeholder="Type to search.."
      />
    </div>
  );
}

export default Header;
