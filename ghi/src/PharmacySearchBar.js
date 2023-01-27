const SearchBar = ({keyword, onChange}) => {
  const BarStyle = {width:"12rem", border:"none", padding:"0.5rem"};
  return (
    <>
      <input
        className="rounded bg-light float-right"
        style={BarStyle}
        key="search-bar"
        value={keyword}
        placeholder={"search by RX# or name"}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export default SearchBar;
