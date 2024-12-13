'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import NoteForm from '@/components/NoteForm'
import Navbar from '@/components/Navbar'
import NoteItem from '@/components/NoteItem'

const API_URL = '/api/notes';

export default function HomePage() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(API_URL);
      
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await axios.post(API_URL, { content: note });
      setNotes([response.data, ...notes]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  const updateNote = async (id, newContent) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { content: newContent });
      setNotes(notes?.map(note =>
        note.id === id ? response.data : note
      ));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <NoteForm onAddNote={addNote} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

