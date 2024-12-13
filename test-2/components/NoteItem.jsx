'use client'

import { useState, useEffect, useRef } from 'react'

export default function NoteItem({ note, onUpdate, onDelete }) {
  const [content, setContent] = useState(note.content)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (e) => {
    
    setContent(e.target.value)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onUpdate(note.id, e.target.value)
    }, 500)
  }

  return (
    <div className="bg-white  shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="p-4">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full  border-none focus:ring-0 focus:outline-none text-black"
          rows={4}
          
        />
      </div>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
        <span className="text-xs text-gray-500">
          {new Date(note.updatedAt).toLocaleString()}
        </span>
        <button 
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

