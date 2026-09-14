import React, { useState, useRef, useMemo } from 'react';
import { Timeframe, CandleData, OHLCData } from '../types';
import { TIMEFRAME_DATA } from '../data/mockData';
import { Translations } from '../i18n/translations';
import { formatTokenPrice } from '../utils/formatters';

interface CandlestickChartProps {
  currentPrice: number;
  priceChange: number;
  onTimeframeChange?: (tf: Timeframe) => void;
  t: Translations;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  currentPrice,
  priceChange,
  onTimeframeChange,
  t,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('4H');
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const currentDataset = TIMEFRAME_DATA[selectedTimeframe] || TIMEFRAME_DATA['4H'];
  const candles = currentDataset.candles;

  const handleTimeframeSelect = (tf: Timeframe) => {
    setSelectedTimeframe(tf);
    if (onTimeframeChange) {
      onTimeframeChange(tf);
    }
  };

  // Compute HUD values from hovered candle or fallback to latest
  const activeCandle = hoveredCandle || candles[candles.length - 1];
  const hudData: OHLCData = {
    open: activeCandle ? activeCandle.open : currentPrice,
    high: activeCandle ? activeCandle.high : currentPrice * 1.05,
    low: activeCandle ? activeCandle.low : currentPrice * 0.95,
    close: activeCandle ? activeCandle.close : currentPrice,
    volume: activeCandle ? `${activeCandle.volume.toFixed(1)}M` : '18.5M',
    ma5: Number((currentPrice * 1.01).toFixed(10)),
    ma20: Number((currentPrice * 0.99).toFixed(10)),
  };

  // Dynamic Chart calculations
  const { minPrice, maxPrice, priceRange, candleCalculations, ma5Points, ma20Points } = useMemo(() => {
    if (!candles || candles.length === 0) {
      return {
        minPrice: currentPrice * 0.95,
        maxPrice: currentPrice * 1.05,
        priceRange: currentPrice * 0.1 || 0.00000001,
        candleCalculations: [],
        ma5Points: '',
        ma20Points: '',
      };
    }

    const min = Math.min(...candles.map((c) => c.low));
    const max = Math.max(...candles.map((c) => c.high));
    const range = max - min || 0.00000001;

    // SVG coordinates:
    // Width available for candles is from X=20 to X=730 (width 710)
    // Candle body & wicks occupy Y from 25 to 220 (height 195)
    // Volume bars occupy Y from 230 to 275 (height 45)
    const candleWidth = Math.max(6, Math.min(16, 710 / candles.length - 4));
    const step = 710 / candles.length;

    const calculations = candles.map((c, i) => {
      const cx = 20 + i * step + step / 2;
      const wickY1 = 25 + (1 - (c.high - min) / range) * 195;
      const wickY2 = 25 + (1 - (c.low - min) / range) * 195;

      const openY = 25 + (1 - (c.open - min) / range) * 195;
      const closeY = 25 + (1 - (c.close - min) / range) * 195;
      const bodyY = Math.min(openY, closeY);
      const bodyHeight = Math.max(2, Math.abs(closeY - openY));

      const volHeight = Math.min(42, Math.max(6, (c.volume / 40) * 42));
      const volY = 275 - volHeight;

      return {
        cx,
        wickY1,
        wickY2,
        bodyX: cx - candleWidth / 2,
        bodyY,
        candleWidth,
        bodyHeight,
        volY,
        volHeight,
        isBullish: c.isBullish,
      };
    });

    // MA paths
    const ma5: string[] = [];
    const ma20: string[] = [];

    candles.forEach((c, idx) => {
      const cx = 20 + idx * step + step / 2;
      // Simple moving averages
      const start5 = Math.max(0, idx - 4);
      const slice5 = candles.slice(start5, idx + 1);
      const avg5 = slice5.reduce((sum, item) => sum + item.close, 0) / slice5.length;
      const y5 = 25 + (1 - (avg5 - min) / range) * 195;
      ma5.push(`${idx === 0 ? 'M' : 'L'} ${cx.toFixed(1)},${y5.toFixed(1)}`);

      const start20 = Math.max(0, idx - 19);
      const slice20 = candles.slice(start20, idx + 1);
      const avg20 = slice20.reduce((sum, item) => sum + item.close, 0) / slice20.length;
      const y20 = 25 + (1 - (avg20 - min) / range) * 195;
      ma20.push(`${idx === 0 ? 'M' : 'L'} ${cx.toFixed(1)},${y20.toFixed(1)}`);
    });

    return {
      minPrice: min,
      maxPrice: max,
      priceRange: range,
      candleCalculations: calculations,
      ma5Points: ma5.join(' '),
      ma20Points: ma20.join(' '),
    };
  }, [candles, currentPrice]);

