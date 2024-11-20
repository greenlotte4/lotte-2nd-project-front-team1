import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";



//라우팅 정의
const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },

]);

// 라우터 내보내기
export default router;
