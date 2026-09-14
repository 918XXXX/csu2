import React, { useState, useEffect } from 'react';
import { User, ChevronDown, Check } from 'lucide-react';
import { WalletState } from '../types';
import { Language, Translations } from '../i18n/translations';
import { LanguageSelector } from './LanguageSelector';
import { formatTokenPrice } from '../utils/formatters';

interface HeaderProps {
  activeTab: 'overview' | 'announcements' | 'market-analytics' | 'docs';
  setActiveTab: (tab: 'overview' | 'announcements' | 'market-analytics' | 'docs') => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
  onOpenDocs: () => void;
  onOpenAnalytics: () => void;
  price: number;
  priceChange: number;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  wallet,
  onOpenWalletModal,
  onOpenDocs,
  onOpenAnalytics,
  price,
  priceChange,
  currentLanguage,
  onSelectLanguage,
  t,
}) => {
  const [blockNumber, setBlockNumber] = useState(19842109);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  // Simulating realistic live Ethereum mainnet block propagation
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber((prev) => prev + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (tab: 'overview' | 'announcements' | 'market-analytics' | 'docs') => {
    setActiveTab(tab);
    if (tab === 'docs') {
      onOpenDocs();
    } else if (tab === 'market-analytics') {
      onOpenAnalytics();
    } else if (tab === 'announcements') {
      const el = document.getElementById('section-announcements');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#ffffff]/85 backdrop-blur-xl border-b border-[#e8e8e9] shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-16 w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo and Protocol Metadata */}
        <div className="flex items-center gap-6">
          <button
            id="csu-brand-logo"
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2.5 text-left group transition-transform duration-150"
          >
            <img src="/csu.jpg" alt="CSU Logo" className="w-6 h-6 object-contain rounded-[2px] transition-transform duration-200 group-hover:scale-95 shadow-sm" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-[17px] font-bold tracking-tight text-black leading-none">
                  CSU
                </span>
                <span className="font-mono-num text-[11px] text-[#77767b] font-medium tracking-tight">
                  Chasing light
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff] animate-pulse"></span>
                <span className="font-mono-num text-[11px] text-[#5d5e66] font-medium tracking-wide uppercase">
                  Base • #{blockNumber.toLocaleString()}
                </span>
              </div>
            </div>
          </button>

          <div className="hidden xl:block h-6 w-px bg-[#e2e2e3]"></div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f3f3f4] p-1 rounded-[4px] border border-[#e8e8e9]/60">
            <button
              id="nav-overview"
              onClick={() => handleNavClick('overview')}
              className={`px-3 py-1.5 rounded-[2px] font-mono-num text-[12px] font-medium transition-colors duration-150 ${
                activeTab === 'overview'
                  ? 'bg-[#ffffff] text-black shadow-sm font-semibold'
                  : 'text-[#5d5e66] hover:text-black'
              }`}
            >
              {t.nav.overview}
            </button>
            <button
              id="nav-announcements"
              onClick={() => handleNavClick('announcements')}
              className={`px-3 py-1.5 rounded-[2px] font-mono-num text-[12px] font-medium transition-colors duration-150 ${
                activeTab === 'announcements'
                  ? 'bg-[#ffffff] text-black shadow-sm font-semibold'
                  : 'text-[#5d5e66] hover:text-black'
              }`}
            >
              {t.nav.announcements}
            </button>
            <button
              id="nav-market-analytics"
              onClick={() => handleNavClick('market-analytics')}
              className={`px-3 py-1.5 rounded-[2px] font-mono-num text-[12px] font-medium transition-colors duration-150 ${
                activeTab === 'market-analytics'
                  ? 'bg-[#ffffff] text-black shadow-sm font-semibold'
                  : 'text-[#5d5e66] hover:text-black'
              }`}
            >
              {t.nav.marketAnalytics}
            </button>
            <button
              id="nav-docs"
              onClick={() => handleNavClick('docs')}
              className={`px-3 py-1.5 rounded-[2px] font-mono-num text-[12px] font-medium transition-colors duration-150 ${
                activeTab === 'docs'
                  ? 'bg-[#ffffff] text-black shadow-sm font-semibold'
                  : 'text-[#5d5e66] hover:text-black'
              }`}
            >
              {t.nav.docs}
            </button>
          </nav>
        </div>

        {/* Right Status & Wallet Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Active Chain Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#eeeeef] rounded-[2px] font-mono-num text-[11px] text-[#47464b] border border-[#e2e2e3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff]"></span>
            <span>Base Mainnet</span>
          </div>

          {/* Quick Price Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f3f3f4] rounded-[2px] font-mono-num text-[11px] border border-[#e2e2e3]">
            <span className="font-semibold text-black">{formatTokenPrice(price)}</span>
            <span className="text-[#009668] font-semibold">
              +{priceChange.toFixed(2)}%
            </span>
          </div>

          {/* Language Selector Dropdown */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onSelectLanguage={onSelectLanguage}
          />

          {/* Connect Wallet Button */}
          {wallet.isConnected && wallet.address ? (
            <div className="relative">
              <button
                id="btn-connected-account"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="px-3 py-1.5 bg-black text-white font-mono-num text-[12px] rounded-[2px] hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
                <span>
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-zinc-200 rounded-[3px] shadow-xl p-3 z-50 flex flex-col gap-2 font-mono-num text-[12px]">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                    <span className="text-zinc-500 uppercase text-[10px]">{t.nav.connectedWallet}</span>
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-[#009668] text-[10px] rounded-[2px] font-medium flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      {wallet.connectorName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 py-1">
                    <span className="text-zinc-400 text-[11px]">{t.nav.csuBalance}</span>
                    <span className="text-[14px] font-bold text-black">
                      {wallet.csuBalance.toLocaleString()} CSU
                    </span>
                    <span className="text-zinc-500 text-[11px]">
                      ≈ {formatTokenPrice(wallet.csuBalance * price)} USD
                    </span>
                  </div>
                  <div className="h-px bg-zinc-100 my-1"></div>
                  <button
                    onClick={() => {
                      onOpenWalletModal();
                      setAccountMenuOpen(false);
                    }}
                    className="w-full py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black text-center rounded-[2px] transition-colors"
                  >
                    {t.nav.walletDetails}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="btn-connect-wallet"
              onClick={onOpenWalletModal}
              className="px-3.5 py-1.5 bg-black text-white font-mono-num text-[12px] font-medium rounded-[2px] hover:opacity-90 active:opacity-80 transition-opacity flex items-center gap-1.5 shadow-sm"
              type="button"
            >
              <span>{t.nav.connectWallet}</span>
            </button>
          )}

          {/* User Account Silhouette Avatar */}
          <button
            id="btn-user-profile"
            onClick={onOpenWalletModal}
            className="w-8 h-8 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
            title="Institutional Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
