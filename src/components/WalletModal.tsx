import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ArrowRightLeft,
  LogOut,
  Copy,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { WalletState } from '../types';
import { Translations } from '../i18n/translations';
import { formatTokenPrice } from '../utils/formatters';
import {
  checkWalletAvailability,
  getInjectedProvider,
  CSU_TOKEN_ADDRESS,
} from '../services/web3Wallet';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  onConnect: (connectorId: string) => Promise<boolean>;
  onDisconnect: () => void;
  onSwitchNetwork: (net: 'Base' | 'Ethereum Mainnet' | 'Arbitrum One') => Promise<void>;
  onCopyAddress: (addr: string) => void;
  onAddToken?: () => Promise<void>;
  onRefreshBalances?: () => Promise<void>;
  isRefreshingBalances?: boolean;
  price: number;
  t: Translations;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
  onCopyAddress,
  onAddToken,
  onRefreshBalances,
  isRefreshingBalances = false,
  price,
  t,
}) => {
  const [connectingConnector, setConnectingConnector] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
  const [isAddingToken, setIsAddingToken] = useState(false);
  const [installedMap, setInstalledMap] = useState<Record<string, boolean>>({});

  // Check detected wallet extensions whenever modal opens
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      setLocalError(null);
      setInstalledMap({
        metamask: checkWalletAvailability('metamask').installed,
        okx: checkWalletAvailability('okx').installed,
        coinbase: checkWalletAvailability('coinbase').installed,
        injected: Boolean(getInjectedProvider()),
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const connectors = [
    {
      id: 'metamask',
      name: 'MetaMask',
      subtitle: '主流以太坊与 L2 浏览器插件 / 移动端',
      badge: installedMap.metamask ? '已检测到' : '官方推荐',
      isInstalled: installedMap.metamask,
      downloadUrl: 'https://metamask.io/download/',
      icon: '🦊',
    },
    {
      id: 'okx',
      name: 'OKX Wallet',
      subtitle: 'OKX Web3 多链原生钱包',
      badge: installedMap.okx ? '已检测到' : 'Web3 Ready',
      isInstalled: installedMap.okx,
      downloadUrl: 'https://www.okx.com/web3',
      icon: '⬛',
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      subtitle: 'Base 原生机构与智能钱包',
      badge: installedMap.coinbase ? '已检测到' : 'Base Native',
      isInstalled: installedMap.coinbase,
      downloadUrl: 'https://www.coinbase.com/wallet',
      icon: '🔵',
    },
    {
      id: 'injected',
      name: 'Browser Web3 (Rabby / Phantom / 等)',
      subtitle: '使用当前浏览器中默认注入的 Web3 钱包',
      badge: installedMap.injected ? '可用' : '通用注入',
      isInstalled: installedMap.injected,
      downloadUrl: 'https://rabby.io/',
      icon: '⚡',
    },
  ];

  const handleSelectConnector = async (connectorId: string) => {
    setLocalError(null);
    setConnectingConnector(connectorId);
    try {
      const success = await onConnect(connectorId);
      if (success) {
        onClose();
      }
    } catch (err: any) {
      console.error('Wallet connection failed:', err);
      let msg = err?.message || '连接失败，请重试';
      if (err?.code === 4001 || msg.includes('rejected')) {
        msg = '您已取消在钱包中的授权连接请求';
      }
      setLocalError(msg);
    } finally {
      setConnectingConnector(null);
    }
  };

  const handleNetworkChange = async (net: 'Base' | 'Ethereum Mainnet' | 'Arbitrum One') => {
    if (wallet.network === net || isSwitchingNetwork) return;
    setIsSwitchingNetwork(true);
    setLocalError(null);
    try {
      await onSwitchNetwork(net);
    } catch (err: any) {
      console.error('Network switch failed:', err);
      let msg = err?.message || '网络切换失败';
      if (err?.code === 4001 || msg.includes('rejected')) {
        msg = '您已取消在钱包中确认切换网络';
      }
      setLocalError(msg);
    } finally {
      setIsSwitchingNetwork(false);
    }
  };

  const handleAddTokenClick = async () => {
    if (!onAddToken || isAddingToken) return;
    setIsAddingToken(true);
    setLocalError(null);
    try {
      await onAddToken();
    } catch (err: any) {
      console.error('Add token failed:', err);
      let msg = err?.message || '添加代币失败';
      if (err?.code === 4001 || msg.includes('rejected')) {
        msg = '您已在钱包中取消添加代币';
      }
      setLocalError(msg);
    } finally {
      setIsAddingToken(false);
    }
  };

  return (
    <div
      id="wallet-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="wallet-modal-box"
        className="w-full max-w-md bg-white rounded-[2px] shadow-2xl p-6 flex flex-col gap-4 border border-[#e8e8e9] transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f3f3f4]">
          <div className="flex flex-col">
            <h3 className="font-sans text-[17px] font-bold text-black tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 bg-black rotate-45"></span>
              {wallet.isConnected ? t.walletModal.titleConnected : t.walletModal.titleConnect}
            </h3>
            <span className="font-mono-num text-[11px] text-[#77767b]">
              {wallet.isConnected
                ? t.walletModal.subtitleConnected
                : '通过 EIP-1193 协议向您的真实 Web3 钱包申请授权连接'}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-7 h-7 rounded-[2px] bg-[#f3f3f4] hover:bg-[#e8e8e9] flex items-center justify-center text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Feedback Banner if any */}
        {localError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-[2px] flex items-start gap-2 text-[#ba1a1a] font-mono-num text-[11px] leading-relaxed animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">连接提示：</span>
              <span>{localError}</span>
            </div>
            <button
              onClick={() => setLocalError(null)}
              className="text-red-400 hover:text-red-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* If Connected: Real Account Dashboard */}
        {wallet.isConnected && wallet.address ? (
          <div className="flex flex-col gap-4">
            {/* Address & Network Status Banner */}
            <div className="p-3.5 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono-num text-[10px] text-[#77767b] uppercase font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#009668]" />
                  真实已授权钱包地址
                </span>
                <span className="px-1.5 py-0.5 bg-emerald-50 text-[#009668] font-mono-num text-[10px] rounded-[2px] font-bold flex items-center gap-1 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009668] animate-pulse"></span>
                  {wallet.network}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white px-2.5 py-2 rounded-[2px] border border-[#e8e8e9]">
                <span className="font-mono-num text-[12px] font-bold text-black break-all select-all">
                  {wallet.address}
                </span>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => onCopyAddress(wallet.address!)}
                    className="p-1 hover:bg-zinc-100 rounded text-zinc-600 hover:text-black transition-colors"
                    title="复制地址"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`https://basescan.org/address/${wallet.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:bg-zinc-100 rounded text-zinc-600 hover:text-black transition-colors"
                    title="在 BaseScan 上查看"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Real On-chain Balances */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-num text-[10px] text-[#77767b] uppercase font-bold">
                  链上资产余额 (实时查询)
                </span>
                {onRefreshBalances && (
                  <button
                    onClick={() => onRefreshBalances()}
                    disabled={isRefreshingBalances}
                    className="font-mono-num text-[10px] text-zinc-600 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${isRefreshingBalances ? 'animate-spin' : ''}`}
                    />
                    <span>{isRefreshingBalances ? '查询中...' : '刷新余额'}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef]">
                  <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                    CSU 代币余额 (Base)
                  </span>
                  <span className="font-mono-num text-[15px] font-bold text-black block truncate">
                    {wallet.csuBalance.toLocaleString()} CSU
                  </span>
                  <span className="font-mono-num text-[10px] text-[#009668] block">
                    ≈ {formatTokenPrice(wallet.csuBalance * price)} USD
                  </span>
                </div>

                <div className="p-3 bg-[#f9f9fa] rounded-[2px] border border-[#eeeeef]">
                  <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
                    USDC 储备 (Base)
                  </span>
                  <span className="font-mono-num text-[15px] font-bold text-black block">
                    ${wallet.usdtBalance.toLocaleString()}
                  </span>
                  <span className="font-mono-num text-[10px] text-[#77767b] block truncate">
                    Gas 储备: {wallet.ethBalance} ETH
                  </span>
                </div>
              </div>
            </div>

            {/* Add CSU to Wallet Button */}
            {onAddToken && (
              <button
                type="button"
                onClick={handleAddTokenClick}
                disabled={isAddingToken}
                className="w-full py-2 px-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 font-mono-num text-[11px] font-medium rounded-[2px] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <PlusCircle className="w-3.5 h-3.5 text-[#009668]" />
                  <span>添加 CSU 到钱包资产列表 (EIP-747)</span>
                </div>
                {isAddingToken ? (
                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span className="text-[10px] text-zinc-500">点击唤起</span>
                )}
              </button>
            )}

            {/* Real Network Switching */}
            <div className="p-3 bg-white rounded-[2px] border border-[#e8e8e9] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono-num text-[10px] text-[#77767b] uppercase font-bold flex items-center gap-1.5">
                  <ArrowRightLeft className="w-3 h-3" />
                  切换钱包当前连接网络
                </span>
                {isSwitchingNetwork && (
                  <span className="font-mono-num text-[10px] text-[#0052ff] flex items-center gap-1">
                    <span className="w-2.5 h-2.5 border-2 border-[#0052ff] border-t-transparent rounded-full animate-spin"></span>
                    等待钱包确认...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleNetworkChange('Base')}
                  disabled={isSwitchingNetwork}
                  className={`py-2 px-2 rounded-[2px] font-mono-num text-[11px] font-semibold border transition-colors flex items-center justify-center gap-1 ${
                    wallet.network === 'Base'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-[#f9f9fa] text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {wallet.network === 'Base' && <Check className="w-3 h-3 text-[#10b981]" />}
                  Base (推荐)
                </button>
                <button
                  type="button"
                  onClick={() => handleNetworkChange('Ethereum Mainnet')}
                  disabled={isSwitchingNetwork}
                  className={`py-2 px-2 rounded-[2px] font-mono-num text-[11px] font-semibold border transition-colors flex items-center justify-center gap-1 ${
                    wallet.network === 'Ethereum Mainnet'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-[#f9f9fa] text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {wallet.network === 'Ethereum Mainnet' && (
                    <Check className="w-3 h-3 text-[#10b981]" />
                  )}
                  Mainnet
                </button>
                <button
                  type="button"
                  onClick={() => handleNetworkChange('Arbitrum One')}
                  disabled={isSwitchingNetwork}
                  className={`py-2 px-2 rounded-[2px] font-mono-num text-[11px] font-semibold border transition-colors flex items-center justify-center gap-1 ${
                    wallet.network === 'Arbitrum One'
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-[#f9f9fa] text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {wallet.network === 'Arbitrum One' && (
                    <Check className="w-3 h-3 text-[#10b981]" />
                  )}
                  Arbitrum
                </button>
              </div>
            </div>

            {/* Disconnect Action */}
            <button
              onClick={() => {
                onDisconnect();
                onClose();
              }}
              type="button"
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-[#ba1a1a] font-mono-num text-[11px] font-bold rounded-[2px] transition-colors flex items-center justify-center gap-2 border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.walletModal.disconnect}</span>
            </button>
          </div>
        ) : (
          /* Connect Options with Real Detection */
          <div className="flex flex-col gap-2.5">
            {connectors.map((c) => (
              <div
                key={c.id}
                className="w-full p-3 bg-[#f9f9fa] hover:bg-[#eeeeef] border border-[#e8e8e9] rounded-[2px] transition-all flex items-center justify-between text-left group"
              >
                <div
                  onClick={() => handleSelectConnector(c.id)}
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-[13px] font-bold text-black">
                        {c.name}
                      </span>
                      {c.isInstalled && (
                        <CheckCircle2 className="w-3 h-3 text-[#009668]" />
                      )}
                    </div>
                    <span className="font-mono-num text-[10px] text-[#77767b]">
                      {c.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 font-mono-num text-[9px] font-semibold rounded-[2px] ${
                      c.isInstalled
                        ? 'bg-emerald-50 text-[#009668] border border-emerald-200'
                        : 'bg-[#e2e2e3] text-zinc-700'
                    }`}
                  >
                    {c.badge}
                  </span>

                  {connectingConnector === c.id ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSelectConnector(c.id)}
                      className="px-2.5 py-1 bg-black text-white hover:bg-zinc-800 rounded-[2px] font-mono-num text-[10px] font-bold transition-colors"
                    >
                      连接
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Connecting State Notification */}
            {connectingConnector && (
              <div className="p-3 bg-zinc-900 text-white rounded-[2px] flex items-center gap-2.5 font-mono-num text-[11px] animate-pulse">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>请在弹出的钱包扩展窗口中确认授权连接...</span>
              </div>
            )}

            {/* Web3 Security Notice */}
            <div className="p-3 bg-zinc-50 rounded-[2px] border border-zinc-200 text-zinc-500 font-mono-num text-[10px] leading-relaxed flex flex-col gap-1">
              <span className="font-semibold text-black flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#009668]" />
                安全权限提示
              </span>
              <span>
                连接仅读取您的公共钱包地址和链上资产余额，绝不会请求或访问您的私钥或助记词。
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
