export type Language = 'zh-CN' | 'en' | 'zh-TW' | 'ja' | 'ko' | 'es' | 'ru';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'zh-CN', label: 'Simplified Chinese', nativeLabel: '简体中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸' },
  { code: 'zh-TW', label: 'Traditional Chinese', nativeLabel: '繁體中文', flag: '🇭🇰' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어', flag: '🇰🇷' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский', flag: '🇷🇺' },
];

export interface Translations {
  nav: {
    overview: string;
    announcements: string;
    marketAnalytics: string;
    docs: string;
    activeChain: string;
    connectWallet: string;
    connectedWallet: string;
    csuBalance: string;
    walletDetails: string;
    mainnetBeta: string;
  };
  terminal: {
    title: string;
    contract: string;
    verified: string;
    uniswapSwap: string;
    addToken: string;
    dexScreener: string;
    etherscan: string;
    copyAddress: string;
  };
  market: {
    sectionTitle: string;
    orderbookFeed: string;
    spot: string;
    high24h: string;
    low24h: string;
    volume24h: string;
    turnover: string;
    liveUtc: string;
    ohlcO: string;
    ohlcH: string;
    ohlcL: string;
    ohlcC: string;
    ohlcVol: string;
  };
  metrics: {
    title: string;
    tag: string;
    marketCap: string;
    fdv: string;
    fdvSubtitle: string;
    circulatingSupply: string;
    circulatingRatio: string;
    totalRatio: string;
    holders: string;
    holdersToday: string;
    holdersChains: string;
    totalStaked: string;
    apr: string;
    auditPassed: string;
    auditSub: string;
  };
  announcements: {
    sectionTitle: string;
    all: string;
    upgrade: string;
    governance: string;
    ecosystem: string;
    pinnedTag: string;
    readReport: string;
    executionStatus: string;
    viewDetails: string;
    officialSig: string;
    close: string;
    executionHash: string;
  };
  swap: {
    title: string;
    youPay: string;
    youReceive: string;
    balance: string;
    rate: string;
    routing: string;
    slippage: string;
    gas: string;
    slippageTol: string;
    submit: string;
    submitting: string;
    success: string;
  };
  walletModal: {
    titleConnect: string;
    titleConnected: string;
    subtitleConnect: string;
    subtitleConnected: string;
    accountAddr: string;
    activeOn: string;
    reserve: string;
    selectNetwork: string;
    disconnect: string;
    termsNotice: string;
  };
  footer: {
    rights: string;
    protocol: string;
  };
  toast: {
    contractCopied: string;
    walletCopied: string;
    tokenAddRequested: string;
    timeframeSwitched: string;
    networkSwitched: string;
    walletDisconnected: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  'zh-CN': {
    nav: {
      overview: '总览看板 (Overview)',
      announcements: '官网公告 (Announcements)',
      marketAnalytics: '市场分析 (Market & Analytics)',
      docs: '技术文档 (Docs)',
      activeChain: 'ETH / ARB 双链激活',
      connectWallet: '连接钱包 (Connect)',
      connectedWallet: '已连接钱包',
      csuBalance: 'CSU 钱包余额',
      walletDetails: '账户资产与网络切换',
      mainnetBeta: 'Mainnet Beta',
    },
    terminal: {
      title: '机构级专用终端',
      contract: '合约地址:',
      verified: 'CertiK & OZ 双重验证',
      uniswapSwap: 'Uniswap 交易',
      addToken: '添加代币',
      dexScreener: 'DexScreener',
      etherscan: 'Etherscan',
      copyAddress: '复制合约地址',
    },
    market: {
      sectionTitle: '01 / CSU 实时行情与代币全貌',
      orderbookFeed: '订单簿数据源: 正常 • 延迟 14MS',
      spot: '现货 (Spot)',
      high24h: '24小时最高',
      low24h: '24小时最低',
      volume24h: '24小时成交额 (USDT)',
      turnover: '换手量 (CSU)',
      liveUtc: '实时更新 (UTC)',
      ohlcO: '开盘',
      ohlcH: '最高',
      ohlcL: '最低',
      ohlcC: '收盘',
      ohlcVol: '成交量',
    },
    metrics: {
      title: '代币核心信息 • Token Metrics',
      tag: 'ERC-20 / OFT 全链标准',
      marketCap: '流通市值 (Market Cap)',
      fdv: '完全稀释估值 (FDV)',
      fdvSubtitle: '100% 恒定硬顶',
      circulatingSupply: '流通供给 (Circulating Supply)',
      circulatingRatio: '已流通',
      totalRatio: '总量: 100,000,000 CSU',
      holders: '持币地址数 (Holders)',
      holdersToday: '今日新增',
      holdersChains: '以太坊主网 + Arbitrum',
      totalStaked: '24小时锁仓质押 (Total Staked)',
      apr: '年化收益率',
      auditPassed: '双重安全审计正式通过',
      auditSub: 'CertiK Skynet 评分: 96.4 • OpenZeppelin 形式化证明',
    },
    announcements: {
      sectionTitle: '02 / CSU 官网公告与治理披露',
      all: '全部 (ALL)',
      upgrade: '系统升级',
      governance: '治理决议',
      ecosystem: '生态合作',
      pinnedTag: '置顶重大治理',
      readReport: '阅读执行通告',
      executionStatus: '执行状态: 主网已生效',
      viewDetails: '查看详情',
      officialSig: 'CSU Foundation 官方合规签名与链上凭证验证',
      close: '关闭',
      executionHash: '执行交易哈希 (Transaction Hash)',
    },
    swap: {
      title: 'Uniswap v3 机构流动池即时交易',
      youPay: '支付金额 (You Pay)',
      youReceive: '预估获得 (You Receive)',
      balance: '可用余额',
      rate: '汇率参考',
      routing: '智能路由协议',
      slippage: '滑点冲击',
      gas: '预计网络 Gas',
      slippageTol: '滑点容忍度',
      submit: '立即兑换 CSU (Instant Swap)',
      submitting: '正在广播交易至内存池...',
      success: '兑换成功！',
    },
    walletModal: {
      titleConnect: '连接机构级 Web3 钱包',
      titleConnected: '已连接机构账户',
      subtitleConnect: '请选择经官方认证的 Web3 托管或钱包方案',
      subtitleConnected: '管理当前连接状态与网络首选项',
      accountAddr: '账户地址',
      activeOn: '已连接至',
      reserve: '储备资金',
      selectNetwork: '切换运行网络',
      disconnect: '断开当前钱包会话',
      termsNotice: '* 连接钱包即代表接受 CSU 协议服务条款。私钥完全由您本地掌管。',
    },
    footer: {
      rights: 'CSU Foundation © 2025',
      protocol: '去中心化全链流动性协议 (Decentralized Liquidity Protocol)',
    },
    toast: {
      contractCopied: '合约地址已复制到剪贴板',
      walletCopied: '钱包地址已复制到剪贴板',
      tokenAddRequested: '已向 MetaMask 发送资产凭证绑定请求 (CSU)',
      timeframeSwitched: 'K线时间周期已切换至: ',
      networkSwitched: '网络已切换至: ',
      walletDisconnected: '钱包已安全断开',
    },
  },
  'en': {
    nav: {
      overview: 'Overview',
      announcements: 'Announcements',
      marketAnalytics: 'Market & Analytics',
      docs: 'Docs',
      activeChain: 'ETH / ARB Active',
      connectWallet: 'Connect Wallet',
      connectedWallet: 'Connected Wallet',
      csuBalance: 'CSU Wallet Balance',
      walletDetails: 'Account Assets & Networks',
      mainnetBeta: 'Mainnet Beta',
    },
    terminal: {
      title: 'Institutional Terminal',
      contract: 'CONTRACT:',
      verified: 'CertiK & OZ Verified',
      uniswapSwap: 'Uniswap Swap',
      addToken: 'Add Token',
      dexScreener: 'DexScreener',
      etherscan: 'Etherscan',
      copyAddress: 'Copy Contract Address',
    },
    market: {
      sectionTitle: '01 / CSU Live Market & Token Overview',
      orderbookFeed: 'ORDERBOOK FEED: ACTIVE • LATENCY 14MS',
      spot: 'Spot',
      high24h: '24h High',
      low24h: '24h Low',
      volume24h: '24h Volume (USDT)',
      turnover: 'Turnover (CSU)',
      liveUtc: 'Live (UTC)',
      ohlcO: 'Open',
      ohlcH: 'High',
      ohlcL: 'Low',
      ohlcC: 'Close',
      ohlcVol: 'Volume',
    },
    metrics: {
      title: 'Token Metrics • Core Ledger',
      tag: 'ERC-20 / OFT Omnichain',
      marketCap: 'Market Cap',
      fdv: 'Fully Diluted Valuation (FDV)',
      fdvSubtitle: '100% Fixed Cap',
      circulatingSupply: 'Circulating Supply',
      circulatingRatio: 'Circulating',
      totalRatio: 'Total: 100,000,000 CSU',
      holders: 'Holders',
      holdersToday: 'today',
      holdersChains: 'Arbitrum + Mainnet',
      totalStaked: '24h Total Staked',
      apr: 'APR',
      auditPassed: 'Dual Security Audit Passed',
      auditSub: 'CertiK Skynet Score: 96.4 • OpenZeppelin Formal Proofs',
    },
    announcements: {
      sectionTitle: '02 / CSU Announcements & Governance Disclosures',
      all: 'All',
      upgrade: 'Upgrade',
      governance: 'Governance',
      ecosystem: 'Ecosystem',
      pinnedTag: 'Pinned Governance',
      readReport: 'Read Execution Notice',
      executionStatus: 'Status: Active Mainnet',
      viewDetails: 'View Details',
      officialSig: 'CSU Foundation Official Verification Signature & On-chain Proof',
      close: 'Close',
      executionHash: 'Execution Transaction Hash',
    },
    swap: {
      title: 'Uniswap v3 Institutional Pool Swap',
      youPay: 'You Pay',
      youReceive: 'You Receive',
      balance: 'Balance',
      rate: 'Rate',
      routing: 'Routing Protocol',
      slippage: 'Price Impact',
      gas: 'Est. Network Gas',
      slippageTol: 'Slippage Tolerance',
      submit: 'Instant Swap to CSU',
      submitting: 'Submitting Swap TX to Mempool...',
      success: 'Swap Completed!',
    },
    walletModal: {
      titleConnect: 'Connect Web3 Wallet',
      titleConnected: 'Connected Institutional Wallet',
      subtitleConnect: 'Select your preferred certified custody or wallet provider',
      subtitleConnected: 'Manage active connection and network settings',
      accountAddr: 'Account Address',
      activeOn: 'Active on',
      reserve: 'Reserve',
      selectNetwork: 'Select Active Network',
      disconnect: 'Disconnect Wallet Session',
      termsNotice: '* Connecting a wallet acknowledges CSU Protocol Terms. Private keys stay with you.',
    },
    footer: {
      rights: 'CSU Foundation © 2025',
      protocol: 'Decentralized Liquidity Protocol',
    },
    toast: {
      contractCopied: 'Contract address copied to clipboard',
      walletCopied: 'Wallet address copied to clipboard',
      tokenAddRequested: 'Sent token binding request to MetaMask (CSU)',
      timeframeSwitched: 'Timeframe switched to: ',
      networkSwitched: 'Network switched to: ',
      walletDisconnected: 'Wallet session disconnected',
    },
  },
  'zh-TW': {
    nav: {
      overview: '總覽看板 (Overview)',
      announcements: '官網公告 (Announcements)',
      marketAnalytics: '市場分析 (Market & Analytics)',
      docs: '技術文檔 (Docs)',
      activeChain: 'ETH / ARB 雙鏈激活',
      connectWallet: '連接錢包 (Connect)',
      connectedWallet: '已連接錢包',
      csuBalance: 'CSU 錢包餘額',
      walletDetails: '賬戶資產與網絡切換',
      mainnetBeta: 'Mainnet Beta',
    },
    terminal: {
      title: '機構級專用終端',
      contract: '合約地址:',
      verified: 'CertiK & OZ 雙重驗證',
      uniswapSwap: 'Uniswap 交易',
      addToken: '添加代幣',
      dexScreener: 'DexScreener',
      etherscan: 'Etherscan',
      copyAddress: '複製合約地址',
    },
    market: {
      sectionTitle: '01 / CSU 即時行情與代幣全貌',
      orderbookFeed: '訂單簿數據源: 正常 • 延遲 14MS',
      spot: '現貨 (Spot)',
      high24h: '24小時最高',
      low24h: '24小時最低',
      volume24h: '24小時成交額 (USDT)',
      turnover: '換手量 (CSU)',
      liveUtc: '即時更新 (UTC)',
      ohlcO: '開盤',
      ohlcH: '最高',
      ohlcL: '最低',
      ohlcC: '收盤',
      ohlcVol: '成交量',
    },
    metrics: {
      title: '代幣核心資訊 • Token Metrics',
      tag: 'ERC-20 / OFT 全鏈標準',
      marketCap: '流通市值 (Market Cap)',
      fdv: '完全稀釋估值 (FDV)',
      fdvSubtitle: '100% 恆定硬頂',
      circulatingSupply: '流通供給 (Circulating Supply)',
      circulatingRatio: '已流通',
      totalRatio: '總量: 100,000,000 CSU',
      holders: '持幣地址數 (Holders)',
      holdersToday: '今日新增',
      holdersChains: '以太坊主網 + Arbitrum',
      totalStaked: '24小時鎖倉質押 (Total Staked)',
      apr: '年化收益率',
      auditPassed: '雙重安全審計正式通過',
      auditSub: 'CertiK Skynet 評分: 96.4 • OpenZeppelin 形式化證明',
    },
    announcements: {
      sectionTitle: '02 / CSU 官網公告與治理披露',
      all: '全部 (ALL)',
      upgrade: '系統升級',
      governance: '治理決議',
      ecosystem: '生態合作',
      pinnedTag: '置頂重大治理',
      readReport: '閱讀執行通告',
      executionStatus: '執行狀態: 主網已生效',
      viewDetails: '查看詳情',
      officialSig: 'CSU Foundation 官方合規簽名與鏈上憑證驗證',
      close: '關閉',
      executionHash: '執行交易哈希 (Transaction Hash)',
    },
    swap: {
      title: 'Uniswap v3 機構流動池即時交易',
      youPay: '支付金額 (You Pay)',
      youReceive: '預估獲得 (You Receive)',
      balance: '可用餘額',
      rate: '匯率參考',
      routing: '智慧路由協議',
      slippage: '滑點衝擊',
      gas: '預計網絡 Gas',
      slippageTol: '滑點容忍度',
      submit: '立即兌換 CSU (Instant Swap)',
      submitting: '正在廣播交易至內存池...',
      success: '兌換成功！',
    },
    walletModal: {
      titleConnect: '連接機構級 Web3 錢包',
      titleConnected: '已連接機構賬戶',
      subtitleConnect: '請選擇經官方認證的 Web3 託管或錢包方案',
      subtitleConnected: '管理當前連接狀態與網絡偏好設置',
      accountAddr: '賬戶地址',
      activeOn: '已連接至',
      reserve: '儲備資金',
      selectNetwork: '切換運行網絡',
      disconnect: '中斷當前錢包會話',
      termsNotice: '* 連接錢包即代表接受 CSU 協議服務條款。私鑰完全由您本地掌握。',
    },
    footer: {
      rights: 'CSU Foundation © 2025',
      protocol: '去中心化全鏈流動性協議 (Decentralized Liquidity Protocol)',
    },
    toast: {
      contractCopied: '合約地址已複製到剪貼簿',
      walletCopied: '錢包地址已複製到剪貼簿',
      tokenAddRequested: '已向 MetaMask 發送資產憑證綁定請求 (CSU)',
      timeframeSwitched: 'K線時間週期已切換至: ',
      networkSwitched: '網絡已切換至: ',
      walletDisconnected: '錢包已安全斷開',
    },
  },
  'ja': {
    nav: {
      overview: '概要 (Overview)',
      announcements: '公式アナウンス (Announcements)',
      marketAnalytics: '市場分析 (Market & Analytics)',
      docs: 'ドキュメント (Docs)',
      activeChain: 'ETH / ARB 有効',
      connectWallet: 'ウォレット接続',
      connectedWallet: '接続中ウォレット',
      csuBalance: 'CSU残高',
      walletDetails: 'ウォレット詳細 & ネットワーク',
      mainnetBeta: 'Mainnet Beta',
    },
    terminal: {
      title: '機関投資家向けターミナル',
      contract: 'コントラクト:',
      verified: 'CertiK & OZ 監査認証済',
      uniswapSwap: 'Uniswap スワップ',
      addToken: 'トークン追加',
      dexScreener: 'DexScreener',
      etherscan: 'Etherscan',
      copyAddress: 'アドレスをコピー',
    },
    market: {
      sectionTitle: '01 / CSU リアルタイム相場とトークン概要',
      orderbookFeed: 'オーダーブック: 稼働中 • レイテンシ 14MS',
      spot: '現物 (Spot)',
      high24h: '24h 最高値',
      low24h: '24h 最安値',
      volume24h: '24h 出来高 (USDT)',
      turnover: '回転数 (CSU)',
      liveUtc: 'ライブ (UTC)',
      ohlcO: '始値',
      ohlcH: '高値',
      ohlcL: '安値',
      ohlcC: '終値',
      ohlcVol: '出来高',
    },
    metrics: {
      title: 'トークン主要メトリクス',
      tag: 'ERC-20 / OFT 標準',
      marketCap: '時価総額 (Market Cap)',
      fdv: '完全希薄化後評価額 (FDV)',
      fdvSubtitle: '100% 固定発行量',
      circulatingSupply: '流通供給量 (Circulating Supply)',
      circulatingRatio: '流通中',
      totalRatio: '総量: 100,000,000 CSU',
      holders: '保有アドレス数 (Holders)',
      holdersToday: '本日増加',
      holdersChains: 'Ethereum + Arbitrum',
      totalStaked: '24h ステーキング量',
      apr: '年利回り (APR)',
      auditPassed: '二重セキュリティ監査通過',
      auditSub: 'CertiK スコア: 96.4 • OpenZeppelin 形式検証済',
    },
    announcements: {
      sectionTitle: '02 / 公式アナウンス & ガバナンス開示',
      all: 'すべて (ALL)',
      upgrade: 'システム更新',
      governance: 'ガバナンス',
      ecosystem: 'エコシステム',
      pinnedTag: '最重要ガバナンス',
      readReport: '実行通告を読む',
      executionStatus: '実行状況: メインネット適用済',
      viewDetails: '詳細を見る',
      officialSig: 'CSU Foundation 公式署名検証済',
      close: '閉じる',
      executionHash: '実行トランザクションハッシュ',
    },
    swap: {
      title: 'Uniswap v3 機関プール即時スワップ',
      youPay: '支払額',
      youReceive: '受取予定額',
      balance: '残高',
      rate: '参考レート',
      routing: 'ルーティングプロトコル',
      slippage: '価格インパクト',
      gas: '推定ガス代',
      slippageTol: 'スリッページ許容度',
      submit: 'CSUへ即時スワップ',
      submitting: 'トランザクション送信中...',
      success: 'スワップ完了！',
    },
    walletModal: {
      titleConnect: 'Web3ウォレットを接続',
      titleConnected: '接続中のアカウント',
      subtitleConnect: 'ご利用のWeb3ウォレットを選択してください',
      subtitleConnected: '接続状況とネットワークを管理',
      accountAddr: 'アカウントアドレス',
      activeOn: '接続先ネットワーク',
      reserve: '準備資金',
      selectNetwork: 'ネットワーク切替',
      disconnect: 'ウォレット切断',
      termsNotice: '* 接続によりCSUプロトコル利用規約に同意したとみなされます。',
    },
    footer: {
      rights: 'CSU Foundation © 2025',
      protocol: '分散型オムニチェーン流動性プロトコル',
    },
    toast: {
      contractCopied: 'コントラクトアドレスをコピーしました',
      walletCopied: 'ウォレットアドレスをコピーしました',
      tokenAddRequested: 'MetaMaskへCSUトークン追加リクエストを送信しました',
      timeframeSwitched: '時間軸を切替えました: ',
      networkSwitched: 'ネットワークを切替えました: ',
      walletDisconnected: 'ウォレットを切断しました',
    },
  },
  'ko': {
    nav: {
      overview: '개요 (Overview)',
      announcements: '공식 공지 (Announcements)',
      marketAnalytics: '시장 분석 (Market & Analytics)',
      docs: '문서 (Docs)',
      activeChain: 'ETH / ARB 활성화됨',
      connectWallet: '지갑 연결',
      connectedWallet: '연결된 지갑',
      csuBalance: 'CSU 지갑 잔액',
      walletDetails: '자산 및 네트워크 전환',
      mainnetBeta: 'Mainnet Beta',
    },
    terminal: {
      title: '기관용 전용 터미널',
      contract: '컨트랙트:',
      verified: 'CertiK & OZ 보안 검증됨',
      uniswapSwap: 'Uniswap 거래',
      addToken: '토큰 추가',
      dexScreener: 'DexScreener',
      etherscan: 'Etherscan',
      copyAddress: '주소 복사',
    },
    market: {
      sectionTitle: '01 / CSU 실시간 시세 및 토큰 개요',
      orderbookFeed: '오더북 피드: 정상 • 지연율 14MS',
      spot: '현물 (Spot)',
      high24h: '24시간 최고가',
      low24h: '24시간 최저가',
      volume24h: '24시간 거래대금 (USDT)',
      turnover: '회전량 (CSU)',
      liveUtc: '실시간 (UTC)',
      ohlcO: '시가',
      ohlcH: '고가',
      ohlcL: '저가',
      ohlcC: '종가',
      ohlcVol: '거래량',
    },
    metrics: {
      title: '토큰 핵심 지표 • Token Metrics',
      tag: 'ERC-20 / OFT 표준',
      marketCap: '유통 시가총액 (Market Cap)',
      fdv: '완전 희석 가치 (FDV)',
      fdvSubtitle: '100% 고정 총발행량',
      circulatingSupply: '유통 공급량 (Circulating Supply)',
      circulatingRatio: '유통률',
      totalRatio: '총공급: 100,000,000 CSU',
      holders: '홀더 지갑 수 (Holders)',
      holdersToday: '오늘 증가',
      holdersChains: '이더리움 메인넷 + 아비트럼',
      totalStaked: '24시간 스테이킹 락업',
      apr: '연이율 (APR)',
      auditPassed: '이중 보안 감사 통과',
      auditSub: 'CertiK 스카이넷 점수: 96.4 • OpenZeppelin 공식 증명',
    },
    announcements: {
      sectionTitle: '02 / CSU 공식 공지 및 거버넌스 공시',
      all: '전체 (ALL)',
      upgrade: '시스템 업그레이드',
      governance: '거버넌스 결의',
      ecosystem: '생태계 협력',
      pinnedTag: '고정 중요 거버넌스',
      readReport: '집행 공고 읽기',
      executionStatus: '집행 상태: 메인넷 적용 완료',
      viewDetails: '상세 보기',
      officialSig: 'CSU Foundation 공식 서명 및 온체인 검증 완료',
      close: '닫기',
      executionHash: '실행 트랜잭션 해시',
    },
    swap: {
      title: 'Uniswap v3 기관 유동성 풀 즉시 스왑',
      youPay: '지불 금액',
      youReceive: '예상 수령액',
      balance: '잔액',
      rate: '기준 환율',
      routing: '라우팅 프로토콜',
      slippage: '가격 영향도 (슬리피지)',
      gas: '예상 네트워크 가스비',
      slippageTol: '슬리피지 허용치',
      submit: 'CSU 즉시 스왑',
      submitting: '트랜잭션 브로드캐스트 중...',
      success: '스왑 완료!',
    },
    walletModal: {
      titleConnect: 'Web3 지갑 연결',
      titleConnected: '연결된 기관 계정',
      subtitleConnect: '원하시는 Web3 지갑 제공업체를 선택하세요',
      subtitleConnected: '연결 상태 및 네트워크 환경 관리',
      accountAddr: '계정 주소',
      activeOn: '현재 네트워크',
      reserve: '예비 자산',
      selectNetwork: '네트워크 전환',
      disconnect: '지갑 세션 연결 해제',
      termsNotice: '* 지갑 연결 시 CSU 프로토콜 서비스 약관에 동의하는 것으로 간주됩니다.',
    },
    footer: {
      rights: 'CSU Foundation © 2025',
      protocol: '탈중앙화 옴니체인 유동성 프로토콜',
    },
    toast: {
      contractCopied: '컨트랙트 주소가 클립보드에 복사되었습니다',
      walletCopied: '지갑 주소가 클립보드에 복사되었습니다',
      tokenAddRequested: 'MetaMask로 CSU 토큰 바인딩 요청을 전송했습니다',
      timeframeSwitched: '차트 시간 프레임이 변경되었습니다: ',
      networkSwitched: '네트워크가 변경되었습니다: ',
      walletDisconnected: '지갑 연결이 안전하게 해제되었습니다',
    },
  },
  'es': {
    nav: {
      overview: 'Resumen (Overview)',
      announcements: 'Anuncios',
      marketAnalytics: 'Mercado y Análisis',
      docs: 'Documentación',
      activeChain: 'ETH / ARB Activo',
      connectWallet: 'Conectar Billetera',
      connectedWallet: 'Billetera Conectada',
      csuBalance: 'Saldo CSU',
      walletDetails: 'Detalles de Billetera y Red',
      mainnetBeta: 'Mainnet Beta',
    },
    terminal: {
      title: 'Terminal Institucional',
      contract: 'CONTRATO:',
      verified: 'CertiK y OZ Verificado',
      uniswapSwap: 'Operar en Uniswap',
      addToken: 'Agregar Token',
      dexScreener: 'DexScreener',
      etherscan: 'Etherscan',
      copyAddress: 'Copiar Dirección',
    },
    market: {
      sectionTitle: '01 / Mercado en Vivo y Resumen de Token CSU',
      orderbookFeed: 'FEED LIBRO DE ÓRDENES: ACTIVO • LATENCIA 14MS',
      spot: 'Spot',
      high24h: 'Máx 24h',
      low24h: 'Mín 24h',
      volume24h: 'Volumen 24h (USDT)',
      turnover: 'Rotación (CSU)',
      liveUtc: 'En Vivo (UTC)',
      ohlcO: 'Apertura',
      ohlcH: 'Máximo',
      ohlcL: 'Mínimo',
      ohlcC: 'Cierre',
      ohlcVol: 'Volumen',
    },
    metrics: {
      title: 'Métricas de Token • Libro Mayor',
      tag: 'Estándar ERC-20 / OFT',
      marketCap: 'Capitalización de Mercado',
      fdv: 'Valoración Totalmente Diluida (FDV)',
      fdvSubtitle: '100% Límite Fijo',
      circulatingSupply: 'Suministro Circulante',
      circulatingRatio: 'Circulante',
      totalRatio: 'Total: 100,000,000 CSU',
      holders: 'Titulares (Holders)',
      holdersToday: 'hoy',
      holdersChains: 'Arbitrum + Mainnet',
      totalStaked: 'Total en Staking 24h',
      apr: 'APR',
      auditPassed: 'Doble Auditoría de Seguridad Aprobada',
      auditSub: 'Puntuación CertiK Skynet: 96.4 • Pruebas Formales OpenZeppelin',
    },
    announcements: {
      sectionTitle: '02 / Anuncios Oficiales y Divulgación de Gobernanza',
      all: 'Todos (ALL)',
      upgrade: 'Actualización',
      governance: 'Gobernanza',
      ecosystem: 'Ecosistema',
      pinnedTag: 'Gobernanza Fijada',
      readReport: 'Leer Aviso de Ejecución',
      executionStatus: 'Estado: Mainnet Activa',
      viewDetails: 'Ver Detalles',
      officialSig: 'Firma de Verificación Oficial de CSU Foundation',
      close: 'Cerrar',
      executionHash: 'Hash de Transacción de Ejecución',
    },
    swap: {
      title: 'Canje Inmediato en Pool Institucional Uniswap v3',
      youPay: 'Tú Pagas',
      youReceive: 'Recibes (Estimado)',
      balance: 'Saldo',
      rate: 'Tasa de Referencia',
      routing: 'Protocolo de Enrutamiento',
      slippage: 'Impacto en Precio',
      gas: 'Gas de Red Est.',
      slippageTol: 'Tolerancia al Deslizamiento',
      submit: 'Canjear Inmediatamente a CSU',
      submitting: 'Transmitiendo Transacción a Mempool...',
      success: '¡Canje Completado!',
    },
    walletModal: {
      titleConnect: 'Conectar Billetera Web3',
      titleConnected: 'Billetera Institucional Conectada',
      subtitleConnect: 'Seleccione su proveedor de custodia o billetera Web3 certificado',
      subtitleConnected: 'Administre su conexión activa y configuración de red',
      accountAddr: 'Dirección de Cuenta',
      activeOn: 'Activo en',
      reserve: 'Reserva',
      selectNetwork: 'Seleccionar Red Activa',
      disconnect: 'Desconectar Sesión',
      termsNotice: '* Al conectar una billetera, acepta los Términos de Servicio de CSU Protocol.',
    },
    footer: {
      rights: 'CSU Foundation © 2025',
      protocol: 'Protocolo Descentralizado de Liquidez Omnichain',
    },
    toast: {
      contractCopied: 'Dirección del contrato copiada al portapapeles',
      walletCopied: 'Dirección de billetera copiada al portapapeles',
      tokenAddRequested: 'Solicitud de vinculación enviada a MetaMask (CSU)',
      timeframeSwitched: 'Marco temporal cambiado a: ',
      networkSwitched: 'Red cambiada a: ',
      walletDisconnected: 'Sesión de billetera desconectada',
    },
  },
  'ru': {
    nav: {
      overview: 'Обзор (Overview)',
      announcements: 'Объявления',
      marketAnalytics: 'Рынок и Аналитика',
      docs: 'Документация',
      activeChain: 'ETH / ARB Активно',
      connectWallet: 'Подключить кошелек',
      connectedWallet: 'Подключенный кошелек',
      csuBalance: 'Баланс CSU',
      walletDetails: 'Детали аккаунта и сети',
      mainnetBeta: 'Mainnet Beta',
    },
    terminal: {
      title: 'Институциональный терминал',
      contract: 'КОНТРАКТ:',
      verified: 'Аудит CertiK и OZ Пройден',
      uniswapSwap: 'Обмен на Uniswap',
      addToken: 'Добавить токен',
      dexScreener: 'DexScreener',
      etherscan: 'Etherscan',
      copyAddress: 'Скопировать адрес',
    },
    market: {
      sectionTitle: '01 / CSU Текущий рынок и обзор токена',
      orderbookFeed: 'ПОТОК СТАКАНА: АКТИВЕН • ЗАДЕРЖКА 14МС',
      spot: 'Спот',
      high24h: '24ч Макс',
      low24h: '24ч Мин',
      volume24h: '24ч Объем (USDT)',
      turnover: 'Оборот (CSU)',
      liveUtc: 'В реальном времени (UTC)',
      ohlcO: 'Открытие',
      ohlcH: 'Максимум',
      ohlcL: 'Минимум',
      ohlcC: 'Закрытие',
      ohlcVol: 'Объем',
    },
    metrics: {
      title: 'Метрики токена • Основной реестр',
      tag: 'Стандарт ERC-20 / OFT',
      marketCap: 'Рыночная капитализация',
      fdv: 'Полная разводненная оценка (FDV)',
      fdvSubtitle: '100% Фиксированная эмиссия',
      circulatingSupply: 'Циркулирующее предложение',
      circulatingRatio: 'В обращении',
      totalRatio: 'Всего: 100,000,000 CSU',
      holders: 'Количество холдеров',
      holdersToday: 'сегодня',
      holdersChains: 'Arbitrum + Mainnet',
      totalStaked: '24ч В стейкинге',
      apr: 'APR',
      auditPassed: 'Двойной аудит безопасности пройден',
      auditSub: 'Рейтинг CertiK Skynet: 96.4 • Формальная верификация OpenZeppelin',
    },
    announcements: {
      sectionTitle: '02 / Официальные объявления и раскрытие управления',
      all: 'Все (ALL)',
      upgrade: 'Обновление',
      governance: 'Управление',
      ecosystem: 'Экосистема',
      pinnedTag: 'Закрепленное управление',
      readReport: 'Читать отчет об исполнении',
      executionStatus: 'Статус: Активно в Mainnet',
      viewDetails: 'Подробнее',
      officialSig: 'Официальная подпись верификации CSU Foundation',
      close: 'Закрыть',
      executionHash: 'Хеш транзакции исполнения',
    },
    swap: {
      title: 'Мгновенный обмен в институциональном пуле Uniswap v3',
      youPay: 'Вы отдаете',
      youReceive: 'Вы получаете (оценка)',
      balance: 'Баланс',
      rate: 'Ориентировочный курс',
      routing: 'Протокол маршрутизации',
      slippage: 'Влияние на цену',
      gas: 'Ориентировочный газ',
      slippageTol: 'Допустимое проскальзывание',
      submit: 'Мгновенный обмен на CSU',
      submitting: 'Отправка транзакции в мемпул...',
      success: 'Обмен успешно завершен!',
    },
    walletModal: {
      titleConnect: 'Подключить Web3 кошелек',
      titleConnected: 'Подключенный институциональный аккаунт',
      subtitleConnect: 'Выберите сертифицированного Web3 провайдера',
      subtitleConnected: 'Управление активным подключением и настройками сети',
      accountAddr: 'Адрес аккаунта',
      activeOn: 'Активно в сети',
      reserve: 'Резерв',
      selectNetwork: 'Выбрать активную сеть',
      disconnect: 'Отключить сессию кошелька',
      termsNotice: '* Подключая кошелек, вы принимаете Условия использования CSU Protocol.',
    },
    footer: {
      rights: 'CSU Foundation © 2025',
      protocol: 'Децентрализованный кроссчейн-протокол ликвидности',
    },
    toast: {
      contractCopied: 'Адрес контракта скопирован в буфер обмена',
      walletCopied: 'Адрес кошелька скопирован в буфер обмена',
      tokenAddRequested: 'Запрос на привязку токена отправлен в MetaMask (CSU)',
      timeframeSwitched: 'Таймфрейм изменен на: ',
      networkSwitched: 'Сеть переключена на: ',
      walletDisconnected: 'Сессия кошелька безопасно завершена',
    },
  },
};
