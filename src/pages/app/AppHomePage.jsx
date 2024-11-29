import AppLayout from "../../layouts/app/AppLayout";
import AppHome from "../../components/app/AppHome";
import "../../styles/app/AppHome.scss";

{
  /*
  
  추가내역
  ------------
  2024.11.29 - noneAside 추가

  */
}

export default function AppHomepage() {
  return (
    <AppLayout noneAside={true}>
      <AppHome />
    </AppLayout>
  );
}
