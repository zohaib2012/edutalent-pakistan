import { useEffect, useState } from 'react';
import { Calendar, Clock, Hourglass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const schedule = [
  { phase: 'Phase 1', sub: 'Primary (Grades 1–5)', date: 'August 24, 2025', day: 'Saturday', time: '10:00 AM – 11:00 AM', duration: '60 Minutes' },
  { phase: 'Phase 2', sub: 'Middle (Grades 6–8)', date: 'August 24, 2025', day: 'Saturday', time: '2:00 PM – 3:00 PM', duration: '60 Minutes' },
  { phase: 'Phase 3', sub: 'Matric (Grades 9–10)', date: 'August 25, 2025', day: 'Sunday', time: '10:00 AM – 11:15 AM', duration: '75 Minutes' },
  { phase: 'Phase 4', sub: 'Senior (Grade 11–12 & Uni)', date: 'August 25, 2025', day: 'Sunday', time: '2:00 PM – 3:30 PM', duration: '90 Minutes' },
];

const CountdownTimer = ({ targetDate }) => {
  const calcTimeLeft = () => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([key, val]) => (
        <div key={key} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl md:text-3xl font-heading font-bold">{String(val).padStart(2, '0')}</span>
          </div>
          <span className="text-xs uppercase text-white/70 mt-1 block">{key}</span>
        </div>
      ))}
    </div>
  );
};

const DateSheetPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Date Sheet</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Complete test schedule for all scholarship phases.
          </p>
        </div>
      </section>

      <section className="py-12 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-heading font-bold mb-4">Countdown to Phase 1 Test</h2>
          <CountdownTimer targetDate="2025-08-24T10:00:00" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Phase</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Test Date</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Day</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Test Time</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((s, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <span className="font-heading font-bold text-gray-900">{s.phase}</span>
                          <p className="text-xs text-gray-500">{s.sub}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{s.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{s.day}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{s.time}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-primary-50 text-primary font-semibold text-xs px-3 py-1.5 rounded-full">
                          <Hourglass size={12} /> {s.duration}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">Phase-wise Schedule</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schedule.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 text-center hover:shadow-xl transition-shadow">
                <Clock size={24} className="text-primary mx-auto mb-2" />
                <h4 className="font-heading font-bold text-primary">{s.phase}</h4>
                <p className="text-xs text-gray-500 mb-2">{s.sub}</p>
                <p className="text-sm font-semibold text-gray-900">{s.date}</p>
                <p className="text-xs text-gray-500">{s.time}</p>
                <div className="mt-3 inline-block bg-primary-50 text-primary font-semibold text-xs px-3 py-1 rounded-full">{s.duration}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/apply" className="btn-primary">Apply Now <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DateSheetPage;
