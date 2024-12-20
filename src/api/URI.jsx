/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 : api 설계

    추가내역
    -------------
    2924-12-03 최영진 check, email 추가
    2024-12-05 이도영 관리자 사용자 정보 수정,삭제
    2024-12-05 강중원 배포용 주소 추가

*/

export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

// user
export const USER_URI = `${SERVER_HOST}/user/register`;
export const USER_LOGIN_URI = `${SERVER_HOST}/user/login`;
export const USER_LOGOUT_URI = `${SERVER_HOST}/user/logout`;
export const USER_FIND = `${SERVER_HOST}/user/`;
export const USER_CHECK = `${SERVER_HOST}/user/`;
export const USER_CHANGE = `${SERVER_HOST}/user`;
export const USER_LIST = `${SERVER_HOST}/user/list`; // 강중원 12.05 추가
export const USER_LIST_BYUSERID = `${SERVER_HOST}/teamspace/listbyid`; //이도영 12.13 추가
export const USER_EMAIL = `${SERVER_HOST}/api`;


// board
export const BOARD_CREATE_URI = `${SERVER_HOST}/board/create`;
export const BOARD_UPDATE_URI = (boardId) => `${SERVER_HOST}/board/update/${boardId}`;
export const BOARD_DELETE_URI = (boardId) => `${SERVER_HOST}/board/delete/${boardId}`;

// article
export const BOARD_FREEBOARD_VIEW = `${SERVER_HOST}/article/freerecent`;
export const BOARD_ARTICLE_WRITE_URI = `${SERVER_HOST}/article/write`;
export const BOARD_ARTICLE_VIEW = `${SERVER_HOST}/article/view`;
export const BOARD_ARTICLE_DETAIL = `${SERVER_HOST}/article/view/detail`;
export const BOARD_ARTICLE_BOARD = (boardId, page, size) =>
  `${SERVER_HOST}/article/boards/${boardId}/articles?page=${page}&size=${size}`;
export const BOARD_ARTICLE_EDIT = `${SERVER_HOST}/article/edit/:id`;
export const BOARD_MOVE_BASKET = `${SERVER_HOST}/article/delete`;

export const BOARD_TRASH_VIEW = `${SERVER_HOST}/article/trash`;
//글 이동
export const BOARD_ARTICLE_MOVE = `${SERVER_HOST}/article/articles/move`;

//글 검색
export const BOARD_TITLE_SEARCH = (boardId) => 
  `${SERVER_HOST}/article/board/${boardId}/search`;

//내 게시물 출력
export const BOARD_ARTICLE_USER = (userId, page, size) =>
  `${SERVER_HOST}/article/user/${userId}?page=${page}&size=${size}`;
//중요글 체크
export const BOARD_IMPORTANT_ARTICLE = (articleId) =>
  `${SERVER_HOST}/important-articles/${articleId}`;

//중요글 출력
export const BOARD_ARTICLE_IMPORTANT_VIEW = (userId) =>
  `${SERVER_HOST}/important-articles/${userId}`;


//필독글 출력
export const BOARD_MUST_READ = `${SERVER_HOST}/article/must-read`;

//메인 필독글 출력
export const BOARD_MUST_READ_main = `${SERVER_HOST}/article/must-read/latest`;

//최신글
export const BOARD_RECENT_ARTICLE = `${SERVER_HOST}/article/recent`;

//최신글 10개
export const BOARD_RECENT_ARTICLE_TEN = `${SERVER_HOST}/article/recent/ten`;

//댓글 추가
export const BOARD_COMMENT_ADD = `${SERVER_HOST}/comment/add`;

//댓글 보기
export const BOARD_COMMENT_VIEW = (commentId) =>
  `${SERVER_HOST}/comment/${commentId}`;

//답글 추가
export const BOARD_REPLY_ADD = (commentId) =>
  `${SERVER_HOST}/comment/${commentId}/reply`;

// 답글 보기
export const BOARD_REPLY_VIEW = (commentId) =>
  `${SERVER_HOST}/comment/${commentId}/reply`;

export const BOARD_TRASH_PERMANENT = `${SERVER_HOST}/article/trash/permanent`;
export const BOARD_TYPE = `${SERVER_HOST}/board/type`;
export const BOARD_ALL = `${SERVER_HOST}/board/all`;
export const BOARD_FAVORITE = `${SERVER_HOST}/favorite/favoriteboard`;
export const BOARD_BRING_FAVORITE = `${SERVER_HOST}/favorite/getFavoriteBoards`;

// product

// setting
//사용자 정보 설정화면 출력 2024/12/03 이도영
export const SETTING_USER_INFO = `${SERVER_HOST}/setting/user`;

