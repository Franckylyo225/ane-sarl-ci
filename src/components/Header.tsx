import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAne from "@/assets/logo-ane.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const services = [
  { name: "Aménagement Foncier", href: "/services/amenagement-foncier" },
  { name: "Aménagement Forestier", href: "/services/amenagement-forestier" },
  { name: "Bâtiment & Travaux Publics", href: "/services/btp" },
  { name: "Topographie", href: "/services/topographie" },
  { name: "Géomatique", href: "/services/geomatique" },
  { name: "Informatique", href: "/services/informatique" },
];

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Projets", href: "/projets" },
  { name: "À propos", href: "/a-propos" },
  { name: "Actualités", href: "/actualites" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2">
        <div className="container-custom flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+22527222831 15" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={14} />
              <span>+225 27 22 28 31 15</span>
            </a>
            <a href="mailto:info@ane.ci" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail size={14} />
              <span>info@ane.ci</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Cocody Angré, Dokui Djomi, Abidjan</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-premium py-3"
            : "bg-transparent py-4"
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src={logoAne} 
                alt="ANE SARL - Aménagement Nature Environnement" 
                className="h-12 md:h-14 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "font-medium transition-colors relative group flex items-center gap-1",
                          isServicesActive
                            ? "text-primary"
                            : "text-foreground/80 hover:text-primary"
                        )}
                      >
                        {item.name}
                        <ChevronDown size={16} />
                        <span className={cn(
                          "absolute -bottom-1 left-0 h-0.5 bg-copper transition-all duration-300",
                          isServicesActive ? "w-full" : "w-0 group-hover:w-full"
                        )} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to="/services" className="w-full font-medium">
                          Tous les services
                        </Link>
                      </DropdownMenuItem>
                      {services.map((service) => (
                        <DropdownMenuItem key={service.href} asChild>
                          <Link to={service.href} className="w-full">
                            {service.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "font-medium transition-colors relative group",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-copper transition-all duration-300",
                      location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                )
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/contact">
                <Button variant="premium" size="lg">
                  Demander un devis
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300",
              isMobileMenuOpen ? "max-h-[500px] mt-4" : "max-h-0"
            )}
          >
            <div className="flex flex-col gap-2 py-4 border-t border-border">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className={cn(
                        "font-medium transition-colors py-2 w-full text-left flex items-center justify-between",
                        isServicesActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                      )}
                    >
                      {item.name}
                      <ChevronDown size={16} className={cn(
                        "transition-transform",
                        isMobileServicesOpen && "rotate-180"
                      )} />
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 pl-4",
                      isMobileServicesOpen ? "max-h-96" : "max-h-0"
                    )}>
                      <Link
                        to="/services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-foreground/70 hover:text-primary font-medium"
                      >
                        Tous les services
                      </Link>
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-foreground/70 hover:text-primary"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-medium transition-colors py-2",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="premium" className="mt-2 w-full">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
