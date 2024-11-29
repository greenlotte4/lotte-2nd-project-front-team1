import { Link } from "react-router-dom";

/*
    날짜 : 2024/11/29
    이름 : 원기연
    내용 : 보드 어사이드

    추가내역
    -------------
    00.00 이름 - 내용
*/
export default function BoardAside(){
    return(
    <div id="sidebar-container">
        <aside className="sidebar">
          <div className="main_pane">
              <div className="core_button">
              <button
                type="button"
                className="write_button"
                onClick={() => window.location.href = "https://hubflow.vercel.app/app/noticeboard"}
                >
                <strong>글쓰기</strong>
                </button>
              </div>
              <div className="boardtop_menu">
                  <button type="button" className="recent">
                      <strong className="count">0</strong>
                      <span>최신글</span>
                  </button>
                  <button type="button" className="must">
                      <span>필독</span>
                  </button>
                  <button type="button" className="important_post">
                      <span>중요</span>
                  </button>
                  <button type="button" className="mypost">
                      <span>내 게시물</span>
                  </button>
              </div>
          </div>

          <div className="board_lnb_search">
              <div className="board_search_bar">
                  <label htmlFor="board_lnb_search" className="blind">검색어</label>
                  <input id="board_lnb_search" type="search" autoComplete="off" placeholder="게시판 이름으로 검색" className="board_search_input"/>
                  <button type="button" className="board_button_cancel" style={{display: "none"}}>
                      <span className="blind">취소</span>
                  </button>
                  <button type="button" className="board_button_search">
                      <span className="blind">검색</span>
                  </button>
              </div>
                  <button type="button" className="board_button_search_close" style={{display: "none"}}>
                      <span className="blind">종료</span>
                  </button>
          </div>
          <div className="board_menu_cover" >
              <div className="board_menu_box">
                  <ul className="lnb_tree">
                      <li className="board">
                          <div className="board_menu_item">
                          <button
                            type="button"
                            title="게시판 메인"
                            className="item_txt icon_main"
                            onClick={() => window.location.href = "https://hubflow.vercel.app/app/mainboard"}
                            >
                            게시판 메인
                            </button>
                          </div>
                      </li>
                  </ul>
              </div>
              <div className="menu_box _groups separator" >
                  <div className="board_head_bar">
                      <button type="button" className="btn_fold">
                          <span className="text">즐겨찾기</span>
                      </button>
                  </div> 
                  <div className="lnb_favorite_empty" >
                      <p className="message">자주 찾는 게시판의 이름 옆 별 아이콘을 클릭하면 즐겨찾기로 추가할 수 있어요.</p>
                  </div> 
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
                              <button type="button" title="그린컴퓨터아카데미" className="btn_fold">
                                  <span className="text">그린컴퓨터아카데미</span> 
                                  <em className="ic_new" style={{display: "none"}}>NEW</em>
                              </button>
                          </div> 
                          <ul className="lnb_tree">
                              <li className="board">
                                  <div className="menu_item">
                                      <button type="button" title="공지사항" className="item_txt">
                                          <span className="text">공지사항</span>
                                      </button> 
                                      <input id="bd_4070000000153153643" type="checkbox" name="chk_fav" className="input_fav"/> 
                                      <label htmlFor="bd_4070000000153153643" className="ico_fav side_btn">즐겨찾기로 등록됨</label> 
                                  </div>
                              </li>
                              <li className="board">
                                  <div className="menu_item">
                                      <button type="button" title="업무 매뉴얼" className="item_txt">
                                          <span className="text">업무 매뉴얼</span> 
                                      </button> 
                                      <input id="bd_4070000000153153644" type="checkbox" name="chk_fav" className="input_fav"/> 
                                      <label htmlFor="bd_4070000000153153644" className="ico_fav side_btn">즐겨찾기</label> 
                                  </div>
                              </li> 
                              <li className="board">
                                  <div className="menu_item">
                                      <button type="button" title="자유게시판" className="item_txt">
                                          <span className="text">자유게시판</span> 
                                      </button> 
                                      <input id="bd_4070000000153153645" type="checkbox" name="chk_fav" className="input_fav"/> 
                                      <label htmlFor="bd_4070000000153153645" className="ico_fav side_btn">즐겨찾기</label> 
                                  </div>
                              </li> 
                          </ul>
                      </li> 
                  </ul>
              </div> 
              <div className="menu_box separator" >
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
          <div id="worksCommonCopyright" className="board_footer" style={{display: "block"}}>
              <Link to="https://hubflow.vercel.app/" target="_blank" className="copyright">
                 메인으로 가기
              </Link>
          </div>
        </aside>
      </div>
    );
}