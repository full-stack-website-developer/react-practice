import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ filterCategory }) => {
  return (
    <TextField
        variant="outlined"
        label="Categories"
        placeholder="Search..."
        fullWidth
        onChange={filterCategory}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
    />
  );
};

export default SearchBar;
