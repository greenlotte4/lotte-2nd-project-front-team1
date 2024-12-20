import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/login/RegisterPage";
import FindIdPage from "../pages/login/find/FindIdPage";
import FindPassPage from "../pages/login/find/FindPassPage";
import NewPassPage from "../pages/login/find/NewPassPage";
import TermsPage from "../pages/login/TermsPage";
import ProjectPage from "../pages/app/project/ProjectPage";
import MessagePage from "../pages/app/message/MessagePage";
import FindViewPage from "../pages/login/find/FindViewPage";

import CalendarPage from "../pages/app/calendar/CalendarPage";
import FilePage from "../pages/app/file/FilePage";
import PagePage from "../pages/app/page/Pagepage";
import AppHome from "../pages/app/AppHomePage";

import FuncPage from "../pages/main/FuncPage";
import SubscriptionPage from "../pages/main/SubscriptionPage";
import SupportPage from "../pages/main/SupportPage";
import IndexPage from "../pages/main/IndexPage";
import IntroPage from "../pages/main/IntroPage";
import MyPagePage from "../pages/app/myPage/MyPagePage";
import MyPageMembershipPage from "../pages/app/myPage/MyPageMembershipPage";
import MyPageInquiryPage from "../pages/app/myPage/MyPageInquiryPage";
import AdminCSPage from "../pages/admin/AdminCSPage";
import AdminUserPage from "../pages/admin/AdminUserPage";
import SettingPage from "../pages/app/setting/SettingPage";
import MainBoardPage from "../pages/app/board/MainBoardPage";
import NoticeBoardPage from "../pages/app/board/NoticeBoardPage";
import EditPostBoardPage from "../pages/app/board/EditPostBoardPage";
import BasketBoardPage from "../pages/app/board/BasketBoardPage";
import RecentBoardPage from "../pages/app/board/RecentBoardPage";
import MustReadBoardPage from "../pages/app/board/MustReadBoardPage";
import ImportantBoardPage from "../pages/app/board/ImportantBoardPage";
import MyPostBoardPage from "../pages/app/board/MyPostBoardPage";
import AnnouncementBoardPage from "../pages/app/board/AnnouncementBoardPage";
import ViewBoardPage from "../pages/app/board/ViewBoardPage";
import MyFile from "../components/app/file/inFiles/MyFile";

//라우팅 정의
const router = createBrowserRouter([
  { path: "/", alias: ["/main/index"], element: <IndexPage /> },

  { path: "/main/func", element: <FuncPage /> },
  { path: "/main/subscription", element: <SubscriptionPage /> },
  { path: "/main/support", element: <SupportPage /> },

  { path: "/main/index", element: <IndexPage /> },
  { path: "/main/intro", element: <IntroPage /> },

  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/terms", element: <TermsPage /> },
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/findId", element: <FindIdPage /> },
  { path: "/user/findPass", element: <FindPassPage /> },
  { path: "/user/find/findView", element: <FindViewPage /> },
  { path: "/user/find/newPass", element: <NewPassPage /> },
  { path: "/user/myPage", element: <MyPagePage /> },
  { path: "/user/mypage/membership", element: <MyPageMembershipPage /> },
  { path: "/user/mypage/inquiry", element: <MyPageInquiryPage /> },

  // App Home
  { path: "/app/home", element: <AppHome /> },

  { path: "/app/message", element: <MessagePage /> },
  { path: "/app/project", element: <ProjectPage /> },
  { path: "/app/project/:projectId", element: <ProjectPage /> },
  { path: "/app/project/:projectId/:tab", element: <ProjectPage /> },
  { path: "/app/calendar", element: <CalendarPage /> },
  { path: "/app/file", element: <FilePage /> },
  { path: "/app/file/:folderId", element: <FilePage /> },
  { path: "/app/page", element: <PagePage /> },
  { path: "/app/setting", element: <SettingPage /> },
  { path: "/app/mainboard", element: <MainBoardPage /> },
  { path: "/app/noticeboard", element: <NoticeBoardPage /> },
  { path: "/app/basketboard", element: <BasketBoardPage /> },
  { path: "/app/recentboard", element: <RecentBoardPage /> },
  { path: "/app/mustreadboard", element: <MustReadBoardPage /> },
  { path: "/app/importantboard", element: <ImportantBoardPage /> },
  { path: "/app/mypostboard", element: <MyPostBoardPage /> },
  { path: "/app/board/:boardId", element: <AnnouncementBoardPage /> },
  { path: "/article/view/:id", element: <ViewBoardPage /> },
  { path: "/article/edit/:id", element: <EditPostBoardPage /> },


  //Admin
  { path: "/admin/user", element: <AdminUserPage /> },
  { path: "/admin/cs", element: <AdminCSPage /> },
]);

// 라우터 내보내기
export default router;
