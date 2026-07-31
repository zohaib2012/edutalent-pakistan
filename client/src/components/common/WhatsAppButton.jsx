import { WhatsAppIcon } from '../icons/SocialIcons';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923468275954"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
};

export default WhatsAppButton;
