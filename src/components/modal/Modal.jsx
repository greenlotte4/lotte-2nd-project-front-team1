import PropTypes from "prop-types";
import "../../styles/app/modal/Modal.scss"; // 스타일은 아래 참고

export default function Modal({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <div className={`modal-overlay ${className}`}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
      >
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </header>
        <main className="modal-body">{children}</main>
        <footer className="modal-footer">
          <button className="modal-footer-btn cancel-btn" onClick={onClose}>
            닫기
          </button>
        </footer>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 모달 열림 상태
  onClose: PropTypes.func.isRequired, // 모달 닫기 핸들러
  title: PropTypes.string, // 모달 제목
  children: PropTypes.node, // 모달 콘텐츠
  className: PropTypes.string, // 추가적인 클래스
};
