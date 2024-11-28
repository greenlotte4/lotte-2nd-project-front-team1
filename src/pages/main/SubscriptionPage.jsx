/* 
    날짜 : 2024/11/26
    이름 : 박수정
    내용 : 메인 요금안내 페이지생성

    추가내역
    -------------
    00.00  000 - 00000
*/

import React from 'react';
import Subscription from '../../components/main/Subscription';
import '../../styles/main/Include.scss';
import '../../styles/main/Subscription.scss';
import MainLayout from '../../layouts/main/MainLayout';

const SubscriptionPage = () => {
  return (
    <MainLayout>
      <Subscription />
    </MainLayout>
  );
};

export default SubscriptionPage;

