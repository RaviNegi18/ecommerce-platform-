import React, { useContext } from "react";
import myContext from "@/context/data/myContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    id: 1,
    name: "Kamal Nayan Upadhyay",
    role: "Senior Product Designer",
    image: "https://ecommerce-sk.vercel.app/img/kamal.png",
    review:
      "Amazing product quality and fast shipping! Will definitely shop again.",
  },
  {
    id: 2,
    name: "React Js",
    role: "UI Developer",
    image: "https://cdn-icons-png.flaticon.com/128/2763/2763444.png",
    review:
      "The customer service was fantastic. They helped me choose the right product!",
  },
  {
    id: 3,
    name: "React Js",
    role: "CTO",
    image: "https://webknudocs.vercel.app/logo/react.png",
    review:
      "Great experience! The website is easy to navigate, and the checkout process was seamless.",
  },
];

function CustomerReview() {
  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";

  return (
    <section
      className={`py-10 px-5 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="container mx-auto text-center">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Customer Reviews
        </h1>
        <h2
          className={`text-xl mt-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          What our <span className="text-pink-500">customers</span> say
        </h2>

        <Carousel className="relative mt-6">
          <CarouselPrevious
            className={`w-12 h-12 ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-900 text-white hover:bg-gray-700"
            } rounded-full absolute left-3 top-1/2 transform -translate-y-1/2 z-10`}
          />
          <CarouselContent className="flex gap-4">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card
                  className={`shadow-lg ${
                    isDarkMode ? "bg-gray-800 shadow-gray-700" : "bg-white"
                  }`}
                >
                  <CardHeader className="flex flex-col items-center justify-center">
                    <Avatar
                      className={`w-20 h-20 border-2 ${
                        isDarkMode ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle
                      className={`text-lg font-semibold mt-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {review.name}
                    </CardTitle>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {review.role}
                    </p>
                  </CardHeader>
                  <Separator
                    className={`my-2 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  />
                  <CardContent>
                    <p
                      className={`text-center line-clamp-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      "{review.review}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            className={`w-12 h-12 ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-900 text-white hover:bg-gray-700"
            } rounded-full absolute right-3 top-1/2 transform -translate-y-1/2 z-10`}
          />
        </Carousel>
      </div>
    </section>
  );
}

export default CustomerReview;
