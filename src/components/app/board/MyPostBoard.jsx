import React, { useState, useEffect, useRef } from "react";
import { getAllBoards, getArticlesByBoard, getArticlesByUser, moveArticlesToBoard, moveBoardToBasket } from "../../../api/board/boardAPI";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function MyPostBoard(){

    const { boardId } = useParams();
    const [boardName, setBoardName] = useState(""); // 추가된 상태
    const userId = useSelector((state) => state.userSlice.userid); // Redux에서 userId 가져오기
    const [articles, setArticles] = useState([]); // 게시글 상태
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [boards, setBoards] = useState([]);
    const [isMoveBoxVisible, setIsMoveBoxVisible] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState("");
    const [isOptionBoxVisible, setIsOptionBoxVisible] = useState(false);
    const moveBoxRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [pageSize, setPageSize] = useState(10); // 페이지 크기
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 변경
    };
    const toggleOptionBox = () => {
        setIsOptionBoxVisible((prev) => !prev);
    };
    const handlePageSizeChange = (size) => {
        setPageSize(size); // 선택된 페이지 크기 설정
        setCurrentPage(0); // 첫 페이지로 초기화
        setIsOptionBoxVisible(false); // 옵션 박스 닫기
    };


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

    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                const response = await getArticlesByUser(userId, currentPage, pageSize);
                setArticles(response.articles);
                setCurrentPage(response.currentPage);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error fetching user articles:", error.message);
            }
        };
        fetchUserArticles();
    }, [userId, currentPage, pageSize]);

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
            const data = await getArticlesByUser(userId);
            setArticles(data.articles || data); // 가져온 데이터를 상태에 반영

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
                        <li >
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
        <div id="articleList">
            <div className="cont_head edit_type desc_type">
                <div className="info_area">
                    <h2 className="board_title">
                        <span className="text">내 게시글</span> 
                    </h2>
                    <p className="desc">
                        내가 작성한 게시글 목록입니다.
                    </p>
                    
                </div>
                <div className="task_area">
                    <div className="btn_box">
                        <span className="chk_board">
                            <input id="chk_all" type="checkbox" name="chk_all" checked={articles.length > 0 && selectedArticles.length === articles.length} // 게시물이 있을 때만 체크 여부 판단
                            onChange={handleSelectAll}
                            disabled={articles.length === 0} // 게시물이 없으면 비활성화 
                            />
                            <label htmlFor="chk_all">전체 선택</label>
                        </span> 
                        <button type="button" disabled="disabled" className="point" style={{display: "none"}}>
                            <strong>읽음</strong>
                        </button> 
                        <div className="chk_del">
                            <button type="button"  disabled={selectedArticles.length === 0} className="point" onClick={handleDelete}>
                                <strong>삭제</strong>
                            </button>
                        </div> 
                        <div className="chk_move">
                            <button type="button" disabled={selectedArticles.length === 0} onClick={toggleMoveBox} className="toggle-move-box-button">
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
                    <div className="select_box">
                                <button type="button" className="selected" onClick={toggleOptionBox}>
                                    <strong>{pageSize}개씩 보기</strong> {/* pageSize 상태에 따라 표시 */}
                                </button>
                                <div
                                    className="option_box"
                                    style={{ display: isOptionBoxVisible ? "block" : "none" }} // 상태에 따라 표시 여부 제어
                                >
                                    <ul>
                                        {[10, 20, 30, 40, 50].map((size) => (
                                            <li key={size}>
                                                <button type="button" onClick={() => handlePageSizeChange(size)}>
                                                    {size}개씩 보기
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
    
                            </div>
                        
                    </div>
                </div>
                
            </div>
            <div className="board_list" >
                <ul className="list edit_type newest_type mypost_typle default">
                {articles.length > 0 ? (
                articles.map((article) => (
                    <li key={article.id} className="read" style={{ cursor: "pointer" }}>
                        <p className="chk">
                            <input
                            id={`check_${article.id}`}
                            type="checkbox"
                            name="chk_bd"
                            checked={selectedArticles.includes(article.id)}
                            onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 차단
                            onChange={() => handleCheckboxChange(article.id)} // 상태 변경
                            />
                            <label htmlFor={`check_${article.id}`}>해당 게시글 선택</label>
                        </p>
                        <div className="sbj_box">
                            <p className="sbj">
                            <a href={`/article/view/${article.id}`}>{article.title}</a>
                            </p>
                        </div>
                            <p className="infor">
                                <button type="button" className="user">
                                    {article.userName}
                                </button>
                                
                                <em title="댓글갯수" className="comments">
                                    <a style={{cursor: "pointer"}}>2</a>
                                </em>
                            </p>
                            <div className="board_name_box">
                            <span className="board_name_text">{article.boardName}</span>
                                <em className="icon_board">
                                    <span className="blind">일반_게시판</span>
                                </em>
                            </div> 
                            <p className="date">
                                {`${new Date(article.createdAt).toLocaleDateString("ko-KR")} ${new Date(article.createdAt).toLocaleTimeString("ko-KR", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hourCycle: "h23",
                                })}`}
                            </p>
                        </li>
                         ))
                        ) : (
                          <li>게시글이 없습니다.</li>
                        )}
                </ul> 
                <p className="bt_more">
                    <button type="button" className="btn" style={{display: "none"}}>
                        글쓰기
                    </button>
                </p>
            </div>

            <div className="lw_pagination">
    {/* 첫 페이지 버튼 */}
    <a
        role="button"
        tabIndex="0"
        className={`page_first ${currentPage === 0 ? "disabled" : ""}`}
        style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
        onClick={(e) => {
            if (currentPage === 0) e.preventDefault(); // 첫 페이지일 때 클릭 방지
            else handlePageChange(0);
        }}
    >
        <span className="page_tooltip">첫 페이지</span>
    </a>

    {/* 이전 페이지 버튼 */}
    <a
        role="button"
        tabIndex="0"
        className={`page_prev ${currentPage === 0 ? "disabled" : ""}`}
        style={{ cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
        onClick={(e) => {
            if (currentPage === 0) e.preventDefault(); // 첫 페이지일 때 클릭 방지
            else handlePageChange(currentPage - 1);
        }}
    >
        <span className="page_tooltip">이전 페이지</span>
    </a>

    {/* 페이지 번호 */}
    <span className="page_number">
        {Array.from({ length: totalPages }, (_, index) => (
            <a
                key={index}
                role="button"
                tabIndex="0"
                className={`num ${currentPage === index ? "selected" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handlePageChange(index)}
            >
                {index + 1}
                <span className="blind">{index + 1}번째 목록</span>
            </a>
        ))}
    </span>

    {/* 다음 페이지 버튼 */}
    <a
        role="button"
        tabIndex="0"
        className={`page_next ${currentPage === totalPages - 1 ? "disabled" : ""}`}
        style={{ cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer" }}
        onClick={(e) => {
            if (currentPage === totalPages - 1) e.preventDefault(); // 마지막 페이지일 때 클릭 방지
            else handlePageChange(currentPage + 1);
        }}
    >
        <span className="page_tooltip">다음 페이지</span>
    </a>

    {/* 마지막 페이지 버튼 */}
    <a
        role="button"
        tabIndex="0"
        className={`page_last ${currentPage === totalPages - 1 ? "disabled" : ""}`}
        style={{ cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer" }}
        onClick={(e) => {
            if (currentPage === totalPages - 1) e.preventDefault(); // 마지막 페이지일 때 클릭 방지
            else handlePageChange(totalPages - 1);
        }}
    >
        <span className="page_tooltip">마지막 페이지</span>
    </a>
</div>
        </div>
        
                    

        </div>
    );
}