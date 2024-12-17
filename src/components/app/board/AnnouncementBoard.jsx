import { Link, useNavigate, useParams } from "react-router-dom";

import { addFavoriteBoard, getAllBoards, getArticlesByBoard, getBoardArticles, getFavoriteBoards, moveArticlesToBoard, moveBoardToBasket } from "../../../api/board/boardAPI";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function AnnouncementBoard(){
    const { boardId } = useParams();

    const [articles, setArticles] = useState([]); // 게시글 상태
    const [boardName, setBoardName] = useState(""); // 추가된 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [favoriteBoards, setFavoriteBoards] = useState(new Map()); // 즐겨찾기 상태
    const [isMoveBoxVisible, setIsMoveBoxVisible] = useState(false); 
    const [selectedBoard, setSelectedBoard] = useState("");
    const [boards, setBoards] = useState([]);
    const moveBoxRef = useRef(null);

    const userId = useSelector((state) => state.userSlice.userid);
    
    const navigate = useNavigate();

     // 체크박스 선택/해제 핸들러
     const handleCheckboxChange = (articleId) => {
        setSelectedArticles((prevSelected) =>
            prevSelected.includes(articleId)
                ? prevSelected.filter((id) => id !== articleId) // 이미 선택된 경우 제거
                : [...prevSelected, articleId] // 선택되지 않은 경우 추가
        );
    };

    // 전체 선택/해제 핸들러
    const handleSelectAll = () => {
        if (selectedArticles.length === articles.length) {
            setSelectedArticles([]); // 모두 선택되어 있으면 선택 해제
        } else {
            setSelectedArticles(articles.map((article) => article.id)); // 모두 선택
        }
    };

    const handleDelete = async () => {
        console.log("Redux userId:", userId);
    
        if (selectedArticles.length === 0) {
            alert("삭제할 게시글을 선택하세요.");
            return;
        }
    
        if (!window.confirm("선택한 게시글을 삭제하시겠습니까?")) {
            return;
        }
    
        try {
            // 선택된 게시글 삭제
            await Promise.all(
                selectedArticles.map((id) => {
                    console.log("Deleting article:", { articleId: id, userId });
                    return moveBoardToBasket(id, userId);
                })
            );
    
            // 삭제된 게시글을 화면에서 제거
            setArticles((prevArticles) =>
                prevArticles.filter((article) => !selectedArticles.includes(article.id))
            );
            setSelectedArticles([]); // 선택 초기화
            alert("선택한 게시글이 삭제되었습니다.");
        } catch (err) {
            console.error("게시글 삭제 중 오류:", err);
            alert(`게시글 삭제에 실패했습니다. ${err.message}`);
        }
    };
    

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getArticlesByBoard(boardId);
                setArticles(data.articles); // 게시글 설정
                setBoardName(data.boardName); // 게시판 이름 설정
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [boardId]);

    useEffect(() => {
        const fetchFavoriteBoards = async () => {
          if (!userId) return;
          try {
            const favoriteData = await getFavoriteBoards(userId);
            const favoriteMap = new Map();
            favoriteData.forEach((board) => {
                favoriteMap.set(Number(board.boardId), board.favorite ? 1 : 0);
            });
            setFavoriteBoards(favoriteMap);
          } catch (err) {
            console.error("Failed to fetch favorite boards:", err);
          }
        };
    
        fetchFavoriteBoards();
      }, [userId]);
    
      // 즐겨찾기 토글
      const toggleFavorite = async () => {
        if (!userId) {
          console.error("User is not logged in.");
          return;
        }
    
        const boardIdNumber = Number(boardId); // 항상 숫자형으로 변환
    
        // Optimistic UI 업데이트
        setFavoriteBoards((prevFavorites) => {
            const isCurrentlyFavorite = prevFavorites.get(boardIdNumber) === 1; // 현재 상태 확인
            const updatedFavorites = new Map(prevFavorites);
            updatedFavorites.set(boardIdNumber, isCurrentlyFavorite ? 0 : 1); // 상태 반전
            return updatedFavorites;
          });

        try {
    await addFavoriteBoard({
      boardId: boardIdNumber,
      isFavorite: favoriteBoards.get(boardIdNumber) === 0, // API 요청 반영
      userId,
    });
  } catch (err) {
    console.error("Failed to toggle favorite:", err.message || err);

    setFavoriteBoards((prevFavorites) => {
        const isCurrentlyFavorite = prevFavorites.get(boardIdNumber) === 1;
        const updatedFavorites = new Map(prevFavorites);
        updatedFavorites.set(boardIdNumber, isCurrentlyFavorite ? 0 : 1);
        console.log("Updated Favorites (After Toggle):", Array.from(updatedFavorites.entries())); // 상태 확인
        return updatedFavorites;
      });
        }
      };

        const toggleMoveBox = () => {
        setIsMoveBoxVisible((prev) => !prev); // 열기 또는 닫기 상태 전환
        };
