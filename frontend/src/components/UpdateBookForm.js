import React, { useState } from 'react';

const UpdateBookForm = () => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = { title, author, published_year: publishedYear, status };

    try {
      const response = await fetch(`http://127.0.0.1:5000/update-books/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error updating book:', error);
    }

    setAuthor('');
    setTitle('');
    setPublishedYear('');
    setStatus('');
  };

  return (
    <div>
      <h3>Update Book</h3>
      <form onSubmit={handleSubmit}>
        <label>Book ID:</label>
        <input
          type="number"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <br />
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
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
