import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Styling/SearchText.css'; // Import CSS file for styling

const SearchForText = () => {
  const [authors, setAuthors] = useState([]);
  const [works, setWorks] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const BASE_URL = 'http://localhost:5000';
    const fetchAuthorsAndWorks = async () => {
      try {
        const authorsResponse = await axios.get(`${BASE_URL}/api/authors/`);
        const worksResponse = await axios.get(`${BASE_URL}/api/works/`);

        setAuthors(authorsResponse.data);
        setWorks(worksResponse.data);
      } catch (error) {
        console.error('Error fetching authors and works:', error);
      }
    };
    fetchAuthorsAndWorks();
  }, [authors, works]);

  const handleSearch = async () => {
    if (!selectedAuthor || !selectedWork) {
      setErrorMessage('Please select an author and a work.');
      return;
    }
    try {
      const response = await fetch(`/api/search?author=${selectedAuthor}&work=${selectedWork}`);
      const data = await response.json();
      setSearchResults(data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="search-text-container"> {/* Apply CSS class for styling */}
      <Typography variant="h2">Search Text</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>

          <Autocomplete
            options={authors}
            getOptionLabel={(option) => option.name}
            value={selectedAuthor}
            onChange={(event, newValue) => {
              setSelectedAuthor(newValue);
              setSelectedWork(null); // Reset selected work when selecting a new author
            }}
            renderInput={(params) => <TextField {...params} label="Search by Author" variant="outlined" />}
          />

        </Grid>
        <Grid item xs={6}>
          
          <Autocomplete
            options={selectedAuthor ? works.filter(work => selectedAuthor.works.includes(work._id)) : works}
            getOptionLabel={(option) => option.title}
            value={selectedWork}
            onChange={(event, newValue) => {
              setSelectedWork(newValue);
              if (newValue) { // Check if newValue is not null
                // Find the author associated with the selected work
                const associatedAuthor = authors.find(author => author.works.includes(newValue._id));
                if (associatedAuthor) { // Check if associatedAuthor is not null
                  setSelectedAuthor(associatedAuthor); // Set the selected author
                }
              } else {
                setSelectedAuthor(null); // Clear the selected author when work is cleared
              }
            }}
            renderInput={(params) => <TextField {...params} label="Search by Work" variant="outlined" />}
          />

        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
          {errorMessage && <Typography className="error-message" color="error">{errorMessage}</Typography>}
        </Grid>
      </Grid>
      <div>
        {searchResults.map((result) => (
          <div key={result._id}>
            <Typography variant="h3">{result.title}</Typography>
            <Typography>{result.text}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForText;
