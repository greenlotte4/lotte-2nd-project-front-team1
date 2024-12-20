import { useEffect, useState } from "react";
import { getArticlesByUser, getImportantArticles } from "../../../api/board/boardAPI";
import { useSelector } from "react-redux";

export default function ImportantBoard() {
    const userId = useSelector((state) => state.userSlice.userid); // Redux에서 userId 가져오기
    const [importantArticles, setImportantArticles] = useState([]); // 중요 게시글 상태
     const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

    const [isOptionBoxVisible, setIsOptionBoxVisible] = useState(false);
    const [pageSize, setPageSize] = useState(10);

     const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 (0부터 시작)

    const toggleOptionBox = () => {
        setIsOptionBoxVisible((prev) => !prev);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 변경
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size); // 선택된 페이지 크기 설정
        setCurrentPage(0); // 첫 페이지로 초기화
        setIsOptionBoxVisible(false); // 옵션 박스 닫기
    };

    useEffect(() => {
        if (!userId) return;
    
        const fetchImportantArticles = async () => {
            try {
                const { content, totalPages } = await getImportantArticles(userId, currentPage, pageSize);
                setImportantArticles(content); // API에서 반환된 게시글 설정
                setTotalPages(totalPages);    // 전체 페이지 수 설정
            } catch (error) {
                console.error("Error fetching important articles:", error.message);
            }
        };
    
        fetchImportantArticles();
    }, [userId, currentPage, pageSize]);


    return (
        <div className="boardContentDiv" id="boardContentDiv">
            <div className="g_search">
                <h2 className="blind">홈 서비스 통합 검색</h2>
                <div className="srch_box">
                    <div className="inp_box">
                        <label htmlFor="basicKeyword" className="blind">
                            <i>검색어</i>
                        </label>
                        <input id="basicKeyword" type="text" autoComplete="off" placeholder="게시글 검색" />
                        <button type="button" className="btn_search">
                            <span className="blind">검색</span>
                        </button>
                        <button type="button" className="board_detail">
                            상세
                        </button>
                    </div>
                </div>
            </div>
            <div id="articleList">
                <div className="cont_head desc_type notice_type">
                    <div className="info_area">
                        <h2 className="board_title">
                            <span className="text">중요</span>
                        </h2>
                        <p className="desc">내가 중요 표시한 게시글 목록입니다.</p>
                    </div>
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
                
                <div className="board_list">
                    <ul className="list notice_type default">
                        {importantArticles.length > 0 ? (
                            importantArticles.map((article) => (
                                <li key={article.id} className="read has_photo" style={{ cursor: "pointer" }}>
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
                                                <a style={{ cursor: "pointer" }}>0</a>
                                            </em>
                                    </p>
                                    <div className="board_name_box">
                                        <span className="board_name_text">{article.boardName}</span>
                                        <em className="icon_board">
                                            <span className="blind">일반_게시판</span>
                                        </em>
                                    </div>
                                    <p className="date">
                                        {`${new Date(article.boardCreatedAt).toLocaleDateString("ko-KR")}`}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <li>중요 표시된 게시글이 없습니다.</li>
                        )}
                    </ul>
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
        </div>
    );
}
