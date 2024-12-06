import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleDetail } from "../../../api/board/boardAPI";

export default function ViewBoard() {
    const { id } = useParams(); // URL에서 게시글 ID 가져옴
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();

    // 게시글 데이터 가져오기
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await ArticleDetail(id); // API 호출
                setArticle(data);
            } catch (error) {
                console.error("게시글 정보를 가져오는 중 오류 발생:", error);
              
               
            }
        };
        fetchArticle();
    }, [id, navigate]);

    // 로딩 상태 처리
    if (!article) {
        return <div>로딩 중...</div>;
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
                                    <ul >
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
            <div id="articleViewer">
                <div className="board_view">
                    <h2 className="tit _board_title">자유게시판</h2>
                    <div className="btn_area _no_print">
                        <p className="wrap_btn">
                            <button type="button" className="list" onClick={() => navigate(-1)}>목록</button>
                            <button type="button" className="prev">
                                <i>이전글</i>
                            </button>
                            <button type="button" className="next">
                                <i>다음글</i>
                            </button>
                        </p>
                    </div>
                    <div className="subject">
                        <div className="txt_cover">
                        <h3 className="txt">{article.title}</h3>
                            <div className="check_cover">
                                <input id="important_post_check" type="checkbox" className="important_post_check"/>
                                <label htmlFor="important_post_check">
                                    <span className="blind">중요 게시글 추가</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="infor">
                        <div className="infor_inner">
                            <span className="name">
                                <button type="button">
                                    {article.userName || "알 수 없음"}
                                </button>
                                <span style={{display: "none"}}></span> 
                                <span style={{display: "none"}}>그린컴퓨터아카데미</span>
                            </span>
                            <span className="date">
                            <em>
                                {new Date(article.createdAt).toLocaleString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }) || "알 수 없음"}
                            </em>
                            </span>
                            <span className="read">
                                <button type="button">
                                읽음 1
                                </button>
                            </span>
                            <span className="edit">편집 허용 : OFF (작성자, 게시판 마스터만 편집 가능)</span>
                        </div>
                        <div className="btn _no_print">
                            <div className="btn_wrap">
                                <button type="button" className="_btn_share">
                                    보내기
                                    <em className="ico"></em>
                                </button>
                            </div>
                            <button id="translateLayerBtn" type="button" className="bt_translate">
                                번역
                            </button>
                            <button type="button" className="print">
                                인쇄
                            </button>
                        </div>
                    </div>
                    <div id="id_contents" className="cont">
                        <div
                            style={{ fontSize: "14px" }}
                            dangerouslySetInnerHTML={{ __html: article.content || "내용 없음" }}
                        />
                    </div>
                    <div className="btn_box _no_print">
                        <button type="button">
                        수정
                        </button> 
                        <button type="button">
                        삭제
                        </button>
                    </div>
                    <div id="id_comments" className="comments">
                        <div className="infor">
                            <div className="reaction_box">
                                <div className="reaction_item">
                                    <button id="_reactionRecentListButton" type="button" className="btn_reaction_item">
                                        <span className="text">리액션</span>
                                    </button>

                                </div>
                                <div className="reaction_item has_reply">
                                    <button type="button" className="btn_reply_item">
                                        <span className="blind">댓글</span>
                                        <span className="text">1</span>
                                        <span className="blind">count</span>
                                    </button>
                                </div>
                            </div>
                            <div className="option">
                                <span className="notification _no_print" >
                                    <em className="title">댓글 알림</em> 
                                    <button type="button" role="switch" className="button_switch" aria-checked="true">
                                        <span className="blind">댓글 알림</span>
                                    </button>
                                </span>
                                <ul className="sort">
                                    <li className="selected">
                                        <button type="button">
                                          등록순
                                        </button>
                                    </li> 
                                    <li className="">
                                        <button type="button">
                                            최신순
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="list_area">
                            <ul className="list_box" style={{display: "none"}}>
                                <li>
                                   <div className="cmt_box">
                                    <div className="user">
                                        <strong className="name">이름</strong>
                                        <span className="date">2024. 12. 1. 14:32</span>
                                        <div className="cmt_task _no_print">
                                            <button type="button" className="btn_more">
                                                <span className="blind">메뉴 더보기</span>
                                            </button> 
                                        </div>
                                    </div>
                                    <p className="cmt_area">
                                        <span className="translateArea">ddd</span>
                                    </p>
                                    <div className="task_area"><button type="button" className="btn_reply _no_print">
                                        답글
                                      </button>
                                    </div>

                                   </div> 
                                </li>

                            </ul>
                            <div className="register_box _no_print">
                                <div className="inp_box">
                                    <div id="commentScrollTarget_1" className="textbox">
                                        <div id="commentInput_17" contentEditable="true" className="comment_input notranslate"></div>
                                        <span className="comment_label">댓글을 입력하세요. (@로 멤버를 멘션할 수 있어요!)</span>
                                    </div>
                                </div>
                                <div className="btn_box">
                                    <div className="attach_btns">
                                        <span className="btn_attach_image">
                                            <label htmlFor="commentImageFile" className="blind"></label>
                                            <input id="commentImageFile" type="file" title="" name="uploadImage" accept="*" multiple="multiple" style={{display: "none"}}/>
        
                                        </span>
                                        <button className="btn_attach_sticker">
                                            <i className="blind"></i>
                                        </button>
                                    </div>
                                    <div className="register_btns">
                                        <button type="button" className="point">
                                         입력
                                        </button>
                                    </div>
                                </div>
                            </div>
                           
                        </div>

                    </div>
                    <div className="btn_area _no_print btm_type">
                        <p className="wrap_btn">
                            <button type="button" className="list" onClick={() => navigate(-1)} >
                            목록
                            </button>
                            <button type="button" className="prev">
                                <i>이전글</i>
                            </button> 
                            <button type="button" className="next">
                                <i>다음글</i>
                            </button>
                        </p> 
                        <button type="button" className="go_top">
                        맨위로
                        </button>
                    </div>

                </div>

            </div>

    
            </div>
    );
}