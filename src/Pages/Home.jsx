import React from "react";
import { useLoaderData } from "react-router";
import Card from "../Components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const data = useLoaderData();

  const slides = [
    {
      text: "Warm hugs & winter snuggles ",
    },
    {
      text: "Cozy cats and fluffy scarves",
    },
    {
      text: "Paws, snow & hot cocoa vibes",
    },
    {
      text: "Healty, Wealthy & Happy",
    },
  ];

  
  const winterTips = [
    "Keep pets warm with cozy sweaters and blankets.",
    "Limit time outdoors during extreme cold.",
    "Check paws for snow/ice and protect with booties.",
    "Provide fresh water; prevent it from freezing.",
    "Increase food slightly if pets are more active outside.",
  ];

  
  const experts = [
    {
      name: "Dr. Emily Watson",
      role: "Pet Nutritionist",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Michael Smith",
      role: "Veterinary Surgeon",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Dr. Sarah Lee",
      role: "Animal Behaviorist",
      img: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      name: "Dr. John Doe",
      role: "General Vet",
      img: "https://randomuser.me/api/portraits/men/47.jpg",
    },
  ];

  return (
    <div>
      
      <div className="w-full mb-12">
        <Swiper
        
          
          autoplay={{ delay: 1000,  }}
          pagination={{ clickable: true }} 
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-b from-pink-200 to-pink-300 rounded-2xl"></div>
                <h2 className="relative text-pink-700 text-3xl md:text-5xl font-bold text-center px-4">
                  {slide.text}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    <h1 className="font-bold text-5xl text-center mb-20 underline text-pink-700">Popular Winter Care Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-y-10 mb-10">
        {data.map((i) => (
          <Card key={i.serviceId} i={i} />
        ))}
      </div>
      
      <section className="mb-20 px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-700">
          Winter Care Tips for Pets
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {winterTips.map((tip, idx) => (
            <li
              key={idx}
              className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <p className="text-lg">{tip}</p>
            </li>
          ))}
        </ul>
      </section>

      
      <section className="mb-20 px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-700">
          Meet Our Expert Vets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {experts.map((vet, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={vet.img}
                alt={vet.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{vet.name}</h3>
              <p className="text-gray-600">{vet.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
