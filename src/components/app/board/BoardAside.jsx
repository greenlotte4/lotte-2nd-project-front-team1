import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBoards, getUserFavorites, updateFavorite } from "../../../api/board/boardAPI"; 

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
  const [userFavorites, setUserFavorites] = useState(new Set()); // 즐겨찾기 상태 저장

  // 애니메이션 제어
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // 유저의 즐겨찾기 목록을 가져오기
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteBoards = await getUserFavorites(); // 유저의 즐겨찾기 게시물 목록을 가져옵니다.
        const favoriteBoardIds = new Set(favoriteBoards.map(board => board.boardId)); // 즐겨찾기한 게시물 ID를 Set에 저장
        setUserFavorites(favoriteBoardIds); // 상태 업데이트
      } catch (err) {
        console.error("즐겨찾기 목록을 가져오는 에러:", err);
      }
    };

    fetchFavorites(); // 컴포넌트가 마운트될 때 한 번만 실행
  }, []);

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

  // 즐겨찾기 상태 변경
  const handleFavoriteClick = async (boardId, isFavorite) => {
    try {
      const updatedBoard = await updateFavorite(boardId, !isFavorite); // 반전된 isFavorite 값 서버에 전송
      console.log("Updated Board:", updatedBoard); // 서버에서 반환된 데이터 확인

      // UI에 반영된 즐겨찾기 상태 업데이트
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.boardId === boardId
            ? { ...board, isFavorite: !isFavorite } // 즐겨찾기 상태 반전
            : board
        )
      );

      // 즐겨찾기한 게시물 목록 업데이트
      setUserFavorites((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        if (updatedFavorites.has(boardId)) {
          updatedFavorites.delete(boardId); // 즐겨찾기 제거
        } else {
          updatedFavorites.add(boardId); // 즐겨찾기 추가
        }
        return updatedFavorites;
      });
    } catch (err) {
      console.error("Failed to update favorite:", err);
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
              onClick={() =>
                (window.location.href =
                  "/app/noticeboard")
              }
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
            {boards.some((board) => board.isFavorite) ? (
              // 즐겨찾기된 게시판 출력
              <ul className="lnb_favorite">
                {boards
                  .filter((board) => board.isFavorite) // 즐겨찾기된 항목만 필터링
                  .map((favoriteBoard) => (
                    <li key={favoriteBoard.boardId} className="board">
                      <div className="menu_item">
                        <button
                          type="button"
                          title={favoriteBoard.boardName}
                          className="item_txt"
                          onClick={() =>
                            (window.location.href = "/app/announcementboard")
                          }
                        >
                          <span className="text">{favoriteBoard.boardName}</span>
                        </button>
                        <input
                          id={`fav_${favoriteBoard.boardId}`}
                          type="checkbox"
                          name={`${favoriteBoard.boardName}`}
                          className="input_fav"
                          checked={favoriteBoard.isFavorite}
                          onChange={() =>
                            handleFavoriteClick(favoriteBoard.boardId, favoriteBoard.isFavorite)
                          }
                        />
                        <label
                          htmlFor={`fav_${favoriteBoard.boardId}`}
                          className="ico_fav side_btn"
                        >
                          {favoriteBoard.isFavorite ? "즐겨찾기 등록됨" : "즐겨찾기"}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              // 즐겨찾기가 없을 경우 메시지 출력
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
                        onClick={() =>
                          (window.location.href =
                            " /app/announcementboard")
                        }
                      >
                        <span className="text">{board.boardName}</span>
                      </button>
                      <input
                        id={`${board.boardId}`}
                        type="checkbox"
                        name={`${board.boardName}`}
                        className="input_fav"
                        checked={userFavorites.has(board.boardId)}  // 유저의 즐겨찾기 상태 기반으로 체크박스 상태 결정
                        onChange={() => handleFavoriteClick(board.boardId, userFavorites.has(board.boardId))}  // 즐겨찾기 상태 반전
                      />
                      <label
                        htmlFor={`${board.boardId}`}
                        className={`ico_fav side_btn ${userFavorites.has(board.boardId) ? "favorite" : ""}`}  // isFavorite에 따라 클래스 동적 변경
                      >
                        {userFavorites.has(board.boardId) ? "즐겨찾기 등록됨" : "즐겨찾기"}
                      </label>
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
                  <button type="button" className="item_txt">
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