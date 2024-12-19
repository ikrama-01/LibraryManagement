import React, { useState } from 'react';
import './Manager.css';
import AddBookForm from './AddBookForm';
import DeleteBookForm from './DeleteBookForm';
import SearchBooks from './SearchBooks';
import UpdateBookForm from './UpdateBookForm';
import ViewBooks from './ViewBooks';

const LibraryManager = () => {
  const [activeButton, setActiveButton] = useState(null);

  // Function to render content based on the active button
  const renderContent = () => {
    switch (activeButton) {
      case 'add':
        return <AddBookForm />;
      case 'view':
        return <ViewBooks />;
      case 'update':
        return <UpdateBookForm />;
      case 'delete':
        return <DeleteBookForm />;
      case 'search':
        return <SearchBooks />;
      default:
        return <p>Select an option to get started.</p>;
    }
  };

  return (
    <div className="library-container">
      {/* Buttons */}
      <div className="button-container">
        <button onClick={() => setActiveButton('add')}>Add Book</button>
        <button onClick={() => setActiveButton('view')}>See Books</button>
        <button onClick={() => setActiveButton('update')}>Update Book</button>
        <button onClick={() => setActiveButton('delete')}>Delete Book</button>
        <button onClick={() => setActiveButton('search')}>Search Books</button>
      </div>

      {/* Dynamic Content */}
      <div className="dynamic-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default LibraryManager;
