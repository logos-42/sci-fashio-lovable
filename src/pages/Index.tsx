
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DesignerStudio from "@/components/DesignerStudio";
import AIFeatures from "@/components/AIFeatures";
import FashionCard from "@/components/FashionCard";
import Footer from "@/components/Footer";

// Sample fashion designs for gallery
const fashionDesigns = [
  {
    id: 1,
    title: "Modern Qipao",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1541840031508-7624f5b989e8?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Linen Jacket",
    category: "Contemporary",
    image: "https://images.unsplash.com/photo-1548864789-7393f2b4d800?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Silk Dress",
    category: "Elegant",
    image: "https://images.unsplash.com/photo-1630145097633-28eb14a3c2df?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    title: "Minimalist Suit",
    category: "Professional",
    image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80&w=1000"
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay and set page as loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Page transition animations
  const pageClasses = isLoaded
    ? "opacity-100 transition-opacity duration-500"
    : "opacity-0";

  return (
    <div className={pageClasses}>
      <Navbar />
      
      <main>
        <Hero />
        <DesignerStudio />
        <AIFeatures />
        
        {/* Gallery Section */}
        <section id="gallery" className="section-padding">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="chip mb-4">Inspiration</div>
              <h2 className="heading-lg mb-6">
                Explore AI-generated designs
              </h2>
              <p className="body-md text-fashion-600 max-w-xl mx-auto">
                Browse through a collection of designs created with our AI fashion platform.
                Get inspired and create your own unique pieces.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {fashionDesigns.map((design, index) => (
                <FashionCard
                  key={design.id}
                  image={design.image}
                  title={design.title}
                  category={design.category}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="section-padding bg-fashion-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="chip mb-4">About Us</div>
              <h2 className="heading-lg mb-6">
                Revolutionizing fashion design with AI
              </h2>
              <p className="body-md text-fashion-600 mb-6">
                We're a team of fashion designers, AI engineers, and industry experts 
                working to transform the fashion design process. Our platform combines 
                cutting-edge artificial intelligence with intuitive design tools to make 
                fashion design more accessible, efficient, and innovative.
              </p>
              <p className="body-md text-fashion-600 mb-8">
                Our mission is to empower designers of all levels to bring their creative 
                visions to life while streamlining the production process from concept to 
                final product.
              </p>
              <button className="button-primary">
                Learn More About Our Technology
              </button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="section-container">
            <div className="bg-gradient-to-r from-fashion-900 to-fashion-950 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="heading-md mb-6 max-w-xl mx-auto">
                Ready to transform your fashion design process?
              </h2>
              <p className="body-md text-fashion-200 mb-8 max-w-lg mx-auto">
                Start creating stunning designs with the power of AI today. 
                No design experience required.
              </p>
              <button className="button-primary bg-white text-fashion-900 hover:bg-fashion-100">
                Get Started Now
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
