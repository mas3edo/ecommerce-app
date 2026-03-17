
import Navbar from "../components/Navbar/Navbar";
import Hero from "./Hero-Section/Hero";
import Category from "./Category-home/Category";
import Trending from "./Trending/trending";
import Join from "./join/join";
import Footer from "../components/footer/Footer";

export default function Home() {
    return (
        <div>

            <main>
                <Hero />
                <Category />
                <Trending />
                <Join />
            </main>
        </div>
    );
}