import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, ExternalLink } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Have a question? We&apos;d love to hear from you. Reach out to us anytime.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <MessageSquare size={40} className="text-success mx-auto mb-3" />
                  <h3 className="font-heading font-bold text-lg text-success mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-600">Thank you for reaching out. We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="+92-XXX-XXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                    <textarea
                      rows="5"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm">Official Email</h4>
                    <p className="text-gray-600 text-sm">info@edutalentpakistan.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={22} className="text-success" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm">WhatsApp Number</h4>
                    <p className="text-gray-600 text-sm">+92-XXX-XXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm">Phone Number</h4>
                    <p className="text-gray-600 text-sm">+92-XXX-XXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm">Head Office Address</h4>
                    <p className="text-gray-600 text-sm">Pakistan</p>
                  </div>
                </div>
              </div>

              <h3 className="font-heading font-bold text-base mb-3">Follow Us</h3>
              <div className="flex gap-3 mb-8">
                <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"><ExternalLink size={18} /></a>
                <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"><ExternalLink size={18} /></a>
                <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"><ExternalLink size={18} /></a>
              </div>

              <h3 className="font-heading font-bold text-base mb-3">Our Location</h3>
              <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center border border-gray-100">
                <div className="text-center text-gray-500">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Google Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
