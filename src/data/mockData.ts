import { Announcement, CandleData, TokenMetrics } from '../types';

export const INITIAL_METRICS: TokenMetrics = {
  tokenName: 'Chasing light',
  tokenSymbol: 'CSU',
  network: 'Base',
  price: 0.0000003185,
  priceChange24h: 0.50,
  marketCap: 31850,
  fdv: 31850,
  circulatingSupply: 100000000000,
  totalSupply: 100000000000,
  holdersCount: 142,
  holdersChangeToday: 12,
  totalStaked: 14500000000,
  stakingApr: 16.8,
  high24h: 0.0000003420,
  low24h: 0.0000002980,
  volume24h: 12.18,
  turnover24h: 38400000,
  contractAddress: '0xdC6F5f0AcccD712416E8e377491F24A370261b07',
  pairAddress: '0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023',
  certikScore: 95.8,
  liquidityUsd: 31952.14,
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'base-launch',
    category: 'upgrade',
    categoryLabel: 'Network Launch',
    timestamp: '2026-09-08 17:35:00 UTC',
    title: 'CSU (Chasing light) Officially Deployed on Base Mainnet with Uniswap v4 Liquidity Pool',
    summary:
      'The official CSU token contract (0xdC6F5f0AcccD712416E8e377491F24A370261b07) is live on Base L2 mainnet, establishing the foundational CSU/USDC Uniswap v4 liquidity pool with initial depth over $31,000 USD.',
    content: `### CSU (Chasing light) Base Mainnet Official Launch

To leverage Coinbase's high-throughput, low-latency, and sub-cent gas fee ecosystem on Base L2, CSU (Chasing light) has been deployed and verified on-chain:

- **Token Contract Address**: \`0xdC6F5f0AcccD712416E8e377491F24A370261b07\`
- **Native Network**: Base L2 (Chain ID: 8453)
- **Token Decimals**: 18
- **Total & Max Supply**: 100,000,000,000 CSU (100 Billion, 100% Circulating)
- **Trading Pair**: CSU / USDC (Uniswap v4)
- **Core Pool Address**: \`0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023\`
- **DexScreener Indexing**: Live tick-level tracking, real-time depth visualization, and orderbook telemetry are active.`,
    statusBadge: 'Base Mainnet Live',
    isPinned: true,
    txHash: '0x1b3116d982c7efd90ab25a766f5e12b129382029bd709b765d4ca88672392023',
    proposalId: '#BASE-POOL-01',
  },
  {
    id: 'ann-dexscreener',
    category: 'ecosystem',
    categoryLabel: 'Ecosystem Listing',
    timestamp: '2026-09-10 12:00:00 UTC',
    title: 'DexScreener and GeckoTerminal Live Price Feeds Integrated',
    summary:
      'The CSU/USDC pair is now fully indexed across DexScreener, GeckoTerminal, and primary decentralized aggregators, delivering sub-second market telemetry.',
    content: `### Global Market Aggregator Synchronization

CSU (Chasing light) decentralized price indexing architecture is now fully integrated across premier on-chain analytics platforms:

- **DexScreener Terminal**: Real-time monitoring of Uniswap v4 swap executions, liquidity tick shifts, and 24h trading volume.
- **GeckoTerminal Data Stream**: Automated reserve USD metrics and token ranking feeds linked with CoinGecko's on-chain database.
- **Institutional API Routing**: Direct query access to global edge CDN endpoints ensuring verifiable pricing and zero-latency terminal data.`,
    statusBadge: 'DexScreener Synced',
  },
  {
    id: 'ann-tokenomics',
    category: 'governance',
    categoryLabel: 'Tokenomics',
    timestamp: '2026-09-09 08:30:00 UTC',
    title: '100 Billion Fixed Supply & 100% Fair Circulation Architecture Disclosure',
    summary:
      'CSU enforces zero-tax, non-mintable, and immutable decentralization standards with no lockups, hidden founder allocations, or minting privileges.',
    content: `### Immutable Protocol Economics

Under the CSU smart contract specification, token parameters are strictly immutable and permanently enforced on-chain:

- **No Additional Minting (No Minting Privilege)**: The contract possesses no minting or arbitrary token creation function. The 100 Billion CSU cap is permanent.
- **Zero Trading Taxes**: Standard ERC-20 compliant with 0% buy tax and 0% sell tax, eliminating predatory transfer slippage.
- **No Blacklist or Freezing Capabilities**: Open, permissionless transfer execution across all compliant Web3 wallets and DeFi protocols.
- **Decentralized Architecture**: Contract ownership is renounceable or subject to timelock control, protecting against centralized intervention.`,
    statusBadge: 'Zero Tax / 100% Circulating',
  },
  {
    id: 'ann-security',
    category: 'ecosystem',
    categoryLabel: 'Security & Audit',
    timestamp: '2026-09-08 19:15:00 UTC',
    title: 'BaseScan Smart Contract Source Code Verification & Security Audit Completed',
    summary:
      'Smart contract source code is open-source and verified on BaseScan, passing automated static analysis scans with no critical vulnerabilities or backdoors.',
    content: `### BaseScan Verification & Protocol Security

Global market participants and security researchers can review the open-source Solidity implementation and read-only methods directly on BaseScan (0xdC6F5f0AcccD712416E8e377491F24A370261b07):

- **BaseScan Verification**: Exact Match (Solidity 0.8.x with standard OpenZeppelin base)
- **Verified Read Methods**: totalSupply(), balanceOf(), allowance(), decimals()
- **CertiK / OpenScan Score**: 95.8/100 code transparency rating with zero privileged mint functions
- **EIP Standards Compliance**: Fully compatible with EIP-20, EIP-712, and EIP-747 (wallet_watchAsset).`,
    statusBadge: 'Code Verified',
  },
];

