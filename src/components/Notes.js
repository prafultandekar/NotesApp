import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotes(res.data);
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    window.location.href = "/"
  }
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
  <div style={{ alignSelf: 'flex-end', marginBottom: '10px' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>📝 All Notes</h2>

      {notes.length === 0 ? (
        <p style={{ color: '#999', fontSize: '18px' }}>No notes found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            width: '100%',
            maxWidth: '1000px',
          }}
        >
          {notes.map((note) => (
            <div
              key={note._id}
              style={{
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                borderLeft: '5px solid #3498db',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <h3 style={{ marginBottom: '10px', color: '#333' }}>{note.title}</h3>
              <p style={{ color: '#555' }}>{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;
