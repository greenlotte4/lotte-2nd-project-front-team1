import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/login/RegisterPage";
import FindIdPage from "../pages/login/find/FindIdPage";
import ProjectPage from "../pages/app/project/ProjectPage";
import FindPassPage from "../pages/login/find/FindPassPage";
import IdViewPage from "../pages/login/find/IdViewPage";
import NewPassPage from "../pages/login/find/NewPassPage";
import TermsPage from "../pages/login/TermsPage";



//라우팅 정의
const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/user/login", element: <LoginPage/> },
  { path: "/user/terms", element: <TermsPage/> },
  { path: "/user/register", element: <RegisterPage/> },
  { path: "/user/findId", element: <FindIdPage/> },
  { path: "/project", element: <ProjectPage/>},
  { path: "/user/findPass", element: <FindPassPage/> },
  { path: "/user/find/idView", element: <IdViewPage/> },
  { path: "/user/find/newPass", element: <NewPassPage/> },


]);

// 라우터 내보내기
export default router;
