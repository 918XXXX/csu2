# CSU Institutional Terminal

机构级 CSU (Chasing light) 代币实时行情终端，运行于 Base L2 网络。

**合约地址：** `0xdC6F5f0AcccD712416E8e377491F24A370261b07`

## 功能特性

- 实时 K 线图表（15m / 1H / 4H / 1D / 1W）
- Web3 钱包连接（MetaMask / OKX Wallet / Coinbase Wallet）
- 链上余额查询（ETH / CSU / USDC）
- Uniswap v4 流动性池实时数据
- 多语言支持（EN / 简体中文 / 繁體中文 / 日语 / 韩语 / 西班牙语 / 俄语）
- DexScreener 实时行情聚合
- 机构级安全审计信息展示

## 技术栈

React 19 + TypeScript + Vite + Tailwind CSS v4 + ethers.js v6

## 开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

输出目录：`dist/`

## 部署

本项目适配 Netlify 自动部署。推送到 GitHub 后在 Netlify 连接仓库即可。

**构建命令：** `npm run build`  
**发布目录：** `dist`

---

CSU Foundation © 2025
