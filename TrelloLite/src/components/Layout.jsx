import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen font-sans bg-[#0079BF]">
      <header className="flex justify-between items-center p-2.5 px-5 bg-[#026AA7] text-white">
        <h1 className="m-0 text-2xl font-bold">Trello Lite</h1>
        <div>[ User Profile / Sign in ]</div>
      </header>
      <div className="p-2.5 px-5">
        <button className="py-2 px-3 border-none rounded cursor-pointer bg-white/30 text-white hover:bg-white/40">
          Add List
        </button>
      </div>
      <main className="flex-grow flex overflow-x-auto p-5 items-start">
        {/* The actual Board component will go here */}
        {/* This is a placeholder for visualization */}
        <div className="bg-gray-200 rounded w-[272px] p-2 mr-2 shrink-0">
          <h4 className="font-semibold p-2">List A</h4>
          <div className="bg-white rounded p-2 mb-2 shadow cursor-pointer">Card 1</div>
          <div className="bg-white rounded p-2 mb-2 shadow cursor-pointer">Card 2</div>
          <button className="w-full p-2 border-none rounded text-left cursor-pointer hover:bg-gray-300">
            + Add card
          </button>
        </div>
        <div className="bg-gray-200 rounded w-[272px] p-2 mr-2 shrink-0">
          <h4 className="font-semibold p-2">List B</h4>
          <div className="bg-white rounded p-2 mb-2 shadow cursor-pointer">Card 1</div>
          <button className="w-full p-2 border-none rounded text-left cursor-pointer hover:bg-gray-300">
            + Add card
          </button>
        </div>
        <div className="bg-gray-200 rounded w-[272px] p-2 mr-2 shrink-0">
          <h4 className="font-semibold p-2">List C</h4>
          <div className="bg-white rounded p-2 mb-2 shadow cursor-pointer">Card 1</div>
          <button className="w-full p-2 border-none rounded text-left cursor-pointer hover:bg-gray-300">
            + Add card
          </button>
        </div>
      </main>
    </div>
  );
};

export default Layout;
