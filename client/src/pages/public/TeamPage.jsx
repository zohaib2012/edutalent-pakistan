import { Link } from 'react-router-dom';
import { Users, ChevronRight, Mail, Star, Quote, Target, Award } from 'lucide-react';
import jaweedAli from '../../assets/images/jaweed ali.jpeg';
import saminaSajjad from '../../assets/images/samina sajjad.jpeg';
import sanaZulfiqar from '../../assets/images/sana zulfiqar.jpeg';
import saeedAman from '../../assets/images/saeed aman.jpeg';
import sumaira from '../../assets/images/sumera.jpeg';
import naila from '../../assets/images/naila.jpeg';
import faiza from '../../assets/images/fiza.jpeg';
import benazir from '../../assets/images/benazir.jpeg';
import sakina from '../../assets/images/sakena.jpeg';
import azesha from '../../assets/images/azesha.jpeg';
import lashana from '../../assets/images/lashana.jpeg';
import eman from '../../assets/images/eman.jpeg';
import saba from '../../assets/images/saba.jpeg';
import asra from '../../assets/images/ashra.jpeg';

const founder = {
  name: 'Jawed Ali',
  role: 'Founder & CEO of EduTalent Pakistan',
  photo: jaweedAli,
  bio: "As Founder & CEO of EduTalent Pakistan, I founded ETP because talent is universal, but opportunity is not. My goal is to discover, recognize, and reward bright minds by creating meaningful opportunities for talented individuals.",
};

const teamMembers = [
  { name: 'Miss Samina Sajjad', role: 'Co-Founder & Chief Investment Officer (CIO)', photo: saminaSajjad },
  { name: 'Miss Sana Zulfiqar Ali', role: 'Executive Director – Operations & Administration', photo: sanaZulfiqar },
  { name: 'Advocate Saeed Aman', role: 'Strategic Advisor – New Initiatives & Programs & Legal & Compliance Officer', photo: saeedAman },
  { name: 'Miss Sumaira', role: 'Head of Scholarship Programs', photo: sumaira },
  { name: 'Miss Naila Zulfiqar Ali', role: 'Head of Test Development & Examination Coordinator', photo: naila },
  { name: 'Miss Faiza Abdul Ghaffar', role: 'Test Quality & Assessment Officer', photo: faiza },
  { name: 'Miss Benazir Aijaz', role: 'Records & Documentation Officer', photo: benazir },
  { name: 'Miss Sakina Sajjad', role: 'Finance & Accounts Manager', photo: sakina },
  { name: 'Miss Azeesha Ali', role: 'IT & Web Platform Manager', photo: azesha },
  { name: 'Miss Lashana Farheen', role: 'Director – Social Media & Digital Marketing', photo: lashana },
  { name: 'Miss Eman', role: 'Social Media Campaign & Growth Manager', photo: eman },
  { name: 'Miss Saba Nazamani', role: 'Digital Content, Brand & Outreach Officer', photo: saba },
  { name: 'Miss Asra Fatima', role: 'Merit & Results Coordinator', photo: asra },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Students Registered' },
  { icon: Target, value: '500+', label: 'Awards Given' },
  { icon: Star, value: '12+', label: 'Tests Conducted' },
  { icon: Award, value: '7', label: 'Provinces Covered' },
];

const TeamPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Team & Faculty</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Meet the dedicated professionals behind EduTalent Pakistan — the ETP founding team working every day to unlock brilliance and reward talent.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-3 items-center">
              <div className="md:col-span-1 flex justify-center md:justify-end p-8 md:py-12">
                <div className="relative">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-gold/50 shadow-2xl">
                    <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-gray-900 rounded-full px-4 py-1.5 text-xs font-bold shadow-lg whitespace-nowrap">
                    Founder & CEO
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-8 md:p-12 md:pl-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
                  <Quote size={14} className="text-gold" />
                  <span>Founder's Message</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{founder.name}</h2>
                <p className="text-gold font-semibold mb-6">{founder.role}</p>
                <p className="text-white/85 text-lg leading-relaxed">{founder.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">ETP Founding Team</h2>
            <p className="section-subtitle">The experts leading EduTalent Pakistan's mission to reward talent.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={member.photo} alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-sm md:text-base text-gray-900 leading-snug">{member.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/about" className="btn-primary">Learn More About Us <ChevronRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
