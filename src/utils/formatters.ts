export function formatTokenPrice(price: number): string {
  if (!price || isNaN(price)) return '$0.00';
  if (price < 0.000001) {
    return `$${price.toFixed(10).replace(/0+$/, '').replace(/\.$/, '')}`;
  }
  if (price < 0.0001) {
    return `$${price.toFixed(7)}`;
  }
  if (price < 0.01) {
    return `$${price.toFixed(5)}`;
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  return `$${price.toFixed(2)}`;
}

export function formatCompactNumber(num: number): string {
  if (!num || isNaN(num)) return '0';
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toLocaleString();
}
