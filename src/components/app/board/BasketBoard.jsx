import React, { useEffect, useState } from "react";
import { deleteTrashArticles, getTrashArticles } from "../../../api/board/boardAPI";
import { Link } from "react-router-dom";

export default function BasketBoard(){

    const [selectedArticles, setSelectedArticles] = useState([]); // 선택된 게시글
    const [trashArticles, setTrashArticles] = useState([]); // 휴지통 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchTrashArticles = async () => {
            try {
                const data = await getTrashArticles(); // API 호출
                setTrashArticles(data); // 데이터 상태에 저장
            } catch (err) {
                console.error("휴지통 데이터 가져오기 실패:", err);
                setError(err.message); // 에러 상태 저장
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchTrashArticles();
    }, []);
     // 게시글 체크박스 선택/해제
     const handleCheckboxChange = (id) => {
        setSelectedArticles((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((articleId) => articleId !== id)
                : [...prevSelected, id]
        );
    };

    // 전체 선택/해제
    const handleSelectAll = () => {
        if (selectedArticles.length === trashArticles.length) {
            setSelectedArticles([]); // 모두 선택 해제
        } else {
            setSelectedArticles(trashArticles.map((article) => article.id)); // 모두 선택
        }
    };

    // 선택된 게시글 삭제
    const handlePermanentDelete = async () => {
        if (!window.confirm("선택한 게시글을 영구 삭제하시겠습니까?")) return;
    
        try {
            await deleteTrashArticles(selectedArticles); // API 호출
            setTrashArticles((prevArticles) =>
                prevArticles.filter((article) => !selectedArticles.includes(article.id))
            ); // 삭제된 게시글 제외
            setSelectedArticles([]); // 선택 초기화
            alert("선택한 게시글이 영구 삭제되었습니다.");
        } catch (err) {
            console.error("영구 삭제 중 오류:", err);
            alert("게시글 영구 삭제에 실패했습니다.");
        }
    };

    if (loading) return <p>Loading...</p>; // 로딩 중 표시
    if (error) return <p>Error: {error}</p>; // 에러 표시


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
            <div className="cont_head edit_type desc_type">
                <div className="info_area">
                    <h2 className="board_title">
                        <span className="text">휴지통</span> 
                    </h2>
                    <p className="desc">
                        휴지통 내 게시글은 관리자가 설정한 기간이 지나면 영구 삭제됩니다. (현재 설정 : 30 일)
                    </p>
                    
                </div>
                <div className="task_area">
                    <div className="btn_box">
                        <span className="chk_board">
                            <input id="chk_all" type="checkbox" name="chk_all" checked={
                            selectedArticles.length === trashArticles.length &&
                            trashArticles.length > 0}
                            onChange={handleSelectAll}/>
                            <label htmlFor="chk_all">전체 선택</label>
                        </span> 
                        <button type="button" disabled={selectedArticles.length === 0} className="point" style={{display: "none"}}    onClick={handlePermanentDelete}>
                            <strong>읽음</strong>
                        </button> 
                        <div className="chk_del">
                            <button type="button" disabled={selectedArticles.length === 0} className="point" onClick={handlePermanentDelete}>
                                <strong>영구삭제</strong>
                            </button>
                        </div> 
                        <div className="chk_move">
                            <button type="button" disabled={selectedArticles.length === 0}>
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
           <div className="board_list tb_board">
            <div className="list">
                <table border="1" cellPadding="0" cellSpacing="0">
                    <caption>
                        <i className="blind"></i>
                    </caption>
                    <colgroup>
                        <col className="col_chk"/> 
                        <col className="col_bd_infor"/> 
                        <col className="col_board_name"/> 
                        <col className="col_date_reg"/> 
                        <col className="col_date_del"/> 
                        <col className="col_name"/> 
                        <col className="col_attach"/>
                    </colgroup>

                    <thead>
                        <tr>
                            <th scope="col">&nbsp;</th>
                            <th scope="col" className="th_bd_infor">
                                게시글
                            </th>
                            <th scope="col">게시판명</th>
                            <th scope="col">
                                <button type="button" className="sort selected">
                                등록일
                                <em className="down" ></em>
                                </button>
                            </th>
                            <th scope="col">
                                <button type="button" className="sort">
                                삭제일
                                <em className="down" style={{display: "none"}}></em>
                                </button>
                            </th>
                            <th scope="col">
                                삭제자
                              </th>

                              <th scope="col"><button type="button" className="sort">
                                본문 첨부 파일<em className="down" style={{display: "none"}}></em></button></th>
                        </tr>
                    </thead>
                    <tbody>
                                {trashArticles.length > 0 ? (
                                    trashArticles.map((article) => (
                                        <tr key={article.id} className="read">
                                            <td className="chk">
                                                <input
                                                    id={`check_${article.id}`}
                                                    type="checkbox"
                                                    name="chk_bd"
                                                    checked={selectedArticles.includes(article.id)}
                                                    onChange={() => handleCheckboxChange(article.id)}
                                                />
                                                <label htmlFor={`check_${article.id}`}>
                                                    해당 게시글 선택
                                                </label>
                                            </td>
                                            <td className="bd_infor">
                                                <div className="sbj_box">
                                                    <p className="sbj">
                                                    <Link to={`/article/view/${article.id}`} onClick={(e) => e.stopPropagation()}>
                                                        {article.title || "제목없음"}
                                                    </Link>
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="board_name">
                                                {article.boardName || "알 수 없음"}
                                            </td>
                                            <td className="date">
                                                {new Date(article.createdAt).toLocaleDateString("en-CA")}
                                            </td>
                                            <td className="date">
                                                {new Date(article.trashDate).toLocaleDateString("en-CA")}
                                            </td>
                                            <td className="name">
                                                {article.deletedBy || "알 수 없음"}
                                            </td>
                                            <td className="attach">{article.attachments || 0}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">휴지통에 게시글이 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                </table>

            </div>

           </div>
        </div>
        </div>
    );
    
}