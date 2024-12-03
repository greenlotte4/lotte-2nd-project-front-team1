import React, { useState, useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import DragDrop from "editorjs-drag-drop"; // DragDrop 플러그인
import Image from "@editorjs/image"; // Image 툴

export default function Page() {
  const editorRef = useRef(null); // Editor.js 인스턴스 저장
  const [title, setTitle] = useState("");
  const [isEditorInitialized, setIsEditorInitialized] = useState(false); // 에디터 초기화 상태

  const initializeEditor = () => {
    if (!isEditorInitialized) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        placeholder: "글을 작성하거나 AI를 사용하려면 '스페이스' 키를, 명령어를 사용하려면 '/' 키를 누르세요.",
        autofocus: true,
        tools: {
          header: Header,
          paragraph: Paragraph,
          image: Image, // 이미지 툴 추가
        },
        // DragDrop 플러그인 추가
        onReady: () => {
          new DragDrop(editorRef.current); // DragDrop 초기화
          setIsEditorInitialized(true); // 에디터 초기화 상태 변경
        },
      });
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        style={styles.titleInput}
        placeholder="새페이지"
      />
      <div
        id="editorjs"
        style={styles.editor}
        onClick={initializeEditor} // 에디터 클릭 시 초기화
      ></div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // 상단 정렬로 변경
    alignItems: "center",
    height: "100vh",
    padding: "20px",
    fontFamily: "'Noto Sans KR', sans-serif",
    margin: "0 auto",
    position: "relative", // 컨테이너에 상대적 위치 설정
  },
  titleInput: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: "10px",
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%", // 제목이 화면 크기에 맞게 확장됨
    maxWidth: "700px",
    zIndex: "100", // 다른 요소들보다 위에 표시
    whiteSpace: "nowrap", // 텍스트가 한 줄로 유지
    overflow: "hidden", // 넘치는 부분을 숨김
    textOverflow: "ellipsis", // 텍스트가 넘칠 경우 생략 부호(...) 표시
    top: "10px", // 제목을 더 위로 이동
  },
  editor: {
    width: "700px",
    minHeight: "700px",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    marginTop: "10px", // 에디터를 더 위로 이동
    marginRight: "50px",
  },
};
