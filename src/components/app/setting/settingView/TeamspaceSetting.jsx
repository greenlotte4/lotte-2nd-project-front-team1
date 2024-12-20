import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteOutTeam,
  getJoinedRooms,
  getMakeTeam,
  postJoinTeam,
} from "../../../../api/setting/SettingAPI";

export default function TeamspaceSetting() {
  const user = useSelector((state) => state.userSlice);
  const userid = user.userid;
  const [serialNumber, setSerialNumber] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [joinedRooms, setJoinedRooms] = useState([]);

  useEffect(() => {
    const fetchJoinedRooms = async () => {
      try {
        const response = await getJoinedRooms(userid);
        console.log(response);
        if (response.status === 204) {
          // 방 목록이 없을 경우 처리
          setJoinedRooms([]);
        } else {
          const formattedRooms = response.map((room) => ({
            id: room.teamSpaceId, // 팀 방 ID
            roomName: room.roomname, // 방 이름
            owner: room.user.username, // 방장 이름
            serialnumber: room.serialnumber,
            ownerid: room.user.userId,
          }));
          setJoinedRooms(formattedRooms);
        }
      } catch (error) {
        console.error("참여 중인 방 목록을 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJoinedRooms();
  }, [user.userid]);

  const handleJoinTeam = async () => {
    try {
      const requestData = {
        userId: user.userid,
        serialnumber: serialNumber,
      };

      const response = await postJoinTeam(requestData);

      setJoinedRooms((prevRooms) => [
        ...prevRooms,
        {
          id: response.teamSpaceId,
          roomName: response.roomname,
          owner: response.user.username,
        },
      ]);

      alert("팀 참가에 성공했습니다!");
      setSerialNumber("");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          alert("잘못된 초대 코드입니다. 다시 입력해주세요.");
        } else if (status === 409) {
          if (
            data.error ===
            "최대 협업 인원 수를 초과했습니다. 추가 멤버를 초대할 수 없습니다."
          ) {
            alert(data.error); // 최대 인원 초과 메시지 출력
          } else {
            alert("이미 팀에 참가했습니다.");
          }
        } else {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        console.error("네트워크 오류 또는 서버와의 연결 문제:", error);
        alert("서버와의 연결에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    }
  };

  const handleCreateTeam = async () => {
    try {
      const requestData = {
        userId: user.userid,
        roomName: roomName,
      };

      const response = await getMakeTeam(requestData);

      setJoinedRooms((prevRooms) => [
        ...prevRooms,
        {
          id: response.teamSpaceId,
          roomName: response.roomname,
          owner: response.user.username,
        },
      ]);

      alert("팀 생성을 성공했습니다!");
      setRoomName("");
    } catch (error) {
      // 에러 처리
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          alert(data.message || "요청이 잘못되었습니다. 다시 시도해주세요.");
        } else if (status === 409) {
          alert(
            data.message || "사용자의 최대 생성 프로젝트 수를 초과했습니다."
          );
        } else {
          alert(
            "팀 생성 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요."
          );
        }
      } else {
        console.error("네트워크 오류 또는 서버와의 연결 문제:", error);
        alert("서버와의 연결에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    }
  };

  const handleLeaveRoom = async (roomId) => {
    const confirmed = window.confirm("정말로 나가시겠습니까?");
    if (!confirmed) {
      return; // 사용자가 "아니오"를 클릭하면 아무 작업도 하지 않음
    }
    try {
      const requestData = {
        userId: user.userid,
        teamspaceId: roomId,
      };
      const isDeleted = await deleteOutTeam(requestData);

      if (isDeleted) {
        setJoinedRooms((prevRooms) =>
          prevRooms.filter((room) => room.id !== roomId)
        );
        alert("성공적으로 방을 나갔습니다.");
      } else {
        alert("방 나가기에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("방 나가기 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("방 나가기 중 오류 발생:", error);
    }
  };

  return (
    <div className="projectSetting">
      <div className="switchSection">
        <h5>팀 참가</h5>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="팀 코드를 입력하세요"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
          <button onClick={handleJoinTeam}>참가하기</button>
        </div>
      </div>

      <div className="switchSection">
        <h5>방 생성</h5>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="방 이름을 입력하세요"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={handleCreateTeam}>생성하기</button>
        </div>
      </div>

      <div className="switchSection">
        <h5>참여 중인 방</h5>
        {joinedRooms.length === 0 ? (
          <p>참여 중인 방이 없습니다.</p> // 방이 없을 경우 표시
        ) : (
          <table className="roomTable">
            <thead>
              <tr>
                <th>참여 중인 방</th>
                <th>방장</th>
                <th>초대코드</th>
                <th>나가기</th>
              </tr>
            </thead>
            <tbody>
              {joinedRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomName}</td>
                  <td>{room.owner}</td>
                  <td>
                    {room.ownerid === userid
                      ? room.serialnumber
                      : "방장만 확인가능"}
                  </td>
                  <td>
                    <button onClick={() => handleLeaveRoom(room.id)}>
                      나가기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
