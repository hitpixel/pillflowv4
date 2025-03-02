import React from "react";
import Navbar from "../layout/Navbar";
import HistoryView from "../history/HistoryView";

const History: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1 pt-6 pb-10 px-4">
        <HistoryView />
      </main>
    </div>
  );
};

export default History;
