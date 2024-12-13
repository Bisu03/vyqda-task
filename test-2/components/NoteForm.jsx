'use client'

import { useState } from 'react'

export default function NoteForm({ onAddNote }) {
  const [content, setContent] = useState('')

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddNote(content)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={handleChange}
          className="w-full resize-none border-none text-black focus:ring-0 focus:outline-none"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500 transition-colors"
          >
            Add Note
          </button>
        </div>
      </div>
    </form>
  )
}

