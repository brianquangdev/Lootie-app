import * as React from "react";
import hamsterLogo from "../assets/hamster-logo.png";

interface HeroSectionProps {
  heroSlide: number;
  setHeroSlide: (slide: number | ((prev: number) => number)) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heroSlide,
  setHeroSlide,
}) => {
  // Hero slides data with background images
  const heroSlides = [
    {
      title: "LET'S LOOT! 🎯",
      subtitle: "Your Web3 Gaming Wallet • Collect • Swap • Quest",
      backgroundImage:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80", // esports event
    },
    {
      title: "EARN REWARDS! 💎",
      subtitle: "Complete Quests • Get Tokens • Build Your Empire",
      backgroundImage:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80", // gamer with crypto overlay
    },
    {
      title: "TRADE & SWAP! 🚀",
      subtitle: "Exchange Tokens • Maximize Profits • Stay Ahead",
      backgroundImage:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80", // futuristic digital art
    },
  ];

  const nextSlide = () => {
    setHeroSlide((prev: number) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setHeroSlide(
      (prev: number) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="relative overflow-hidden border-b-4 border-yellow-300">
      {/* Background Images with Blur */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === heroSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay for better text readability */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-20 text-white py-20 min-h-[500px] flex items-center"
        style={{
          fontFamily:
            "Russo One, Orbitron, Space Grotesk, Montserrat, Arial, sans-serif",
        }}
      >
        <div className="w-full px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left pl-0 lg:pl-8">
              <div className="inline-flex items-center mb-6">
                {(() => {
                  const match =
                    heroSlides[heroSlide].title.match(/(.*?)([^\w\s!]+)?$/);
                  return (
                    <>
                      <span
                        className="text-5xl md:text-7xl font-extrabold tracking-tight"
                        style={{
                          fontFamily: "Montserrat, Inter, Arial, sans-serif",
                          textShadow:
                            "0 2px 0 #fff, 0 4px 0 #ffe066, 0 8px 16px rgba(0,0,0,0.7), 0 12px 32px rgba(0,0,0,0.5)",
                        }}
                      >
                        {match ? match[1].trim() : heroSlides[heroSlide].title}
                      </span>
                      {match && match[2] && (
                        <span className="text-5xl md:text-7xl ml-2 align-middle">
                          {match[2]}
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
              <p className="text-2xl md:text-3xl font-bold text-yellow-300 mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                {heroSlides[heroSlide].subtitle}
              </p>
              <div className="flex justify-center lg:justify-start gap-4 text-4xl md:text-5xl mb-10">
                <span className="animate-bounce drop-shadow-lg">🎮</span>
                <span className="animate-bounce delay-100 drop-shadow-lg">
                  💎
                </span>
                <span className="animate-bounce delay-200 drop-shadow-lg">
                  🚀
                </span>
              </div>
              <button
                className="px-14 py-5 rounded-xl font-black text-2xl border-2 border-yellow-400 bg-yellow-300 text-black shadow-md hover:shadow-lg hover:bg-yellow-400 hover:border-yellow-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-yellow-300/60"
                style={{ textShadow: "0 2px 8px #fff" }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        {/* Hamster Logo absolutely positioned bottom right */}
        <img
          src={hamsterLogo}
          alt="Lootie Hamster Logo"
          className="hidden lg:block w-[28.5rem] h-72 object-bottom object-contain pointer-events-none select-none"
          style={{
            position: "absolute",
            right: "0rem",
            bottom: 0,
            background: "none",
            boxShadow: "none",
          }}
        />
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroSlide(index)}
              className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 hover:scale-125 ${
                index === heroSlide
                  ? "bg-yellow-400 border-yellow-400 shadow-lg"
                  : "bg-transparent hover:bg-white/20"
              }`}
            />
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-yellow-300 transition-all duration-200 p-0 m-0 bg-transparent border-none outline-none"
          style={{ background: "none", border: "none" }}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-yellow-300 transition-all duration-200 p-0 m-0 bg-transparent border-none outline-none"
          style={{ background: "none", border: "none" }}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
