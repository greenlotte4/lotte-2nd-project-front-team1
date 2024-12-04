import { useEffect } from "react";

const PostSearchPopup = ({ onSearchComplete }) => {
    useEffect(() => {
        // 스크립트를 매번 새로 로드하도록 변경
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.id = "daum-postcode-script"; // 중복 방지를 위한 ID 설정
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.daum && window.daum.Postcode) {
                new window.daum.Postcode({
                    oncomplete: (data) => {
                        const { zonecode, address } = data;
                        onSearchComplete({ zonecode, address });
                        // 우편번호 검색 후 팝업 닫기
                        if (onClose) {
                            console.log("onClose 호출됨");
                            onClose();
                        }
                    },
                }).open();
            }
        };
        const handleClose = () => {
            console.log("우편번호 팝업 닫기 호출됨");  // onClose 호출 전 로그 확인
            onClose(); // 부모에서 전달한 onClose 호출
        };
        // 언마운트될 때 스크립트 제거
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [onSearchComplete, onclose]); // onSearchComplete가 변경되면 다시 실행

    return (
        <div>
            <div id="postcode"></div> {/* 우편번호 검색이 진행되는 영역 */}
        </div>
    );
};

export default PostSearchPopup;
