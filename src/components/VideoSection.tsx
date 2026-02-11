import { useScrollReveal } from "@/hooks/useScrollReveal";

export function VideoSection() {
  const sectionReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div
          ref={sectionReveal.ref}
          className={`scroll-reveal ${sectionReveal.isVisible ? "visible" : ""}`}
        >

          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-border">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/Bsm1UqAKFtY"
                title="Vidéo de présentation ANE"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
