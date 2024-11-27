import { useState } from "react";

export default function ContactRow({ contact, setContact }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempContact, setTempContact] = useState(contact);  // 임시 상태 추가

    const handleSave = () => {
        setIsEditing(false);
        console.log("연락처 저장됨:", contact);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempContact(contact);  // 취소 시 원래 값으로 복원
    };

    const handleEdit = () => {
        setIsEditing(true);
        setTempContact(contact);  // 수정 시작 시 원래 값을 임시 상태로 저장
    };

    const handleChange = (e) => {
        setTempContact(e.target.value);  // 수정하는 값은 임시 상태에 저장
    };

    return (
        <tr>
            <td>연락처</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={tempContact}  // 임시 상태값으로 표시
                        onChange={handleChange}
                    />
                ) : (
                    contact
                )}
                {isEditing ? (
                    <div className="buttonGroup ">
                        <button onClick={handleSave} className="saveButton">저장</button>
                        <button onClick={handleCancel} className="cancelButton">취소</button>
                    </div>
                ) : (
                    <button onClick={handleEdit} className="setingButton">연락처 변경</button>
                )}
            </td>
        </tr>
    );
}
