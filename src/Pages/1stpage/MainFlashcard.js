import React from "react";
import Button from "../../Components/Button";
import CreateNew from "./CreateNew";
import PdfUploader from "../../Components/PdfUploader";
import StatsCard from "../../Components/StatsCard";

const MainFlashcard = () => {
  return (
    <div className="fade-in">
      <Button />
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <PdfUploader />
          <StatsCard />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <CreateNew />
        </div>
      </div>
    </div>
  );
};

export default MainFlashcard;
