import BrowseStyle from "@/components/BrowseStyle";
import Testimonials from "@/components/Testimonial";
import Hero from "@/components/Hero";
import NewArrival from "@/components/NewArrival";
import TopBrands from "@/components/TopBrands";
import TopSelling from "@/components/TopSelling";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="brands">
        <TopBrands />
      </section>
      <section id="new-arrival">
        <NewArrival />
      </section>
      <TopSelling />
      <BrowseStyle />
      <Testimonials />
    </>
  );
}
