import { ethers } from 'ethers';

export type SupportedNetwork = 'Base' | 'Ethereum Mainnet' | 'Arbitrum One';

export interface ChainConfig {
  idDec: number;
  idHex: string;
  name: SupportedNetwork;
  fullName: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  nativeCurrency: { name: string; symbol: string; decimals: number };
}

// Chain Constants & Configurations
export const CHAINS: Record<'BASE' | 'ETHEREUM' | 'ARBITRUM', ChainConfig> = {
  BASE: {
    idDec: 8453,
    idHex: '0x2105',
    name: 'Base',
    fullName: 'Base Mainnet',
    rpcUrls: ['https://mainnet.base.org', 'https://base.llamarpc.com'],
    blockExplorerUrls: ['https://basescan.org'],
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  ETHEREUM: {
    idDec: 1,
    idHex: '0x1',
    name: 'Ethereum Mainnet',
    fullName: 'Ethereum Mainnet',
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorerUrls: ['https://etherscan.io'],
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  ARBITRUM: {
    idDec: 42161,
    idHex: '0xa4b1',
    name: 'Arbitrum One',
    fullName: 'Arbitrum One',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io'],
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
};

export const CSU_TOKEN_ADDRESS = '0xdC6F5f0AcccD712416E8e377491F24A370261b07';
export const BASE_USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Minimal ERC20 ABI
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

// Fallback public Base RPC provider for on-chain querying
export const basePublicProvider = new ethers.JsonRpcProvider(CHAINS.BASE.rpcUrls[0]);

export interface WalletProviderInfo {
  installed: boolean;
  name: string;
  downloadUrl: string;
}

// Window type augmentation for Web3
declare global {
  interface Window {
    ethereum?: any;
    okxwallet?: any;
    coinbaseWalletExtension?: any;
  }
}

/**
 * Identify and return the targeted EIP-1193 Ethereum provider
 */
export function getInjectedProvider(connectorId?: string): any {
  if (typeof window === 'undefined') return null;

  const { ethereum, okxwallet, coinbaseWalletExtension } = window;

  // OKX Wallet specific check
  if (connectorId === 'okx') {
    if (okxwallet) return okxwallet;
    if (ethereum?.isOkxWallet) return ethereum;
    if (Array.isArray(ethereum?.providers)) {
      const okx = ethereum.providers.find((p: any) => p.isOkxWallet);
      if (okx) return okx;
    }
  }

  // Coinbase Wallet specific check
  if (connectorId === 'coinbase') {
    if (coinbaseWalletExtension) return coinbaseWalletExtension;
    if (ethereum?.isCoinbaseWallet) return ethereum;
    if (Array.isArray(ethereum?.providers)) {
      const cb = ethereum.providers.find((p: any) => p.isCoinbaseWallet);
      if (cb) return cb;
    }
  }

  // MetaMask specific check
  if (connectorId === 'metamask') {
    if (ethereum?.isMetaMask && !ethereum?.isOkxWallet) return ethereum;
    if (Array.isArray(ethereum?.providers)) {
      const mm = ethereum.providers.find((p: any) => p.isMetaMask && !p.isOkxWallet);
      if (mm) return mm;
    }
  }

  // Generic or fallback
  if (ethereum) {
    if (Array.isArray(ethereum.providers) && ethereum.providers.length > 0) {
      return ethereum.providers[0];
    }
    return ethereum;
  }

  if (okxwallet) return okxwallet;
  if (coinbaseWalletExtension) return coinbaseWalletExtension;

  return null;
}

/**
 * Check if the requested wallet provider extension is installed in the browser
 */
export function checkWalletAvailability(connectorId: string): WalletProviderInfo {
  const provider = getInjectedProvider(connectorId);
  const installed = Boolean(provider);

  const meta: Record<string, { name: string; downloadUrl: string }> = {
    metamask: {
      name: 'MetaMask',
      downloadUrl: 'https://metamask.io/download/',
    },
    okx: {
      name: 'OKX Wallet',
      downloadUrl: 'https://www.okx.com/web3',
    },
    coinbase: {
      name: 'Coinbase Wallet',
      downloadUrl: 'https://www.coinbase.com/wallet',
    },
    walletconnect: {
      name: 'WalletConnect',
      downloadUrl: 'https://walletconnect.com/',
    },
  };

  const info = meta[connectorId] || {
    name: 'Web3 Wallet',
    downloadUrl: 'https://metamask.io/download/',
  };

  return {
    installed,
    name: info.name,
    downloadUrl: info.downloadUrl,
  };
}

/**
 * Request real wallet connection and permissions (eth_requestAccounts)
 */
export async function connectRealWallet(connectorId: string): Promise<{
  address: string;
  chainId: number;
  network: SupportedNetwork;
  connectorName: string;
}> {
  const provider = getInjectedProvider(connectorId);

  if (!provider) {
    const info = checkWalletAvailability(connectorId);
    throw new Error(
      `未检测到 ${info.name} 钱包插件。请确保已在浏览器中安装该插件，或安装后刷新页面。`
    );
  }

  // Request user authorization / accounts
  const accounts: string[] = await provider.request({
    method: 'eth_requestAccounts',
  });

  if (!accounts || accounts.length === 0) {
    throw new Error('未获取到授权钱包地址，请在钱包弹窗中允许连接。');
  }

  const checksumAddress = ethers.getAddress(accounts[0]);

  // Request chainId
  const rawChainId: string = await provider.request({
    method: 'eth_chainId',
  });
  const chainId = parseInt(rawChainId, 16);
  const network = mapChainIdToNetwork(chainId);

  // Friendly name
  const nameMap: Record<string, string> = {
    metamask: 'MetaMask',
    okx: 'OKX Wallet',
    coinbase: 'Coinbase Wallet',
    walletconnect: 'WalletConnect',
  };

  return {
    address: checksumAddress,
    chainId,
    network,
    connectorName: nameMap[connectorId] || 'Web3 Injected',
  };
}

/**
 * Silent reconnect on initial load if previously approved
 */
export async function silentCheckWallet(): Promise<{
  address: string;
  chainId: number;
  network: SupportedNetwork;
} | null> {
  const provider = getInjectedProvider();
  if (!provider) return null;

  try {
    const accounts: string[] = await provider.request({
      method: 'eth_accounts',
    });
    if (!accounts || accounts.length === 0) return null;

    const rawChainId: string = await provider.request({
      method: 'eth_chainId',
    });
    const chainId = parseInt(rawChainId, 16);
    const network = mapChainIdToNetwork(chainId);

    return {
      address: ethers.getAddress(accounts[0]),
      chainId,
      network,
    };
  } catch {
    return null;
  }
}

/**
 * Map chainId number to SupportedNetwork
 */
export function mapChainIdToNetwork(chainId: number): SupportedNetwork {
  if (chainId === CHAINS.BASE.idDec) return 'Base';
  if (chainId === CHAINS.ETHEREUM.idDec) return 'Ethereum Mainnet';
  if (chainId === CHAINS.ARBITRUM.idDec) return 'Arbitrum One';
  return 'Base';
}

/**
 * Switch or add targeted network in wallet
 */
export async function switchWalletNetwork(targetNetwork: SupportedNetwork): Promise<boolean> {
  const provider = getInjectedProvider();
  if (!provider) {
    throw new Error('未检测到活跃的 Web3 钱包');
  }

  let chainConfig = CHAINS.BASE;
  if (targetNetwork === 'Ethereum Mainnet') chainConfig = CHAINS.ETHEREUM;
  if (targetNetwork === 'Arbitrum One') chainConfig = CHAINS.ARBITRUM;

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainConfig.idHex }],
    });
    return true;
  } catch (switchError: any) {
    // 4902 error code means the chain has not been added to MetaMask/OKX yet
    if (switchError?.code === 4902 || switchError?.data?.originalError?.code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainConfig.idHex,
            chainName: chainConfig.fullName,
            rpcUrls: chainConfig.rpcUrls,
            nativeCurrency: chainConfig.nativeCurrency,
            blockExplorerUrls: chainConfig.blockExplorerUrls,
          },
        ],
      });
      return true;
    }
    throw switchError;
  }
}

