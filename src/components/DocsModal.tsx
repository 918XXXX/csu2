import React from 'react';
import { X, BookOpen, Copy, CheckCircle2, Code2, ExternalLink } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress: string;
  onCopyAddress: (addr: string, msg?: string) => void;
  t?: Translations;
}

export const DocsModal: React.FC<DocsModalProps> = ({
  isOpen,
  onClose,
  contractAddress,
  onCopyAddress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-[2px] shadow-2xl border border-[#e8e8e9] p-6 max-h-[90vh] overflow-y-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f3f3f4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-black flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-[18px] font-bold text-black leading-tight">
                CSU (Chasing light) 技术文档与合约规约
              </h3>
              <span className="font-mono-num text-[11px] text-[#77767b]">
                Base Mainnet • Chain ID: 8453 • Decimals: 18
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-7 h-7 rounded-[2px] bg-[#f3f3f4] hover:bg-[#e8e8e9] flex items-center justify-center text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Documentation Content */}
        <div className="flex flex-col gap-4 font-mono-num text-[12px] text-zinc-700 leading-relaxed">
          {/* Architecture Overview */}
          <div className="p-3.5 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-2">
            <h4 className="font-bold text-black text-[13px] uppercase tracking-wider">
              1. 项目概述 (Overview & Token Identity)
            </h4>
            <p className="text-[12px] text-[#47464b] font-sans leading-relaxed">
              CSU（追光 / Chasing light）是部署于以太坊 Layer 2 Base 网络的高性能去中心化资产。基于纯净的 ERC-20 标准，专为高频低摩擦链上交易与去中心化流动性生态设计。代币具备零税率（0% Buy / 0% Sell）、不可增发及 100% 全流通特征。
            </p>
          </div>

          {/* Smart Contract Deployments */}
          <div className="p-3.5 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-2">
            <h4 className="font-bold text-black text-[13px] uppercase tracking-wider">
              2. 核心智能合约与流动性池地址
            </h4>
            <div className="space-y-2">
              <div className="p-2.5 bg-white border border-[#e8e8e9] rounded-[2px] flex items-center justify-between">
                <div>
                  <span className="text-[#77767b] text-[10px] block">
                    CSU 代币主合约 (Base - Chain ID: 8453)
                  </span>
                  <span className="text-black font-bold text-[11px] break-all">{contractAddress}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onCopyAddress(contractAddress, 'Token Contract Copied')}
                    className="p-1.5 hover:bg-zinc-100 rounded text-zinc-600 hover:text-black transition-colors"
                    title="Copy Address"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`https://basescan.org/token/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-zinc-100 rounded text-zinc-600 hover:text-black transition-colors"
                    title="View on BaseScan"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-2.5 bg-white border border-[#e8e8e9] rounded-[2px] flex items-center justify-between">
                <div>
                  <span className="text-[#77767b] text-[10px] block">
                    Uniswap v4 CSU / USDC 核心做市池 (Base)
                  </span>
                  <span className="text-black font-bold text-[11px] break-all">
                    0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      onCopyAddress(
                        '0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023',
                        'Pool Address Copied'
                      )
                    }
                    className="p-1.5 hover:bg-zinc-100 rounded text-zinc-600 hover:text-black transition-colors"
                    title="Copy Pool Address"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://dexscreener.com/base/0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-zinc-100 rounded text-zinc-600 hover:text-black transition-colors"
                    title="View on DexScreener"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tokenomics Model */}
          <div className="p-3.5 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-2">
            <h4 className="font-bold text-black text-[13px] uppercase tracking-wider">
              3. 代币经济模型 (Tokenomics)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-num text-[11px]">
              <div className="p-2 bg-white rounded border border-[#e8e8e9]">
                <span className="text-[10px] text-[#77767b] block">总供应量 (Total Supply)</span>
                <span className="font-bold text-black">100,000,000,000</span>
              </div>
              <div className="p-2 bg-white rounded border border-[#e8e8e9]">
                <span className="text-[10px] text-[#77767b] block">流通比例 (Circulating)</span>
                <span className="font-bold text-[#009668]">100% (1000亿)</span>
              </div>
              <div className="p-2 bg-white rounded border border-[#e8e8e9]">
                <span className="text-[10px] text-[#77767b] block">交易税费 (Buy/Sell Tax)</span>
                <span className="font-bold text-black">0% / 0%</span>
              </div>
              <div className="p-2 bg-white rounded border border-[#e8e8e9]">
                <span className="text-[10px] text-[#77767b] block">铸币权限 (Mint Function)</span>
                <span className="font-bold text-[#009668]">已永久关闭 (Renounced)</span>
              </div>
            </div>
          </div>

          {/* Code Integration Example */}
          <div className="p-3.5 bg-[#18181b] text-white rounded-[2px] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[#a1a1aa] text-[11px]">
              <span className="flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" />
                Base 智能合约调用示例 (Ethers.js v6)
              </span>
              <span>ERC-20 (Base L2)</span>
            </div>
            <pre className="bg-black/40 p-2.5 rounded font-mono-num text-[11px] overflow-x-auto text-emerald-400">
{`// Connect to Base Mainnet (Chain ID 8453)
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
const csuAddress = "${contractAddress}";
const abi = ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"];

const contract = new ethers.Contract(csuAddress, abi, provider);
const balance = await contract.balanceOf("0xYourWalletAddress");
console.log("CSU Balance:", ethers.formatUnits(balance, 18));`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-[#f3f3f4]">
          <span className="font-mono-num text-[11px] text-[#77767b] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#009668]" />
            BaseScan 开源验证完成 • DexScreener 已认证
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-black text-white font-mono-num text-[12px] font-semibold rounded-[2px] hover:bg-zinc-800 transition-colors"
          >
            完成 (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
