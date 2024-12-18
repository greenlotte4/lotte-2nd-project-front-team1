import React, { useState, useEffect } from "react";
import MyFile from "./inFiles/MyFile";
import SharedFile from "./inFiles/SharedFile";
import DeleteFile from "./inFiles/DeleteFile";

export default function File({ selectedItem }) {
  const [isShared, setIsShared] = useState(false);

  const setDriveType = (selected) => {
    if (selected === "공유 드라이브") {
      setIsShared(true);
    } else {
      setIsShared(false);
    }
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "내 드라이브":
        return <MyFile isShared={isShared}/>;
      case "공유 드라이브":
        return <SharedFile isShared={isShared}/>;
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
