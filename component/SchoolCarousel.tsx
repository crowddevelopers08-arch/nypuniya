
"use client";

import React, { useState, useEffect, useRef, CSSProperties } from "react";

const SchoolCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState("desktop");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Anaesthesia for Comfort",
      icon: (
        <img
          src="/img1.png"
          alt="Anaesthesia for Comfort"
          className="w-full h-full object-contain"
        />
      ),
      description:
        "Your comfort is our priority. Receive either general anaesthesia for a peaceful slumber or local anaesthesia with sedation for relaxation. Typically, general anaesthesia is preferred.",
    },
    {
      id: 2,
      title: "Incisions with Precision",
      icon: (
        <img
          src="/img2.png"
          alt="Anaesthesia for Comfort"
          className="w-full h-full object-contain"
        />
      ),
      description:
        "Depending on the chosen approach (open or closed), incisions are strategically made inside the nostrils or across the columella. Choice depends on your goals and the surgeon's expertise.",
    },
    {
      id: 3,
      title: "Revealing Nasal Structures",
      icon: (
        <img
          src="/img3.png"
          alt="Anaesthesia for Comfort"
          className="w-full h-full object-contain"
        />
      ),
      description:
        "Incisions grant access to bones, cartilage, and soft tissues. Meticulous techniques reshape elements according to the surgical plan, achieving symmetry and desired adjustments.",
    },
    {
      id: 4,
      title: "Custom Enhancements with Grafts",
      icon: (
        <img
          src="/img4.png"
          alt="Anaesthesia for Comfort"
          className="w-full h-full object-contain"
        />
      ),
      description:
        "Additional tissue grafts or implants, often cartilage from the septum, ear, or rib, may be introduced for perfection in specific areas.",
    },
    {
      id: 5,
      title: "Artful Closure",
      icon: (
        <img
          src="/img5.png"
          alt="Anaesthesia for Comfort"
          className="w-full h-full object-contain"
        />
      ),
      description:
        "Sculpting complete, incisions are delicately closed with sutures. Dissolvable sutures fade over time, while non-dissolvable ones are removed during a follow-up.",
    },
    {
      id: 6,
      title: "Support and Healing:",
      icon: (
        <img
          src="/img6.png"
          alt="Anaesthesia for Comfort"
          className="w-full h-full object-contain"
        />
      ),
      description:
        "Nasal packing or splints gently support and minimize post-surgery swelling and bleeding. Typically removed within days, revealing the artistry beneath.",
    },
    {
      id: 7,
      title: "Monitored Recovery",
      icon: (
        <img
          src="/img7.png"
          alt="Anaesthesia for Comfort"
          className="w-full h-full object-contain"
        />
      ),
      description:
        "Post-surgery, you're transferred to a recovery room. Vital signs are monitored for hours, and patients are usually discharged the same day, ready to embrace their transformed selves.",
    },
  ];

  // Detect screen size with comprehensive breakpoints
  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreenSize("mobile");
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width >= 640 && width < 1024) {
        setScreenSize("tablet");
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else {
        setScreenSize("desktop");
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    const updateContainerWidth = () => {
      if (scrollContainerRef.current?.parentElement) {
        const width = scrollContainerRef.current.parentElement.clientWidth;
        setContainerWidth(width);
      }
    };

    handleResize();
    updateContainerWidth();

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", updateContainerWidth);

    // Check for container width changes
    const resizeObserver = new ResizeObserver(updateContainerWidth);
    if (scrollContainerRef.current?.parentElement) {
      resizeObserver.observe(scrollContainerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", updateContainerWidth);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [screenSize, currentIndex, isClient]);

  // Get visible cards count based on screen size
  const getVisibleCards = () => {
    if (!isClient) return 3; // Default for SSR
    
    const width = containerWidth || window.innerWidth;

    if (width < 480) return 1; // Extra small mobile
    if (width < 640) return 1; // Mobile
    if (width < 768) return 2; // Small tablet
    if (width < 1024) return 2; // Tablet
    if (width < 1280) return 3; // Desktop
    return 3; // Large desktop
  };

  // Calculate card width dynamically based on container
  const getCardWidth = () => {
    const visibleCards = getVisibleCards();
    const gap = getGap();
    const containerPadding = getContainerPadding();

    if (scrollContainerRef.current?.parentElement) {
      const containerWidth =
        scrollContainerRef.current.parentElement.clientWidth;
      const availableWidth = containerWidth - containerPadding * 2;
      return Math.floor(
        (availableWidth - gap * (visibleCards - 1)) / visibleCards,
      );
    }

    // Fallback values
    switch (screenSize) {
      case "mobile":
        return 280;
      case "tablet":
        return 300;
      case "desktop":
        return 320;
      default:
        return 320;
    }
  };

  const getGap = () => {
    if (!isClient) return 32; // Default for SSR
    
    const width = containerWidth || window.innerWidth;

    if (width < 480) return 12;
    if (width < 640) return 16;
    if (width < 768) return 20;
    if (width < 1024) return 24;
    if (width < 1280) return 28;
    return 32;
  };

  const getContainerPadding = () => {
    if (!isClient) return 48; // Default for SSR
    
    const width = containerWidth || window.innerWidth;

    if (width < 480) return 16;
    if (width < 640) return 20;
    if (width < 768) return 24;
    if (width < 1024) return 32;
    if (width < 1280) return 40;
    return 48;
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current && isClient) {
      const cardWidth = getCardWidth();
      const gap = getGap();
      const scrollPosition = index * (cardWidth + gap);

      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (!isClient) return;
    
    const visibleCards = getVisibleCards();
    let nextIndex;
    if (currentIndex + visibleCards >= cards.length) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    setCurrentIndex(nextIndex);
    scrollToCard(nextIndex);
  };

  const handlePrev = () => {
    if (!isClient) return;
    
    const visibleCards = getVisibleCards();
    let prevIndex;
    if (currentIndex - 1 < 0) {
      prevIndex = cards.length - visibleCards;
    } else {
      prevIndex = currentIndex - 1;
    }
    setCurrentIndex(prevIndex);
    scrollToCard(prevIndex);
  };

  const handleIndicatorClick = (index: number) => {
    if (!isClient) return;
    
    setCurrentIndex(index);
    scrollToCard(index);
  };

  // Responsive styles using inline CSS with responsive units
  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(1rem, 5vw, 2rem)",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    title: {
      fontWeight: "700",
      textAlign: "center",
      margin: "0 auto clamp(0rem, 5vw, 1rem) auto",
      color: "#002171",
      padding: "0 clamp(1rem, 3vw, 2rem)",
      width: "100%",
      maxWidth: "min(1200px, 90vw)",
      lineHeight: "1.2",
    },
    carouselWrapper: {
      width: "100%",
      maxWidth: "min(1400px, 95vw)",
      position: "relative",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    carouselContainer: {
      width: "100%",
      overflow: "hidden",
      padding: `0 ${getContainerPadding()}px`,
    },
    carouselTrack: {
      display: "flex",
      gap: `${getGap()}px`,
      padding: "clamp(1rem, 3vw, 1.5rem) 0",
      overflowX: "auto",
      scrollBehavior: "smooth",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      width: "100%",
    },
    carouselCard: {
      flex: "0 0 auto",
      width: `${getCardWidth()}px`,
    },
    card: {
      borderRadius: "clamp(1.25rem, 4vw, 2.5rem)",
      padding: "clamp(1.25rem, 3vw, 2rem)",
      width: "100%",
      minHeight: "300px",
      height: "clamp(280px, 50vh, 380px)",
      maxHeight: "230px",
      background: "white",
      border: "3px solid #0d47a1",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      boxSizing: "border-box",
    },
    iconWrapper: {
      marginBottom: "clamp(1rem, 3vw, 1.25rem)",
      color: "#0d47a1",
      width: "clamp(48px, 10vw, 64px)",
      height: "clamp(48px, 10vw, 64px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    titleText: {
      fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
      fontWeight: "700",
      marginBottom: "clamp(0.5rem, 2vw, 0.875rem)",
      textAlign: "center",
      color: "#002171",
      lineHeight: "1.3",
      padding: "0",
    },
    description: {
      textAlign: "center",
      marginBottom: "clamp(1rem, 3vw, 1.5rem)",
      fontSize: "clamp(0.75rem, 2vw, 0.9375rem)",
      lineHeight: "1.6",
      color: "#6b7280",
      padding: "0",
      flex: "1",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: "4",
      WebkitBoxOrient: "vertical",
    },
    arrowButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "clamp(36px, 8vw, 48px)",
      height: "clamp(36px, 8vw, 48px)",
      borderRadius: "50%",
      background: "#0d47a1",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "clamp(18px, 4vw, 24px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: "10",
      transition: "all 0.3s ease",
    },
    arrowLeft: {
      left: "clamp(0px, 1vw, 10px)",
    },
    arrowRight: {
      right: "clamp(0px, 1vw, 10px)",
    },
    indicators: {
      display: "flex",
      gap: "clamp(6px, 1.5vw, 12px)",
      marginTop: "clamp(1.5rem, 4vw, 3rem)",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      flexWrap: "wrap",
      padding: "0 clamp(1rem, 3vw, 2rem)",
    },
    indicator: {
      width: "clamp(8px, 2vw, 12px)",
      height: "clamp(8px, 2vw, 12px)",
      borderRadius: "50%",
      background: "#bbdefb",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      flexShrink: 0,
    },
    indicatorActive: {
      width: "clamp(24px, 6vw, 32px)",
      height: "clamp(8px, 2vw, 12px)",
      borderRadius: "9999px",
      background: "#0d47a1",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      flexShrink: 0,
    },
  };

  const scrollbarHideStyle = isClient ? `
    .carousel-track-hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 480px) {
      .carousel-container {
        padding: 0 12px;
      }
    }
    @media (max-width: 768px) {
      .arrow-buttons {
        display: ${containerWidth < 480 ? "none" : "flex"};
      }
    }
  ` : '';

  const visibleCardsCount = getVisibleCards();

  return (
    <>
      {isClient && <style>{scrollbarHideStyle}</style>}
      <div style={styles.container}>
        <h1 style={styles.title} className="text-2xl md:text-4xl">
          Rhinoplasty Procedure At Nypunya Aesthetics Clinic Bangalore
        </h1>

        <div style={styles.carouselWrapper}>
          {isClient && containerWidth >= 480 && (
            <button
              onClick={handlePrev}
              style={{
                ...styles.arrowButton,
                ...styles.arrowLeft,
              }}
              className="arrow-buttons"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                e.currentTarget.style.background = "#1565c0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                e.currentTarget.style.background = "#0d47a1";
              }}
              aria-label="Previous card"
            >
              ←
            </button>
          )}

          <div style={styles.carouselContainer} className="carousel-container">
            <div
              ref={scrollContainerRef}
              className="carousel-track-hide-scrollbar"
              style={styles.carouselTrack}
            >
              {cards.map((card) => (
                <div key={card.id} style={styles.carouselCard}>
                  <div
                    style={styles.card}
                    onMouseEnter={(e) => {
                      if (isClient) {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                          "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isClient) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                      }
                    }}
                  >
                    <div style={styles.iconWrapper}>{card.icon}</div>

                    <h2 style={styles.titleText}>{card.title}</h2>

                    <p style={styles.description}>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isClient && containerWidth >= 480 && (
            <button
              onClick={handleNext}
              style={{
                ...styles.arrowButton,
                ...styles.arrowRight,
              }}
              className="arrow-buttons"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                e.currentTarget.style.background = "#1565c0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                e.currentTarget.style.background = "#0d47a1";
              }}
              aria-label="Next card"
            >
              →
            </button>
          )}
        </div>

        {isClient && (
          <div style={styles.indicators}>
            {cards.map(
              (_, index) =>
                index <= cards.length - visibleCardsCount && (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    style={
                      index === currentIndex
                        ? styles.indicatorActive
                        : styles.indicator
                    }
                    onMouseEnter={(e) => {
                      if (isClient && index !== currentIndex) {
                        e.currentTarget.style.background = "#64b5f6";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isClient && index !== currentIndex) {
                        e.currentTarget.style.background = "#bbdefb";
                      }
                    }}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ),
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SchoolCarousel;