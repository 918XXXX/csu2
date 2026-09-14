import React from 'react';
import { Copy, ShieldCheck, ArrowLeftRight, Wallet, LineChart, ExternalLink } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface TerminalBarProps {
  contractAddress: string;
  onCopyAddress: () => void;
  onOpenSwap: () => void;
  onAddToken: () => void;
  t: Translations;
}

export const TerminalBar: React.FC<TerminalBarProps> = ({
  contractAddress,
  onCopyAddress,
  onOpenSwap,
  onAddToken,
  t,
}) => {
  return (
    <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-3 p-3 bg-white/90 backdrop-blur-xl rounded-[2px] shadow-sm border border-[#e8e8e9]">
      {/* Left: Telemetry & Contract Verification */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
          </div>
          <span className="font-mono-num text-[11px] uppercase text-black tracking-widest font-bold">
            {t.terminal.title}
          </span>
          <span className="px-1.5 py-0.5 bg-[#e8e8e9] rounded-[2px] font-mono-num text-[10px] text-black font-semibold">
            v2.1.4
          </span>
        </div>

        <div className="h-4 w-px bg-[#e2e2e3] hidden sm:block"></div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono-num text-[11px] text-[#5d5e66] uppercase">
            {t.terminal.contract}
          </span>
          <div className="flex items-center gap-1.5 bg-[#f3f3f4] hover:bg-[#e8e8e9] px-2 py-1 rounded-[2px] border border-[#e2e2e3] transition-colors">
            <span className="font-mono-num text-[11px] text-black font-semibold">
              {contractAddress}
            </span>
            <button
              id="btn-copy-contract-terminal"
              onClick={onCopyAddress}
              className="text-[#77767b] hover:text-black transition-colors flex items-center"
              title={t.terminal.copyAddress}
              type="button"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#002113] text-[#009668] font-mono-num text-[11px] rounded-[2px] font-semibold border border-[#009668]/30">
            <ShieldCheck className="w-3 h-3 text-[#009668]" />
            {t.terminal.verified}
          </span>

          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#eef2ff] text-[#0052ff] font-mono-num text-[11px] rounded-[2px] font-semibold border border-[#0052ff]/20">
            Base L2
          </span>
        </div>
      </div>

      {/* Right: Quick Action Gateway */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          id="btn-quick-uniswap"
          onClick={onOpenSwap}
          className="px-2.5 py-1.5 bg-black text-white font-mono-num text-[11px] rounded-[2px] hover:bg-zinc-800 active:opacity-80 transition-colors flex items-center gap-1.5 shadow-sm"
          type="button"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>{t.terminal.uniswapSwap}</span>
        </button>

        <button
          id="btn-quick-add-token"
          onClick={onAddToken}
          className="px-2.5 py-1.5 bg-[#f3f3f4] hover:bg-[#e8e8e9] text-black font-mono-num text-[11px] rounded-[2px] transition-colors flex items-center gap-1.5 border border-[#e2e2e3]"
          type="button"
        >
          <Wallet className="w-3.5 h-3.5 text-[#5d5e66]" />
          <span>{t.terminal.addToken}</span>
        </button>

        <a
          id="link-dexscreener"
          href="https://dexscreener.com/base/0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 bg-[#f3f3f4] hover:bg-[#e8e8e9] text-black font-mono-num text-[11px] rounded-[2px] transition-colors flex items-center gap-1.5 border border-[#e2e2e3]"
        >
          <LineChart className="w-3.5 h-3.5 text-[#5d5e66]" />
          <span>{t.terminal.dexScreener}</span>
        </a>

        <a
          id="link-basescan"
          href={`https://basescan.org/token/${contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 bg-[#f3f3f4] hover:bg-[#e8e8e9] text-black font-mono-num text-[11px] rounded-[2px] transition-colors flex items-center gap-1.5 border border-[#e2e2e3]"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#5d5e66]" />
          <span>BaseScan</span>
        </a>
      </div>
    </div>
  );
};
