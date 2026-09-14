import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { TokenMetrics } from '../types';
import { Translations } from '../i18n/translations';

interface TokenMetricsCardProps {
  metrics: TokenMetrics;
  onOpenAnalytics: () => void;
  t: Translations;
}

export const TokenMetricsCard: React.FC<TokenMetricsCardProps> = ({
  metrics,
  onOpenAnalytics,
  t,
}) => {
  const circulatingPercent = (
    (metrics.circulatingSupply / metrics.totalSupply) *
    100
  ).toFixed(2);

  return (
    <div className="xl:col-span-4 flex flex-col justify-between gap-3 bg-white/95 backdrop-blur-xl rounded-[2px] shadow-sm p-4 border border-[#e8e8e9]">
      <div className="flex flex-col gap-2.5">
        {/* Header Title */}
        <div className="flex items-center justify-between pb-1 border-b border-[#f3f3f4]">
          <span className="font-mono-num text-[12px] uppercase font-bold tracking-wider text-black">
            {t.metrics.title}
          </span>
          <span className="font-mono-num text-[10px] text-[#009668] bg-[#009668]/10 px-2 py-0.5 rounded-[2px] font-semibold">
            {t.metrics.tag}
          </span>
        </div>

        {/* Metrics List */}
        <div className="flex flex-col gap-2">
          {/* Market Cap */}
          <div className="p-2.5 bg-[#f9f9fa] rounded-[2px] flex items-center justify-between border border-[#eeeeef]">
            <div>
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                {t.metrics.marketCap}
              </span>
              <span className="font-mono-num text-[18px] font-bold text-black">
                ${metrics.marketCap.toLocaleString()}
              </span>
            </div>
            <span className="font-mono-num text-[12px] text-[#009668] font-bold">
              +{metrics.priceChange24h.toFixed(2)}%
            </span>
          </div>

          {/* Fully Diluted Valuation */}
          <div className="p-2.5 bg-[#f9f9fa] rounded-[2px] flex items-center justify-between border border-[#eeeeef]">
            <div>
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                {t.metrics.fdv}
              </span>
              <span className="font-mono-num text-[18px] font-bold text-black">
                ${metrics.fdv.toLocaleString()}
              </span>
            </div>
            <span className="font-mono-num text-[11px] text-[#77767b] font-medium">
              {t.metrics.fdvSubtitle}
            </span>
          </div>

          {/* Circulating Supply */}
          <div className="p-2.5 bg-[#f9f9fa] rounded-[2px] flex flex-col gap-1.5 border border-[#eeeeef]">
            <div className="flex items-center justify-between">
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase">
                {t.metrics.circulatingSupply}
              </span>
              <span className="font-mono-num text-[13px] font-bold text-black">
                {metrics.circulatingSupply.toLocaleString()} CSU
              </span>
            </div>

            {/* Progress Ratio Bar */}
            <div className="w-full h-1.5 bg-[#e8e8e9] rounded-[1px] overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${circulatingPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono-num text-[10px] text-[#77767b]">
              <span>{circulatingPercent}% {t.metrics.circulatingRatio}</span>
              <span>{t.metrics.totalRatio}</span>
            </div>
          </div>

          {/* Holders */}
          <div className="p-2.5 bg-[#f9f9fa] rounded-[2px] flex items-center justify-between border border-[#eeeeef]">
            <div>
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                {t.metrics.holders}
              </span>
              <span className="font-mono-num text-[18px] font-bold text-black">
                {metrics.holdersCount.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono-num text-[11px] text-[#009668] font-bold block">
                +{metrics.holdersChangeToday} {t.metrics.holdersToday}
              </span>
              <span className="font-mono-num text-[10px] text-[#77767b]">
                {t.metrics.holdersChains}
              </span>
            </div>
          </div>

          {/* Liquidity Reserve */}
          <div className="p-2.5 bg-[#f9f9fa] rounded-[2px] flex items-center justify-between border border-[#eeeeef]">
            <div>
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                DEX 资金池流动性 (Liquidity)
              </span>
              <span className="font-mono-num text-[17px] font-bold text-black">
                ${(metrics.liquidityUsd ?? 31952.14).toLocaleString()}
              </span>
            </div>
            <span className="font-mono-num text-[11px] text-[#0052ff] bg-[#0052ff]/10 px-2 py-0.5 rounded-[2px] font-semibold">
              Uniswap v4 (Base)
            </span>
          </div>

          {/* 24h Total Staked */}
          <div className="p-2.5 bg-[#f9f9fa] rounded-[2px] flex items-center justify-between border border-[#eeeeef]">
            <div>
              <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                {t.metrics.totalStaked}
              </span>
              <span className="font-mono-num text-[16px] font-bold text-black">
                {metrics.totalStaked.toLocaleString()} CSU
              </span>
            </div>
            <span className="font-mono-num text-[11px] text-[#009668] bg-[#009668]/10 px-2 py-0.5 rounded-[2px] font-bold">
              {t.metrics.apr} {metrics.stakingApr}%
            </span>
          </div>
        </div>
      </div>

      {/* Dual Security Audit Verification Banner */}
      <button
        id="btn-audit-verification"
        onClick={onOpenAnalytics}
        type="button"
        className="text-left p-2.5 bg-[#e2e2e3]/40 hover:bg-[#e2e2e3]/70 transition-colors rounded-[2px] flex items-center justify-between border border-[#d8d8da]"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-black shrink-0" />
          <div className="flex flex-col">
            <span className="font-mono-num text-[11px] text-black font-bold">
              {t.metrics.auditPassed}
            </span>
            <span className="font-mono-num text-[10px] text-[#5d5e66]">
              {t.metrics.auditSub}
            </span>
          </div>
        </div>
        <ShieldAlert className="w-4 h-4 text-[#77767b] shrink-0" />
      </button>
    </div>
  );
};