// teamspace
// 팀스페이스 생성,삭제,수정 기능 추가 2024/12/09 이도영
//팀생성
export const TEAMSPACE_MAKETEAM = `${SERVER_HOST}/teamspace/maketeam`;
//팀 참가
export const TEAMSPACE_JOINTEAM = `${SERVER_HOST}/teamspace/jointeamroom`;
//방 삭제
export const TEAMSPACE_DELETETEAM = `${SERVER_HOST}/teamspace/deleteteam`;
//팀 나가기,추방
export const TEAMSPACE_OUTTEAM = `${SERVER_HOST}/teamspace/outteamroom`;
// 팀 정보 수정
export const TEAMSPACE_UPDATETEAM = `${SERVER_HOST}/teamspace/updateteamroom`;
// 팀 가지고 오기
export const TEAMSPACE_GETTEAMS = `${SERVER_HOST}/teamspace/getlistteamroom`;
//admin
export const ADMIN_USERLIST_INFO = `${SERVER_HOST}/admin/userlist`;
export const ADMIN_DELETE_USERS = `${SERVER_HOST}/admin/userlist`; //이도영 12.05추가
export const ADMIN_UPDATE_USERS = `${SERVER_HOST}/admin/updateuserlist`; //이도영 12.05추가

//message
export const MESSAGE_NEW_CHANNEL = `${SERVER_HOST}/message/newChannel`;
export const MESSAGE_NEW_DM = `${SERVER_HOST}/message/newDM`;
export const MESSAGE_GET_ROOMS = `${SERVER_HOST}/message/rooms`;
export const MESSAGE_ROOM = `${SERVER_HOST}/message/room`;
export const MESSAGE_GET_CHAT = `${SERVER_HOST}/message/chat`;
export const MESSAGE_GET_LASTCHAT = `${SERVER_HOST}/message/lastchat`;
export const MESSAGE_POST_IMAGE = `${SERVER_HOST}/message/upload`;
export const MESSAGE_CHECK_DM = `${SERVER_HOST}/message/check/dm`;

//calendar
export const CALENDAR_CREATE = `${SERVER_HOST}/calendar/makecalendar`;
export const CALENDAR_INVITECODE = `${SERVER_HOST}/calendar/invitecalendar`;
export const CALENDAR_LIST = `${SERVER_HOST}/calendar/calendarlist`;
export const CALENDAR_DELETE = `${SERVER_HOST}/calendar/deletecalendar`;
export const CALENDAR_LEAVE = `${SERVER_HOST}/calendar/leavecalendar`;
export const CALENDAR_ADDEVENT = `${SERVER_HOST}/calendar/addevent`;
export const CALENDAR_EDITEVENT = `${SERVER_HOST}/calendar/editevent`;
export const CALENDAR_DELETEEVENT = `${SERVER_HOST}/calendar/deleteevent`;

// project
export const PROJECT_LIST = `${SERVER_HOST}/project`;
export const SELECT_PROJECT = `${SERVER_HOST}/project`;
export const CREATE_PROJECT = `${SERVER_HOST}/project/create`;

// export const UPDATE_PROJECT = `${SERVER_HOST}/project/update`;
// export const DELETE_PROJECT = (no) => `${SERVER_HOST}/project/${no}`;

export const UPDATE_PROJECT = `${SERVER_HOST}/project/update`;
export const DELETE_PROJECT = `${SERVER_HOST}/project/delete`;
export const GETUSER_PROJECT = `${SERVER_HOST}/project`


// project/Item
export const CREATE_PROJECT_ITEM = `${SERVER_HOST}/project/ProjectItem/create`;
export const UPDATE_PROJECT_ITEM = (no) =>
  `${SERVER_HOST}/project/ProjectItem/update/${no}`;
export const DELETE_PROJECT_ITEM = (no) =>
  `${SERVER_HOST}/project/ProjectItem/delete/${no}`;

// project/Task

// file
export const File = `${SERVER_HOST}/api/drive-files`;
export const CREATE_TASK = `${SERVER_HOST}/project/task/create`
export const UPDATE_TASK = (no) => `${SERVER_HOST}/project/task/update/${no}`
export const DELETE_TASK = (no) => `${SERVER_HOST}/project/task/delete/${no}`


//membership
export const MEMBERSHIP_UPDATE = `${SERVER_HOST}/api/user/mypage/update-history`;
export const MEMBERSHIP_CREATE = `${SERVER_HOST}/api/user/mypage/create-history`;
export const savePlanHistory = `${SERVER_HOST}/api/user/mypage/plan-history`;
