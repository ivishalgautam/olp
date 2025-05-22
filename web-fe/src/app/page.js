import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/featured-products";
import ProductsWithTabs from "@/components/products-with-tabs";
import FeaturedCategories from "@/components/featured-categories";
import Types from "@/components/types";
import ContactForm from "@/components/forms/contact";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <Hero />
        <Types />
        <ContactSection />
      </div>
      <FeaturedCategories />
      <ProductsWithTabs />
      <FeaturedProducts />
    </div>
  );
}
