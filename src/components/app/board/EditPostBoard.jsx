import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {  ArticleDetail, getAllBoards, updateArticle} from "../../../api/board/boardAPI"; // URI 상수 import
import ReactQuill from 'react-quill';

const EditPostBoard = () => {
    const [showBoardSelect, setShowBoardSelect] = useState(false); // 모달 표시 상태
    const [boards, setBoards] = useState([]);
    const { id } = useParams(); // URL에서 게시글 ID 가져오기
    const [selectedBoard, setSelectedBoard] = useState(''); 
    const [showFileWrap, setShowFileWrap] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]); 
    const navigate = useNavigate();

    const totalFileSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // 선택된 파일 가져오기
        setUploadedFiles((prev) => [...prev, ...files]); // 파일 목록 추가
        setShowFileWrap(true);
    };

    const handleFileUploadClick = () => {
        document.getElementById('fileUploadInput').click(); // 숨겨진 파일 입력 클릭
    };

    const handleToggleFileWrap = () => {
        setShowFileWrap((prev) => !prev); // 상태를 토글하여 열기/닫기 구현
    };

    const [article, setArticle] = useState({
        title: '',
        content: '',
        board: '공지사항',
        writer: '',
    });

    const handleOpenBoardSelect = () => {
        setShowBoardSelect(true);
    };


    const handleCloseBoardSelect = () => {
        setShowBoardSelect(false);
    };

    const handleConfirmBoardSelect = () => {
        setSelectedBoard(article.board); // 선택된 값을 업데이트
        handleCloseBoardSelect(); // 모달 닫기
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index)); // 파일 목록에서 삭제
    };

    useEffect(() => {
        console.log("NoticeBoard: useEffect 실행"); // useEffect 호출 확인
        const fetchBoards = async () => {
            try {
                const fetchedBoards = await getAllBoards();
                console.log('게시판 목록:', fetchedBoards); // 데이터 출력
                setBoards(fetchedBoards);
            } catch (error) {
                console.error("게시판 목록을 가져오는 데 실패했습니다.", error);
            }
        };
        fetchBoards();
    }, []);

    // 게시글 상세 정보 가져오기
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await ArticleDetail(id); // API 호출
                console.log("Fetched files:", data.files);
    
                // 기존 파일 데이터를 새 구조로 변환
                const convertedFiles = (data.files || []).map(file => ({
                    name: file.fileOriginalName, // 기존 파일명 필드 사용
                    size: file.fileSize          // 기존 파일 크기 필드 사용
                }));
    
                setArticle(data); // 게시글 상태 저장
                setUploadedFiles(convertedFiles); // 통일된 구조로 저장
            } catch (error) {
                console.error('게시글 정보를 가져오는 중 오류 발생:', error);
            }
        };
        fetchArticle();
    }, [id]);

    const handleEditorChange = (content) => {
        setArticle((prev) => ({ ...prev, content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateArticle(id, article); // 게시글 수정 API 호출
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate('/app/mainboard'); // 수정 후 게시판 목록으로 이동
        } catch (error) {
            console.error('게시글 수정에 실패했습니다:', error);
            alert('게시글 수정에 실패했습니다.');
        }
    };

    const handleBoardSelect = (board_name) => {
        setArticle((prev) => ({ ...prev, board: board_name }));
        console.log("Selected board_name:", board_name); // 함수 호출 확인
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
                              <div className="option_box" style={{zindex: "200"}}>
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
          <div id="articleEditor">
              <div className="board_write">
                  <h2 className="blind">글쓰기</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="task_area">
                      <div className="btn_task_wrap">
                          <button type="submit" className="btn_task tx_point">
                          등록
                        </button>
                      </div>
                      <div className="btn_task_wrap" >
                          <button type="button" className="btn_task">
                          임시저장
                        </button>
                      </div>
                      <button type="button" className="btn_write_fold">세부 설정</button>
                  </div>
                  <ul className="option">
                      <li className="opt_sbj">
                          <h3 className="tx">제목</h3>
                          <span className="wrap_sbj">
                          <input 
                            type="text" 
                            maxLength="200" 
                            placeholder="제목을 입력하세요" 
                            className="subject" 
                            name="title"
                            value={article.title}
                            onChange={(e) => setArticle({ ...article, title: e.target.value })}
                        />
                              <em className="cnt_txt">0/200</em>
                          </span>
                      </li>
                      <li className="opt_bd">
                      <h3 className="tx">게시판</h3>
                      <button type="button" className="btn_board_select"  onClick={handleOpenBoardSelect} >
                          게시판 선택
                      </button>
                      <span className="bd_name">
                          <span className="cate" >그린컴퓨터아카데미</span>
                          <strong>{selectedBoard || '게시판을 선택하세요'}</strong>
                      </span>
                      </li>
                     
                      <li className="opt_file">
                          <h3 className="tx">파일첨부</h3>
                          <button type="button"  className={`btn_fold_attach ${showFileWrap ? 'open' : 'close'}`} onClick={handleToggleFileWrap}>
                                <i className="blind">
                                    {showFileWrap ? '첨부 파일 목록 닫기' : '첨부 파일 목록 열기'}
                                </i>
                          </button>
                          <div className="lw_file_attach_write">
                              <div className="file_infor">
                                  <button type="button" className="btn_attach" onClick={handleFileUploadClick}>
                                      내 PC
                                  </button>
                                  <p className="total_volume">
                                    첨부파일 {uploadedFiles.length}개 (
                                    {totalFileSize >= 1024 * 1024
                                        ? `${(totalFileSize / (1024 * 1024)).toFixed(2)} MB` // MB로 변환
                                        : `${(totalFileSize / 1024).toFixed(2)} KB`}
                                    )
                                </p>
                              </div>
                              <input
                                id="fileUploadInput"
                                type="file"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            {showFileWrap && (
                            <div className='file_wrap'>
                                <table className='file_head'>
                                    <colgroup>
                                        <col className='col_file_del'></col>
                                        <col className='col_file_name'></col>
                                        <col className='col_file_size'></col>
                                        <col className='col_scroll_gap'></col>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className='file_del'></th>
                                            <th className='file_name'>
                                                <p className='file_cell'>파일명</p>
                                            </th>
                                            <th className="file_size">
                                                <p className="file_cell">용량</p>
                                            </th>
                                            <th className='scroll_gap'>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className='file_scroll_box osx_scrl'>
                                    <table className='file_cont'>
                                        <colgroup>
                                            <col className='col_file_del'></col>
                                            <col className='col_file_name'></col>
                                            <col className='col_file_size'></col>
                                        </colgroup>
                                        <tbody>
                                        {uploadedFiles.map((file, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <button type="button" className='btn_file_dels' onClick={() => handleRemoveFile(index)}>
                                                        <i className="blind">첨부 파일 삭제</i>
                                                    </button>
                                                </td>
                                                <td>{file.name}</td>
                                                <td>
                                                {file.size >= 1024 * 1024
                                                    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                                                    : `${(file.size / 1024).toFixed(2)} KB`}

                                                </td>
                                            </tr>
                                        ))}
                                        {uploadedFiles.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="empty_list" id='forfile'>
                                                    파일이 없습니다.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    </table>

                                </div>
                                
                              </div>
                                )}
                            </div>
                      </li>
                  </ul>
                  <div className="workseditor-editor" style={{overflow: "auto", height: "auto"}}>
                  <ReactQuill
                            theme="snow"
                            value={article.content}
                            onChange={handleEditorChange}
                            placeholder="내용을 입력하세요"
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, 3, false] }],
                                    ['bold', 'italic', 'underline', 'strike'], // 텍스트 스타일
                                    ['link', 'image'], // 링크 및 이미지
                                    [{ list: 'ordered' }, { list: 'bullet' }], // 목록
                                    ['clean'], // 포맷 제거
                                ],
                            }}
                        />
                  </div>
                  </form>
              </div>

              {showBoardSelect && (
                <div className="ly_wrapper" style={{ display: "block" }}>
                    <div className="ly_loading" style={{ left: "330px", top: "800px", display: "none" }}>
                        <div className="cont">
                            <p className="cont1">
                                <span className="loading">
                                    <img
                                        src="https://static.worksmobile.net/static/pwe/address/loading_fff.gif"
                                        width="32"
                                        height="8"
                                        alt="loading"
                                    />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="ly_common">
                        <div className="layer_area">
                            <h3 className="tit">게시판 선택</h3>
                            <div className="cont board_select">
                                <div className="option_box">
                            
                            <ul>
                                <li>
                                    <span>그린컴퓨터아카데미</span>
                                </li>
                                {boards.map((board) => (
                                    
                                    <li key={board.board_id} className="depth"   onClick={() => handleBoardSelect(board.board_name)} >
                                        <input
                                            type="radio"
                                            name="select_bd"
                                            value={board.board_name}
                                            checked={article.board === board.board_name} // 체크 상태를 확인
                                            onChange={(e) => handleBoardSelect(e.target.value)}
                                        />
                                        <label>
                                            <strong>{board.board_name}</strong>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                                </div>
                            </div>
                            <div className="btn_area">
                                <button type="button" className="btn" onClick={handleCloseBoardSelect}>
                                    닫기
                                </button>
                                <button type="button" className="btn tx_point" onClick={handleConfirmBoardSelect}>
                                    <strong>확인</strong>
                                </button>
                            </div>
                        </div>
                        <div className="layer_bg" ></div>
                </div> 
                </div>
                )}
              

          </div>  
                   
          </div>
      );
} 	

export default EditPostBoard;