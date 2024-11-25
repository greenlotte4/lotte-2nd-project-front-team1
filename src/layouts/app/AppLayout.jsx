import AppHeader from "../../components/app/include/AppHeader";
import "../../styles/App/AppCommon.scss";

// eslint-disable-next-line react/prop-types
export default function ProjectLayout({ children }) {
  return (
    <div id="container" className="Appcontainer">
      <AppHeader />
      <div className="content-container">{children}</div>
    </div>
  );
}
