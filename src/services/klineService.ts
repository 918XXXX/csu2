import { CandleData } from '../types';

const BINANCE_BASE = 'https://api.binance.com/api/v3';

// Convert timeframe string to Binance interval
function toBinanceInterval(tf: string): string {
  const map: Record<string, string> = {
    '15m': '15m',
    '1H':  '1h',
    '4H':  '4h',
    '1D':  '1d',
    '1W':  '1w',
  };
  return map[tf] || '4h';
}

export interface KlineResponse {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isBullish: boolean;
}

/**
 * Fetch K-line / OHLCV data from Binance public API.
 * Falls back to empty array on network failure.
 */
export async function fetchKlineData(
  symbol: string = 'BTCUSDT',
  interval: string = '4h',
  limit: number = 100
): Promise<CandleData[]> {
  try {
    const url =
      `${BINANCE_BASE}/klines` +
      `?symbol=${symbol}&interval=${interval}&limit=${limit}`;

    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Binance API ${res.status}`);

    const data: any[][] = await res.json();

    return data.map((k) => {
      const open   = parseFloat(k[1]);
      const high   = parseFloat(k[2]);
      const low    = parseFloat(k[3]);
      const close  = parseFloat(k[4]);
      const volume = parseFloat(k[5]);
      const ts     = parseInt(k[0]);

      // format timestamp as "MM-DD HH:00"
      const d = new Date(ts);
      const mm  = String(d.getMonth() + 1).padStart(2, '0');
      const dd  = String(d.getDate()).padStart(2, '0');
      const hh  = String(d.getHours()).padStart(2, '0');
      const timeStr = `${mm}-${dd} ${hh}:00`;

      return {
        time: timeStr,
        open,
        high,
        low,
        close,
        volume,
        isBullish: close >= open,
      };
    });
  } catch (err) {
    console.warn('fetchKlineData failed, returning empty array:', err);
    return [];
  }
}
