import React, { useState } from 'react';

const DeleteMemberForm = () => {
  const [memberId, setMemberId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/delete-members/${memberId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
    setMemberId('');
  };

  return (
    <div>
      <h3>Delete Member</h3>
      <form onSubmit={handleDelete}>
        <label>Member ID:</label>
        <input
          type="number"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required
        />
        <br />
        <button type="submit">Delete Member</button>
      </form>
    </div>
  );
};

export default DeleteMemberForm;
