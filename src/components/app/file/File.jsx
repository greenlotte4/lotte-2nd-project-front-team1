import React, { useState, useEffect } from "react";
import MyFile from "./inFiles/MyFile";
import SharedFile from "./inFiles/SharedFile";
import DeleteFile from "./inFiles/DeleteFile";

export default function File({ selectedItem }) {
  const renderContent = () => {
    switch (selectedItem) {
      case "내 드라이브":
        return <MyFile />;
      case "공유 드라이브":
        return <SharedFile />;
      case "휴지통":
        return <DeleteFile />;
      default:
        return <MyFile />;

    }
  }

  return (
    <div className="file-content">
      <div>
        {renderContent()}
      </div>
    </div>
  );
}
