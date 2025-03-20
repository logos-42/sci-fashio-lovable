
import { useState, useRef } from "react";
import { ChevronRight, Sparkles, Zap, Palette, Shirt } from "lucide-react";
import { useInView } from "@/lib/animations";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: "design",
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI-Powered Design",
    description:
      "Transform simple descriptions into detailed fashion designs. Our AI understands style, fabric, and cultural elements to create stunning visualizations."
  },
  {
    id: "materials",
    icon: <Palette className="w-5 h-5" />,
    title: "Smart Material Selection",
    description:
      "Get intelligent recommendations for fabrics and materials based on your design, style preferences, and production requirements."
  },
  {
    id: "visualization",
    icon: <Shirt className="w-5 h-5" />,
    title: "3D Visualization",
    description:
      "See your designs come to life with realistic 3D models. Rotate, zoom, and examine every detail before production."
  },
  {
    id: "production",
    icon: <Zap className="w-5 h-5" />,
    title: "Production Ready",
    description:
      "Generate detailed production specifications, including patterns, measurements, and material requirements for seamless manufacturing."
  }
];

const AIFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const { ref, isInView } = useInView();

  return (
    <section id="features" className="section-padding">
      <div className="section-container" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="chip mb-4">Intelligent Tools</div>
          <h2 className="heading-lg mb-6">
            Design with the power of artificial intelligence
          </h2>
          <p className="body-md text-fashion-600 max-w-xl mx-auto">
            Our platform combines cutting-edge AI with intuitive design tools to 
            revolutionize how you create fashion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Feature tabs and content */}
          <div className={`transition-all duration-700 delay-300 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`flex items-start p-4 rounded-xl transition-all cursor-pointer ${
                    activeFeature === feature.id
                      ? "bg-secondary shadow-subtle"
                      : "hover:bg-secondary/50"
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div
                    className={`flex-shrink-0 p-2 rounded-lg mr-4 ${
                      activeFeature === feature.id
                        ? "bg-primary text-white"
                        : "bg-secondary text-fashion-700"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      activeFeature === feature.id ? "text-fashion-900" : "text-fashion-800"
                    }`}>
                      {feature.title}
                    </h3>
                    {activeFeature === feature.id && (
                      <p className="mt-2 text-sm text-fashion-600 animate-fade-in">
                        {feature.description}
                      </p>
                    )}
                  </div>
                  {activeFeature === feature.id && (
                    <ChevronRight className="ml-auto text-fashion-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Feature image */}
          <div className={`relative rounded-2xl overflow-hidden aspect-square transition-all duration-700 delay-500 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-fashion-100 to-fashion-200 flex items-center justify-center">
              {activeFeature === "design" && (
                <div className="animate-fade-in text-center p-8">
                  <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-xl font-medium mb-4">AI Design Assistant</h3>
                  <p className="text-fashion-700 max-w-md">
                    Simply describe your vision, and our AI translates it into detailed design concepts.
                  </p>
                </div>
              )}
              {activeFeature === "materials" && (
                <div className="animate-fade-in text-center p-8">
                  <Palette className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-xl font-medium mb-4">Intelligent Fabric Selection</h3>
                  <p className="text-fashion-700 max-w-md">
                    Our system analyzes your design to recommend the perfect materials for your creation.
                  </p>
                </div>
              )}
              {activeFeature === "visualization" && (
                <div className="animate-fade-in text-center p-8">
                  <Shirt className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-xl font-medium mb-4">Realistic 3D Models</h3>
                  <p className="text-fashion-700 max-w-md">
                    Visualize your designs from every angle before moving to production.
                  </p>
                </div>
              )}
              {activeFeature === "production" && (
                <div className="animate-fade-in text-center p-8">
                  <Zap className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-xl font-medium mb-4">Production Specs</h3>
                  <p className="text-fashion-700 max-w-md">
                    Generate detailed technical specifications ready for manufacturing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
