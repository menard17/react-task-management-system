import React from 'react';

interface SearchProps {
  query: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ query, onSearch }) => {
  return (
    <div className="form-group m-5">
      <input
        type="text"
        className="form-control"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