// Realistic candlesticks centered around ~0.0000003185
export const CANDLESTICKS_4H: CandleData[] = [
  { time: '09-10 00:00', open: 0.000000298, high: 0.000000305, low: 0.000000295, close: 0.000000302, volume: 18.5, isBullish: true },
  { time: '09-10 04:00', open: 0.000000302, high: 0.000000308, low: 0.000000299, close: 0.000000304, volume: 12.2, isBullish: true },
  { time: '09-10 08:00', open: 0.000000304, high: 0.000000312, low: 0.000000301, close: 0.000000310, volume: 24.1, isBullish: true },
  { time: '09-10 12:00', open: 0.000000310, high: 0.000000315, low: 0.000000306, close: 0.000000312, volume: 15.0, isBullish: true },
  { time: '09-10 16:00', open: 0.000000312, high: 0.000000314, low: 0.000000307, close: 0.000000308, volume: 10.4, isBullish: false },
  { time: '09-10 20:00', open: 0.000000308, high: 0.000000316, low: 0.000000306, close: 0.000000314, volume: 16.8, isBullish: true },
  { time: '09-11 00:00', open: 0.000000314, high: 0.000000320, low: 0.000000311, close: 0.000000318, volume: 22.0, isBullish: true },
  { time: '09-11 04:00', open: 0.000000318, high: 0.000000321, low: 0.000000314, close: 0.000000316, volume: 14.3, isBullish: false },
  { time: '09-11 08:00', open: 0.000000316, high: 0.000000325, low: 0.000000315, close: 0.000000322, volume: 28.5, isBullish: true },
  { time: '09-11 12:00', open: 0.000000322, high: 0.000000328, low: 0.000000319, close: 0.000000326, volume: 19.4, isBullish: true },
  { time: '09-11 16:00', open: 0.000000326, high: 0.000000327, low: 0.000000318, close: 0.000000320, volume: 11.2, isBullish: false },
  { time: '09-11 20:00', open: 0.000000320, high: 0.000000329, low: 0.000000318, close: 0.000000325, volume: 20.1, isBullish: true },
  { time: '09-12 00:00', open: 0.000000325, high: 0.000000332, low: 0.000000322, close: 0.000000328, volume: 25.6, isBullish: true },
  { time: '09-12 04:00', open: 0.000000328, high: 0.000000330, low: 0.000000322, close: 0.000000324, volume: 13.5, isBullish: false },
  { time: '09-12 08:00', open: 0.000000324, high: 0.000000334, low: 0.000000321, close: 0.000000330, volume: 29.8, isBullish: true },
  { time: '09-12 12:00', open: 0.000000330, high: 0.000000338, low: 0.000000326, close: 0.000000335, volume: 32.0, isBullish: true },
  { time: '09-12 16:00', open: 0.000000335, high: 0.000000336, low: 0.000000324, close: 0.000000327, volume: 17.5, isBullish: false },
  { time: '09-12 20:00', open: 0.000000327, high: 0.000000338, low: 0.000000325, close: 0.000000332, volume: 26.4, isBullish: true },
  { time: '09-13 00:00', open: 0.000000332, high: 0.000000340, low: 0.000000328, close: 0.000000336, volume: 34.0, isBullish: true },
  { time: '09-13 04:00', open: 0.000000336, high: 0.000000338, low: 0.000000326, close: 0.000000328, volume: 18.2, isBullish: false },
  { time: '09-13 08:00', open: 0.000000328, high: 0.000000335, low: 0.000000322, close: 0.000000330, volume: 22.1, isBullish: true },
  { time: '09-13 12:00', open: 0.000000330, high: 0.000000336, low: 0.000000324, close: 0.000000332, volume: 27.5, isBullish: true },
  { time: '09-13 16:00', open: 0.000000332, high: 0.000000334, low: 0.000000315, close: 0.000000317, volume: 19.8, isBullish: false },
  { time: '09-13 20:00', open: 0.000000317, high: 0.000000322, low: 0.000000315, close: 0.0000003185, volume: 35.6, isBullish: true },
];

