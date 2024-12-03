export default function MyPostBoard(){
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
                            <input id="chk_all" type="checkbox" name="chk_all"/>
                            <label htmlFor="chk_all">전체 선택</label>
                        </span> 
                        <button type="button" disabled="disabled" className="point" style={{display: "none"}}>
                            <strong>읽음</strong>
                        </button> 
                        <div className="chk_del">
                            <button type="button" disabled="disabled" className="point">
                                <strong>삭제</strong>
                            </button>
                        </div> 
                        <div className="chk_move">
                            <button type="button" disabled="disabled">
                                이동
                                <em className="bu"></em>
                            </button> 
                            <div id="move_option_box" className="option_box" style={{display: "none"}}>
                                <ul></ul> 
                                <p className="btn">
                                <button type="button">
                                    이동
                                </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="h_util">
                        <div className="select_box">
                            <button type="button" className="selected">
                                <strong>20개씩 보기</strong>
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div className="board_list" >
                <ul className="list edit_type newest_type mypost_typle default">
                    <li className="read" style={{cursor: "pointer"}}>
                        <p className="chk">
                            <input id="check_4070000000153172123" type="checkbox" name="chk_bd"/>
                            <label htmlFor="check_4070000000153172123">해당 게시글 선택</label>
                        </p>
                        <div className="sbj_box">
                            <p className="sbj">
                                <a href="">ㅇㅇ</a>
                            </p></div>
                            <p className="infor">
                                <button type="button" className="user">1조</button>
                                <span className="read_chk">읽음<strong>1</strong></span>
                                <em title="댓글갯수" className="comments">
                                    <a style={{cursor: "pointer"}}>2</a>
                                </em>
                            </p>
                            <div className="board_name_box">
                                <span className="board_name_text">공지사항</span>
                                <em className="icon_board">
                                    <span className="blind">일반_게시판</span>
                                </em>
                            </div> 
                            <p className="date">
                             2024. 11. 27. 12:28
                            </p>
                        </li>
                </ul> 
                <p className="bt_more">
                    <button type="button" className="btn" style={{display: "none"}}>
                        글쓰기
                    </button>
                </p>
            </div>
        </div>
        
                    

        </div>
    );
}