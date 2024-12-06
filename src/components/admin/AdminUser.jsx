/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 관리자 회원관리 

    추가내역
    -------------
    2024/12/05 이도영 사용자 정보 수정,삭제
*/
import { useEffect, useState } from "react";
import AdminUserItem from "./AdminUserItem";
import {
  deleteAdminUserList,
  getAdminUserList,
  updateAdminUsers,
} from "../../api/admin/AdminAPI";

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
  const [pg, setPg] = useState(1); // 현재 페이지 상태 관리
  const [checkedItems, setCheckedItems] = useState([]); // 체크 상태 관리
  const [updates, setUpdates] = useState({}); // 수정된 데이터 관리

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminUserList(pg);
      setData(response);
      setCheckedItems([]);
    };
    fetchData();
  }, [pg]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= data.end) {
      setPg(page); // 페이지 번호 변경
    }
  };

  // 전체 체크 핸들러
  const handleAllCheck = (isChecked) => {
    if (isChecked) {
      const allIds = data.dtoList.map((user) => user.userId);
      setCheckedItems(allIds); // 모든 ID를 체크 상태로
    } else {
      setCheckedItems([]); // 체크 해제
    }
  };

  // 개별 체크 핸들러
  const handleSingleCheck = (userId, isChecked) => {
    if (isChecked) {
      setCheckedItems((prev) => [...prev, userId]); // 추가
    } else {
      setCheckedItems((prev) => prev.filter((id) => id !== userId)); // 제거
    }
  };

  // 수정 데이터 업데이트 핸들러
  const handleUpdateField = (userId, fieldName, value) => {
    setUpdates((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [fieldName]: value },
    }));
  };

  // 수정 버튼 클릭 핸들러
  const handleEdit = async () => {
    if (checkedItems.length === 0) {
      alert("수정할 사용자를 선택해주세요.");
      return;
    }

    try {
      // 체크된 사용자만 수정
      const usersToEdit = checkedItems.map((userId) => {
        const userData = data.dtoList.find((user) => user.userId === userId);
        return {
          userId,
          role: updates[userId]?.usergrade || userData.role,
          planId:
            typeof updates[userId]?.planId === "object"
              ? updates[userId]?.planId.planId
              : updates[userId]?.planId || userData.plan.planId,
          status: updates[userId]?.status || userData.status,
        };
      });
      // 서버로 수정 요청
      console.log("usersToEdit:", JSON.stringify(usersToEdit, null, 2));
      await updateAdminUsers(usersToEdit);
      setCheckedItems([]);
      alert("수정이 완료되었습니다.");
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
      alert("수정에 실패했습니다.");
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (checkedItems.length === 0) {
      alert("삭제할 사용자를 선택해주세요.");
      return;
    }

    if (window.confirm("선택한 사용자를 삭제하시겠습니까?")) {
      try {
        await deleteAdminUserList(checkedItems); // 서버로 삭제 요청
        const updatedDtoList = data.dtoList.filter(
          (user) => !checkedItems.includes(user.userId)
        );
        setData((prev) => ({
          ...prev,
          dtoList: updatedDtoList,
        }));
        setCheckedItems([]); // 체크 상태 초기화
        alert("삭제가 완료되었습니다.");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };
  // 전체 체크 상태 확인
  const isAllChecked = checkedItems.length === data.dtoList.length;

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
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={(e) => handleAllCheck(e.target.checked)}
                  />
                </th>
                <th>이름</th>
                <th>아이디</th>
                <th>권한</th>
                <th>구매등급</th>
                <th>최근 로그인</th>
                <th>상태</th>
                <th>더보기</th>
              </tr>
            </thead>
            <tbody>
              {data.dtoList.map((user, index) => (
                <AdminUserItem
                  key={index}
                  user={user}
                  isChecked={checkedItems.includes(user.userId)}
                  onCheck={(isChecked) =>
                    handleSingleCheck(user.userId, isChecked)
                  }
                  onUpdate={handleUpdateField}
                />
              ))}
            </tbody>
          </table>

          {/* 삭제 버튼 */}
          <div className="inquiry-button-area">
            <button onClick={handleEdit} className="edit-button">
              수정
            </button>
            <button onClick={handleDelete} className="delete-button">
              삭제
            </button>
          </div>
          {/* 페이징 영역 */}
          <div className="pagination-area">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(pg - 1)}
              disabled={!data.prev} // 이전 페이지 불가능 시 비활성화
            >
              이전
            </button>
            {Array.from(
              { length: data.end - data.start + 1 },
              (_, i) => data.start + i
            ).map((page) => (
              <button
                key={page}
                className={`pagination-button ${pg === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination-button"
              onClick={() => handlePageChange(pg + 1)}
              disabled={!data.next} // 다음 페이지 불가능 시 비활성화
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
