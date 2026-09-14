import React from 'react';
import { Copy } from 'lucide-react';

interface FooterProps {
  contractAddress: string;
  onCopyAddress: () => void;
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contractAddress,
  onCopyAddress,
  onOpenAnalytics,
}) => {
  return (
    <footer className="w-full bg-[#ffffff]/85 backdrop-blur-xl border-t border-[#e8e8e9] shadow-[0_-1px_6px_rgba(0,0,0,0.02)] z-30">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex flex-col md:flex-row items-center justify-between gap-3 font-mono-num text-[11px] text-[#5d5e66]">
        {/* Left Info & Contract Snippet */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>CSU (Chasing light) &copy; 2026</span>
          <span className="text-[#c8c5cb]">•</span>
          <span>Base L2 Ecosystem</span>
          <span className="text-[#c8c5cb]">•</span>
          <div className="flex items-center gap-1 font-mono-num text-[11px] text-black bg-[#eeeeef] px-1.5 py-0.5 rounded-[2px] border border-[#e2e2e3]">
            <span>{contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}</span>
            <button
              onClick={onCopyAddress}
              className="hover:text-black transition-colors flex items-center"
              title="Copy Contract"
              type="button"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Community & Data Links */}
        <div className="flex items-center gap-3 font-mono-num text-[11px] text-[#5d5e66]">
          <a
            href="https://dexscreener.com/base/0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-150"
          >
            DexScreener
          </a>
          <span className="text-[#c8c5cb]">/</span>
          <a
            href={`https://basescan.org/token/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-150"
          >
            BaseScan
          </a>
          <span className="text-[#c8c5cb]">/</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-150"
          >
            X (Twitter)
          </a>
          <span className="text-[#c8c5cb]">/</span>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-150"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
};
