import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import TarmsPage from "../pages/login/TarmsPage";
import RegisterPage from "../pages/login/RegisterPage";
import FindIdPage from "../pages/login/find/FindIdPage";
import Message from "../pages/app/message";

//라우팅 정의
const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/tarms", element: <TarmsPage /> },
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/findId", element: <FindIdPage /> },
  { path: "/app/message", element: <Message /> },
]);

// 라우터 내보내기
export default router;
