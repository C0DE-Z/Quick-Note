import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import ReactMarkdown from "react-markdown";

function NoteDisplay({ notes, setNotes, handleSave }: { notes: { title: string; content: string }[]; setNotes: React.Dispatch<React.SetStateAction<{ title: string; content: string }[]>>; handleSave: () => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedNotes, setEditedNotes] = useState<{ title: string; content: string }[]>(notes);

  const handleEditButton = (index: number) => {
    setEditingIndex(index === editingIndex ? null : index);
  };

  const handleSaveChanges = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = editedNotes[index];
    setNotes(updatedNotes);
    handleSave();
    setEditingIndex(null);
  };

  return (
    <div className="w-full mt-8 p-4 bg-gray-800 text-gray-100 rounded-lg">
      {notes.map((note, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            {editingIndex === index ? (
              <input
                type="text"
                className="w-full p-2 mb-4 bg-gray-800 text-gray-100 rounded-lg focus:outline-none"
                value={editedNotes[index].title}
                onChange={(e) => {
                  const updatedNotes = [...editedNotes];
                  updatedNotes[index].title = e.target.value;
                  setEditedNotes(updatedNotes);
                }}
              />
            ) : (
              <h2 className="text-xl font-bold">{note.title}</h2>
            )}
            <button onClick={() => handleEditButton(index)}>
              <CiEdit />
            </button>
          </div>
          {editingIndex === index ? (
            <>
              <textarea
                className="w-full h-32 p-2 mt-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none"
                value={editedNotes[index].content}
                onChange={(e) => {
                  const updatedNotes = [...editedNotes];
                  updatedNotes[index].content = e.target.value;
                  setEditedNotes(updatedNotes);
                }}
              />
              <button
                className="mt-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600"
                onClick={() => handleSaveChanges(index)}
              >
                Save Changes
              </button>
            </>
          ) : (
            <ReactMarkdown>{note.content}</ReactMarkdown>
          )}
        </div>
      ))}
    </div>
  );
}

export default NoteDisplay;