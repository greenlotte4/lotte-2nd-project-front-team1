import Best from "../../components/main/Best";
import Slider from "../../components/main/Slider";
import Quick from "../../components/main/Quick";
import Latest from "../../components/main/Latest";
import Info from "../../components/main/Info";
import DefaultLayout from "../../layouts/DefaultLayout";
export default function MainPage(){
    return (
      <DefaultLayout>
        <main>
          <Slider />
          <Best />
          <Quick />
          <Latest />
          <Info />
        </main>
      </DefaultLayout>
    );
  };