import React, { useState, useEffect } from "react";
import JSZip, { folder } from "jszip"; // JSZip import
import { createFolder, getChildFolders, savedFile, selectDriveData } from "../../../../api/file/fileAPI";
import { useNavigate } from "react-router-dom";

export default function MyFile({ isShared }) {
  const [currentUsage, setCurrentUsage] = useState(0); // 현재 사용량
  const maxUsage = 1024; // 최대 용량
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [showWarning, setShowWarning] = useState(false); // 경고 표시 여부
  const [warningEnabled, setWarningEnabled] = useState(true); // 경고 켜기/끄기 여부
  const [files, setFiles] = useState([]);
  const [driveData, setDriveData] = useState([]); // 초기 드라이브 데이터
  const [currentPath, setCurrentPath] = useState([null]); // 현재 경로

  useEffect(() => {
    getDriveData();
  }, []);  // 빈 배열([])로 설정하여 컴포넌트가 처음 마운트될 때만 실행


  const getDriveData = async () => {
    const driveId = 1;
    console.log("driveId + ", driveId);
    try {
      const response = await selectDriveData(driveId);
      if (response && response.status === 200) {
        setDriveData(response.data);  // 받아온 데이터를 상태에 저장

        console.log("들어온파일", response.data.driveFiles); // 배열 여부 확인
        console.log("들어온데이터", response.data); // 배열 여부 확인
        // `driveFiles`가 배열인지 확인하고, 배열이 아니라면 배열로 감싸기
        const driveData = Array.isArray(response.data.driveFiles)

          ? response.data.driveFiles
          : [response.data.driveFiles];
        console.log("데이터배열", Array.isArray(driveData)); // 배열 여부 확인
        console.log("드라이브데이터", driveData); // 데이터 내용 확인
        const filteredData = driveData.filter(file => file && file.size > 0);

        const totalSize = filteredData.reduce((sum, file) => sum + parseFloat(file.size || 0), 0);


        setCurrentUsage(totalSize);  // 총 사용량 계산
        console.log("가져온 데이터", response.data);
      } else {
        console.log("데이터 가져오기 실패:", response?.status);
      }
    } catch (error) {
      console.error("드라이브 데이터 가져오는 중 오류 발생:", error);
    }
  };

  // 폴더 클릭 시 자식 폴더 데이터를 불러오는 함수
  const handleFolderClick = async (folderId) => {
    const childFolders = await getChildFolders(folderId);  // 자식 폴더 불러오기
    // 자식 폴더가 배열이 아니거나 비어있는 경우
    if (!Array.isArray(childFolders)) {
      console.error('자식 폴더가 배열이 아닙니다:', childFolders);
      return;
    }
    console.log("자식 폴더들:", childFolders);
    setDriveData(childFolders); // 자식 폴더 데이터 상태에 저장
    setCurrentPath((prevPath) => [...prevPath, folderId]); // 경로 상태 업데이트
    console.log("경로 상태 :", currentPath);
  };

  // 뒤로 가기 클릭 시 동작
  const handleBackClick = () => {
    if (currentPath.length <= 1) {
      console.log("최상위 폴더이므로 뒤로 갈 수 없습니다.");
      return;
    }

    const previousFolderId = currentPath[currentPath.length - 2]; // 이전 폴더 ID
    console.log("이전 폴더 ID:", previousFolderId);

    // 이전 폴더가 null인 경우 최상위 폴더를 불러오기 위한 특별한 처리
    if (previousFolderId === null) {
      console.log("최상위 폴더로 돌아갑니다.");
      getDriveData();  // 최상위 폴더의 자식 폴더 불러오기
      setCurrentPath([null]);  // 경로를 최상위로 초기화
    } else {
      // 이전 폴더의 자식들을 불러오는 함수
      const fetchParentChildFolders = async () => {
        const childFolders = await getChildFolders(previousFolderId);
        if (!Array.isArray(childFolders)) {
          console.error('자식 폴더가 배열이 아닙니다:', childFolders);
          return [];
        }
        setDriveData(childFolders); // 자식 폴더 데이터 상태에 저장
        console.log("자식 폴더들 (뒤로가기 후):", childFolders);
      };

      fetchParentChildFolders(); // 이전 폴더의 자식들을 불러옴

      // 경로 상태 업데이트
      setCurrentPath((prevPath) => prevPath.slice(0, -1)); // 경로에서 마지막 폴더 제거
    };
  }


  // 추가: useEffect로 currentPath 상태가 변경된 후 반영
  useEffect(() => {
    console.log("currentPath 상태가 변경되었습니다:", currentPath);
    // 필요한 동작 (예: URL 변경, 데이터 갱신 등)을 여기서 처리할 수 있습니다.
  }, [currentPath]);  // currentPath가 변경될 때마다 실행


  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files);
  };

  // 파일 업로드 처리
  const uploadFiles = async (files) => {
    const totalSize = files.reduce(
      (sum, file) => sum + file.size / (1024 * 1024),
      0
    );

    // 업로드 용량 초과 검사
    if (currentUsage + totalSize > maxUsage) {
      alert("업로드 용량 초과입니다!");
      return;
    }

    // 현재 폴더 ID를 currentPath에서 추출
    const folderId = currentPath[currentPath.length - 1] || null;  // 예시로 마지막 폴더 ID를 사용
    const driveId = 1;  // 예시로 드라이브 ID가 1이라고 가정

    // FormData 생성
    const formData = new FormData();

    // 파일과 관련된 정보들 추가
    files.forEach((file) => {
      formData.append('files', file);  // 파일 객체 추가
      formData.append('fileNames', file.name);  // 파일 이름 추가
      formData.append('fileSizes', file.size);  // 파일 크기 추가
    });

    // 폴더 ID와 드라이브 ID 추가
    if (folderId !== null) {
      formData.append('folderId', folderId);
    } else {
      formData.append('folderId', 0);

    }
    formData.append('driveId', driveId);

    // 현재 폴더의 데이터도 상태에 추가 (업로드된 파일을 UI에 반영)
    setDriveData((prevData) => [...prevData, ...files]);
    setCurrentUsage((prevUsage) => prevUsage + totalSize);

    console.log("업로드파일", files);
    console.log("업로드form", formData);

    // 서버로 업로드 요청 보내기
    try {
      const response = await savedFile(formData);  // formData를 서버에 전송
      console.log("파일 업로드 성공:", response);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
    }
  };


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
    const remainingFiles = driveData.filter(
      (file) => !selectedFiles.includes(file.id)
    );

    // 선택된 파일들의 크기만큼 현재 용량에서 빼기
    const deletedFilesSize = driveData
      .filter((file) => selectedFiles.includes(file.id))
      .reduce((sum, file) => {
        const fileSizeMB = parseFloat(file.size); // size는 이미 MB로 저장되어 있다고 가정
        return sum + fileSizeMB;
      }, 0);

    // currentUsage 업데이트 시 음수 값 방지
    const newUsage = Math.max(currentUsage - deletedFilesSize, 0);

    setDriveData(remainingFiles);
    setSelectedFiles([]);

    // 삭제된 파일 크기만큼 currentUsage 업데이트
    setCurrentUsage(newUsage);

    // 로컬 스토리지에 삭제된 데이터 저장
    localStorage.setItem("driveData", JSON.stringify(remainingFiles));
  };

  // 파일 다운로드 처리
  const handleDownload = () => {
    if (selectedFiles.length === 0) {
      alert("파일이나 폴더를 선택해주세요.");
      return;
    }

    // 선택된 파일과 폴더를 구분
    const selectedItems = selectedFiles.map((fileId) =>
      driveData.find((file) => file.id === fileId)
    );

    selectedItems.forEach((item) => {
      if (item.type === "folder") {
        // 폴더인 경우, 해당 폴더를 ZIP으로 압축하여 다운로드
        downloadFolder(item);
      } else {
        // 파일인 경우, 개별적으로 다운로드
        downloadFile(item);
      }
    });
  };

  // 개별 파일 다운로드 함수
  const downloadFile = (file) => {
    const link = document.createElement("a");
    const fileBlob =
      file.file instanceof Blob ? file.file : new Blob([file.file]);
    link.href = URL.createObjectURL(fileBlob); // Blob 객체를 URL로 생성
    link.download = file.name;
    link.click();
  };

  // 폴더 다운로드 함수 (ZIP으로 압축)
  const downloadFolder = (folder) => {
    const zip = new JSZip(); // JSZip 객체 생성
    const folderZip = zip.folder(folder.name); // 폴더 생성

    // 폴더 내 모든 파일을 추가
    folder.files.forEach((file) => {
      folderZip.file(file.name, file.file); // 폴더 내 파일을 추가
    });

    // ZIP 파일 생성 후 다운로드
    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${folder.name}.zip`; // 폴더를 ZIP으로 다운로드
      link.click();
    });
  };

  // 검색어 변경 시 호출되는 함수 추가
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 결과에 맞는 파일 필터링
  const filteredFiles = driveData.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 새폴더 만들기 처리
  const handleCreateFolder = async (folderName) => {
    if (!folderName) {
      alert("폴더 이름을 입력해주세요.");
      return;
    }
    const rootFolderId = currentPath.length > 0 ? currentPath[currentPath.length - 1] : null;

    console.log("rootFolderId 확인:", rootFolderId); // rootFolderId 값 디버깅

    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    const userId = user.userid;
    const driveId = 1;

    // 폴더 생성 요청에 필요한 데이터 준비
    console.log("보낼거1", userId, folderName, driveId, rootFolderId); // 확인용 로그

    // 서버에 폴더 생성 요청
    try {
      const response = await createFolder(folderName, driveId, rootFolderId); // 서버 API 호출 (폴더 데이터 전달)

      // 서버 응답 확인
      if (response.status === 200) {
        console.log("폴더 생성 성공:", response);
        // 폴더 생성 성공 후 로컬 상태와 UI 업데이트
        setDriveData((prevData) => [
          ...prevData,
          {
            id: response.data.folderId,
            name: folderName,
            size: "0MB", // 기본 크기 설정
            modified: new Date().toISOString().split("T")[0],
            created: new Date().toISOString().split("T")[0],
            type: "folder", // 폴더 유형을 지정
            files: [], // 폴더 내부 파일 목록
          },
        ]);

        // 폴더 생성 성공 알림
        alert(`새 폴더 '${folderName}'가 생성되었습니다.`);
      } else {
        throw new Error("폴더 생성에 실패했습니다aa.");
      }
    } catch (error) {
      console.error("폴더 생성 실패:", error);
      alert("폴더 생성에 실패했습니다.");
    }
  };

  // 파일 이름 변경 처리 함수
  const renameFile = () => {
    if (selectedFiles.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    const newName = prompt("새로운 파일 이름을 입력하세요:");

    if (!newName) {
      alert("파일 이름을 입력하지 않았습니다.");
      return;
    }

    // 선택된 파일들의 이름을 변경
    const updatedFiles = driveData.map((file) =>
      selectedFiles.includes(file.id)
        ? { ...file, name: newName } // 선택된 파일의 이름 변경
        : file
    );

    setDriveData(updatedFiles);
  };

  return (
    <div className="file-content">
      <h3 style={{ fontSize: "20px", margin: "10px" }}>내 드라이브</h3>
      {/* 경고 메시지 */}
      {showWarning && (
        <div className="warning-message">
          <p>사용량이 60% 이상입니다! 파일 업로드를 조심하세요.</p>
          <button onClick={toggleWarning}>
            {warningEnabled ? "경고 끄기" : "경고 켜기"}
          </button>
        </div>
      )}
      {/* 상단 용량 표시 */}
      <div className="storage-info">
        <h2>
          <span className="total-usage">{currentUsage.toFixed(2)}MB</span>
          <span className="current-usage"> / {maxUsage}MB 사용 중</span>
        </h2>
        <div className="storage-bar">
          <div
            className="storage-progress"
            style={{
              // 용량 비율에 따른 너비 설정
              width: `${Math.min((currentUsage / maxUsage) * 100, 100)}%`,
              backgroundColor:
                currentUsage / maxUsage < 0.7
                  ? "green"
                  : currentUsage / maxUsage < 0.9
                    ? "orange"
                    : "red",
              transition: "width 1s ease-out", // 애니메이션 효과 추가
            }}
          ></div>
        </div>
      </div>

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
                  value="create"
                  name="create-folder"
                  onClick={() => {
                    const folderName = prompt("새 폴더 이름을 입력하세요.");
                    if (folderName) {
                      handleCreateFolder(folderName);
                    }
                  }}
                >
                  새폴더
                </button>
                <button
                  value="download"
                  name="file-download"
                  onClick={handleDownload}
                >
                  다운로드
                </button>
                <button value="rename" name="file-rename" onClick={renameFile}>
                  이름변경
                </button>
                <button>공유하기</button>
                <button>이동하기</button>
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

      {/* 드래그 앤 드롭 */}
      <div
        className={`drag-drop-zone ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()} // 클릭 시 파일 선택
      >
        {isDragging ? (
          <p>여기에 파일을 놓으세요!</p>
        ) : (
          <p>파일을 드래그하거나 클릭하여 업로드하세요.</p>
        )}

        {/* 클릭 시 파일 선택을 위한 hidden input */}
        <input
          id="file-input"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => uploadFiles(Array.from(e.target.files))}
        />
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
                <tr key={file.id}
                  onClick={() => file.type === "folder" && handleFolderClick(file.folderId)}>
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
                  <td>{file.modified}{file.updatedAt}</td>
                  <td>{file.created}{file.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  폴더가 비어 있습니다.
                </td>
              </tr>
            )}
            <button onClick={handleBackClick}>뒤로 가기</button>
          </tbody>
        </table>
      </div>
    </div>
  );
}
