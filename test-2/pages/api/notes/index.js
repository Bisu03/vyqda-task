import { NextResponse } from "next/server";
import Note from "@/models/Note";
import sequelize from "@/lib/db";

// Ensure the database is synchronized
await sequelize.authenticate();
await sequelize.sync();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all notes
      const notes = await Note.findAll();
      return res.status(200).json(notes);
    } else if (req.method === "POST") {
      // Create a new note

      const note = await Note.create({ content: req.body.content });
      return res.status(201).json(note);
    } else {
      // Handle unsupported HTTP methods
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
