import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  );
}