export const TIMEFRAME_DATA: Record<
  string,
  { candles: CandleData[]; high: string; low: string; vol: string }
> = {
  '15m': {
    candles: CANDLESTICKS_4H.map((c, i) => ({
      ...c,
      open: Number((c.open + Math.sin(i * 0.5) * 0.000000003).toFixed(10)),
      close: Number((c.close + Math.cos(i * 0.5) * 0.000000002).toFixed(10)),
    })),
    high: '$0.0000003220',
    low: '$0.0000003150',
    vol: '$3.15',
  },
  '1H': {
    candles: CANDLESTICKS_4H.map((c, i) => ({
      ...c,
      open: Number((c.open + Math.sin(i * 0.3) * 0.000000005).toFixed(10)),
      close: Number((c.close + Math.cos(i * 0.3) * 0.000000004).toFixed(10)),
    })),
    high: '$0.0000003290',
    low: '$0.0000003120',
    vol: '$6.80',
  },
  '4H': {
    candles: CANDLESTICKS_4H,
    high: '$0.0000003400',
    low: '$0.0000002950',
    vol: '$12.18',
  },
  '1D': {
    candles: CANDLESTICKS_4H.map((c, i) => ({
      ...c,
      open: Number((c.open * 0.96 + i * 0.000000001).toFixed(10)),
      close: Number((c.close * 0.96 + i * 0.0000000012).toFixed(10)),
    })),
    high: '$0.0000003550',
    low: '$0.0000002800',
    vol: '$48.50',
  },
  '1W': {
    candles: CANDLESTICKS_4H.map((c, i) => ({
      ...c,
      open: Number((c.open * 0.90 + i * 0.000000002).toFixed(10)),
      close: Number((c.close * 0.90 + i * 0.0000000025).toFixed(10)),
    })),
    high: '$0.0000003900',
    low: '$0.0000002500',
    vol: '$145.00',
  },
};
