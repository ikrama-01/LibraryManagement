import React, { useState } from 'react';
import LibraryManager from './components/LibraryManager'; // For books
import MembersManager from './components/MembersManager'; // For members (to be created)
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(''); // Default is 'books'

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="App">
      <h2>Library Management System</h2>

      <div className="section-buttons">
        <button onClick={() => handleSectionChange('books')}>Books</button>
        <button onClick={() => handleSectionChange('members')}>Members</button>
      </div>

      {activeSection === 'books' && <LibraryManager />} {/* Show Books */}
      {activeSection === 'members' && <MembersManager />} {/* Show Members */}
    </div>
  );
}

export default App;
