import React, { useState } from 'react';
import { X, ArrowDown, Settings2, Sparkles } from 'lucide-react';
import { WalletState } from '../types';
import { Translations } from '../i18n/translations';
import { formatTokenPrice } from '../utils/formatters';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  price: number;
  onExecuteSwap: (fromAmount: number, toAmount: number) => void;
  onOpenWalletModal?: () => void;
  t: Translations;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  wallet,
  price,
  onExecuteSwap,
  onOpenWalletModal,
  t,
}) => {
  const [payAmount, setPayAmount] = useState<string>('10');
  const [slippage, setSlippage] = useState<string>('0.5');
  const [isSwapping, setIsSwapping] = useState(false);

  if (!isOpen) return null;

  const numPay = parseFloat(payAmount) || 0;
  const receiveCsu = numPay > 0 ? (numPay / (price || 0.0000003185)) * 0.997 : 0; // 0.3% AMM fee
  const priceImpact = numPay > 5000 ? '0.25%' : numPay > 1000 ? '0.08%' : '< 0.01%';

  const handleSwap = () => {
    if (numPay <= 0) return;
    setIsSwapping(true);
    setTimeout(() => {
      onExecuteSwap(numPay, receiveCsu);
      setIsSwapping(false);
      onClose();
    }, 900);
  };

  return (
    <div
      id="swap-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        id="swap-modal-box"
        className="w-full max-w-md bg-white rounded-[3px] shadow-2xl p-6 flex flex-col gap-4 border border-[#e8e8e9] transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f3f3f4]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black"></span>
            <h3 className="font-sans text-[17px] font-bold text-black tracking-tight">
              {t.swap.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-7 h-7 rounded-[2px] bg-[#f3f3f4] hover:bg-[#e8e8e9] flex items-center justify-center text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Swap Form */}
        <div className="flex flex-col gap-2">
          {/* Pay Input */}
          <div className="p-3 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase font-bold">
                {t.swap.youPay}
              </span>
              <span className="font-mono-num text-[10px] text-[#5d5e66]">
                {t.swap.balance}: {wallet.usdtBalance.toLocaleString()} USDC
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <input
                id="input-swap-pay"
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent font-mono-num text-[22px] font-bold text-black focus:outline-none"
              />
              <div className="px-2.5 py-1 bg-white border border-[#e8e8e9] rounded-[2px] font-mono-num text-[12px] font-bold text-black flex items-center gap-1.5 shrink-0 shadow-xs">
                <span>USDC</span>
              </div>
            </div>
          </div>

          {/* Swap Direction Toggle */}
          <div className="flex justify-center -my-1.5 z-10">
            <div className="w-7 h-7 bg-white border border-[#e2e2e3] rounded-full flex items-center justify-center text-black shadow-xs">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Receive Output */}
          <div className="p-3 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase font-bold">
                {t.swap.youReceive}
              </span>
              <span className="font-mono-num text-[10px] text-[#5d5e66]">
                {t.swap.rate}: 1 CSU ≈ {formatTokenPrice(price)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="font-mono-num text-[20px] font-bold text-black truncate">
                {receiveCsu > 0 ? Math.round(receiveCsu).toLocaleString() : '0'}
              </span>
              <div className="px-2.5 py-1 bg-black text-white rounded-[2px] font-mono-num text-[12px] font-bold flex items-center gap-1.5 shrink-0 shadow-xs">
                <div className="w-2 h-2 bg-white rotate-45"></div>
                <span>CSU</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Route Info */}
        <div className="p-2.5 bg-zinc-50 rounded-[2px] border border-zinc-200 flex flex-col gap-1 font-mono-num text-[11px]">
          <div className="flex items-center justify-between text-[#5d5e66]">
            <span>{t.swap.routing}</span>
            <span className="text-black font-semibold">Uniswap v4 (Base)</span>
          </div>
          <div className="flex items-center justify-between text-[#5d5e66]">
            <span>{t.swap.slippage}</span>
            <span className="text-[#009668] font-semibold">{priceImpact}</span>
          </div>
          <div className="flex items-center justify-between text-[#5d5e66]">
            <span>{t.swap.gas}</span>
            <span className="text-black font-semibold">&lt; $0.01 (Base L2)</span>
          </div>
          <div className="flex items-center justify-between text-[#5d5e66]">
            <span>{t.swap.slippageTol}</span>
            <div className="flex items-center gap-1">
              {['0.1', '0.5', '1.0'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  className={`px-1.5 py-0.5 rounded-[1px] text-[10px] font-semibold ${
                    slippage === s ? 'bg-black text-white' : 'bg-zinc-200 text-zinc-700'
                  }`}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!wallet.isConnected ? (
          <button
            id="btn-connect-wallet-swap"
            type="button"
            onClick={() => {
              onClose();
              if (onOpenWalletModal) onOpenWalletModal();
            }}
            className="w-full py-3 bg-black hover:bg-zinc-800 text-white font-mono-num text-[12px] font-bold rounded-[2px] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{t.nav.connectWallet}</span>
          </button>
        ) : (
          <button
            id="btn-confirm-swap"
            disabled={isSwapping || numPay <= 0}
            onClick={handleSwap}
            className="w-full py-3 bg-black hover:bg-zinc-800 disabled:opacity-50 text-white font-mono-num text-[12px] font-bold rounded-[2px] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {isSwapping ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{t.swap.submitting}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{t.swap.submit}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
