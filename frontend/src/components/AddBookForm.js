import React, { useState } from 'react';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, published_year: publishedYear, status };

    try {
      const response = await fetch('http://127.0.0.1:5000/create-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error adding book:', error);
    }

    setAuthor('');
    setTitle('');
    setPublishedYear('');
    setStatus('');
  };

  return (
    <div>
      <h3>Add Book</h3>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <label>Published Year:</label>
        <input
          type="number"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          required
        />
        <br />
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Available">Available</option>
          <option value="Checked Out">Checked Out</option>
        </select>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
