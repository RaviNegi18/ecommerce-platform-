import React from "react";
import Layout from "@/Layout/Layout";
import BestSeller from "./BestSeller";
import DiscountProducts from "./Discounted";
import Trending from "./Trending";
import NewArrival from "./NewArrivalProducts";
import BannerHome from "./BannerHome";
import HeroSection from "./HeroSection";
import ExclusivePics from "./ExclusivePicks";
import TopRated from "./TopRated";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const Admin = useSelector((state) => state.auth.admin);

  return (
    <>
      <Layout className="flex flex-col gap-10">
        <HeroSection />
        <BannerHome />
        <Trending />
        <NewArrival />
        <BestSeller />
        <DiscountProducts />
        <ExclusivePics />
        <TopRated />
      </Layout>
    </>
  );
}

export default Home;
