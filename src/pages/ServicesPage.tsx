import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Services } from "@/components/Services";
import { 
  TreePine, 
  Map, 
  Building2, 
  Compass, 
  Globe, 
  Monitor,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const servicesDetails = [
  {
    icon: Map,
    title: "Aménagement Foncier",
    description: "Conseils en urbanisme, gestion de projets de lotissement et valorisation optimale de vos terrains.",
    features: [
      "Études d'urbanisme et de faisabilité",
      "Lotissement et morcellement",
      "Valorisation foncière",
      "Conseil en investissement immobilier",
      "Accompagnement administratif",
    ],
  },
  {
    icon: TreePine,
    title: "Aménagement Forestier",
    description: "Gestion durable des forêts, reboisement et préservation de la biodiversité pour un avenir vert.",
    features: [
      "Plans d'aménagement forestier",
      "Reboisement et reforestation",
      "Inventaires forestiers",
      "Gestion durable des ressources",
      "Préservation de la biodiversité",
    ],
  },
  {
    icon: Building2,
    title: "Bâtiment & Travaux Publics",
    description: "Construction et réhabilitation de bâtiments, infrastructures de qualité pour vos projets.",
    features: [
      "Construction de bâtiments",
      "Réhabilitation et rénovation",
      "Infrastructures routières",
      "Ouvrages hydrauliques",
      "Supervision de chantier",
    ],
  },
  {
    icon: Compass,
    title: "Topographie",
    description: "Relevés topographiques précis, calculs de surface et modélisation géométrique avancée.",
    features: [
      "Levés topographiques",
      "Bornage et délimitation",
      "Calculs de surfaces",
      "Plans cadastraux",
      "Modélisation 3D du terrain",
    ],
  },
  {
    icon: Globe,
    title: "Géomatique",
    description: "Analyse de données géographiques et conception de systèmes d'information géographiques (SIG).",
    features: [
      "Conception de SIG",
      "Cartographie numérique",
      "Analyse spatiale",
      "Bases de données géographiques",
      "Télédétection",
    ],
  },
  {
    icon: Monitor,
    title: "Informatique",
    description: "Développement web, maintenance informatique et fourniture de matériels de qualité.",
    features: [
      "Développement de sites web",
      "Applications métiers",
      "Maintenance informatique",
      "Fourniture d'équipements",
      "Formation et accompagnement",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-widest mb-4">
              Nos Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Des solutions complètes pour vos projets
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl">
              Découvrez notre gamme complète de services professionnels, 
              conçus pour répondre à tous vos besoins en aménagement foncier et forestier.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="space-y-16">
            {servicesDetails.map((service, index) => (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="premium" size="lg">
                    Demander un devis
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
                <div className={`bg-card rounded-2xl p-12 shadow-premium ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <service.icon className="w-32 h-32 text-primary/20 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une étude personnalisée et un devis gratuit.
          </p>
          <Button variant="hero" size="xl">
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}