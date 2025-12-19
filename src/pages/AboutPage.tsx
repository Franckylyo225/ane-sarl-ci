import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, ArrowRight, CheckCircle } from "lucide-react";
import aboutImage from "@/assets/about-team.jpg";

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
  { year: "1998", title: "Création d'ANE SARL", description: "Fondation de l'entreprise à Abidjan" },
  { year: "2005", title: "Premier projet forestier majeur", description: "Délimitation de 10 forêts classées" },
  { year: "2012", title: "Extension des services", description: "Ajout des services BTP et informatique" },
  { year: "2018", title: "Projet 72 forêts", description: "Lancement du projet national de délimitation" },
  { year: "2023", title: "Innovation technologique", description: "Intégration des drones et SIG avancés" },
];

const stats = [
  { value: "25+", label: "Années d'expérience" },
  { value: "500+", label: "Projets réalisés" },
  { value: "72", label: "Forêts classées" },
  { value: "50+", label: "Experts qualifiés" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-widest mb-4">
              À Propos
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Expert en aménagement, artisan de votre succès
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl">
              Depuis plus de 25 ans, ANE SARL accompagne les acteurs publics et privés dans leurs projets d'aménagement.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-premium-lg">
                <img
                  src={aboutImage}
                  alt="Équipe ANE SARL"
                  className="w-full h-[500px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-copper/30 rounded-2xl -z-10" />
            </div>

            {/* Content */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Notre mission
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Notre mission est de valoriser et de transformer les espaces fonciers et forestiers 
                en solutions durables et harmonieuses, en alliant innovation, respect de l'environnement 
                et satisfaction client.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nous nous engageons à accompagner nos partenaires dans la réalisation de leurs projets, 
                tout en contribuant à un avenir équilibré entre développement humain et préservation 
                des ressources naturelles.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  Expertise reconnue en aménagement foncier et forestier
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  Équipe pluridisciplinaire de professionnels qualifiés
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  Technologies de pointe pour des résultats précis
                </li>
              </ul>

              <Button variant="premium" size="lg">
                Contactez-nous
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-display mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos valeurs
            </h2>
            <p className="text-muted-foreground text-lg">
              Les principes qui guident notre action au quotidien.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-copper/30 transition-all duration-300 shadow-premium group text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-copper/20 transition-colors">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-copper transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Notre parcours
            </h2>
            <p className="text-muted-foreground text-lg">
              Les étapes clés de notre développement.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-card p-6 rounded-xl shadow-premium">
                      <span className="text-copper font-bold text-lg">{milestone.year}</span>
                      <h3 className="font-display text-xl font-bold text-foreground mt-2">{milestone.title}</h3>
                      <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}