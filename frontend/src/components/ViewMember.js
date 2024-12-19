import React, { useState, useEffect } from 'react';

const ViewMember = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/read-members');
        const data = await response.json();
        setMembers(data.members);  // Assuming books is an array
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h3>Members List</h3>
      {members.length === 0 ? (
        <p>No Members available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member[0]}> {/* Assuming book[0] is the ID */}
                <td>{member[0]}</td> {/* ID */}
                <td>{member[1]}</td> {/* Title */}
                <td>{member[2]}</td> {/* Author */}
                <td>{member[3]}</td> {/* Published Year */}
                <td>{member[4]}</td> {/* Status */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewMember;
