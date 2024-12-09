import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBoards, addFavoriteBoard, getFavoriteBoards} from "../../../api/board/boardAPI"; 
import { useSelector } from "react-redux";

/*
    날짜 : 2024/11/29
    이름 : 원기연
    내용 : 보드 어사이드

    추가내역
    -------------
    00.00 이름 - 내용
*/

const BoardAside = ({ isVisible }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [boards, setBoards] = useState([]);
  const [favoriteBoards, setFavoriteBoards] = useState(new Map());
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userSlice.userid);
  const handleBoardClick = (boardId) => {
    navigate(`/app/board/${boardId}`); // 동적으로 생성된 경로로 이동
};

  


  // 애니메이션 제어
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);


  // 게시물 목록 가져오기
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getBoards(); // 게시물 목록 가져오기
        setBoards(data); // 상태 업데이트
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      }
    };

    fetchArticles(); // 컴포넌트가 처음 렌더링될 때 호출
  }, []);

  useEffect(() => {
    const fetchFavoriteBoards = async () => {
      if (!userId) return;
  
      try {
        const favoriteData = await getFavoriteBoards(userId);
        console.log("API Response:", favoriteData);
  
        // `favorite` 값을 `1` 또는 `0`으로 변환하여 `Map`에 저장
        const favoriteMap = new Map();
        favoriteData.forEach((board) => {
          favoriteMap.set(board.boardId, board.favorite ? 1 : 0);
        });
  
        setFavoriteBoards(favoriteMap);
        console.log("즐겨찾기 맵:", Array.from(favoriteMap.entries())); // 확인 로그
      } catch (err) {
        console.error("Failed to fetch favorite boards:", err);
      }
    };
  
    fetchFavoriteBoards();
  }, [userId]);

  const onFavoriteToggle = async (boardId) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }
  
    const isFavorite = favoriteBoards.get(boardId) === 1;
  
    // Optimistic UI 업데이트
    setFavoriteBoards((prevFavorites) => {
      const updatedFavorites = new Map(prevFavorites);
      updatedFavorites.set(boardId, !isFavorite ? 1 : 0);
      return updatedFavorites;
    });
  
    try {
      // 서버에 즐겨찾기 상태 토글 요청
      await addFavoriteBoard({
        boardId,
        isFavorite: !isFavorite,
        userId,
      });
    } catch (err) {
      console.error("Failed to toggle favorite:", err.message || err);
  
      // 실패 시 원래 상태로 복원
      setFavoriteBoards((prevFavorites) => {
        const restoredFavorites = new Map(prevFavorites);
        restoredFavorites.set(boardId, isFavorite ? 1 : 0);
        return restoredFavorites;
      });
    }
  };
  return (
    isAnimating &&(
    <div id="sidebar-container">
      <aside className={
        isVisible ? "aside-slide-in sidebar" : "aside-slide-out sidebar"
      }>

        <div className="main_pane">
          <div className="core_button">
            <button
              type="button"
              className="write_button"
              onClick={() => navigate("/app/noticeboard")}
            >
              <strong>글쓰기</strong>
            </button>
          </div>
          <div className="boardtop_menu">
            <button type="button" className="recent"  onClick={() =>
                (window.location.href =
                  "/app/recentboard")
              }>
              <strong className="count">0</strong>
              <span>최신글</span>
            </button>
            <button type="button" className="must" onClick={() =>
                (window.location.href =
                  "/app/mustreadboard")
              }>
              <span>필독</span>
            </button>
            <button type="button" className="important_post"  onClick={() =>
                (window.location.href =
                  "/app/importantboard")
              }>
              <span>중요</span>
            </button>
            <button type="button" className="mypost" onClick={() =>
                (window.location.href =
                  "/app/mypostboard")
              }>
              <span>내 게시물</span>
            </button>
          </div>
        </div>

        <div className="board_lnb_search">
          <div className="board_search_bar">
            <label htmlFor="board_lnb_search" className="blind">
              검색어
            </label>
            <input
              id="board_lnb_search"
              type="search"
              autoComplete="off"
              placeholder="게시판 이름으로 검색"
              className="board_search_input"
            />
            <button
              type="button"
              className="board_button_cancel"
              style={{ display: "none" }}
            >
              <span className="blind">취소</span>
            </button>
            <button type="button" className="board_button_search">
              <span className="blind">검색</span>
            </button>
          </div>
          <button
            type="button"
            className="board_button_search_close"
            style={{ display: "none" }}
          >
            <span className="blind">종료</span>
          </button>
        </div>
        <div className="board_menu_cover">
          <div className="board_menu_box">
            <ul className="lnb_tree">
              <li className="board">
                <div className="board_menu_item">
                  <button
                    type="button"
                    title="게시판 메인"
                    className="item_txt icon_main"
                    onClick={() =>
                      (window.location.href =
                        "/app/mainboard")
                    }
                  >
                    게시판 메인
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div className="menu_box _groups separator">
  <div className="board_head_bar">
    <button type="button" className="btn_fold">
      <span className="text">즐겨찾기</span>
    </button>
  </div>

  {boards.length > 0 &&
  favoriteBoards.size > 0 &&
  boards.some((board) => favoriteBoards.get(Number(board.boardId)) === 1) ? (
    <ul className="lnb_favorite">
      {boards
        .filter((board) => favoriteBoards.get(Number(board.boardId)) === 1)
        .map((favoriteBoard) => (
          <li key={favoriteBoard.boardId} className="board">
            <div className="menu_item">
              <button
                type="button"
                title={favoriteBoard.boardName}
                className="item_txt"
                onClick={() => handleBoardClick(favoriteBoard.boardId)}
              >
                <span className="text">{favoriteBoard.boardName}</span>
              </button>
              <input
                id={`fav_${favoriteBoard.boardId}`}
                type="checkbox"
                name={`${favoriteBoard.boardName}`}
                className="input_fav"
                checked={favoriteBoards.get(Number(favoriteBoard.boardId)) === 1}
                onChange={() => onFavoriteToggle(favoriteBoard.boardId)}
              />
              <label
                htmlFor={`fav_${favoriteBoard.boardId}`}
                className="ico_fav side_btn"
              >
                {favoriteBoards.get(Number(favoriteBoard.boardId)) === 1
                  ? "즐겨찾기 등록됨"
                  : "즐겨찾기"}
              </label>
            </div>
          </li>
        ))}
    </ul>
  ) : (
    <div className="lnb_favorite_empty">
      <p className="message">
        자주 찾는 게시판의 이름 옆 별 아이콘을 클릭하면 즐겨찾기로 추가할 수 있어요.
      </p>
    </div>
  )}
</div>
          <div className="menu_box separator">
            <div className="board_head_bar">
              <button type="button" title="전체 게시판" className="btn_fold">
                <span className="text">전체 게시판</span>
              </button>
              <button type="button" className="btn_manage">
                관리
              </button>
            </div>

            <ul className="lnb_tree">
              <li className="groups _groups">
                <div className="board_head_bar">
                  <button
                    type="button"
                    title="그린컴퓨터아카데미"
                    className="btn_fold"
                  >
                    <span className="text">그린컴퓨터아카데미</span>
                    <em className="ic_new" style={{ display: "none" }}>
                      NEW
                    </em>
                  </button>
                </div>
                <ul className="lnb_tree">
                {boards.map((board) => (
                  <li key={board.boardId} className="board">
                    <div className="menu_item">
                    <button
                          type="button"
                          title={board.boardName}
                          className="item_txt"
                          onClick={() => handleBoardClick(board.boardId)} // handleBoardClick 호출
                      >
                          <span className="text">{board.boardName}</span>
                      </button>
                      <input
                  id={`${board.boardId}`}
                  type="checkbox"
                  name={`${board.boardName}`}
                  className="input_fav"
                  checked={favoriteBoards.get(board.boardId) === 1} // is_favorite 값이 1일 때 체크
                  onChange={() => onFavoriteToggle(board.boardId)} // 클릭 시 상태 변경
                />
                <label
                  htmlFor={`${board.boardId}`}
                  className={`ico_fav side_btn ${
                    favoriteBoards.get(board.boardId) === 1 ? "active" : ""
                  }`}
                ></label>
                    </div>
                  </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="menu_box separator">
            <ul className="lnb_tree">
              <li>
                <div className="menu_item mbox_trash">
                  <button type="button" className="item_txt" onClick={() =>
                          (window.location.href =
                            " /app/basketboard")
                        }>
                    휴지통
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="worksCommonCopyright"
          className="board_footer"
          style={{ display: "block" }}
        >
          <Link
            to="/app/home"
            target="_blank"
            className="copyright"
          >
            메인으로 가기
          </Link>
        </div>
      </aside>
    </div>
    )
  );
};

export default BoardAside;