import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const Note = sequelize.define('Note', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

(async () => {
    try {
      await Note.sync({ alter: true }); 
      console.log('Members table created or updated successfully.');
    } catch (error) {
      console.error('Error creating/updating Members table:', error);
    }
  })();


export default Note;