/**
 * Fetch real on-chain balances:
 * - ETH balance (via current chain or Base)
 * - CSU Token balance on Base (0xdC6F5f0AcccD712416E8e377491F24A370261b07)
 * - USDC Token balance on Base (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 */
export async function fetchRealBalances(
  address: string,
  network: SupportedNetwork = 'Base'
): Promise<{ ethBalance: number; csuBalance: number; usdtBalance: number }> {
  try {
    // Provider for native balance
    let nativeProvider = basePublicProvider;
    const injected = getInjectedProvider();
    if (injected) {
      try {
        nativeProvider = new ethers.BrowserProvider(injected) as any;
      } catch {
        nativeProvider = basePublicProvider;
      }
    }

    // 1. Fetch native ETH balance
    let ethBalance = 0;
    try {
      const balanceWei = await nativeProvider.getBalance(address);
      ethBalance = parseFloat(Number(ethers.formatEther(balanceWei)).toFixed(4));
    } catch (e) {
      console.warn('Could not fetch native ETH balance:', e);
    }

    // 2. Fetch CSU balance on Base (CSU is native to Base)
    let csuBalance = 0;
    try {
      const csuContract = new ethers.Contract(CSU_TOKEN_ADDRESS, ERC20_ABI, basePublicProvider);
      const rawCsu = await csuContract.balanceOf(address);
      csuBalance = parseFloat(Number(ethers.formatUnits(rawCsu, 18)).toFixed(2));
    } catch (e) {
      console.warn('Could not fetch CSU token balance:', e);
    }

    // 3. Fetch USDC balance on Base
    let usdcBalance = 0;
    try {
      const usdcContract = new ethers.Contract(BASE_USDC_ADDRESS, ERC20_ABI, basePublicProvider);
      const rawUsdc = await usdcContract.balanceOf(address);
      usdcBalance = parseFloat(Number(ethers.formatUnits(rawUsdc, 6)).toFixed(2));
    } catch (e) {
      console.warn('Could not fetch USDC token balance:', e);
    }

    return {
      ethBalance,
      csuBalance,
      usdtBalance: usdcBalance,
    };
  } catch (err) {
    console.warn('Failed to query on-chain balances:', err);
    return {
      ethBalance: 0,
      csuBalance: 0,
      usdtBalance: 0,
    };
  }
}

/**
 * Prompt wallet to add CSU token (wallet_watchAsset)
 */
export async function addCsuTokenToWallet(): Promise<boolean> {
  const provider = getInjectedProvider();
  if (!provider) {
    throw new Error('未检测到 Web3 钱包，请先连接钱包。');
  }

  const wasAdded = await provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: CSU_TOKEN_ADDRESS,
        symbol: 'CSU',
        decimals: 18,
        image: 'https://basescan.org/images/main/empty-token.png',
      },
    },
  });

  return Boolean(wasAdded);
}
