import ReactMarkdown from "react-markdown";

function NoteDisplay({ notes, setNotes, handleSave }: { notes: { title: string; content: string }[]; setNotes: React.Dispatch<React.SetStateAction<{ title: string; content: string }[]>>; handleSave: () => void }) {
    return (
      <div className="w-full mt-8 p-4 bg-gray-800 text-gray-100 rounded-lg">
        {notes.map((note, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-700 rounded-lg">
            <h2 className="text-xl font-bold">{note.title}</h2>
            <ReactMarkdown>{note.content}</ReactMarkdown>
            <textarea
              className="w-full h-32 p-2 mt-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none"
              value={note.content}
              onChange={(e) => {
                const updatedNotes = [...notes];
                updatedNotes[index].content = e.target.value;
                setNotes(updatedNotes);
              }}
            />
            <button
              className="mt-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        ))}
      </div>
    );
  }


export default NoteDisplay;