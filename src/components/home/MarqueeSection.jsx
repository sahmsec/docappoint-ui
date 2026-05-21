import {
  Shield,
  Heart,
  Stethoscope,
  Activity,
  Award,
  Star,
  Clock
} from 'lucide-react';

export default function MarqueeSection() {
  return (
    <section className="w-full bg-bg-card rounded-t-[48px] md:rounded-t-[80px] relative py-20 md:py-28 z-20">

      {/* Marquee Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden py-8">
        {/* Dark ash typer background pattern inside the marquee container */}
        <div className="absolute inset-0 z-0 opacity-10 medical-pattern" style={{ backgroundImage: 'radial-gradient(#A0AAB2 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        {/* Fade overlays for the edges of the container margins */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-card to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-20 items-center relative z-10">
          {/* Double mapping of partner list to ensure seamless endless loop */}
          {[
            { name: 'Apollo Hospitals', icon: Shield },
            { name: 'Square Hospital', icon: Heart },
            { name: 'Evercare Group', icon: Stethoscope },
            { name: 'Labaid Group', icon: Activity },
            { name: 'Ibn Sina Group', icon: Award },
            { name: 'United Hospital', icon: Star },
            { name: 'Square Pharma', icon: Clock }
          ].concat([
            { name: 'Apollo Hospitals', icon: Shield },
            { name: 'Square Hospital', icon: Heart },
            { name: 'Evercare Group', icon: Stethoscope },
            { name: 'Labaid Group', icon: Activity },
            { name: 'Ibn Sina Group', icon: Award },
            { name: 'United Hospital', icon: Star },
            { name: 'Square Pharma', icon: Clock }
          ]).map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 transition-all duration-300 select-none group opacity-40 hover:opacity-100 cursor-pointer"
            >
              <partner.icon className="w-7 h-7 text-primary group-hover:text-accent transition-all duration-300 flex-shrink-0" />
              <span className="text-primary font-extrabold text-lg tracking-tight group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Concave Curve (Light page background curving upwards into the white corners) */}
      <div
        className="w-full h-12 md:h-20 bg-bg-main rounded-t-[48px] md:rounded-t-[80px] absolute bottom-[-2px] left-0"
      />
    </section>
  );
}
