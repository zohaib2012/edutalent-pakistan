export const downloadFile = async (url, filename = 'file') => {
  if (!url) return;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    let ext = '';
    if (blob.type === 'application/pdf') {
      ext = '.pdf';
    } else if (blob.type.startsWith('image/')) {
      ext = '.' + blob.type.split('/')[1];
    } else {
      const u = url.toLowerCase();
      if (u.includes('/raw/') || u.includes('.pdf') || u.includes('application/pdf')) ext = '.pdf';
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  } catch {
    window.open(url, '_blank');
  }
};
