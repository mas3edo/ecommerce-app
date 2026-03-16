import Navbar from "./Navbar/Navbar";
import Hero from "./Hero-Section/Hero";
import Category from "./Category-home/Category";
import Trending from "./Trending/trending";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main>
                <Hero />
                <Category />
                <Trending />
            </main>
        </div>
    );
}