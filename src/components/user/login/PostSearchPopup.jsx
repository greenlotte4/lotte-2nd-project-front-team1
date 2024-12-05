import { useEffect } from "react";

const PostSearchPopup = ({ onSearchComplete, onClose }) => {   // onClose가 전달되는지 확인
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.id = "daum-postcode-script";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.daum && window.daum.Postcode) {
                new window.daum.Postcode({
                    oncomplete: (data) => {
                        const { zonecode, address } = data;
                        onSearchComplete({ zonecode, address });
                        if (onClose) {
                            onClose();  // 여기서 팝업을 닫습니다
                        }
                    },
                }).open();
            }
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [onSearchComplete, onClose]);  // 의존성 배열에 onSearchComplete와 onClose 추가

    return (
        <div>
            <div id="postcode"></div> {/* 우편번호 검색 영역 */}
        </div>
    );
};

export default PostSearchPopup;
