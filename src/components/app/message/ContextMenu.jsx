import { useEffect } from "react";

export default function ContextMenu({ contextMenu, deleteMessageHandle, editMessageHandle, closeContextMenu }) {
  useEffect(() => {

    if (contextMenu.visible) {
      // 스타일을 동적으로 업데이트
      document.documentElement.style.setProperty('--menu-left', `${contextMenu.x}px`);
      document.documentElement.style.setProperty('--menu-top', `${contextMenu.y}px`);
    }
  }, [contextMenu]);

  return (
    <div
      className={`contextMenu ${contextMenu.visible ? 'visible' : ''}`}
      onClick={closeContextMenu}
    >
      <ul>
        <li onClick={editMessageHandle}>편집</li>
        <li onClick={deleteMessageHandle}>삭제</li>
      </ul>
    </div>
  );
}
