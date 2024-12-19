import React, { useState, useEffect } from 'react';
import './AddBookForm';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/read-books');
        const data = await response.json();
        setBooks(data.books);  // Assuming books is an array
        console.log(data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h3>Books List</h3>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
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
            {books.map((book) => (
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
      )}
    </div>
  );
};

export default ViewBooks;
