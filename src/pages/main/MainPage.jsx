import Best from "../../components/main/Best";
import Slider from "../../components/main/Slider";
import Quick from "../../components/main/Quick";
import Latest from "../../components/main/Latest";
import Info from "../../components/main/Info";
export default function MainPage(){
    return (
        <main>
          <Slider />
          <Best />
          <Quick />
          <Latest />
          <Info />
        </main>
    );
  };