import { Link } from "react-router-dom";

export default function AdminUserItem({ user }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // "2024-12-03T08:45:26.000+00:00" → "2024-12-03"
  };
  function convertGrage(grade) {
    switch (grade) {
      case 1:
        return "FREE";
      case 2:
        return "PREMIUM";
      case 3:
        return "ENTERPRISE";
    }
  }
  function convertUserGrage(usergrade) {
    switch (usergrade) {
      case "USER":
        return "USER";
      case "ADMIN":
        return "ADMIN";
    }
  }
  function convertStatus(status) {
    switch (status) {
      case "NORMAL":
        return "정상";
      case "BANED":
        return "정지";
      case "DELETED":
        return "탈퇴";
      case "SLEEP":
        return "휴먼";
      default:
        return "정상"; // 기본값
    }
  }

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{user.username}</td>
      <td>{user.userId}</td>
      <td>
        <select name="pricegrade" defaultValue={convertGrage(user.plan.planId)}>
          <option value="FREE">FREE</option>
          <option value="PREMIUM">PREMIUM</option>
          <option value="ENTERPRISE">ENTERPRISE</option>
        </select>
      </td>
      <td>
        <select name="usergrade" defaultValue={convertUserGrage(user.role)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </td>
      <td>{formatDate(user.createdAt)}</td>
      <td>{formatDate(user.updatedAt)}</td>
      <td>
        <select name="status" defaultValue={convertStatus(user.status)}>
          <option value="정상">정상</option>
          <option value="정지">정지</option>
          <option value="탈퇴">탈퇴</option>
          <option value="휴먼">휴먼</option>
        </select>
      </td>
      <td>
        <Link to={`/user-details/qwer1234`} className="details-button">
          자세히
        </Link>
      </td>
    </tr>
  );
}