useEffect(() => {
    const handleOutsideClick = (event) => {
        // moveBoxRef 내부나, toggleMoveBox 버튼 클릭이면 예외 처리
        if (
            moveBoxRef.current &&
            (moveBoxRef.current.contains(event.target) || event.target.closest(".toggle-move-box-button"))
        ) {
            return; // 아무 동작도 하지 않음
        }

        setIsMoveBoxVisible(false); // 이동 박스 닫기
    };

    if (isMoveBoxVisible) {
        document.addEventListener("mousedown", handleOutsideClick); // 외부 클릭 이벤트 등록
    } else {
        document.removeEventListener("mousedown", handleOutsideClick); // 외부 클릭 이벤트 제거
        setSelectedBoard("");
    }

    return () => {
        document.removeEventListener("mousedown", handleOutsideClick); // 정리(clean-up)
    };
}, [isMoveBoxVisible]);

    const handleBoardSelect = (boardName) => {
         setSelectedBoard(boardName); // 선택된 게시판 설정
     };  

     const handleMoveArticles = async () => {
        if (!selectedBoard) {
            alert("이동할 게시판을 선택하세요.");
            return;
        }
        if (!selectedArticles.length) {
            alert("이동할 게시글을 선택하세요.");
            return;
        }
        if (!window.confirm("선택한 게시글을 이동하시겠습니까?")) {
            return;
        }

        try {
            await moveArticlesToBoard(selectedArticles, selectedBoard); // 이동 API 호출

            setArticles((prevArticles) =>
                prevArticles.filter((article) => !selectedArticles.includes(article.id))
            );
            setSelectedArticles([]);
            setSelectedBoard("");
            const data = await getArticlesByBoard(boardId);
            setArticles(data.articles); // 최신 게시글 목록 설정
            setBoardName(data.boardName); // 게시판 이름 업데이트

            setIsMoveBoxVisible(false); // 이동 박스 닫기

            alert("게시글이 성공적으로 이동되었습니다.");
            
           
        } catch (err) {
            console.error("게시글 이동 중 오류:", err);
            alert("게시글 이동에 실패했습니다.");
        }
    };

    useEffect(() => {
        const fetchBoards = async () => {
          try {
            const data = await getAllBoards (); // /board/all API 호출
            setBoards(data); // 가져온 데이터 저장
          } catch (err) {
            console.error("게시판 데이터를 가져오는 중 오류 발생:", err);
          }
        };
    
        fetchBoards();
      }, []);
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    

    return(
        <div className="boardContentDiv" id="boardContentDiv">
            <div className="g_search">
                <h2 className="blind">홈 서비스 통합 검색</h2>
                <div className="srch_box">
                    <div className="inp_box">
                        <label htmlFor="basicKeyword" className="blind">
                            <i>검색어</i>
                        </label>
                        <input id="basicKeyword" type="text" autoComplete="off" placeholder="게시글 검색"/>
                        <button type="button" className="btn_search">
                            <span className="blind">검색</span>
                        </button>
                        <button type="button" className="board_detail">
                            상세
                        </button>
                    </div>
                    <p className="status_message" style={{display: "none"}}>내 게시글에 자동 저장되었습니다. null</p>
                    <strong className="search_result" style={{display: "none"}}>검색 결과
                        <em className="count">0</em>
                    </strong>
                    <div className="ly_autocomplete" style={{display: "none"}}>
                        <ul style={{display: "none"}}>
                            <li style={{display: "none"}}>
                                <span className="empty">검색어 저장 기능이 꺼져있습니다.</span>
                            </li> 
                            <li>
                                <span className="empty">최근 검색어가 없습니다.</span>
                            </li>
                        </ul> 
                        <div className="save_keyword">
                            <button type="button" className="reset" style={{display: "none"}}>
                            전체 삭제
                            </button> 
                            <button type="button">
                            검색어저장 끄기
                            </button> 
                            <button type="button" style={{display: "none"}}>
                            검색어저장 켜기
                            </button>
                        </div>
                    </div>
                </div>
                <div className="srch_detail">
                    <h3 className="blind"></h3>
                    <div className="fm_keyword">
                        <div className="box_col1">
                            <strong className="tit">게시판</strong>
                            <div className="select_box board">
                                <button type="button" className="selected">
                                    <strong>전체 게시판</strong>
                                </button>
                                <div className="option_box" style={{zindex: 200}}>
                                    <ul>
                                        <li className="">
                                            <button type="button">
                                             전체 게시판
                                            </button>
                                        </li> 
                                        <li className="line"></li>
                                        <li>
                                            <span>그린컴퓨터아카데미</span>
                                        </li> 
                                        <li className="depth">
                                            <button type="button">
                                             공지사항
                                            </button>
                                        </li> 
                                        <li className="depth">
                                            <button type="button">
                                            업무 매뉴얼
                                            </button>
                                        </li>
                                        <li className="depth">
                                            <button type="button">
                                            자유게시판
                                            </button>
                                        </li>
                                        <li className="line"></li> 
                                        <li className="">
                                            <button type="button">
                                            휴지통
                                            </button>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box_col2">
                            <strong className="tit">내용</strong>
                            <div className="select_box show">
                                <button type="button" className="selected">
                                    <strong>전체</strong>
                                </button>
                                <div className="option_box" style={{display: "none"}}>
                                    <ul>
                                        <li>
                                            <button type="button" className="sel"> 전체 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 제목+본문 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 제목 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 본문 </button>
                                        </li>
                                        <li>
                                            <button type="button" className> 첨부 파일 </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <label htmlFor="detailKeyword" className="blind">입력</label>
                            <input id="detailKeyword" type="text" autoComplete="off" className="cont"/>  
                        </div>
                        <span className="break"></span>
                        <div className="box_col1">
                            <strong className="tit">작성자</strong>
                             <div className="has_ly">
                                <label htmlFor="srch_writer" className="blind">입력</label> 
                                <input id="srch_writer" type="text" autoComplete="off"/> 
                                <div className="ly_slct_member" style={{display: "none"}}>
                                    <ul>
                                  
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box_col2 _searchPeriod">
                            <strong className="tit">기간</strong>
                            <div className="select_box">        
                                <button type="button" className="selected">
                                    <strong>직접입력</strong>
                                </button>
                                <div className="option_box" style={{display: "none"}}>
                                    <ul>
                                        <li>
                                            <button type="button" className="">
                                            전체
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            1주
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            1개월
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            3개월
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            6개월
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            1년
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="sel">
                                            직접입력
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                                <label htmlFor="srch_date_start" className="blind">시작 날짜</label>
                                <input id="srch_date_start" type="text" autoComplete="off" className="date-picker-input"/>
                                <span className="dash">-</span>
                                <label htmlFor="srch_date_finish" className="blind">종료 날짜</label>
                                <input id="srch_date_finish" type="text" autoComplete="off" className="date-picker-input">
                                </input>
                        </div>
                    </div>
                    <div className="fm">
                        <p>
                            <input id="chk_attfile" type="checkbox"/>
                            <label htmlFor="chk_attfile">첨부 파일 있음</label>
                        </p>
                        <p>
                            <input id="chk_comment" type="checkbox"/>
                            <label htmlFor="chk_comment">댓글 포함</label>
                        </p>
                        <button type="button" className="submit_detail">
                            검색
                        </button>
                    </div>
                </div>
            </div>
            <div className="articleList">
                <div className="cont_head edit_type">
                    <div className="info_area">
                        <h2 className="board_title">
                            <span className="text">{boardName}</span>
                           <span
                            role="switch"
                            tabIndex="0"
                            className={`toggle_favorite ${
                                favoriteBoards.get(Number(boardId)) === 1 ? "active" : ""
                            }`}
                            aria-checked={favoriteBoards.get(Number(boardId)) === 1}
                            onClick={toggleFavorite}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") toggleFavorite();
                            }}
                            >
                            <span className="blind">
                                {favoriteBoards.get(Number(boardId)) === 1 ? "즐겨찾기 등록됨" : "즐겨찾기"}
                            </span>
                            </span>
                        </h2>
                    </div>
                    <div className="task_area">
                        <div className="btn_box">
                            <span className="chk_board">
                            <input
                            id="chk_all"
                            type="checkbox"
                            name="chk_all"
                            checked={articles.length > 0 && selectedArticles.length === articles.length} // 게시물이 있을 때만 체크 여부 판단
                            onChange={handleSelectAll}
                            disabled={articles.length === 0} // 게시물이 없으면 비활성화
                        />
                                <label htmlFor="chk_all">전체 선택</label>
                            </span>
                           
                            <div className="chk_del">
                                <button type="button" disabled={selectedArticles.length === 0} className="point" onClick={handleDelete}>
                                    <strong>삭제</strong>
                                </button>
                            </div>
                            <div className="chk_move">
                                <button type="button" disabled={selectedArticles.length === 0} onClick={toggleMoveBox}  className="toggle-move-box-button">
                                이동
                                <em className="bu"></em>
                                </button>
                                {isMoveBoxVisible && (
                             <div id="move_option_box" className="Basket_option_box"  ref={moveBoxRef}>
                                <ul>
                                     <li>
                                        <span>그린컴퓨터아카데미</span>
                                    </li>
                                    {boards.map((board) => (
                                        <li
                                        key={board.board_id}
                                        className={`depth ${selectedBoard === board.board_id ? "selected" : ""}`}
                                        onClick={() => handleBoardSelect(board.board_id)}
                                        >
                                        <button type="button">{board.board_name}</button>
                                        </li>
                                    ))}
                                </ul>
                                <p className="btn">
                                    <button type="button" onClick={handleMoveArticles}>
                                    이동
                                    </button>
                                </p>
                            </div>
                        )}
                            </div>
                        </div>
                        <div className="h_util">
                            
                            <div className="select_box" style={{display: "none"}}>
                                <button type="button" className="selected">
                                    <strong>글 등록순</strong>
                                </button> 
                                <div className="option_box" style={{display: "none"}}>
                                    <ul>
                                        <li>
                                            <button type="button" className="sel">
                                            글 등록순
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="">
                                            글/댓글 업데이트순
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="select_box">
                                <button type="button" className="selected">
                                    <strong>전체</strong>
                                </button>
    
                            </div>
                            <div className="select_box">
                                <button type="button" className="selected">
                                    <strong>20개씩 보기</strong>
                                </button>
                                <div className="option_box" style={{display: "none"}}>
                                    <ul>
                                        <li>
                                            <button type="button">
                                                10개씩 보기
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                20개씩 보기
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                30개씩 보기
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                40개씩 보기
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                50개씩 보기
                                            </button>
                                        </li>
                                    </ul>
                                </div>
    
                            </div>
                        </div>
                       
                    </div>
                   
                </div>
                <div className="board_list">
                    <ul className="list edit_type default">
                        {articles.length > 0 ? (
                            articles
                                .filter((article) => article.status !== "trash")
                                .map((article, index) => {
                                    const isLastArticle = index === articles.length - 1; // 마지막 요소인지 확인
                                    return (
                                        <React.Fragment key={article.id}>
                                            <li
                                                className="read has_photo"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => navigate(`/article/view/${article.id}`)} // li 클릭 시 이동
                                            >
                                                <p className="chk">
                                                    <input
                                                        id={`check_${article.id}`}
                                                        type="checkbox"
                                                        name="chk_bd"
                                                        checked={selectedArticles.includes(article.id)}
                                                        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 차단
                                                        onChange={() => handleCheckboxChange(article.id)} // 상태 변경
                                                    />
                                                    <label
                                                        htmlFor={`check_${article.id}`}
                                                        onClick={(e) => e.stopPropagation()} // label 클릭 시 부모 이벤트 방지
                                                    >
                                                        해당 게시글 선택
                                                    </label>
                                                </p>
                                                <div className="sbj_box">
                                                    <p className="sbj">
                                                    <em className="ic_announcement">공지</em>
                                                    {article.mustRead && ( // 필독이 true일 때만 표시
                                                        <em className="ic_noti">필독</em>
                                                    )}
                                                        <Link
                                                            to={`/article/view/${article.id}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {article.title}
                                                        </Link>
                                                    </p>
                                                </div>
                                                <p className="infor">
                                                    <button type="button" className="user">
                                                        {article.userName || "Unknown User"}
                                                    </button>
                                                </p>
                                                <p className="date">
                                                    {new Date(article.createdAt).toLocaleDateString("en-CA")}
                                                </p>
                                            </li>

                                            {/* 마지막 게시글 이후에 추가 */}
                                            {isLastArticle && (
                                                <p className="bt_more">
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() =>
                                                            navigate("/app/noticeboard", {
                                                                state: { boardId, boardName },
                                                            })
                                                        }
                                                    >
                                                        글쓰기
                                                    </button>
                                                </p>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                        ) : (
                            <li className="empty">
                                <div className="desc">
                                    <p><strong>등록된 게시글이 없습니다.</strong></p>
                                    <p>게시판에 공유할 글을 남겨보세요.</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() =>
                                        navigate("/app/noticeboard", { state: { boardId, boardName } })
                                    }
                                >
                                    글쓰기
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

            </div>       
    
            </div>
           
    );
}