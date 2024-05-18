import React, { useState } from 'react';
import './Styling/SearchText.css'; // Import CSS file for styling

const SearchForText = () => {
  const [author, setAuthor] = useState('');
  const [work, setWork] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleWorkChange = (event) => {
    setWork(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?author=${author}&work=${work}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="search-text-container"> {/* Apply CSS class for styling */}
      <h2>Search Text</h2>
      <div>
        <label htmlFor="author">Search by Author:</label>
        <input type="text" id="author" value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        <label htmlFor="work">Search by Work:</label>
        <input type="text" id="work" value={work} onChange={handleWorkChange} />
      </div>
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.map((result) => (
          <div key={result._id}>
            <h3>{result.title}</h3>
            <p>{result.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForText;
