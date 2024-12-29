/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ReactMarkdown from "react-markdown";
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

  return (
    <div className="w-full">
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

function NoteDisplay({ notes }: { notes: { title: string; content: string }[] }) {
  return (
    <div className="w-full mt-8 p-4 bg-gray-800 text-gray-100 rounded-lg">
      {notes.map((note, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-700 rounded-lg">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}

function SearchBar({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <input
      type="text"
      className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none"
      placeholder="Search notes..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

function Tabs({ tabs, activeTab, setActiveTab, closeTab }: { tabs: { title: string; content: string }[]; activeTab: number; setActiveTab: React.Dispatch<React.SetStateAction<number>>; closeTab: (index: number) => void }) {
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <button
        className={`px-4 py-2 rounded-lg text-left ${activeTab === 0 ? "bg-gray-700 text-gray-100" : "bg-gray-800 text-gray-400"}`}
        onClick={() => setActiveTab(0)}
      >
         Home
      </button>
      {tabs.map((tab, index) => (
        tab.title && tab.content && (
          <div key={index} className="flex items-center">
            <button
              className={`flex-1 px-4 py-2 rounded-lg text-left ${activeTab === index + 1 ? "bg-gray-700 text-gray-100" : "bg-gray-800 text-gray-400"}`}
              onClick={() => setActiveTab(index + 1)}
            >
              {tab.title}
            </button>
            <button
              className="ml-2 px-2 py-1 bg-[#591c1c76] text-gray-100 rounded-lg"
              onClick={() => closeTab(index)}
            >
              ✕
            </button>
          </div>
        )
      ))}
    </div>
  );
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState<{ title: string; content: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedNotes = Cookies.get("notes");
    if (savedNotes) {
      try {
        setSavedNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Error parsing saved notes:", e);
        Cookies.remove("notes");
      }
    }
  }, []);

  const handleSave = () => {
    const updatedNotes = [...savedNotes, { title, content: notes }];
    setSavedNotes(updatedNotes);
    Cookies.set("notes", JSON.stringify(updatedNotes), { expires: 7 });
    setTitle("");
    setNotes("");
  };

  const closeTab = (index: number) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
    Cookies.set("notes", JSON.stringify(updatedNotes), { expires: 7 });
    if (activeTab === index + 1) {
      setActiveTab(0);
    } else if (activeTab > index + 1) {
      setActiveTab(activeTab - 1);
    }
  };

  const filteredNotes = savedNotes.filter((note) =>
    (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-8 pb-20 bg-gray-900 text-gray-100 font-sans flex">
      <div className={`w-1/4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <Tabs tabs={savedNotes} activeTab={activeTab} setActiveTab={setActiveTab} closeTab={closeTab} />
      </div>
      <div className="md:hidden">
        <button
          className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
      </div>
      <main className="flex flex-col gap-8 items-center w-3/4">
        <h1 className="text-3xl font-bold">QuickNote</h1>
        <h2 className="text-1xl font-normal">Easily Take locally cached notes</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {activeTab === 0 ? (
          <>
            <NoteEditor title={title} setTitle={setTitle} notes={notes} setNotes={setNotes} handleSave={handleSave} />
            <NoteDisplay notes={filteredNotes} />
          </>
        ) : (
          <NoteDisplay notes={[savedNotes[activeTab - 1]]} />
        )}
      </main>
    </div>
  );
}
