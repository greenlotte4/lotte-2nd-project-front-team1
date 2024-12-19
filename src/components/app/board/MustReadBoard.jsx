import { useEffect, useState } from "react";
import { getMustReadArticles } from "../../../api/board/boardAPI";

export default function MustReadBoard(){
    const [mustReadArticles, setMustReadArticles] = useState([]); // 필독 게시글 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [isOptionBoxVisible, setIsOptionBoxVisible] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 변경
    };

    const [totalPages, setTotalPages] = useState(0); 
    const handlePageSizeChange = (size) => {
        setPageSize(size); // 선택된 페이지 크기 설정
        setCurrentPage(0); // 첫 페이지로 초기화
        setIsOptionBoxVisible(false); // 옵션 박스 닫기
    };

    const toggleOptionBox = () => {
        setIsOptionBoxVisible((prev) => !prev);
    };

    const fetchMustReadArticles = async () => {
        try {
          setLoading(true); // 로딩 상태 활성화
          const data = await getMustReadArticles(currentPage, pageSize); // API 호출 (page, size 전달)
          setMustReadArticles(data.content); // 게시글 데이터
          setTotalPages(data.totalPages); // 총 페이지 수 업데이트
        } catch (error) {
          console.error("필독 게시글 데이터 로드 오류:", error.message);
        } finally {
          setLoading(false); // 로딩 상태 비활성화
        }
      };
    
      // currentPage 또는 pageSize가 변경될 때 데이터 다시 로드
      useEffect(() => {
        fetchMustReadArticles();
      }, [currentPage, pageSize]);
    
      if (loading) {
        return <div>로딩 중...</div>; // 로딩 중 메시지
      }
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
            <div id="articleList">
                <div className="cont_head desc_type notice_type">
                    <div className="info_area">
                        <h2 className="board_title">
                            <span className="text">필독</span> 
                        </h2>
                        <p className="desc">
                            필독으로 설정된 게시글 목록을 제공합니다.
                        </p>
                        
                    </div>
                    <div className="task_area">
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
                <div className="board_list">
                <ul className="list notice_type default">
            {mustReadArticles.length > 0 ? (
              mustReadArticles.map((article) => (
                <li key={article.id} className="read has_photo" style={{ cursor: "pointer" }}>
                 
                  <div className="sbj_box">
                    <p className="sbj">
                      <a href={`/article/view/${article.id}`}>{article.title}</a>
                    </p>
                  </div>
                  <p className="infor">
                    <button type="button" className="user">{article.author}</button>
                  </p>
                  <div className="board_name_box">
                    <span className="board_name_text">{article.boardName}</span>
                    <em className="icon_board">
                      <span className="blind">일반_게시판</span>
                    </em>
                  </div>
                  <p className="date">
                    {new Date(article.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                    </p>
                </li>
              ))
            ) : (
              <li>필독으로 설정된 게시글이 없습니다.</li>
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