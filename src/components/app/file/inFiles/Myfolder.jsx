import React, { useState } from 'react';

const FileManager = ({ filteredFiles, selectedFiles, handleCheckBoxChange, setDriveData }) => {
  const [currentPath, setCurrentPath] = useState([]);

  const handleNavigateToFolder = (folderId) => {
    // 폴더를 찾아 현재 경로에 추가
    const folder = filteredFiles.find((file) => file.id === folderId && file.type === "folder");
    if (folder) {
      setCurrentPath((prevPath) => [...prevPath, folder.name]);
      setDriveData(folder.files); // 해당 폴더의 파일들로 갱신
    }
  };

  const handleGoBack = () => {
    setCurrentPath((prevPath) => prevPath.slice(0, prevPath.length - 1));
    // 상위 폴더의 파일로 갱신하는 로직 (예시)
    const parentFolder = getParentFolder(currentPath);
    setDriveData(parentFolder.files);
  };

  return (
    <div>
      <button onClick={handleGoBack}>뒤로 가기</button>

      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>이름</th>
            <th>크기</th>
            <th>수정일</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <tr
                key={file.id}
                className={file.type === "folder" ? "folder-row" : ""}
                onClick={() => file.type === "folder" && handleNavigateToFolder(file.id)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleCheckBoxChange(file.id)}
                  />
                </td>
                <td>
                  {file.type === "folder" ? (
                    <span className="folder-icon">📁</span> // 폴더 아이콘
                  ) : (
                    <span className="file-icon">📄</span> // 파일 아이콘
                  )}
                  {file.name}
                </td>
                <td>{file.size}</td>
                <td>{file.modified}</td>
                <td>{file.created}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileManager;
