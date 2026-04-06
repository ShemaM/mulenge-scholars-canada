import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function GetInvolved() {
  const actions = [
    { name: "Students", role: "Scholars", color: "bg-[#4A90D9]", link: "/join" },
    { name: "Partners", role: "Donors", color: "bg-[#6F4763]", link: "/contact" },
    { name: "Mentors", role: "Volunteers", color: "bg-[#002147]", link: "/volunteer" }
  ];

  return (
    <section className="relative min-h-[80vh] flex flex-col lg:flex-row border-t border-slate-100">
      
      {/* Left Anchor */}
      <div className="lg:w-1/3 bg-[#F8FAFC] p-12 md:p-24 flex flex-col justify-center border-r border-slate-100">
        <h2 className="font-display text-5xl font-black text-[#002147] leading-tight mb-8">
          The Network <br /> thrives on <br /> <span className="text-[#6F4763]">Community.</span>
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed">
          Whether you are seeking guidance or looking to invest in global impact, there is a seat at the table for you.
        </p>
      </div>

      {/* Right Interactive Slats */}
      <div className="lg:w-2/3 flex flex-col">
        {actions.map((action) => (
          <Link 
            key={action.name} 
            href={action.link} 
            className="group relative flex-1 flex items-center justify-between p-12 md:px-24 border-b border-slate-100 last:border-b-0 overflow-hidden transition-all duration-500"
          >
            {/* The "Fill" Hover Animation */}
            <div className={`absolute inset-0 ${action.color} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
            
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 group-hover:text-white/60 transition-colors">
                {action.role}
              </span>
              <h3 className="text-4xl md:text-6xl font-display font-black text-[#002147] group-hover:text-white transition-colors mt-2">
                {action.name}
              </h3>
            </div>

            <div className="relative z-10 w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:bg-transparent group-hover:border-white transition-all duration-500">
              <ArrowRight className="w-6 h-6 text-[#002147] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}