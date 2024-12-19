import React, { useState } from 'react';

const AddMemberForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [joined_date, setJoined_date] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const memberData = { name, email, phone: phone, joined_date };

        try {
            const response = await fetch('http://127.0.0.1:5000/create-members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData),
            });
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error adding book:', error);
        }

        setEmail('');
        setJoined_date('');
        setName('');
        setPhone('');
    };

    return (
        <div>
            <h3>Add Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label>Phone Number:</label>
                <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <br />
                <label>Joined Date:</label>
                <input
                    type="date"
                    value={joined_date}
                    onChange={(e) => setJoined_date(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Add Member</button>
            </form>
        </div>
    );
};

export default AddMemberForm;
