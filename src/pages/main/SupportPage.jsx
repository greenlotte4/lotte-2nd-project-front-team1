/* 
    날짜 : 2024/11/26
    이름 : 박수정
    내용 : 메인 문의 페이지생성

    추가내역
    -------------
    00.00  000 - 00000
*/

import React from 'react';
import Support from '../../components/main/Support';
import '../../styles/main/Support.scss';
import '../../styles/main/Include.scss';
import MainLayout from '../../layouts/main/MainLayout';

const SupportPage = () => {
  return (
    <MainLayout>
      <Support />
    </MainLayout>
  );
};

export default SupportPage;
