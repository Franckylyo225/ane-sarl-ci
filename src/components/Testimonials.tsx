import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "ANE SARL a démontré un professionnalisme exemplaire dans la gestion de notre projet de lotissement. Leur expertise technique et leur accompagnement sur mesure ont fait toute la différence.",
    author: "Dr. Konan Yao",
    role: "Directeur Régional",
    organization: "Ministère des Eaux et Forêts",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 2,
    content: "La qualité des relevés topographiques et la précision des données fournies par ANE SARL ont grandement facilité notre processus de planification urbaine. Une équipe de confiance.",
    author: "Mme. Akissi Brou",
    role: "Chef de Projet",
    organization: "Groupe Immobilier Abidjan",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 3,
    content: "Leur expertise en aménagement forestier et leur engagement pour la préservation de l'environnement en font un partenaire incontournable pour nos projets de reboisement.",
    author: "M. Ouattara Ibrahim",
    role: "Consultant Environnement",
    organization: "SODEFOR",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-copper font-semibold text-sm uppercase tracking-widest mb-4">
            Témoignages
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ce que disent nos <span className="text-primary">clients</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les retours d'expérience de nos partenaires et clients 
            qui nous font confiance depuis des années.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl shadow-premium-lg p-8 md:p-12">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-copper rounded-xl flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-accent-foreground" />
            </div>

            {/* Content */}
            <div className="mt-4">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-copper text-copper" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground text-lg md:text-xl leading-relaxed mb-8 font-display italic">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-copper/20"
                />
                <div>
                  <div className="font-bold text-foreground">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-sm text-copper font-medium">
                    {testimonials[currentIndex].organization}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-copper w-6"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
