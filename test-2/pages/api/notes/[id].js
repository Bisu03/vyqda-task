import { NextResponse } from "next/server";
import Note from "@/models/Note";
import sequelize from "@/lib/db";

// Ensure the database is synchronized
await sequelize.authenticate();
await sequelize.sync();

export default async function handler(req, res) {
  const { id } = req.query; // Use `id` instead of `slug`

  if (req.method === "PUT") {
    try {
      const [updated] = await Note.update(
        { content: req.body.content },
        { where: { id } } // Use `id` here
      );

      if (updated) {
        const updatedNote = await Note.findByPk(id);
        return res.status(200).json(updatedNote);
      }

      return res.status(404).json({ error: "Note not found" });
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(400).json({ error: "Error updating note" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleted = await Note.destroy({ where: { id } }); // Use `id` here

      if (deleted) {
        return res.status(200).json({ message: "Note deleted successfully" });
      }

      return res.status(404).json({ error: "Note not found" });
    } catch (error) {
      console.error("Error deleting note:", error);
      return res.status(500).json({ error: "Error deleting note" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
