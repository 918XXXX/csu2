import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div
      id="csu-toast"
      className="fixed bottom-10 right-10 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#18181b] text-white rounded-[2px] shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 border border-zinc-700/50 backdrop-blur-md"
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0" />
      )}
      <span
        id="csu-toast-msg"
        className="font-mono-num text-[12px] uppercase tracking-wider font-medium text-zinc-100"
      >
        {message}
      </span>
    </div>
  );
};
