import { useState } from "react";
import { changeStatusMessage } from "../../../api/user/userAPI";

export default function StatusMessage({ statusMessage, setStatusMessage }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempMessage, setTempMessage] = useState(statusMessage);

    const messageHandleSave = async () => {
      const response = await changeStatusMessage(tempMessage);

      if(response.status === 200 ){
        alert("상태메세지가 변경되었습니다.");
        setStatusMessage(tempMessage); // 상태 메시지 업데이트
        setIsEditing(false);
      }else{
        alert("변경중 오류가 발생했습니다.")
      }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setStatusMessage(statusMessage);
    }

    const handleEdit = () => {
        setIsEditing(true);
        setStatusMessage(statusMessage);
    }
    const handleChange = (e) => {
        setTempMessage(e.target.value);
    }
    return (

        <tr className="statusM">
            <td className="leftColumn">상태 메시지</td>
            <td className="rightColumn">
                <div>
                    {isEditing ? (
                        <textarea
                            value={tempMessage}
                            onChange={handleChange}
                        />
                    ) : (
                        <textarea
                            value={statusMessage}
                            onChange={handleChange}
                        />
                    )}
                </div>

                {isEditing ? (
                    <div className="buttonGroup ">
                        <button onClick={messageHandleSave} className="saveButton">저장</button>
                        <button onClick={handleCancel} className="cancelButton">취소</button>
                    </div>
                ) : (
                    <button onClick={handleEdit} className="setingButton">상태 변경</button>
                )}
            </td>
        </tr>

    );
}
