import React, { useState } from 'react';
import { X, ShieldCheck, PieChart, Coins, Flame, ArrowUpRight } from 'lucide-react';
import { TokenMetrics } from '../types';
import { formatTokenPrice } from '../utils/formatters';

interface MarketAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: TokenMetrics;
}

export const MarketAnalyticsModal: React.FC<MarketAnalyticsModalProps> = ({
  isOpen,
  onClose,
  metrics,
}) => {
  const [stakeCalcAmount, setStakeCalcAmount] = useState<string>('500000');

  if (!isOpen) return null;

  const numStake = parseFloat(stakeCalcAmount) || 0;
  const yearlyReturn = (numStake * (metrics.stakingApr / 100)).toFixed(1);
  const monthlyReturn = (parseFloat(yearlyReturn) / 12).toFixed(1);

  return (
    <div
      id="analytics-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        id="analytics-modal-box"
        className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-[3px] shadow-2xl p-6 flex flex-col gap-5 border border-[#e8e8e9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f3f3f4]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-black"></div>
            <h3 className="font-sans text-[18px] font-bold text-black tracking-tight">
              CSU (Chasing light) 市场深度与链上流动性分析
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

        {/* Liquidity Pools Breakdown */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono-num text-[11px] text-[#77767b] uppercase font-bold flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5" />
              Base 链上流动性池与做市深度分布
            </span>
            <span className="font-mono-num text-[11px] text-[#009668] font-semibold">
              Total Liquidity: ${(metrics.liquidityUsd ?? 31952.14).toLocaleString()} USD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono-num text-[11px] font-bold text-black">
                  Uniswap v4 (Base)
                </span>
                <span className="px-1.5 py-0.2 bg-[#eef2ff] text-[#0052ff] font-mono-num text-[9px] rounded-[2px] font-semibold">
                  Active Primary
                </span>
              </div>
              <span className="font-mono-num text-[15px] font-bold text-black">
                ${(metrics.liquidityUsd ?? 31952.14).toLocaleString()}
              </span>
              <span className="font-mono-num text-[10px] text-[#77767b]">CSU / USDC 核心交易对</span>
            </div>

            <div className="p-3 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono-num text-[11px] font-bold text-black">
                  Aerodrome Finance
                </span>
                <span className="px-1.5 py-0.2 bg-[#eeeeef] font-mono-num text-[9px] text-[#5d5e66] rounded-[2px]">
                  Base DEX
                </span>
              </div>
              <span className="font-mono-num text-[15px] font-bold text-black">$8,450</span>
              <span className="font-mono-num text-[10px] text-[#77767b]">CSU / WETH 储备池</span>
            </div>

            <div className="p-3 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono-num text-[11px] font-bold text-black">
                  SushiSwap (Base)
                </span>
                <span className="px-1.5 py-0.2 bg-[#eeeeef] font-mono-num text-[9px] text-[#5d5e66] rounded-[2px]">
                  L2 Pool
                </span>
              </div>
              <span className="font-mono-num text-[15px] font-bold text-black">$3,800</span>
              <span className="font-mono-num text-[10px] text-[#77767b]">CSU / USDbC 备份池</span>
            </div>
          </div>
        </div>

        {/* Staking Yield Estimator */}
        <div className="p-4 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono-num text-[11px] text-[#77767b] uppercase font-bold flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-black" />
              质押奖励收益估算器 (当前 APR: {metrics.stakingApr}%)
            </span>
            <span className="font-mono-num text-[11px] text-[#009668] bg-[#009668]/10 px-2 py-0.5 rounded-[2px] font-semibold">
              逐块复利释放
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-1/2 flex flex-col gap-1">
              <label className="font-mono-num text-[10px] text-[#5d5e66] uppercase font-semibold">
                模拟质押数量 (CSU)
              </label>
              <input
                type="number"
                value={stakeCalcAmount}
                onChange={(e) => setStakeCalcAmount(e.target.value)}
                className="w-full p-2 bg-white border border-[#e8e8e9] rounded-[2px] font-mono-num text-[14px] font-bold text-black focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-1/2 grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-white border border-[#e8e8e9] rounded-[2px]">
                <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                  预计 30 天收益
                </span>
                <span className="font-mono-num text-[14px] font-bold text-[#009668]">
                  +{monthlyReturn} CSU
                </span>
                <span className="font-mono-num text-[10px] text-[#5d5e66]">
                  ≈ {formatTokenPrice(parseFloat(monthlyReturn) * metrics.price)} USD
                </span>
              </div>

              <div className="p-2.5 bg-white border border-[#e8e8e9] rounded-[2px]">
                <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                  预计 1 年年化收益
                </span>
                <span className="font-mono-num text-[14px] font-bold text-[#009668]">
                  +{yearlyReturn} CSU
                </span>
                <span className="font-mono-num text-[10px] text-[#5d5e66]">
                  ≈ {formatTokenPrice(parseFloat(yearlyReturn) * metrics.price)} USD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Audit Verification Matrix */}
        <div className="p-4 bg-[#f3f3f4] rounded-[2px] border border-[#e2e2e3] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-black" />
              <span className="font-mono-num text-[12px] font-bold text-black uppercase">
                Security Audit Certifications &amp; Formally Proven Models
              </span>
            </div>
            <span className="font-mono-num text-[11px] text-[#009668] font-bold">
              CertiK Skynet 96.4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono-num text-[11px]">
            <div className="p-3 bg-white rounded-[2px] border border-[#e8e8e9] flex flex-col gap-1">
              <span className="font-bold text-black">CertiK Whitebox Audit Report</span>
              <span className="text-[#5d5e66] text-[10px]">
                Static bytecode inspection, reentrancy guards, overflow safety &amp; timelock governor audits.
              </span>
              <a
                href="https://certik.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#009668] hover:underline text-[10px] flex items-center gap-1 mt-1 font-semibold"
              >
                <span>Verify Skynet Certificate</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="p-3 bg-white rounded-[2px] border border-[#e8e8e9] flex flex-col gap-1">
              <span className="font-bold text-black">OpenZeppelin Formal Proofs</span>
              <span className="text-[#5d5e66] text-[10px]">
                Certora Prover mathematical formal proofs for OFT bridge invariants &amp; staking vaults.
              </span>
              <a
                href="https://openzeppelin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#009668] hover:underline text-[10px] flex items-center gap-1 mt-1 font-semibold"
              >
                <span>View Mathematical Proof Specs</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer close */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-black text-white font-mono-num text-[12px] font-semibold rounded-[2px] hover:bg-zinc-800 transition-colors"
          >
            返回看板 (Close Analytics)
          </button>
        </div>
      </div>
    </div>
  );
};
