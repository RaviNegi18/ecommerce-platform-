import React from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/Layout/Layout";
import BestSeller from "./BestSeller";
import DiscountProducts from "./Discounted";
import Trending from "./Trending";
import NewArrival from "./NewArrivalProducts";
import CustomerReview from "@/components/testimonial/customerReview";
import BannerHome from "./BannerHome";
import { Link } from "react-router-dom";
import ExclusivePics from "./ExclusivePicks";
import TopRated from "./TopRated";
function Home() {
  return (
    <>
      <Layout>
        {/* <HeroSection /> */}
        <BannerHome />
        <Trending />
        <NewArrival />
        <BestSeller />
        <DiscountProducts />
        <ExclusivePics />
        <TopRated />

        {/* <ProductCard /> */}
        {/* <div className="flex justify-center -mt-10 mb-4">
          <Link to={"/allproducts"}>
            <Button variant="outline">See more</Button>
          </Link>
        </div> */}

        <CustomerReview />
      </Layout>
    </>
  );
}

export default Home;
