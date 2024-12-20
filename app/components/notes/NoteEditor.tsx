import { useRouter } from "next/navigation";
import { CiSettings } from "react-icons/ci";

function NoteEditor({
    title,
    setTitle,
    notes,
    setNotes,
    handleSave,
  }: {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    handleSave: () => void;
  }) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    };
  
    const router = useRouter();
    return (
      <div className="w-full">
        <CiSettings className="cursor-pointer" onClick={() => router.push('/settings')} />
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-800 text-gray-100 rounded-lg focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
        />
        <textarea
          className="w-full h-64 p-4 bg-gray-800 text-gray-100 rounded-lg focus:outline-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start taking notes..."
        />
        <button
          className="mt-4 px-6 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600"
          onClick={handleSave}
        >
          Save Notes
        </button>
      </div>
    );
  }

export default NoteEditor;