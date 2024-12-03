/*

    날짜 : 2024/11/25
    이름 : 최영진
    내용 :  다음 주소검색 api

    추가내역
    2024-12-03 최영진 우편번호 검색 모달

*/

import React from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function DaumPostModal({ toggleModal, onAddressSelect }) {

    const modalStyle = {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
        display: 'block', // 항상 보이도록 설정
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // 다른 요소들보다 위에 표시되도록 설정
    };
    return (
        <div style={modalStyle}>
            <div className="modal-content">
                <DaumPostcode
                    style={{
                        width: '100%',
                        height: '400px',
                    }}
                    onComplete={onAddressSelect} // 주소 선택시 호출될 함수
                />
                <button className="close-btn" onClick={toggleModal}>
                    닫기
                </button>
            </div>
        </div>
    );
}

