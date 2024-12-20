function Tabs({ tabs, activeTab, setActiveTab, closeTab }: { tabs: { title: string; content: string }[]; activeTab: number; setActiveTab: React.Dispatch<React.SetStateAction<number>>; closeTab: (index: number) => void }) {
    return (
      <div className="flex flex-col gap-2 mb-4 w-full">
        <button
          className={`px-4 py-2 rounded-lg text-left ${activeTab === 0 ? "bg-gray-700 text-gray-100" : "bg-gray-800 text-gray-400"}`}
          onClick={() => setActiveTab(0)}
        >
        📃 New Note
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

export default Tabs;