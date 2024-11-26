import Header from '../../components/main/Header';
import Footer from '../../components/main/Footer';
export default function MainLayout({children}){
    return(
        <div>
        <Header />
            {children}
        <Footer />
        </div>
    )
}