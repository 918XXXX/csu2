import React, { useState, useEffect } from 'react';
import { LivingShaderBackground } from './components/LivingShaderBackground';
import { Header } from './components/Header';
import { TerminalBar } from './components/TerminalBar';
import { CandlestickChart } from './components/CandlestickChart';
import { TokenMetricsCard } from './components/TokenMetricsCard';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { AnnouncementModal } from './components/AnnouncementModal';
import { WalletModal } from './components/WalletModal';
import { SwapModal } from './components/SwapModal';
import { MarketAnalyticsModal } from './components/MarketAnalyticsModal';
import { DocsModal } from './components/DocsModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { INITIAL_METRICS, ANNOUNCEMENTS } from './data/mockData';
import { Announcement, WalletState, TokenMetrics } from './types';
import { Language, TRANSLATIONS } from './i18n/translations';
import { fetchLiveTokenData } from './services/tokenService';
import {
  connectRealWallet,
  silentCheckWallet,
  switchWalletNetwork,
  fetchRealBalances,
  addCsuTokenToWallet,
  getInjectedProvider,
  mapChainIdToNetwork,
} from './services/web3Wallet';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[currentLanguage];

  const [metrics, setMetrics] = useState<TokenMetrics>(INITIAL_METRICS);
  const [announcements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'announcements' | 'market-analytics' | 'docs'>('overview');

  // Modals state
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');
  const [isRefreshingBalances, setIsRefreshingBalances] = useState(false);

  // Real Web3 Wallet State (Base L2)
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    csuBalance: 0,
    usdtBalance: 0,
    ethBalance: 0,
    network: 'Base',
    connectorName: null,
    chainId: null,
    isConnecting: false,
  });

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // 1. Silent Auto-reconnect & EIP-1193 listeners for real wallet
  useEffect(() => {
    let isCancelled = false;

    const tryAutoConnect = async () => {
      const savedConnector = localStorage.getItem('csu_connected_wallet');
      if (!savedConnector) return;

      try {
        const res = await silentCheckWallet();
        if (res && !isCancelled) {
          const balances = await fetchRealBalances(res.address, res.network);
          if (!isCancelled) {
            setWallet({
              isConnected: true,
              address: res.address,
              csuBalance: balances.csuBalance,
              usdtBalance: balances.usdtBalance,
              ethBalance: balances.ethBalance,
              network: res.network,
              connectorName:
                savedConnector === 'metamask'
                  ? 'MetaMask'
                  : savedConnector === 'okx'
                  ? 'OKX Wallet'
                  : savedConnector === 'coinbase'
                  ? 'Coinbase Wallet'
                  : 'Web3 Wallet',
              chainId: res.chainId,
            });
          }
        }
      } catch (e) {
        console.warn('Auto reconnect check:', e);
      }
    };

    tryAutoConnect();

    // Attach real wallet EIP-1193 event listeners
    const provider = getInjectedProvider();
    if (provider && typeof provider.on === 'function') {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (!accounts || accounts.length === 0) {
          setWallet({
            isConnected: false,
            address: null,
            csuBalance: 0,
            usdtBalance: 0,
            ethBalance: 0,
            network: 'Base',
            connectorName: null,
            chainId: null,
          });
          localStorage.removeItem('csu_connected_wallet');
          showToast(t.toast.walletDisconnected, 'info');
        } else {
          const newAddress = accounts[0];
          setWallet((prev) => ({ ...prev, address: newAddress, isConnected: true }));
          try {
            const balances = await fetchRealBalances(newAddress, wallet.network);
            setWallet((prev) => ({ ...prev, ...balances }));
            showToast(`${currentLanguage === 'en' ? 'Account switched to:' : '已切换账户:'} ${newAddress.slice(0, 6)}...${newAddress.slice(-4)}`);
          } catch (e) {
            console.warn('Failed to query new balances:', e);
          }
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        const chainId = parseInt(chainIdHex, 16);
        const net = mapChainIdToNetwork(chainId);
        setWallet((prev) => ({ ...prev, network: net, chainId }));
        if (wallet.address) {
          fetchRealBalances(wallet.address, net).then((b) => {
            setWallet((prev) => ({ ...prev, ...b }));
          });
        }
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);

      return () => {
        isCancelled = true;
        if (typeof provider.removeListener === 'function') {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Fetch live on-chain DexScreener token metrics & subtle heartbeat update
  useEffect(() => {
    let isMounted = true;

    const loadLiveMetrics = async () => {
      try {
        const live = await fetchLiveTokenData();
        if (live && isMounted) {
          setMetrics((prev) => ({
            ...prev,
            ...live,
          }));
        }
      } catch (err) {
        console.warn('DexScreener live update skipped:', err);
      }
    };

    // Immediate initial sync
    loadLiveMetrics();

    // Regular periodic sync every 20 seconds, with live micro fluctuation between syncs
    const pollInterval = setInterval(() => {
      loadLiveMetrics();
    }, 20000);

    const heartbeatInterval = setInterval(() => {
      setMetrics((prev) => {
        // Subtle micro fluctuation ±0.15% around live price
        const microFactor = 1 + (Math.random() - 0.49) * 0.003;
        const newPrice = Math.max(0.00000001, prev.price * microFactor);
        return {
          ...prev,
          price: newPrice,
        };
      });
    }, 4500);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      clearInterval(heartbeatInterval);
    };
  }, []);

  const handleCopy = (text: string, label?: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast(label || 'Contract Copied to Clipboard');
      })
      .catch(() => {
        showToast(label || 'Contract Copied to Clipboard');
      });
  };

  // Real Web3 Wallet Connection Handler
  const handleConnectWallet = async (connectorId: string): Promise<boolean> => {
    try {
      showToast(currentLanguage === 'en' ? 'Requesting wallet authorization...' : '正在请求钱包授权连接...', 'info');
      const res = await connectRealWallet(connectorId);

      // Query real on-chain balances
      const balances = await fetchRealBalances(res.address, res.network);

      setWallet({
        isConnected: true,
        address: res.address,
        csuBalance: balances.csuBalance,
        usdtBalance: balances.usdtBalance,
        ethBalance: balances.ethBalance,
        network: res.network,
        connectorName: res.connectorName,
        chainId: res.chainId,
        isConnecting: false,
      });

      localStorage.setItem('csu_connected_wallet', connectorId);
      showToast(currentLanguage === 'en' ? `Wallet connected (${res.connectorName})` : `钱包连接成功 (${res.connectorName})`, 'success');
      return true;
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      let errMsg = err?.message || (currentLanguage === 'en' ? 'Connection failed, please retry' : '连接失败，请重试');
      if (err?.code === 4001 || errMsg.includes('rejected')) {
        errMsg = currentLanguage === 'en' ? 'User rejected wallet connection' : '用户取消了授权连接';
      }
      showToast(errMsg, 'info');
      throw err;
    }
  };

  const handleDisconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      csuBalance: 0,
      usdtBalance: 0,
      ethBalance: 0,
      network: 'Base',
      connectorName: null,
      chainId: null,
      isConnecting: false,
    });
    localStorage.removeItem('csu_connected_wallet');
    showToast(t.toast.walletDisconnected, 'info');
  };

  const handleSwitchNetwork = async (network: 'Base' | 'Ethereum Mainnet' | 'Arbitrum One') => {
    try {
      showToast(currentLanguage === 'en' ? `Requesting switch to ${network}...` : `正在向钱包请求切换至 ${network}...`, 'info');
      await switchWalletNetwork(network);
      setWallet((prev) => ({ ...prev, network }));
      if (wallet.address) {
        const balances = await fetchRealBalances(wallet.address, network);
        setWallet((prev) => ({ ...prev, ...balances }));
      }
      showToast(`${t.toast.networkSwitched}${network}`, 'success');
    } catch (err: any) {
      console.error('Switch network error:', err);
      let msg = err?.message || (currentLanguage === 'en' ? 'Failed to switch network' : '切换网络失败');
      if (err?.code === 4001 || msg.includes('rejected')) {
        msg = currentLanguage === 'en' ? 'Network switch cancelled in wallet' : '已在钱包中取消网络切换';
      }
      showToast(msg, 'info');
      throw err;
    }
  };

  const handleAddTokenToWallet = async () => {
    try {
      showToast(currentLanguage === 'en' ? 'Requesting token asset binding (CSU)...' : '正在向钱包发送 CSU 代币资产绑定请求...', 'info');
      const added = await addCsuTokenToWallet();
      if (added) {
        showToast(currentLanguage === 'en' ? 'CSU token successfully added to your wallet!' : 'CSU 代币已成功添加到您的钱包！', 'success');
      } else {
        showToast(currentLanguage === 'en' ? 'Add token cancelled' : '已取消添加代币', 'info');
      }
    } catch (err: any) {
      console.error('Add token error:', err);
      const msg = err?.message || (currentLanguage === 'en' ? 'Failed to add token, please ensure wallet is connected' : '添加代币请求失败，请确保钱包已连接');
      showToast(msg, 'info');
    }
  };

  const handleRefreshBalances = async () => {
    if (!wallet.address) return;
    setIsRefreshingBalances(true);
    try {
      const balances = await fetchRealBalances(wallet.address, wallet.network);
      setWallet((prev) => ({ ...prev, ...balances }));
      showToast(currentLanguage === 'en' ? 'On-chain balances refreshed' : '链上余额已更新', 'success');
    } catch (e) {
      showToast(currentLanguage === 'en' ? 'Balance refresh failed' : '余额刷新失败', 'info');
    } finally {
      setIsRefreshingBalances(false);
    }
  };

  const handleExecuteSwap = (fromUsdt: number, toCsu: number) => {
    setWallet((prev) => ({
      ...prev,
      usdtBalance: Math.max(0, prev.usdtBalance - fromUsdt),
      csuBalance: prev.csuBalance + toCsu,
    }));
    showToast(`Swap Completed: Received ${Math.round(toCsu).toLocaleString()} CSU!`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f9f9fa] text-[#1a1c1d] relative antialiased selection:bg-black selection:text-white">
      {/* Living Ambient WebGL Shader Canvas Background */}
      <LivingShaderBackground />

      {/* Top Fixed Institutional Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wallet={wallet}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onOpenDocs={() => setIsDocsModalOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
        price={metrics.price}
        priceChange={metrics.priceChange24h}
        t={t}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Main Institutional Workspace Container */}
      <main className="w-full pt-16 flex-1 bg-[#f9f9fa]">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-6 flex flex-col gap-6">
          {/* Top Telemetry Strip & Quick Action Hub */}
          <TerminalBar
            contractAddress={metrics.contractAddress}
            onCopyAddress={() =>
              handleCopy(metrics.contractAddress, 'Contract Hash Copied')
            }
            onOpenSwap={() => setIsSwapModalOpen(true)}
            onAddToken={handleAddTokenToWallet}
            t={t}
          />

          {/* SECTION 01: CSU 实时行情与代币全貌 */}
          <section className="flex flex-col gap-3">
            {/* Section Titlebar & Structural Overline */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black"></div>
                <h2 className="font-sans text-[18px] font-bold text-black uppercase tracking-tight">
                  {t.market.sectionTitle}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009668] animate-pulse"></span>
                <span className="font-mono-num text-[11px] text-[#77767b] uppercase font-medium">
                  {t.market.orderbookFeed}
                </span>
              </div>
            </div>

            {/* Main Trading Grid: Asymmetric 8:4 split */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              {/* Left: Candlestick & Telemetry Canvas (8 Columns) */}
              <CandlestickChart
                currentPrice={metrics.price}
                priceChange={metrics.priceChange24h}
                onTimeframeChange={(tf) =>
                  showToast(`K-Line Timeframe switched to: ${tf}`, 'info')
                }
                t={t}
              />

              {/* Right: Comprehensive Token Metrics & Fundamental Ledger (4 Columns) */}
              <TokenMetricsCard
                metrics={metrics}
                onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
                t={t}
              />
            </div>
          </section>

          {/* SECTION 02: CSU 官网公告与治理披露 */}
          <AnnouncementsSection
            announcements={announcements}
            onSelectAnnouncement={(ann) => setSelectedAnnouncement(ann)}
            t={t}
          />
        </div>
      </main>

      {/* Institutional Protocol Footer */}
      <Footer
        contractAddress={metrics.contractAddress}
        onCopyAddress={() =>
          handleCopy(metrics.contractAddress, 'Contract Hash Copied')
        }
        onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
      />

      {/* Global Interactive Modals & Tooling */}
      <AnnouncementModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        onCopyText={handleCopy}
        t={t}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        wallet={wallet}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnectWallet}
        onSwitchNetwork={handleSwitchNetwork}
        onCopyAddress={(addr) => handleCopy(addr, 'Wallet Address Copied')}
        onAddToken={handleAddTokenToWallet}
        onRefreshBalances={handleRefreshBalances}
        isRefreshingBalances={isRefreshingBalances}
        price={metrics.price}
        t={t}
      />

      <SwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        wallet={wallet}
        price={metrics.price}
        onExecuteSwap={handleExecuteSwap}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        t={t}
      />

      <MarketAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        metrics={metrics}
      />

      <DocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
        contractAddress={metrics.contractAddress}
        onCopyAddress={handleCopy}
        t={t}
      />

      {/* Global Toast Notification */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
}
