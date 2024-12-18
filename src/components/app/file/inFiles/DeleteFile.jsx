import React, { useState, useEffect } from "react";
import JSZip from "jszip"; // JSZip import

export default function DeleteFile() {
  const [driveData, setDriveData] = useState([]); // 파일 데이터
  const [currentUsage, setCurrentUsage] = useState(0); // 현재 사용량
  const maxUsage = 1024; // 최대 용량
  const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [showWarning, setShowWarning] = useState(false); // 경고 표시 여부
  const [warningEnabled, setWarningEnabled] = useState(true); // 경고 켜기/끄기 여부

  // 로컬 스토리지에서 드라이브 데이터 불러오기
  useEffect(() => {
    const savedDriveData = JSON.parse(localStorage.getItem("driveData"));
    if (savedDriveData) {
      setDriveData(savedDriveData);
      const totalSize = savedDriveData.reduce(
        (sum, file) => sum + parseFloat(file.size),
        0
      );
      setCurrentUsage(totalSize);
    }
  }, []);

  // 드라이브 데이터 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    if (driveData.length > 0) {
      localStorage.setItem("driveData", JSON.stringify(driveData));
    }
  }, [driveData]);


  // 체크박스 선택 상태 관리
  const handleCheckBoxChange = (fileId) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(fileId)
        ? prevSelected.filter((id) => id !== fileId)
        : [...prevSelected, fileId]
    );
  };

  // 파일 삭제 처리
  const handleDelete = () => {
    
  };

 

 

  // 검색어 변경 시 호출되는 함수 추가
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 결과에 맞는 파일 필터링
  const filteredFiles = driveData.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="file-content">
      <h3 style={{ fontSize: "20px", margin:"10px"}}>휴지톻</h3>
      {/* 경고 메시지 */}
      {showWarning && (
        <div className="warning-message">
          <p>사용량이 60% 이상입니다! 파일 업로드를 조심하세요.</p>
          <button onClick={toggleWarning}>
            {warningEnabled ? "경고 끄기" : "경고 켜기"}
          </button>
        </div>
      )}
      

      {/* 상단 메뉴 추가 */}
      <div>
        <table className="filetop">
          <tbody>
            <tr>
              <td>
                <h2>경로 이름</h2>
              </td>
            </tr>
            <tr>
              <td>
               
                <button
                >복구하기</button>
                <button
                  value="delete"
                  name="file-delete"
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </td>
              <td className="input-group">
                <input
                  type="text"
                  placeholder="드라이브에서 검색"
                  value={searchQuery}
                  onChange={handleSearchChange} // 검색어 변경 시 handleSearchChange 호출
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      

      {/* 파일 리스트 (검색 결과만 표시) */}
      <div className="file-list">
        <table className="file-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFiles(driveData.map((file) => file.id));
                    } else {
                      setSelectedFiles([]);
                    }
                  }}
                />
              </th>
              <th>파일명</th>
              <th>용량</th>
              <th>최종 수정일</th>
              <th>생성일</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <tr key={file.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleCheckBoxChange(file.id)}
                    />
                  </td>
                  <td>{file.name}</td>
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
    </div>
  );
}
