import { useState, useEffect } from "react";
import { 
  ArrowRight,
  Loader2,
  icons
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  features: string[] | null;
  href: string | null;
}

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const { setRef, visibleItems } = useScrollRevealMultiple(6, { threshold: 0.15 });
  const ctaReveal = useScrollReveal({ threshold: 0.3 });

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('id, title, description, icon, features, href')
        .eq('published', true)
        .order('display_order', { ascending: true });
      
      setServices(data || []);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  const renderIcon = (iconName: string) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    if (LucideIcon) {
      return <LucideIcon className="w-7 h-7 text-primary" />;
    }
    const DefaultIcon = icons.Compass;
    return <DefaultIcon className="w-7 h-7 text-primary" />;
  };

  // Don't render if no services
  if (!isLoading && services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={`text-center max-w-3xl mx-auto mb-16 scroll-reveal ${headerReveal.isVisible ? "visible" : ""}`}
        >
          <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-widest mb-4">
            Nos expertises
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Des solutions complètes pour vos{" "}
            <span className="text-primary-foreground">projets d'aménagement</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Découvrez notre gamme complète de services professionnels, 
            conçus pour répondre à tous vos besoins en aménagement foncier et forestier.
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-foreground/50" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={setRef(index)}
                className={`group bg-secondary rounded-2xl p-8 border border-border/20 hover:shadow-lg hover:border-primary/30 transition-all duration-300 scroll-reveal ${
                  visibleItems[index] ? "visible" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {renderIcon(service.icon)}
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 bg-primary/10 rounded-full text-primary"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                {service.href && (
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div 
          ref={ctaReveal.ref}
          className={`text-center mt-12 scroll-reveal-scale ${ctaReveal.isVisible ? "visible" : ""}`}
        >
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
