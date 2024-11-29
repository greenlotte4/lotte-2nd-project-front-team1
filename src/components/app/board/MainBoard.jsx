export default function MainBoard(){
    return(
    <main className="main-content">
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
                          <li className="read has_photo" style={{cursor: "pointer"}}>
                              <p className="photo" style={{cursor: "pointer"}}>
                                  <img src="https://static.worksmobile.net/static/pwe/wm/home/img_basic_post_thum_680x384_210817.png" width="100px" height="100px"/>
                              </p>
                              <p className="bd_name">
                                  공지사항
                              </p> 
                              <div className="sbj_box">
                                  <p className="sbj">
                                      <a href="/main/article/4070000000153153646">업무 효율을 200%로 만드는 게시판 활용법</a>
                                  </p>
                              </div>
                              <p className="cont">
                                  게시판으로 업무 효율을 높여보세요. 업무 시 발생하는 문제를 게시판에서 빠르고 정확하게 해결할 수 있고, 개인의 업무 노하우를 모아 회사의 경쟁력을 높일 수 있습니다. 01최신 사규를 전파하고 싶을 때, 사내 정보 게시판 흩어져있는 사내 정보를 게시판에 모아보세요. 담당자는 사내 문의에 대응하는 시간을 줄일 수 있고, 항상 최신 정보를 전달할 수 있습니다. 02시행 착오를 줄이고 싶을 때, 업무 매뉴얼 게시판 업무 프로세스를 게시판에 남겨보세요. 사진, 파일, 동영상 등 자료를 첨부할 수 있어 정확하고 자세하게 작성할 수 있습니다. 03담당자를 모를 때, 업무 문의 게시판 다른 팀의 도움이 필요할 때 문의 사항을 남겨보세요. 담당자를 찾는 수고가 줄어들고, 업무 히스토리를 확인하기도 쉽습니다. 04팀 내부의 정보를 쌓고 싶을 때, 업무 일지 게시판 팀에서 활용 중인 정보, 보고 자료를 공유해보세요. 팀 내 업무 자료를 한 곳에서 확인할 수 있어 정보를 빠르게 탐색할 수 있습니다. 게시판을 시작해보세요! 우리 회사/단체에 맞는 게시판을 만들거나, 다양한 활용사례를 확인해보세요. 게시판 만들기 (관리자 전용) 활용사례 보기
                              </p> 
                              <p className="infor">
                                  <button type="button" className="user">Board</button> <span className="date">2024. 11. 27.</span> 
                                  <span className="read_chk">읽음
                                      <strong>1</strong>
                                  </span>
                              </p>
                          </li>
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
                      
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
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
                      
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
                      <li className="read has_photo" style={{cursor: "pointer"}}>
                          <div className="sbj_box">
                              <p className="sbj">
                                  <a href="">ㅊㅋㅌ</a> 
                              </p>
                          </div>
                          <p className="infor">
                              <span className="bd_name">공지사항</span> 
                              <button type="button" className="user">작성자</button> 
                              <span className="date">2024. 11. 27.</span>
                          </p>
                      </li>
                     </ul>
                  </div>
              </div>
             

          </div>            
  
          </div>

      </main>
      );
}