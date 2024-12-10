import { useState } from "react";
import { changeNewEmail } from "../../../api/user/userAPI";

export default function EmailRow({ email, setEmail }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempEmail, setTempEmail] = useState(email);  // 임시 상태 추가

    const handleSave = async() => {
      const response = await changeNewEmail(tempEmail);
      if(response.status === 200){
        alert("이메일이 변경되었습니다.");
        setEmail(tempEmail);
        setIsEditing(false);
      } else{
        alert("이메일 변경 중 오류가 발생했습니다.")
      }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempEmail(email);  // 취소 시 원래 값으로 복원
    };

    const handleEdit = () => {
        setIsEditing(true);
        setTempEmail(email);  // 수정 시작 시 원래 값을 임시 상태로 저장
    };

    const handleChange = (e) => {
        setTempEmail(e.target.value);  // 수정하는 값은 임시 상태에 저장
    };

    return (
        <tr>
            <td>이메일</td>
            <td>
                {isEditing ? (
                    <input
                        type="email"
                        value={tempEmail}  // 임시 상태값으로 표시
                        onChange={handleChange}
                    />
                ) : (
                    email
                )}
                {isEditing ? (
                    <div className="buttonGroup ">

                        <button onClick={handleSave} className="saveButton">저장</button>
                        <button onClick={handleCancel} className="cancelButton">취소</button>
                    </div>
                ) : (
                    <button onClick={handleEdit} className="setingButton">이메일 변경</button>
                )}
            </td>
        </tr>
    );
}
