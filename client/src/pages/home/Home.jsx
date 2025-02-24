import React from "react";
import Layout from "@/Layout/Layout";
import BestSeller from "./BestSeller";
import DiscountProducts from "./Discounted";
import Trending from "./Trending";
import NewArrival from "./NewArrivalProducts";
import CustomerReview from "@/components/testimonial/customerReview";
import BannerHome from "./BannerHome";

import ExclusivePics from "./ExclusivePicks";
import TopRated from "./TopRated";
import { useSelector } from "react-redux";
function Home() {
  const user = useSelector((state) => state.auth.user);
  // console.log("here is the usr", user);
  const Admin = useSelector((state) => state.auth.admin);
  // console.log("Admin is here", Admin);
  return (
    <>
      <Layout>
        <BannerHome />
        <Trending />
        <NewArrival />
        <BestSeller />
        <DiscountProducts />
        <ExclusivePics />
        <TopRated />

        <CustomerReview />
      </Layout>
    </>
  );
}

export default Home;
