import React, { useState } from 'react';

const DeleteBookForm = () => {
  const [bookId, setBookId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/delete-books/${bookId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
    setBookId('');
  };

  return (
    <div>
      <h3>Delete Book</h3>
      <form onSubmit={handleDelete}>
        <label>Book ID:</label>
        <input
          type="number"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <br />
        <button type="submit">Delete Book</button>
      </form>
    </div>
  );
};

export default DeleteBookForm;
