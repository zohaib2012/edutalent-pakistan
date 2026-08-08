import { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

const DownloadAppButton = ({ variant = 'navbar', label = 'Download App', className = '' }) => {
  const { canInstall, install } = useInstallPrompt();
  const [installing, setInstalling] = useState(false);
  const [done, setDone] = useState(false);

  if (!canInstall) return null;

  const handleClick = async () => {
    setInstalling(true);
    const accepted = await install();
    setInstalling(false);
    if (accepted) {
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    }
  };

  if (variant === 'footer') {
    return (
      <button
        onClick={handleClick}
        disabled={installing}
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-60 ${className}`}
      >
        {installing ? (
          <Loader2 size={16} className="animate-spin" />
        ) : done ? (
          <Check size={16} />
        ) : (
          <Download size={16} />
        )}
        {done ? 'Installed!' : label}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={installing}
      className={`hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-60 ${className}`}
    >
      {installing ? (
        <Loader2 size={16} className="animate-spin" />
      ) : done ? (
        <Check size={16} />
      ) : (
        <Download size={16} />
      )}
      {done ? 'Installed!' : label}
    </button>
  );
};

export default DownloadAppButton;
