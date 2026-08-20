import { useState } from 'react';
import { Download, Loader2, Check, Smartphone } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

const DownloadAppButton = ({ variant = 'navbar', label = 'Download App', className = '' }) => {
  const { canInstall, install } = useInstallPrompt();
  const [installing, setInstalling] = useState(false);
  const [done, setDone] = useState(false);
  const [hint, setHint] = useState(false);

  const handleClick = async () => {
    if (!canInstall) {
      setHint(true);
      setTimeout(() => setHint(false), 3000);
      return;
    }
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
        ) : hint ? (
          <Smartphone size={16} />
        ) : (
          <Download size={16} />
        )}
        {done ? 'Installed!' : hint ? 'Use browser menu' : label}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={installing}
      title={hint ? 'Use your browser menu to install the app' : 'Download App'}
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-60 ${className}`}
    >
      {installing ? (
        <Loader2 size={16} className="animate-spin" />
      ) : done ? (
        <Check size={16} />
      ) : (
        <Download size={16} />
      )}
      <span className="hidden sm:inline">{done ? 'Installed!' : label}</span>
      <span className="sm:hidden">{done ? 'Done' : 'App'}</span>
    </button>
  );
};

export default DownloadAppButton;
