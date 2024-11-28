/* 
    날짜 : 2024/11/26
    이름 : 박수정
    내용 : 메인 기능 페이지생성

    추가내역
    -------------
    00.00  000 - 00000
*/

import React from 'react';
import Func from '../../components/main/Func';
import '../../styles/main/Include.scss';
import '../../styles/main/Func.scss';
import MainLayout from '../../layouts/main/MainLayout';

const FuncPage = () => {
  return (
    <MainLayout>
      <Func />
    </MainLayout>
  );
};

export default FuncPage;
