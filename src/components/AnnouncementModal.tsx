import React from 'react';
import { X, CheckCircle2, Copy } from 'lucide-react';
import { Announcement } from '../types';
import { Translations } from '../i18n/translations';

interface AnnouncementModalProps {
  announcement: Announcement | null;
  onClose: () => void;
  onCopyText: (text: string, label: string) => void;
  t?: Translations;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  announcement,
  onClose,
  onCopyText,
  t,
}) => {
  if (!announcement) return null;

  return (
    <div
      id="ann-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        id="ann-modal-box"
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-[3px] shadow-2xl p-6 flex flex-col gap-4 border border-[#e8e8e9] transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f3f3f4]">
          <div className="flex items-center gap-2">
            <span
              id="modal-tag"
              className="px-2 py-0.5 bg-[#eeeeef] font-mono-num text-[11px] text-black rounded-[2px] font-bold"
            >
              {announcement.categoryLabel}
            </span>
            <span
              id="modal-date"
              className="font-mono-num text-[11px] text-[#77767b]"
            >
              {announcement.timestamp}
            </span>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-[2px] bg-[#f3f3f4] hover:bg-[#e8e8e9] flex items-center justify-center text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <div>
          <h3
            id="modal-title"
            className="font-sans text-[20px] font-bold text-black tracking-tight leading-snug"
          >
            {announcement.title}
          </h3>
        </div>

        {/* Content Body */}
        <div className="py-2 border-y border-[#f3f3f4] text-[13px] text-[#47464b] leading-relaxed flex flex-col gap-3">
          <p className="font-semibold text-black bg-[#f9f9fa] p-3 rounded-[2px] border border-[#eeeeef]">
            {announcement.summary}
          </p>

          <div
            id="modal-desc"
            className="whitespace-pre-line text-zinc-700 font-sans leading-relaxed space-y-2"
          >
            {announcement.content}
          </div>

          {announcement.txHash && (
            <div className="p-3 bg-[#f3f3f4] rounded-[2px] border border-[#e8e8e9] flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-mono-num text-[10px] text-[#77767b] uppercase font-semibold">
                  Execution Transaction Hash
                </span>
                <span className="font-mono-num text-[11px] text-black font-semibold break-all">
                  {announcement.txHash}
                </span>
              </div>
              <button
                onClick={() => onCopyText(announcement.txHash!, 'Transaction Hash Copied')}
                className="p-1.5 hover:bg-white rounded text-zinc-600 hover:text-black transition-colors"
                title="Copy Hash"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Stamp */}
        <div className="p-3 bg-[#f9f9fa] rounded-[2px] flex items-center justify-between font-mono-num text-[11px] text-[#5d5e66] border border-[#eeeeef]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#009668]" />
            <span className="font-semibold text-black">
              {t?.announcements?.officialSig || 'CSU Foundation Official Verification Signature'}
            </span>
          </div>

          <button
            id="btn-modal-dismiss"
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 bg-black text-white rounded-[2px] font-mono-num text-[11px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
          >
            {t?.announcements?.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