  const currentPriceY = 25 + (1 - (currentPrice - minPrice) / priceRange) * 195;
  const clampedCurrentPriceY = Math.max(25, Math.min(220, currentPriceY));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = chartContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 15 && x <= rect.width - 55 && y >= 30 && y <= rect.height - 25) {
      setCrosshairPos({ x, y });

      const chartWidth = rect.width - 70;
      const candleIndex = Math.floor((x / chartWidth) * candles.length);
      const clampedIndex = Math.max(0, Math.min(candles.length - 1, candleIndex));
      setHoveredCandle(candles[clampedIndex]);
    } else {
      setCrosshairPos(null);
      setHoveredCandle(null);
    }
  };

  const handleMouseLeave = () => {
    setCrosshairPos(null);
    setHoveredCandle(null);
  };

  return (
    <div className="xl:col-span-8 flex flex-col bg-white/95 backdrop-blur-xl rounded-[2px] shadow-sm p-4 border border-[#e8e8e9]">
      {/* Ticker Header & Price Readout */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        <div className="flex flex-wrap items-baseline gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[24px] font-bold text-black tracking-tight">
              CSU/USDC
            </span>
            <span className="px-1.5 py-0.5 bg-[#eef2ff] text-[#0052ff] font-mono-num text-[10px] font-semibold rounded-[2px] uppercase">
              Uniswap v4 (Base)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-mono-num text-[30px] sm:text-[36px] font-bold tracking-tight text-black leading-none">
              {formatTokenPrice(currentPrice)}
            </span>
            <span className="inline-flex items-center font-mono-num text-[14px] font-bold text-[#009668] bg-[#009668]/10 px-2 py-0.5 rounded-[2px]">
              +{priceChange.toFixed(2)}% ▲
            </span>
          </div>
        </div>

        {/* Timeframe Selector Tabs */}
        <div className="flex items-center bg-[#f3f3f4] p-0.5 rounded-[2px] border border-[#e8e8e9]">
          {(['15m', '1H', '4H', '1D', '1W'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              id={`tf-btn-${tf}`}
              onClick={() => handleTimeframeSelect(tf)}
              type="button"
              className={`px-2.5 py-1 font-mono-num text-[11px] rounded-[2px] transition-colors ${
                selectedTimeframe === tf
                  ? 'bg-black text-white font-semibold shadow-sm'
                  : 'text-[#5d5e66] hover:text-black'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Micro Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 px-3 bg-[#f9f9fa] rounded-[2px] mb-3 border border-[#eeeeef]">
        <div>
          <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
            {t.market.high24h}
          </span>
          <span className="font-mono-num text-[12px] text-black font-semibold">
            {currentDataset.high}
          </span>
        </div>
        <div>
          <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
            {t.market.low24h}
          </span>
          <span className="font-mono-num text-[12px] text-black font-semibold">
            {currentDataset.low}
          </span>
        </div>
        <div>
          <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
            {t.market.volume24h}
          </span>
          <span className="font-mono-num text-[12px] text-black font-semibold">
            {currentDataset.vol}
          </span>
        </div>
        <div>
          <span className="font-mono-num text-[10px] text-[#77767b] uppercase block">
            {t.market.turnover}
          </span>
          <span className="font-mono-num text-[12px] text-black font-semibold">
            38,400,000 CSU
          </span>
        </div>
      </div>

      {/* Interactive Candlestick Canvas Container */}
      <div
        id="chart-container"
        ref={chartContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[380px] bg-white rounded-[2px] overflow-hidden flex flex-col justify-between p-2 select-none border border-[#f3f3f4] cursor-crosshair group"
      >
        {/* OHLC Realtime HUD Bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-num text-[11px] text-[#5d5e66] z-10 bg-white/80 backdrop-blur-sm px-1 py-0.5 rounded">
          <span className="font-bold text-black">CSU/USDC ({selectedTimeframe})</span>
          <span>
            {t.market.ohlcO}:{' '}
            <strong className="text-black font-semibold">{formatTokenPrice(hudData.open)}</strong>
          </span>
          <span>
            {t.market.ohlcH}:{' '}
            <strong className="text-[#009668] font-semibold">{formatTokenPrice(hudData.high)}</strong>
          </span>
          <span>
            {t.market.ohlcL}:{' '}
            <strong className="text-[#ba1a1a] font-semibold">{formatTokenPrice(hudData.low)}</strong>
          </span>
          <span>
            {t.market.ohlcC}:{' '}
            <strong className="text-black font-semibold">{formatTokenPrice(hudData.close)}</strong>
          </span>
          <span>
            {t.market.ohlcVol}:{' '}
            <strong className="text-black font-semibold">{hudData.volume}</strong>
          </span>
          <span className="text-[#c8c5cb]">|</span>
          <span className="text-[#009668] font-semibold">MA5: {formatTokenPrice(hudData.ma5)}</span>
          <span className="text-[#5d5e66] font-semibold">MA20: {formatTokenPrice(hudData.ma20)}</span>
        </div>

        {/* Candlestick SVG Rendering Engine */}
        <div className="relative flex-1 w-full h-full mt-1">
          <svg
            id="kline-svg"
            className="w-full h-full overflow-visible"
            viewBox="0 0 840 280"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="volGradBull" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#009668" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#009668" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="volGradBear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Horizontal Price Reference Gridlines */}
            <line x1="0" y1="40" x2="730" y2="40" stroke="#f3f3f4" strokeDasharray="4,4" strokeWidth="1" />
            <line x1="0" y1="90" x2="730" y2="90" stroke="#f3f3f4" strokeDasharray="4,4" strokeWidth="1" />
            <line x1="0" y1="140" x2="730" y2="140" stroke="#f3f3f4" strokeDasharray="4,4" strokeWidth="1" />
            <line x1="0" y1="190" x2="730" y2="190" stroke="#f3f3f4" strokeDasharray="4,4" strokeWidth="1" />
            <line x1="0" y1="230" x2="730" y2="230" stroke="#e8e8e9" strokeWidth="1" />

            {/* Right-aligned Dynamic Price Axis Labels */}
            <text x="735" y="44" fill="#77767b" className="font-mono-num text-[9px] font-medium">
              {formatTokenPrice(maxPrice)}
            </text>
            <text x="735" y="94" fill="#77767b" className="font-mono-num text-[9px] font-medium">
              {formatTokenPrice(maxPrice - priceRange * 0.25)}
            </text>
            <text x="735" y="144" fill="#77767b" className="font-mono-num text-[9px] font-medium">
              {formatTokenPrice(maxPrice - priceRange * 0.5)}
            </text>
            <text x="735" y="194" fill="#77767b" className="font-mono-num text-[9px] font-medium">
              {formatTokenPrice(maxPrice - priceRange * 0.75)}
            </text>
            <text x="735" y="234" fill="#77767b" className="font-mono-num text-[9px] font-medium">
              {formatTokenPrice(minPrice)}
            </text>

            {/* MA20 Curve */}
            {ma20Points && (
              <path
                d={ma20Points}
                fill="none"
                stroke="#77767b"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.75"
              />
            )}

            {/* MA5 Fast Curve */}
            {ma5Points && (
              <path
                d={ma5Points}
                fill="none"
                stroke="#009668"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            )}

            {/* Volume Histogram Bars & Candlesticks (Dynamically rendered) */}
            {candleCalculations.map((calc, idx) => (
              <g key={idx}>
                {/* Volume Bar */}
                <rect
                  x={calc.bodyX}
                  y={calc.volY}
                  width={calc.candleWidth}
                  height={calc.volHeight}
                  fill={calc.isBullish ? 'url(#volGradBull)' : 'url(#volGradBear)'}
                />

                {/* Candle Wick Line */}
                <line
                  x1={calc.cx}
                  y1={calc.wickY1}
                  x2={calc.cx}
                  y2={calc.wickY2}
                  stroke={calc.isBullish ? '#009668' : '#ba1a1a'}
                  strokeWidth="1.5"
                />

                {/* Candle Body Rect */}
                <rect
                  x={calc.bodyX}
                  y={calc.bodyY}
                  width={calc.candleWidth}
                  height={calc.bodyHeight}
                  fill={calc.isBullish ? '#009668' : '#ba1a1a'}
                  rx="0.5"
                />
              </g>
            ))}

            {/* Current Price Crosshair Reticle (Horizontal Line) */}
            <line
              x1="0"
              y1={clampedCurrentPriceY}
              x2="730"
              y2={clampedCurrentPriceY}
              stroke="#009668"
              strokeDasharray="2,2"
              strokeWidth="1"
            />
            <rect
              x="730"
              y={clampedCurrentPriceY - 9}
              width="105"
              height="18"
              fill="#009668"
              rx="1"
            />
            <text
              x="734"
              y={clampedCurrentPriceY + 4}
              fill="#ffffff"
              className="font-mono-num text-[9px] font-bold"
            >
              {formatTokenPrice(currentPrice)}
            </text>
          </svg>

          {/* Interactive Floating Crosshair Tooltip Lines */}
          {crosshairPos && (
            <>
              <div
                id="chart-crosshair-v"
                className="absolute top-0 bottom-0 w-px bg-black/40 pointer-events-none"
                style={{ left: `${crosshairPos.x}px` }}
              />
              <div
                id="chart-crosshair-h"
                className="absolute left-0 right-0 h-px bg-black/40 pointer-events-none"
                style={{ top: `${crosshairPos.y}px` }}
              />
            </>
          )}
        </div>

        {/* Time Axis Markers */}
        <div className="flex items-center justify-between pt-1 font-mono-num text-[11px] text-[#77767b] border-t border-[#f3f3f4]">
          <span>{candles[0]?.time || '09-10 00:00'}</span>
          <span>{candles[Math.floor(candles.length * 0.33)]?.time || '09-11 08:00'}</span>
          <span>{candles[Math.floor(candles.length * 0.66)]?.time || '09-12 16:00'}</span>
          <span>{candles[candles.length - 1]?.time || '09-13 20:00'}</span>
          <span className="text-black font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009668] animate-ping"></span>
            {t.market.liveUtc}
          </span>
        </div>
      </div>
    </div>
  );
};
