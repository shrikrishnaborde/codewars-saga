type HeaderProps = {
  searchMovie: React.Dispatch<React.SetStateAction<string>>;
};

function Header({ searchMovie }: HeaderProps) {
  return (
    <div className="header">
      <input type="text" onChange={(e) => searchMovie(e.target.value)} />
    </div>
  );
}

export default Header;
