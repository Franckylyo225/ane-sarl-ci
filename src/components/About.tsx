import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Target, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque projet, avec des standards de qualité irréprochables.",
  },
  {
    icon: Users,
    title: "Engagement",
    description: "Nous sommes engagés auprès de nos clients et partenaires pour leur satisfaction totale.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Nous intégrons les dernières technologies pour des solutions modernes et efficaces.",
  },
];

const milestones = [
  { year: "1998", event: "Création de ANE SARL" },
  { year: "2005", event: "Premier grand projet forestier national" },
  { year: "2015", event: "Extension des services BTP et Géomatique" },
  { year: "2020", event: "Projet phare : 72 forêts classées" },
];

export function About() {
  return (
    <section id="apropos" className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-copper/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-copper font-semibold text-sm uppercase tracking-widest mb-4">
              À propos de nous
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Expert en aménagement,{" "}
              <span className="text-copper">artisan de votre succès</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Notre mission est de valoriser et de transformer les espaces fonciers et forestiers 
              en solutions durables et harmonieuses, en alliant innovation, respect de l'environnement 
              et satisfaction client.
            </p>
            <p className="text-primary-foreground/70 mb-8 leading-relaxed">
              Nous nous engageons à accompagner nos partenaires dans la réalisation de leurs projets, 
              tout en contribuant à un avenir équilibré entre développement humain et préservation 
              des ressources naturelles.
            </p>

            {/* Key points */}
            <div className="space-y-4 mb-8">
              {[
                "Plus de 25 ans d'expérience terrain",
                "Équipe pluridisciplinaire d'experts",
                "Partenaire de confiance de l'État",
                "Engagement environnemental fort",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-copper flex-shrink-0" />
                  <span className="text-primary-foreground/90">{point}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg">
              Découvrir notre histoire
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Values & Timeline */}
          <div className="space-y-8">
            {/* Values */}
            <div className="grid gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-copper" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-2">{value.title}</h3>
                      <p className="text-primary-foreground/70 text-sm">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6">
              <h3 className="font-display text-lg font-bold mb-6">Notre parcours</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-8 bg-copper/20 rounded flex items-center justify-center">
                      <span className="text-copper font-bold text-sm">{milestone.year}</span>
                    </div>
                    <span className="text-primary-foreground/80 text-sm">{milestone.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
