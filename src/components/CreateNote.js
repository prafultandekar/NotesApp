import React, { useEffect, useState } from 'react';
import API from '../services/api';

function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const token = localStorage.getItem('token');

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get('/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error('Error fetching notes:', err.response?.data || err.message);
      }
    };

    fetchNotes();
  }, [token]);

  // Add note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(
        '/notes/create',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([response.data, ...notes]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.log('Error adding note:', err.response?.data || err.message);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err.response?.data || err.message);
    }
  };

  // Update note
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(
        `/notes/${editingId}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedNotes = notes.map((note) =>
        note._id === editingId ? res.data : note
      );
      setNotes(updatedNotes);
      setEditingId(null);
      setEditTitle('');
      setEditContent('');
    } catch (err) {
      console.error('Error updating note:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#4B0082',
        }}
      >
        📝 My Notes
      </h2>

      {/* Conditional Form: Add or Edit */}
      {editingId ? (
        <form
          onSubmit={handleUpdate}
          style={{
            marginBottom: '30px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#fff',
          }}
        >
          <input
            type="text"
            placeholder="Edit Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <textarea
            placeholder="Edit Content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
              height: '100px',
              resize: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#228B22',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              marginRight: '10px',
            }}
          >
            Update Note
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setEditTitle('');
              setEditContent('');
            }}
            style={{
              backgroundColor: '#ccc',
              color: '#000',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: '30px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#fff',
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
              height: '100px',
              resize: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#4B0082',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Add Note
          </button>
        </form>
      )}

      {/* Notes List */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              flex: '1 1 250px',
              backgroundColor: '#fffacd',
              border: '1px solid #eee',
              borderRadius: '10px',
              padding: '15px',
              position: 'relative',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '10px',
              }}
            >
              {note.title}
            </h3>
            <p style={{ fontSize: '15px', color: '#444' }}>{note.content}</p>
            <button
              onClick={() => handleDelete(note._id)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'red',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              title="Delete note"
            >
              ✖
            </button>

            <button
              onClick={() => {
                setEditingId(note._id);
                setEditTitle(note.title);
                setEditContent(note.content);
              }}
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'blue',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              title="Edit note"
            >
              ✏️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddNote;
