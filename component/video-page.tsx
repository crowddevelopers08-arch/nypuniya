"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"

const youtubeVideos = [
  {
    id: 5,
    youtubeUrl: "https://www.youtube.com/embed/RL6bS5ABTc8",
  },
  {
    id: 6,
    youtubeUrl: "https://www.youtube.com/embed/beGvp-z7Kwk",
  },
  // {
  //   id: 7,
  //   youtubeUrl: "https://www.youtube.com/embed/Qu41fXiC6OY",
  // },
  // {
  //   id: 1,
  //   youtubeUrl: "https://www.youtube.com/embed/3sZZEyCkuR4",
  // },
  // {
  //   id: 2,
  //   youtubeUrl: "https://www.youtube.com/embed/NT-Wi8d7QCU",
  // },
  // {
  //   id: 3,
  //   youtubeUrl: "https://www.youtube.com/embed/x5lCahip-kQ",
  // },
]

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
  return match ? match[1] : null
}

// Function to get YouTube thumbnail URL
const getYouTubeThumbnail = (url: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault') => {
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return '/placeholder.svg'
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

interface YouTubeModalProps {
  video: typeof youtubeVideos[0]
  isOpen: boolean
  onClose: () => void
}

function YouTubeModal({ video, isOpen, onClose }: YouTubeModalProps) {
  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6"
        style={{ fontFamily: "'Outfit', sans-serif" }}
        onClick={onClose}
      >
        {/* Mobile - Larger Container */}
        <div className="relative w-full max-w-[95vw] h-[100vh] md:max-w-xs md:h-auto md:max-w-sm lg:max-w-md xl:max-w-9xl 2xl:max-w-5xl">
          <button
            onClick={onClose}
            className="absolute -top-10 xs:-top-12 sm:-top-14 md:-top-12 right-0 xs:right-2 text-white text-2xl xs:text-3xl sm:text-4xl md:text-3xl hover:text-[#d09a40] transition-colors duration-300 z-10"
          >
            ✕
          </button>
          <div className="relative w-full h-full md:aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={video.youtubeUrl}
              className="w-full h-full md:h-full"
              title="Patient testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  )
}

export function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<typeof youtubeVideos[0] | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Set up auto-scroll interval for mobile
  useEffect(() => {
    if (autoPlay && window.innerWidth < 768) {
      carouselIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % youtubeVideos.length)
      }, 4000)
    }
    
    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current)
      }
    }
  }, [autoPlay, youtubeVideos.length])

  const nextSlide = () => {
    setAutoPlay(false)
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current)
    }
    
    setCurrentSlide((prev) => (prev + 1) % youtubeVideos.length)
    
    setTimeout(() => setAutoPlay(true), 5000)
  }

  const prevSlide = () => {
    setAutoPlay(false)
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current)
    }
    
    setCurrentSlide((prev) => (prev - 1 + youtubeVideos.length) % youtubeVideos.length)
    
    setTimeout(() => setAutoPlay(true), 5000)
  }

  const goToSlide = (index: number) => {
    setAutoPlay(false)
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current)
    }
    
    setCurrentSlide(index)
    
    setTimeout(() => setAutoPlay(true), 5000)
  }

  return (
    <>
      <section className="py-4 xs:py-8 sm:py-10 md:py-10 lg:py-10 bg-gradient-to-br from-gray-50 to-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 xs:mb-10 max-[470px]:mb-4 sm:mb-4 md:mb-6">
            <h2 className="text-2xl xs:text-2xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-[var(--primary)] mb-1 xs:mb-1 sm:mb-3">
              Real Patient, Real Transformation
            </h2>
            <p className="text-base xs:text-md sm:text-md md:text-md text-[#4a5565] max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl mx-auto px-2 xs:px-0">
              Watch our patients share their authentic experiences and remarkable results
            </p>
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden relative max-w-sm mx-auto">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {youtubeVideos.map((video) => (
                  <div key={video.id} className="w-full flex-shrink-0 px-2">
                    <Card
                      className="group cursor-pointer bg-white border-2 border-gray-100 hover:border-[#d09a40]/30 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl w-full"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <CardContent className="p-0">
                        {/* Video Thumbnail with YouTube preview */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={getYouTubeThumbnail(video.youtubeUrl)}
                            alt="YouTube video thumbnail"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              if (target.src.includes('hqdefault')) {
                                target.src = getYouTubeThumbnail(video.youtubeUrl, 'mqdefault')
                              } else if (target.src.includes('mqdefault')) {
                                target.src = getYouTubeThumbnail(video.youtubeUrl, 'default')
                              }
                            }}
                          />
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                            <div className="w-14 h-14 bg-[#0d47a1] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-5 h-5 text-white ml-1" />
                            </div>
                          </div>

                          {/* YouTube Logo Badge */}
                          <div className="absolute top-2 right-2 bg-[#0d47a1] text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                            </svg>
                            YouTube
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group z-10"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700 group-hover:text-[#d09a40] transition-colors" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group z-10"
            >
              <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-[#d09a40] transition-colors" />
            </button>

            {/* Mobile Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {youtubeVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-[#0d47a1] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:flex justify-center">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 max-w-7xl">
              {youtubeVideos.map((video) => (
                <div 
                  key={video.id}
                  className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
                >
                  <Card
                    className="group cursor-pointer bg-white border border-gray-200 hover:border-[#d09a40]/30 transition-all duration-500 transform hover:scale-105 hover:shadow-xl w-full h-full"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <CardContent className="p-0 h-full">
                      {/* Video Thumbnail with YouTube preview */}
                      <div className="relative lg:h-80 lg:w-full overflow-hidden rounded-lg bg-gray-200 h-full">
                        <img
                          src={getYouTubeThumbnail(video.youtubeUrl)}
                          alt="YouTube video thumbnail"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            if (target.src.includes('hqdefault')) {
                              target.src = getYouTubeThumbnail(video.youtubeUrl, 'mqdefault')
                            } else if (target.src.includes('mqdefault')) {
                              target.src = getYouTubeThumbnail(video.youtubeUrl, 'default')
                            }
                          }}
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>

                        {/* YouTube Logo Badge */}
                        <div className="absolute top-2 right-2 bg-[#0d47a1] text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                          YouTube
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Modal */}
      {selectedVideo && (
        <YouTubeModal
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  )
}