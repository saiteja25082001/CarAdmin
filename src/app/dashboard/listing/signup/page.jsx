"use client";
import { useState, useEffect } from 'react';

export default function RegisterAndShowUsersPage() {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the API for registration
      const res = await fetch('/api/listing/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Registration successful!');
        // Clear form fields
        setUsername('');
        setEmail('');
        setPassword('');
        // Fetch updated users list
        fetchUsers();
      } else {
        setMessage(`Error: ${data.error || 'Failed to register'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Fetch all users from the database using GET
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/listing/signup'); // Use same endpoint for GET
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users); // Assuming data.users contains the user array
      } else {
        setMessage(`Error fetching users: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error fetching users: ${error.message}`);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}

      <h3 style={{ marginTop: '2rem' }}>Registered Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
