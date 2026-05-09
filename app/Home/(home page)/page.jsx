
import Hero from "./Hero-Section/Hero";
import Category from "./Category-home/Category";
import HotDeals from "./HotDeals/HotDeals";
import Trending from "./Trending/trending";
import BestSellers from "./BestSellers/BestSellers";
import WhyUs from "./WhyUs/WhyUs";
import Join from "./join/join";

export default function Home() {
    return (
        <div>
            <main>
                <Hero />
                <Category />
                <HotDeals />
                <Trending />
                <BestSellers />
                <WhyUs />
                <Join />
            </main>
        </div>
    );
}