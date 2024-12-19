import React, { useState } from 'react';
import AddMemberForm from './AddMemberForm';
import ViewMember from './ViewMember';
import UpdateMemberForm from './UpdateMemberForm';
import DeleteMemberForm from './DeleteMemberForm';
import './Manager.css';

const MembersManager = () => {
  const [activeButton, setActiveButton] = useState(null);

  // Function to render content based on the active button
  const renderContent = () => {
    switch (activeButton) {
      case 'add':
        return <AddMemberForm />;
      case 'view':
        return <ViewMember />;
      case 'update':
        return <UpdateMemberForm />;
      case 'delete':
        return <DeleteMemberForm />;
      default:
        return <p>Select an option to get started.</p>;
    }
  };

  return (
    <div className="member-container">
      {/* Buttons */}
      <div className="button-container">
        <button onClick={() => setActiveButton('add')}>Add Member</button>
        <button onClick={() => setActiveButton('view')}>See Members</button>
        <button onClick={() => setActiveButton('update')}>Update Member</button>
        <button onClick={() => setActiveButton('delete')}>Delete Member</button>
      </div>

      {/* Dynamic Content */}
      <div className="dynamic-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default MembersManager;
