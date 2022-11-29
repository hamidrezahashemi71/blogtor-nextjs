import TextField from "@mui/material/TextField";

const SearchBar = ({searchVal, setSearchVal}: any) => {
  return (
    <TextField
      placeholder='Search...'
      value={searchVal}
      onChange={(e) => setSearchVal(e.target.value)}
    />
  );
};

export default SearchBar;
