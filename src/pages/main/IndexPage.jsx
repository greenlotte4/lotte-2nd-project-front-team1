import React from "react";
import Index from "../../components/main/Index";
import "../../styles/main/Index.scss";
import MainLayout from "../../layouts/main/MainLayout";

const IndexPage = () => {
  return (
    <>
      <MainLayout>
        <Index />
      </MainLayout>
    </>
  );
};

export default IndexPage;
