import { useEffect, useState } from "react";
import { getArticlesByUser } from "../../../api/board/boardAPI";
import { useSelector } from "react-redux";

export default function ImportantBoard() {
    const userId = useSelector((state) => state.userSlice.userid); // Redux에서 userId 가져오기
    const [articles, setArticles] = useState([]); // 게시글 상태

    useEffect(() => {
        if (!userId) return; // userId가 없으면 API 호출 중단
        const fetchUserArticles = async () => {
            try {
                const fetchedArticles = await getArticlesByUser(userId);
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Error fetching user articles:", error.message);
            }
        };
        fetchUserArticles();
    }, [userId]);

    // 중요 게시글 필터링
    const importantArticles = articles.filter((article) => article.isImportant === true);

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
                                            <a style={{ cursor: "pointer" }}>2</a>
                                        </em>
                                    </p>
                                    <div className="board_name_box">
                                        <span className="board_name_text">{article.boardName}</span>
                                        <em className="icon_board">
                                            <span className="blind">일반_게시판</span>
                                        </em>
                                    </div>
                                    <p className="date">
                                        {`${new Date(article.createdAt).toLocaleDateString("ko-KR")} ${new Date(
                                            article.createdAt
                                        ).toLocaleTimeString("ko-KR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hourCycle: "h23",
                                        })}`}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <li>중요 표시된 게시글이 없습니다.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
