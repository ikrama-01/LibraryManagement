import React, { useState } from 'react';

const UpdateMemberForm = () => {
    const [memberId, setMemberId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [joined_date, setJoined_date] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMember = { name, email, phone: phone, joined_date };

        try {
            const response = await fetch(`http://127.0.0.1:5000/update-members/${memberId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedMember),
            });
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error updating book:', error);
        }

        setEmail('');
        setJoined_date('');
        setName('');
        setPhone('');
    };

    return (
        <div>
            <h3>Update Members</h3>
            <form onSubmit={handleSubmit}>
                <label>Member ID:</label>
                <input
                    type="number"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                />
                <br />
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
                    type="text"
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
                <button type="submit">Update Member</button>
            </form>
        </div>
    );
};

export default UpdateMemberForm;
