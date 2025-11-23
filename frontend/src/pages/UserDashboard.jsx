import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import CategoryList from "./CategoryList";

export default function UserDashboard() {
  const slides = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.webp",
    "/images/slide4.jpg",
    "/images/slide5.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  });

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

 return (
  <div className="w-full max-w-12xl mx-auto pb-6">

    {/* Slider Container */}
    <div className="relative w-full h-64 md:h-80 lg:h-[450px] rounded-lg overflow-hidden shadow-lg">

      {slides.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          alt=""
        />
      ))}

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>

    <div className="mt-6">
      <CategoryList />
    </div>

  </div>
);

}
