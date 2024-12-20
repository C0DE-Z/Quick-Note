/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

// Imports 
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import ReactMarkdown from "react-markdown";
import NoteDisplay from "./components/notes/NoteDisplay";
import NoteEditor from "./components/notes/NoteEditor";
import Tabs from "./components/ui/tabs/Tabs";
import SearchBar from "./components/ui/search/SearchBar";
import { useRouter } from "next/navigation";

export default function Home() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [currentNote, setCurrentNote] = useState<{ title: string; content: string }>({ title: "", content: "" });
  const [savedNotes, setSavedNotes] = useState<{ title: string; content: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    (note.title && typeof note.title === 'string' && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (note.content && typeof note.content === 'string' && note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = sidebarRef.current?.offsetWidth || 250;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="min-h-screen p-8 pb-20 bg-gray-900 text-gray-100 font-sans flex">
      <div
        ref={sidebarRef}
        className={`h-full ${isSidebarOpen ? "block" : "hidden"} md:block`}
        style={{ width: sidebarWidth }}
      >
        <Tabs tabs={savedNotes} activeTab={activeTab} setActiveTab={setActiveTab} closeTab={closeTab} />
        <div
          className="absolute top-0 right-0 h-full w-2 cursor-col-resize"
          onMouseDown={handleMouseDown}
        />
      </div>
      <main className="flex flex-col gap-8 items-center w-full">
        <h1 className="text-3xl font-bold">QuickNote</h1>
        <h2 className="text-1xl font-normal">Easily Take locally cached notes</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {searchQuery ? (
          <div className="w-full mt-8 p-4 bg-gray-800 text-gray-100 rounded-lg">
            {filteredNotes.map((note, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-700 rounded-lg cursor-pointer" onClick={() => setActiveTab(index + 1)}>
                <h2 className="text-xl font-bold">{note.title}</h2>
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </div>
            ))}
          </div>
        ) : activeTab === 0 ? (
          <NoteEditor title={title} setTitle={setTitle} notes={notes} setNotes={setNotes} handleSave={handleSave} />
        ) : (
          savedNotes[activeTab - 1] && (
             <>
              <NoteDisplay notes={[savedNotes[activeTab - 1]]} setNotes={setSavedNotes} handleSave={handleSave} /> 
            </>
          )
        )}
      </main>
    </div>
  );
}
