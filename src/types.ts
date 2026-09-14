export type Timeframe = '15m' | '1H' | '4H' | '1D' | '1W';

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isBullish: boolean;
}

export interface OHLCData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: string;
  ma5: number;
  ma20: number;
}

export type AnnouncementCategory = 'all' | 'upgrade' | 'governance' | 'ecosystem';

export interface Announcement {
  id: string;
  category: 'upgrade' | 'governance' | 'ecosystem';
  categoryLabel: string;
  timestamp: string;
  title: string;
  summary: string;
  content: string;
  statusBadge: string;
  isPinned?: boolean;
  txHash?: string;
  proposalId?: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  csuBalance: number;
  usdtBalance: number;
  ethBalance: number;
  network: 'Base' | 'Ethereum Mainnet' | 'Arbitrum One';
  connectorName: string | null;
  chainId?: number | null;
  isConnecting?: boolean;
  error?: string | null;
}

export interface TokenMetrics {
  tokenName?: string;
  tokenSymbol?: string;
  network?: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  fdv: number;
  circulatingSupply: number;
  totalSupply: number;
  holdersCount: number;
  holdersChangeToday: number;
  totalStaked: number;
  stakingApr: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  turnover24h: number;
  contractAddress: string;
  pairAddress?: string;
  certikScore: number;
  liquidityUsd?: number;
}
