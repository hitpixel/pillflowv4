import React from "react";
import Navbar from "../layout/Navbar";
import BarcodeScanner from "../scanner/BarcodeScanner";

const Scan: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1 pt-6 pb-10 px-4">
        <BarcodeScanner />
      </main>
    </div>
  );
};

export default Scan;
