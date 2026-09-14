import { TokenMetrics } from '../types';
import { INITIAL_METRICS } from '../data/mockData';

export async function fetchLiveTokenData(): Promise<Partial<TokenMetrics> | null> {
  try {
    const res = await fetch(
      'https://api.dexscreener.com/latest/dex/tokens/0xdC6F5f0AcccD712416E8e377491F24A370261b07',
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.pairs || data.pairs.length === 0) return null;

    const pair = data.pairs[0];
    const priceUsd = parseFloat(pair.priceUsd) || INITIAL_METRICS.price;
    const priceChange24h =
      pair.priceChange && typeof pair.priceChange.h24 === 'number'
        ? pair.priceChange.h24
        : INITIAL_METRICS.priceChange24h;
    const volume24h =
      pair.volume && typeof pair.volume.h24 === 'number'
        ? pair.volume.h24
        : INITIAL_METRICS.volume24h;
    const fdv = pair.fdv || INITIAL_METRICS.fdv;
    const marketCap = pair.marketCap || fdv || INITIAL_METRICS.marketCap;
    const liquidityUsd =
      pair.liquidity && typeof pair.liquidity.usd === 'number'
        ? pair.liquidity.usd
        : INITIAL_METRICS.liquidityUsd;

    return {
      price: priceUsd,
      priceChange24h: Number(priceChange24h.toFixed(2)),
      volume24h,
      fdv,
      marketCap,
      liquidityUsd,
      pairAddress: pair.pairAddress,
    };
  } catch (err) {
    console.warn('Failed to fetch live DexScreener data, using verified defaults', err);
    return null;
  }
}
