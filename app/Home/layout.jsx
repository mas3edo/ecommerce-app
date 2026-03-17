import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";

function HomeLayout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;