import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addComment, addReply, ArticleDetail, deleteBoardArticle, getCommentsByArticle, getRepliesByComment, toggleImportantArticle } from "../../../api/board/boardAPI";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ViewBoard() {

    const commentInputRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const { id } = useParams(); // URL에서 게시글 ID 가져옴
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    const userId = useSelector((state) => state.userSlice.userid); // Redux에서 userId 가져오기
    const [translatedText, setTranslatedText] = useState(null);
    const [isTranslateVisible, setIsTranslateVisible] = useState(true);
    const [activeReply, setActiveReply] = useState(null); 

    const [comments, setComments] = useState([]); // 댓글 목록
    const [newComment, setNewComment] = useState(""); // 새 댓글 입력

    const handleReplyClick = (commentId) => {
        setActiveReply(activeReply === commentId ? null : commentId); // 클릭 시 토글
      };
    
    // 답글 상태 관리
    const [replies, setReplies] = useState({});
    const [newReply, setNewReply] = useState(""); // 새 답글 입력 상태

    const toggleTranslateVisibility = () => {
        setIsTranslateVisible((prevState) => !prevState); // 상태 반전
    };

    const [selectedLanguages, setSelectedLanguages] = useState({
        first: "한국어",
        second: "영어",
    });

    // 게시글 데이터 가져오기
    useEffect(() => {
        
        console.log("번역", translatedText);
        const fetchArticle = async () => {
            try {
                const data = await ArticleDetail(id); // API 호출
                const commentData = await getCommentsByArticle(id);
                setArticle(data);
                setComments(commentData); // 댓글 목록 저장
                console.log("Article Data:", data);
            } catch (error) {
                console.error("게시글 정보를 가져오는 중 오류 발생:", error);
              
               
            }
        };
        fetchArticle();
    }, [id,translatedText, navigate], );

    const handleDelete = async () => {
        if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

        try {
            await deleteBoardArticle(id, userId); // 삭제 API 호출
            alert("게시글이 삭제되었습니다.");
            navigate(-1); // 이전 페이지로 이동
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
            alert("게시글 삭제에 실패했습니다.");
        }
    };

    const toggleDropdown = (dropdownId) => {
        setOpenDropdown((prevId) => (prevId === dropdownId ? null : dropdownId));
    };

    const handleLanguageSelect = (dropdownId, language) => {
        setSelectedLanguages((prev) => ({
            ...prev,
            [dropdownId]: language,
        }));
        setOpenDropdown(null); // 드롭다운 닫기
    };

    const swapLanguages = () => {
        setSelectedLanguages((prev) => {
            const updated = {
                first: prev.second,
                second: prev.first,
            };
            console.log("언어 교체:", updated); // 상태 업데이트 확인용
            return updated;
        });
    };

    const translateContent = async () => {
        

        const languageMap = {
            한국어: "ko",
            영어: "en",
            일본어: "ja",
            "중국어(번체)": "zh-TW",
            프랑스어: "fr",
            스페인어: "es",
            러시아어: "ru",
            베트남어: "vi",
            태국어: "th",
            인도네시아어: "id",
            포르투갈어: "pt",
        };

        const sourceLang = languageMap[selectedLanguages.first] || "ko";
        const targetLang = languageMap[selectedLanguages.second] || "en";

        console.log("요청 소스 언어:", sourceLang);
        console.log("요청 타겟 언어:", targetLang);


        try {
            const response = await axios.get(
                "https://translation.googleapis.com/language/translate/v2",
                {
                    params: {
                        key: 'AIzaSyBsNQNLgxfNOt8JhnBuLury_mW8hNCRpPk',
                        q: article.content,
                        source: sourceLang,
                        target: targetLang,
                        format: "text",
                    },
                }
            );
            
            setTranslatedText(response.data.data.translations[0].translatedText);
        } catch (error) {
            console.error("번역 중 오류 발생:", error.response?.data || error.message);
            alert("번역에 실패했습니다.");
        }
    };

    // 로딩 상태 처리
    if (!article) {
        return <div>로딩 중...</div>;
    }

    const handleEdit = () => {
        navigate(`/article/edit/${id}`); // 현재 게시글 ID를 수정 페이지로 전달
    };

    const handleToggleImportant = async () => {
        try {
            const updatedArticle = await toggleImportantArticle(id, userId); // 중요 게시글 토글 API 호출
            console.log("중요글 업데이트 결과:", updatedArticle);
    
            setArticle((prev) => ({
                ...prev,
                isImportant: updatedArticle.isImportant, // 서버 응답 데이터로 업데이트
            }));
        } catch (error) {
            console.error("중요 게시글 상태 변경 중 오류 발생:", error);
            alert("중요 게시글 상태 변경에 실패했습니다.");
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }
    
        try {
            // 댓글 추가 API 호출
            await addComment({
                boardArticleId: id,       // 게시글 ID
                userId: userId,      // 사용자 ID
                content: newComment, // 댓글 내용
            });
            console.log("Request Data 댓글:", { boardArticleId: id, userId, content: newComment });
    
            // 댓글 목록 갱신
            const updatedComments = await getCommentsByArticle(id);
            setComments(updatedComments); // 댓글 목록 업데이트
            setNewComment(""); // 입력 필드 초기화

            if (commentInputRef.current) {
                commentInputRef.current.innerText = "";
            }
        } catch (error) {
            console.error("댓글 등록 실패:", error);
            alert("댓글 등록에 실패했습니다.");
            console.log("Request Data:", { boardArticleId: id, userId, content: newComment });
        }
    };

    // 답글 조회
    const fetchReplies = async (commentId) => {
        try {
            const replyData = await getRepliesByComment(commentId);
            setReplies((prevReplies) => ({
                ...prevReplies,
                [commentId]: replyData,
            })); // 해당 댓글의 답글 목록 갱신
        } catch (error) {
            console.error("답글 조회 실패:", error.message);
            alert("답글을 불러오는 중 오류가 발생했습니다.");
        }
    };
  
  // 답글 추가
  const handleAddReply = async (commentId) => {
    if (!newReply.trim()) {
        alert("답글 내용을 입력해주세요.");
        return;
    }

    // 전달된 commentId 확인
    console.log("Replying to commentId:", commentId);

    try {
        await addReply({
            commentId: commentId, // 전달된 commentId 사용
            userId: userId,
            content: newReply,
        });

        alert("답글이 등록되었습니다!");
        setNewReply(""); // 입력 필드 초기화
        fetchReplies(commentId); // 답글 목록 새로고침
    } catch (error) {
        console.error("답글 등록 실패:", error);
        alert("답글 등록에 실패했습니다.");
    }
};
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
                    <h2 className="tit _board_title">{article.boardName}</h2>
                    <div className="translate _no_print show_translate"  style={{
                            display: isTranslateVisible ? "none" : "block",
                            transition: "opacity 0.3s ease-in-out",
                            opacity: isTranslateVisible ? 0 : 1,
                        }}>
                        <div className="btn_box">
                            <div className="btn_wrap">
                                <button type="button"  onClick={() => toggleDropdown("first")}>
                                {selectedLanguages.first}
                                 <em className="ico"></em>
                                 </button>
                                 {openDropdown === "first" && (
                                <ul className="ly_slct_lang">
                                    <li data-value="en">
                                        <button type="button" className={selectedLanguages.second === "영어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "영어")
                                        }>
                                            영어
                                        </button>
                                    </li>
                                    <li data-value="ja">
                                        <button type="button"  className={selectedLanguages.second === "일본어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "일본어")
                                            }>
                                        일본어
                                        </button>
                                    </li>
                                    <li data-value="ko">
                                        <button type="button"  className={selectedLanguages.second === "한국어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "한국어")
                                            }
                                        >
                                            한국어
                                        </button>
                                    </li>
                                
                                    <li data-value="zh-TW">
                                        <button type="button" className={selectedLanguages.second === "중국어(번체)" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "중국어(번체)")
                                            }
                                        >중국어(번체)</button>
                                    </li>
                                    <li data-value="fr">
                                        <button type="button" className={selectedLanguages.second === "프랑스어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "프랑스어")
                                            }>프랑스어</button>
                                    </li>
                                    <li data-value="vi">
                                        <button type="button" className={selectedLanguages.second === "베트남어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "베트남어")
                                            }>베트남어</button>
                                    </li>
                                    <li data-value="th">
                                        <button type="button" className={selectedLanguages.second === "태국어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "태국어")
                                            }>태국어</button>
                                    </li>
                                    <li data-value="id">
                                        <button type="button" className={selectedLanguages.second === "인도네시아어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "인도네시아어")
                                            }>인도네시아어</button>
                                    </li>
                                    <li data-value="es">
                                        <button type="button" className={selectedLanguages.second === "스페인어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "스페인어")
                                            }>스페인어</button>
                                    </li>
                                    <li data-value="pt">
                                        <button type="button" className={selectedLanguages.second === "포르투갈어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "포르투갈어")
                                            }>포르투갈어</button>
                                    </li>
                                    <li data-value="ru">
                                        <button type="button" className={selectedLanguages.second === "러시아어" ? "selected" : ""} onClick={() =>
                                            handleLanguageSelect("first", "러시아어")
                                            }>러시아어</button>
                                    </li>
                                </ul>
                            )}
                            </div>
                            <button type="button" className="reverse" onClick={swapLanguages}>
                                <em>바꾸기</em>
                            </button>
                            <div className="btn_wrap">
                                <button type="button"  onClick={() => toggleDropdown("second")}>
                                {selectedLanguages.second}
                                 <em className="ico"></em>
                                 </button>
                                 {openDropdown === "second" && (
                                <ul className="ly_slct_lang">
                                    <li data-value="en">
                                        <button type="button" className={selectedLanguages.second === "영어" ? "selected" : ""}  onClick={() =>
                                                handleLanguageSelect("second", "영어")
                                            }>
                                            영어
                                        </button>
                                    </li>
                                    <li data-value="ja">
                                        <button type="button"  className={selectedLanguages.second === "일본어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "일본어")
                                            }>일본어</button>
                                    </li>
                                    <li data-value="ko">
                                        <button type="button" className={selectedLanguages.second === "한국어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "한국어")
                                            }>한국어</button>
                                    </li>
    
                                    <li data-value="zh-TW">
                                        <button type="button" className={selectedLanguages.second === "중국어(번체)" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "중국어(번체)")
                                            }>중국어(번체)</button>
                                    </li>
                                    <li data-value="fr">
                                        <button type="button" className={selectedLanguages.second === "프랑스어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "프랑스어")
                                            }>프랑스어</button>
                                    </li>
                                    <li data-value="vi">
                                        <button type="button" className={selectedLanguages.second === "베트남어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "베트남어")
                                            }>베트남어</button>
                                    </li>
                                    <li data-value="th">
                                        <button type="button" className={selectedLanguages.second === "태국어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "태국어")
                                            }>태국어</button>
                                    </li>
                                    <li data-value="id">
                                        <button type="button" className={selectedLanguages.second === "인도네시아어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "인도네시아어")
                                            }>인도네시아어</button>
                                    </li>
                                    <li data-value="es">
                                        <button type="button" className={selectedLanguages.second === "스페인어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "스페인어")
                                            }>스페인어</button>
                                    </li>
                                    <li data-value="pt">
                                        <button type="button" className={selectedLanguages.second === "포르투갈어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "포르투갈어")
                                            }>포르투갈어</button>
                                    </li>
                                    <li data-value="ru" className={selectedLanguages.second === "러시아어" ? "selected" : ""} onClick={() =>
                                                handleLanguageSelect("second", "러시아어")
                                            }>
                                        <button type="button">러시아어</button>
                                    </li>
                                </ul>
                            )}
                            </div>

                            <button type="button" className="point" onClick={translateContent}>
                                <strong>번역하기</strong>
                            </button>
                        </div>
                        <button type="button" className="btn_off" onClick={toggleTranslateVisibility}>
                            <i className="blind">번역 OFF</i>
                        </button>

                    </div>
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
                            {article && (
                                <input
                                    id="important_post_check"
                                    type="checkbox"
                                    className="important_post_check"
                                    checked={article.isImportant} // Boolean 값 사용
                                    onChange={handleToggleImportant}
                                />
                                )}
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
                           
                            <span className="edit">편집 허용 : OFF (작성자, 게시판 마스터만 편집 가능)</span>
                        </div>
                        <div className="btn _no_print">
                            
                            <button id="translateLayerBtn" type="button" className="bt_translate" onClick={toggleTranslateVisibility}>
                                {isTranslateVisible ? "번역" : "번역 해제"}
                            </button>
                        </div>
                    </div>

                    {article.files && article.files.length > 0 && (
                    <div className="lw_file_attach_view">
                        <div className="file_infor">
                                <span className="file_tit">
                                    <button type="button" className="btn_fold_attach">
                                        <i className="blind">첨부 파일</i>
                                    </button>
                                    <span>첨부 파일 <em>1</em>개</span>
                                    <span className="file_size">(4.6KB)</span>
                                </span>
                        </div>
                        <div className="file_wrap">
                                <ul className="file_list">
                                {article.files.map((file) => (
                                    <li key={file.boardFileId}> 
                                        <span className="file_name">
                                            <button type="button"  title={file.fileOriginalName} className="file_name_txt">{file.fileOriginalName}</button>
                                        </span>
                                        <span className="file_size">
                                            {(
                                                file.fileSize / 1024
                                            ).toFixed(2)}{" "}
                                            KB
                                        </span>
                                        <div className="file_btn_area _no_print">
                                            <button type="button" className="btn_down_pc">
                                                <i className="blind">PC 저장</i>
                                            </button>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                        </div>
                    </div>
                    )}
                    <div id="id_contents" className="cont">
                        <div
                            style={{ fontSize: "14px" }}
                            dangerouslySetInnerHTML={{
                                __html: translatedText || article.content || "내용 없음",
                            }}
                            
                        />
                    </div>
                    <div className="btn_box _no_print">
                        <button type="button" onClick={handleEdit}>
                        수정
                        </button> 
                        <button type="button" onClick={handleDelete}>
                        삭제
                        </button>
                    </div>
                    <div id="id_comments" className="comments">
                        <div className="infor">
                            <div className="reaction_box">
                                <div className="reaction_item has_reply">
                                    <button type="button" className="btn_reply_item">
                                        <span className="blind">댓글</span>
                                        <span className="text">0</span>
                                        <span className="blind">count</span>
                                    </button>
                                </div>
                            </div>
                            <div className="option">
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
                        <ul className="list_box">
                                {comments.map((comment) => (
                                    <li key={comment.commentId}>
                                    <div className="cmt_box">
                                        <div className="user">
                                        <strong className="name">{comment.userId || "익명"}</strong>
                                        <span className="date">
                                            {new Date(comment.createdAt).toLocaleString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            })}
                                        </span>
                                        <div className="cmt_task _no_print">
                                            <button type="button" className="btn_more">
                                            <span className="blind">메뉴 더보기</span>
                                            </button>
                                        </div>
                                        </div>
                                        <p className="cmt_area">
                                        <span className="translateArea">{comment.content}</span>
                                        </p>
                                        <div className="task_area">
                                        <button
                                            type="button"
                                            className="btn_reply _no_print"
                                            onClick={() => handleReplyClick(comment.commentId)}
                                        >
                                            답글
                                        </button>
                                        </div>
                                    </div>
                                    

                                    {/* 답글 입력 UI */}
                                    {activeReply === comment.commentId && (
                                        <li className="reply write_ver">
                                        <div className="cmt_box"> 
                                            <div className="user">
                                            <strong className="name">{comment.userId || "익명"}</strong>
                                            <span className="date"></span>
                                            </div>
                                            <div className="register_box _no_print">
                                            <div className="inp_box">
                                                <div id={`replyInput_${comment.commentId}`} className="textbox textbox_writing">
                                                <div
                                                    contentEditable="true"
                                                    className="comment_input notranslate"
                                                    onInput={(e) => setNewReply(e.target.innerText)}
                                                    suppressContentEditableWarning={true}
                                                >
                                                    <em className="tag" contentEditable="false">@{comment.userId}</em>&nbsp;
                                                </div>
                                                </div>
                                            </div>
                                            <div className="btn_box">
                                                <div className="register_btns">
                                                <p className="bt_cancel">
                                                    <button type="button" onClick={() => setActiveReply(null)}>취소</button>
                                                    <button type="button" className="point" onClick={() => handleAddReply(comment.commentId)}>입력</button>
                                                </p> 
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </li>
                                    )}
                                    </li>
                                ))}
                                </ul>
                            <div className="register_box _no_print">
                                <div className="inp_box">
                                    <div id="commentScrollTarget_1" className="textbox">
                                    <div
                                        id="commentInput_17"
                                        contentEditable="true"
                                        className="comment_input notranslate"
                                        ref={commentInputRef}
                                        onInput={(e) => setNewComment(e.target.innerText)}
                                        suppressContentEditableWarning={true}
                                    ></div>
                                      {newComment.trim() === "" && (
                                            <span className="comment_label">
                                                댓글을 입력하세요.
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="btn_box">
                                    <div className="attach_btns">
                                        <span className="btn_attach_image">
                                            <label htmlFor="commentImageFile" className="blind"></label>
                                            <input id="commentImageFile" type="file" title="" name="uploadImage" accept="*" multiple="multiple" style={{display: "none"}}/>
        
                                        </span>
                                    </div>
                                    <div className="register_btns">
                                    <button
                                        type="button"
                                        className="point"
                                        onClick={handleAddComment} // 댓글 추가 함수 호출
                                    >
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