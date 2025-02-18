import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import useEmblaCarousel from "embla-carousel-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import brockImg from "../../assets/brock.jpg";
import khabibImg from "../../assets/khabib.jpg";
import shieldImg from "../../assets/shield.jpg";
import cenaImg from "../../assets/cena.jpg";
import conorImg from "../../assets/conor.jpg";

function Track() {
  const context = useContext(myContext);
  const { mode } = context;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 4,
    skipSnaps: false,
  });

  const Products = [
    {
      id: 1,
      title: "Premium T-shirts",
      description: "100% cotton, soft fabric",
      imgSrc: cenaImg,
    },
    {
      id: 2,
      title: "Classic Sneakers",
      description: "Comfortable & stylish",
      imgSrc: shieldImg,
    },
    {
      id: 3,
      title: "Leather Backpack",
      description: "Durable and spacious",
      imgSrc: khabibImg,
    },
    {
      id: 4,
      title: "Sports Gear",
      description: "High-quality materials",
      imgSrc: conorImg,
    },
    {
      id: 5,
      title: "Limited Edition Merchandise",
      description: "Exclusive designs",
      imgSrc: brockImg,
    },
    {
      id: 6,
      title: "Classic Sneakers",
      description: "Comfortable & stylish",
      imgSrc: shieldImg,
    },
    {
      id: 7,
      title: "Leather Backpack",
      description: "Durable and spacious",
      imgSrc: khabibImg,
    },
    {
      id: 8,
      title: "Sports Gear",
      description: "High-quality materials",
      imgSrc: conorImg,
    },
  ];

  useEffect(() => {
    if (!emblaApi) return; // Wait until emblaApi is defined

    let interval;

    const autoplay = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    };

    const startAutoplay = () => {
      interval = setInterval(() => {
        requestAnimationFrame(autoplay);
      }, 3000);
    };

    if (emblaApi) {
      startAutoplay();
    }

    emblaApi.on("select", () => {
      clearInterval(interval);
      startAutoplay();
    });

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="w-full mt-10 max-w-6xl mx-auto">
      <Carousel>
        <CarouselPrevious className="focus:bg-slate-300  " />
        <CarouselContent ref={emblaRef} className="-ml-4">
          {Products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4 px-4">
              <Card className="p-4 w-full hover:scale-110 shadow-md">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="w-8 h-8" />
      </Carousel>
    </div>
  );
}

export default Track;
