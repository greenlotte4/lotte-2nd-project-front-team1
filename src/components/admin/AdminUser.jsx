/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 회원관리 

    추가내역
    -------------
    00.00 이름 - 내용
*/
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminUserItem from "./AdminUserItem";
import { getAdminUserList } from "../../api/admin/AdminAPI";

const initState = {
  dtoList: [],
  cate: "",
  pg: 1,
  size: 10,
  total: 0,
  startNo: 0,
  start: 0,
  end: 0,
  prev: false,
  next: false,
  type: null,
  keyword: null,
};

export default function AdminUser() {
  const [data, setData] = useState(initState);

  const [searchParams] = useSearchParams();
  const pg = searchParams.get("pg") || 1;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAdminUserList(pg);
      console.log(data);
      setData(data);
    };

    fetchData();
  }, [pg]);

  return (
    <div className="adminuser-content">
      <div>
        <table className="adminusertop">
          <tr>
            <td className="input-group">
              <input type="text" placeholder="이름 입력" />
              <button className="search-button">검색</button>
            </td>
          </tr>
          <tr></tr>
        </table>
      </div>
      {/* <!-- 아래 영역 시작 --> */}
      <div className="adminuser-area">
        {/* <!-- 왼쪽 영역: 파일 리스트 --> */}
        <div className="adminuser-list">
          <table className="adminuser-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>이름</th>
                <th>아이디</th>
                <th>구매등급</th>
                <th>권한</th>
                <th>가입날짜</th>
                <th>최근 로그인</th>
                <th>상태</th>
                <th>더보기</th>
              </tr>
            </thead>
            <tbody>
              {data.dtoList.map((user, index) => (
                <AdminUserItem key={index} user={user} />
              ))}
            </tbody>
          </table>
          <div className="inquiry-button-area">삭제</div>
        </div>
      </div>
    </div>
  );
}
