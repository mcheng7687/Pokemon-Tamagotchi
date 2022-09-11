import React, { useState } from "react";
import Pokemon from "./Pokemon";
import useHelpers from "./useHelpers";

function SearchForm({ setSearchResult }) {
  const [formData, setFormData] = useState("");
  const { debounce } = useHelpers();

  const handleChange = evt => {
    setFormData(evt.target.value);

    // Auto search after 1.5 seconds (debounce feature)
    debounce(() => {
      let term = evt.target.value;
      console.log(`Searching for "${term}"...`);
       // Generate data for search request or get entire list
      Pokemon.find(term).then(res => {
        setSearchResult(res);
      });
    });
  };

  return (
    <input
      type="text"
      name="search-text"
      value={formData}
      onChange={handleChange}
      placeholder={`Search id or name for...`}
      className="center"
      id="search-form"
    />
  );
}

export default SearchForm;