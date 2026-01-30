import RhinoplastyPage from "@/component/about-section";
import RealPatientResults from "@/component/before-after";
import DoctorProfile from "@/component/DoctorProfile";
import NPyunyaAesthetics from "@/component/footer";
import HeroBanner from "@/component/hero-section";
import NanbaComponent from "@/component/image-section";
import ClinicHeader from "@/component/navbar";
import RhinoplastyBenefits from "@/component/Rhinoplasty";
import SchoolCarousel from "@/component/SchoolCarousel";
import { VideoTestimonials } from "@/component/video-page";
import Image from "next/image";

export default function Home() {
  return (
      <div className="App">
      <ClinicHeader />
      <HeroBanner />
      <RhinoplastyPage />
      <RhinoplastyBenefits />
      <DoctorProfile />
      <NanbaComponent />
      <RealPatientResults />
      <SchoolCarousel />
      <VideoTestimonials />
      <NPyunyaAesthetics />
      </div>
  );
}
