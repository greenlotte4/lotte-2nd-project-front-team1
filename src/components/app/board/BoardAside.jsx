import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBoards, addFavoriteBoard, getFavoriteBoards, createBoard, updateBoard, deleteBoard} from "../../../api/board/boardAPI"; 
import { useSelector } from "react-redux";
import { Modal, Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [newBoardName, setNewBoardName] = useState(""); // 새로운 게시판 이름 상태 추가
  const [editBoard, setEditBoard] = useState(null); // 수정할 게시판 상태
  const [searchQuery, setSearchQuery] = useState("");

  const userId = useSelector((state) => state.userSlice.userid);
  const handleBoardClick = (boardId) => {
    navigate(`/app/board/${boardId}`); // 동적으로 생성된 경로로 이동
};

  // 모달 열기/닫기 핸들러
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewBoardName("");
    setEditBoard(null); // 수정 상태 초기화
  };

  // 새로운 게시판 생성 핸들러
   // 게시판 생성 및 수정 핸들러
   const handleSaveBoard = async () => {
    if (!newBoardName.trim()) {
      alert("게시판 이름을 입력해주세요.");
      return;
    }
  
    try {
      if (editBoard) {
        // 수정 API 호출
        const boardId = editBoard.boardId; // 수정할 게시판 ID
        const boardDTO = {
          boardName: newBoardName,
          maxCollaborators: editBoard.maxCollaborators || 10,
        };
  
        console.log("게시판 수정 요청:", boardId, boardDTO);
        const updatedBoard = await updateBoard(boardId, boardDTO, userId);

        setBoards((prevBoards) =>
          prevBoards.map((board) =>
            board.boardId === boardId ? { ...board, ...updatedBoard } : board
          )
        );
        console.log("수정된 게시판:", updatedBoard);
      } else {
        // 새 게시판 생성
        const boardDTO = {
          boardName: newBoardName,
          maxCollaborators: 10, // 기본값 설정
        };
  
        console.log("새 게시판 생성 요청:", boardDTO);
        const createdBoard = await createBoard(boardDTO, userId);
        console.log("생성된 게시판:", createdBoard);
      }
  
      alert("저장 성공!");
    } catch (error) {
      console.error("저장 중 오류 발생:", error.message);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setNewBoardName(""); // 입력 필드 초기화
      setEditBoard(null);  // 편집 모드 해제
      handleCloseModal();  // 모달 닫기
    }
  };
  const handleEditBoard = (board) => {
    setEditBoard(board);
    setNewBoardName(board.boardName);
    setIsModalOpen(true);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      console.log("Deleting Board with ID:", boardId);
  
      await deleteBoard(boardId, userId); // DELETE API 호출
      alert("게시판이 삭제되었습니다.");
  
      // 상태 업데이트
      setBoards((prevBoards) => prevBoards.filter((board) => board.boardId !== boardId));
    } catch (error) {
      console.error("Error while deleting board:", error.message);
      alert("게시판 삭제에 실패했습니다. 다시 시도해주세요.");
    }
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
        const favoriteMap = new Map();
    
        (favoriteData || []).forEach((board) => {
          if (board && board.boardId) {
            favoriteMap.set(board.boardId, board.favorite ? 1 : 0);
          }
        });
    
        setFavoriteBoards(favoriteMap);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // 검색어를 소문자로 변환
  };

  const filteredFavoriteBoards = boards.filter(
    (board) =>
      favoriteBoards.get(board.boardId) === 1 && // 즐겨찾기에 포함된 게시판만
      board.boardName?.toLowerCase().includes(searchQuery) // 검색어와 일치
  );

  const filteredBoards = boards.filter(
    (board) => board.boardName?.toLowerCase().includes(searchQuery) // 안전한 호출
  );
  console.log("Boards Data:", boards);

  console.log("Filtered Boards:", filteredBoards);
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
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="board_button_cancel"
              style={{ display: "none" }}
            >
              <span className="blind">취소</span>
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
    <ul className="lnb_tree">
  {filteredFavoriteBoards.map((board) => (
    <li key={board.boardId} className="board">
      <div className="menu_item">
        <button
          type="button"
          title={board.boardName}
          className="item_txt"
          onClick={() => handleBoardClick(board.boardId)}
        >
          <span className="text">{board.boardName}</span>
        </button>
        <input
          id={`${board.boardId}`}
          type="checkbox"
          name={`${board.boardName}`}
          className="input_fav"
          checked={favoriteBoards.get(board.boardId) === 1}
          onChange={() => onFavoriteToggle(board.boardId)}
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
              <button
                type="button"
                className="btn_manage"
                onClick={handleOpenModal}
              >
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
  {filteredBoards.map((board) => (
    <li key={board.boardId} className="board">
      <div className="menu_item">
        <button
          type="button"
          title={board.boardName}
          className="item_txt"
          onClick={() => handleBoardClick(board.boardId)}
        >
          <span className="text">{board.boardName}</span>
        </button>
        <input
          id={`${board.boardId}`}
          type="checkbox"
          name={`${board.boardName}`}
          className="input_fav"
          checked={favoriteBoards.get(board.boardId) === 1}
          onChange={() => onFavoriteToggle(board.boardId)}
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
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2" mb={2}>
                게시판 관리
              </Typography>

              {/* 게시판 리스트 */}
              <List>
                {boards.map((board) => (
                  <ListItem
                    key={board.boardId}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText primary={board.boardName} />
                    <Box>
                      <IconButton
                        onClick={() => handleEditBoard(board)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteBoard(board.boardId)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
                <Divider />
              </List>

              {/* 신규 생성 버튼 및 입력 필드 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <TextField
                  label="게시판 이름"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveBoard}
                >
                  {editBoard ? "수정" : "생성"}
                </Button>
              </Box>
            </Box>
          </Modal>
      </aside>
    </div>
    )
  );
};

export default BoardAside;