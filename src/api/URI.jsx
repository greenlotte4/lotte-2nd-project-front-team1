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
export const USER_FIND = `${SERVER_HOST}/user/`;
export const USER_CHECK = `${SERVER_HOST}/user/`;
export const USER_CHANGE = `${SERVER_HOST}/user`;
export const USER_LIST = `${SERVER_HOST}/user/list`; // 강중원 12.05 추가

export const USER_EMAIL = `${SERVER_HOST}/api`;

// article
export const BOARD_ARTICLE_WRITE_URI = `${SERVER_HOST}/article/write`;
export const BOARD_ARTICLE_VIEW = `${SERVER_HOST}/article/view`;
export const BOARD_ARTICLE_DETAIL = `${SERVER_HOST}/article/view/detail`;
export const BOARD_ARTICLE_BOARD = (boardId) => 
    `${SERVER_HOST}/article/boards/${boardId}/articles`;
export const BOARD_ARTICLE_EDIT = `${SERVER_HOST}/article/edit/:id`;
export const BOARD_MOVE_BASKET = `${SERVER_HOST}/article/delete`;
export const BOARD_TRASH_VIEW = `${SERVER_HOST}/article/trash`;
//글 이동
export const BOARD_ARTICLE_MOVE = `${SERVER_HOST}/article/articles/move`;

//내 게시물 출력
export const BOARD_ARTICLE_USER = (userId) => `${SERVER_HOST}/article/user/${userId}`;

//중요글 체크
export const BOARD_IMPORTANT_ARTICLE = (articleId) => `${SERVER_HOST}/important-articles/${articleId}`;

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
export const MESSAGE_GET_CHAT = `${SERVER_HOST}/message/chat`;
export const MESSAGE_GET_LASTCHAT = `${SERVER_HOST}/message/lastchat`;

//calendar
export const CALENDAR_CREATE = `${SERVER_HOST}/calendar/makecalendar`;
export const CALENDAR_INVITECODE = `${SERVER_HOST}/calendar/invitecalendar`;
export const CALENDAR_LIST = `${SERVER_HOST}/calendar/calendarlist`;
export const CALENDAR_DELETE = `${SERVER_HOST}/calendar/deletecalendar`;
export const CALENDAR_LEAVE = `${SERVER_HOST}/calendar/leavecalendar`;

export const CALENDAR_ADDEVENT = `${SERVER_HOST}/calendar/addevent`;

