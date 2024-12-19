import React, { useState } from 'react';
import './ViewBooks.css';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/search-books?q=${query}`);
      const data = await response.json();
      setResults(data.books || []);
    } catch (error) {
      console.error('Error searching books:', error);
    }

    setQuery('');
  };

  return (
    <div>
      <h3>Search Books</h3>
      <form onSubmit={handleSearch}>
        <label>Search:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {results.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Published Year</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((book) => (
                <tr key={book[0]}> {/* Assuming book[0] is the ID */}
                  <td>{book[0]}</td> {/* ID */}
                  <td>{book[1]}</td> {/* Title */}
                  <td>{book[2]}</td> {/* Author */}
                  <td>{book[3]}</td> {/* Published Year */}
                  <td>{book[4]}</td> {/* Status */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
