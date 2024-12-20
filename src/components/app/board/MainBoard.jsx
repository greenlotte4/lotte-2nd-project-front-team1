import { useEffect, useState } from "react";
import { getMainMustReadArticles, getRecentFreeBoardArticles, getTenRecentArticles } from "../../../api/board/boardAPI";

export default function MainBoard(){

    const [mustReadArticles, setMustReadArticles] = useState([]); // 필독글 상태
    const [articles, setArticles] = useState([]);
    const [freeBoardArticles, setFreeBoardArticles] = useState([]);

    useEffect(() => {
      const fetchMustReadArticles = async () => {
        try {
          const articles = await getMainMustReadArticles(); // API 호출
          setMustReadArticles(articles); // 상태 업데이트
        } catch (error) {
          console.error("Error fetching must-read articles:", error.message);
        }
      };
  
      fetchMustReadArticles();
    }, []);

    useEffect(() => {
        const fetchRecentArticles = async () => {
          try {
            const data = await getTenRecentArticles(); // 최신 글 10개 API 호출
            setArticles(data); // 상태 업데이트
          } catch (error) {
            console.error("Error fetching recent articles:", error.message);
          }
        };
    
        fetchRecentArticles();
      }, []);

      useEffect(() => {
        const fetchFreeBoardArticles = async () => {
          try {
            const articles = await getRecentFreeBoardArticles();
            setFreeBoardArticles(articles); // 상태 업데이트
          } catch (error) {
            console.error("Error fetching freeboard articles:", error.message);
          }
        };
    
        fetchFreeBoardArticles();
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
                  <div className="ly_autoComplete" style={{display: "none"}}>
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
                              <div className="option_box"  style={{ zIndex: 200 }}>
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
          <div className="main_box">
              <div className="home_box notice">
                  <h2 className="tit">필독</h2>
                  <p className="more">
                      <a href="">더보기</a>
                      <em></em>
                  </p>
                  <div className="board_list">
                  <ul className="list preview">
    {/* 가장 최근 필독글 */}
    {mustReadArticles.length > 0 && (
        <li
            key={mustReadArticles[0].id}
            className="read has_photo"
            style={{ cursor: "pointer" }}
        >
            <p className="bd_name">{mustReadArticles[0].boardName}</p>
            <div className="sbj_box">
                <p className="sbj">
                    <a href={`/article/view/${mustReadArticles[0].id}`}>
                        {mustReadArticles[0].title}
                    </a>
                </p>
            </div>
            <p
                className="bd_name"
                dangerouslySetInnerHTML={{ __html: mustReadArticles[0].content }}
            />
            <p className="infor">
                <button type="button" className="user">{mustReadArticles[0].userName}</button>
            </p>
        </li>
    )}

    {/* 나머지 필독글 */}
    <ul className="list default">
        {mustReadArticles.slice(1).map((article) => (
            <li key={article.id} className="read">
                <div className="sbj_box">
                    <p className="sbj">
                        <a href={`/article/view/${article.id}`}>{article.title}</a>
                    </p>
                </div>
                <p className="infor">
                    <span className="bd_name">{article.boardName}</span>
                    <button type="button" className="user">{article.userName}</button>
                    <span className="date">{new Date(article.createdAt).toLocaleDateString("en-CA")}</span>
                </p>
            </li>
        ))}
    </ul>
</ul>
                  </div>
              </div>
              <div className="home_box">
                  <h2 className="tit">최신글</h2> 
                  <p className="more">
                      <a href="">더보기</a>
                      <em></em>
                  </p>
                  <div className="board_list">
                     <ul className="list default recent">
                     {articles.map((article) => (
                      
                      <li key={article.id} className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                              <a href={`/article/view/${article.id}`}>{article.title}</a>
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">{article.boardName}</span> 
                              <button type="button" className="user"> {article.userName}</button> 
                              <span className="date">{new Date(article.createdAt).toLocaleDateString("en-CA")}</span>
                          </p>
                      </li>
                     
                    ))}
                      </ul>
                      
                  </div>
              </div>
              <div className="home_box">
                  <h2 className="tit">자유게시판</h2> 
                  <p className="more">
                      <a href="">더보기</a>
                      <em></em>
                  </p>
                  <div className="board_list">
                  <ul className="list default recent">
                        {freeBoardArticles.map((article) => (
                        <li key={article.id} className="read">
                            <div className="sbj_box">
                            <p className="sbj">
                                <a href={`/article/view/${article.id}`}>{article.title}</a>
                            </p>
                            </div>
                            <p className="infor">
                            <span className="bd_name">{article.boardName}</span>
                            <button type="button" className="user">{article.userName}</button>
                            <span className="date">
                                {new Date(article.createdAt).toLocaleDateString("en-CA")}
                            </span>
                            </p>
                        </li>
                        ))}
                    </ul>
                  </div>
              </div>
              <span className="space"></span>
             

          </div>            
  
          </div>

      );
}