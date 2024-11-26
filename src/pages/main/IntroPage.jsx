import React from "react";
import Intro from "../../components/main/Intro";
import "../../styles/main/Intro.scss";
import MainLayout from "../../layouts/main/MainLayout";

const IntroPage = () => {
  return (
    <>
      <MainLayout>
        <Intro />
      </MainLayout>
    </>
  );
};

export default IntroPage;
