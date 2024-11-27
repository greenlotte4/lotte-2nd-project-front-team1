import { useState } from "react";

export default function StatusMessage() {
    const [isEditing, setIsEditing] = useState(false);
    const [statusMessage, setStatusMessage] = useState("오늘 하루도 열심히! 👏");
    const [cansleMessage, setCansleMessage] = useState("오늘 하루도 열심히! 👏");
    const messageHandleSave = () => {
        setIsEditing(false);
        console.log("상태 메시지 저장됨:", statusMessage);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setStatusMessage(cansleMessage);
    }
    return (

        <tr className="statusM">
            <td className="leftColumn">상태 메시지</td>
            <td className="rightColumn">
                <div>

                    {isEditing ? (
                        <textarea
                            value={statusMessage}
                            onChange={(e) => setStatusMessage(e.target.value)}
                        />
                    ) : (
                        <textarea readOnly
                            value={statusMessage}
                            onChange={(e) => setStatusMessage(e.target.value)}
                        />
                    )}
                </div>

                {isEditing ? (
                    <div className="buttonGroup ">
                        <button onClick={messageHandleSave} className="saveButton">저장</button>
                        <button onClick={handleCancel} className="cancelButton">취소</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="setingButton">상태 변경</button>
                )}
            </td>
        </tr>

    );
}
