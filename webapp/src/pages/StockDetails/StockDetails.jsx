import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import "./StockDetails.css";

// Mock data
const mockStockData = {
  TSLA: {
    ticker: "TSLA",
    name: "Tesla Inc.",
    sentiment: 7.8,
    rating: "Bullish",
    prediction: "+5.2%",
    currentPrice: 242.84,
    mentions: 1247,
    posts: 89,
    comments: 1158,
    topKeywords: ["calls", "moon", "delivery numbers", "cybertruck"],
    summary:
      "Strong bullish sentiment driven by upcoming delivery numbers and Cybertruck hype. Community expects short-term gains.",
    historicalSentiment: [6.2, 6.8, 7.1, 7.5, 7.8],
  },
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    sentiment: 6.5,
    rating: "Moderately Bullish",
    prediction: "+2.1%",
    currentPrice: 189.95,
    mentions: 892,
    posts: 64,
    comments: 828,
    topKeywords: ["iPhone", "services", "dividend", "safe bet"],
    summary:
      "Steady positive sentiment with focus on service revenue growth and upcoming product launches.",
    historicalSentiment: [6.1, 6.3, 6.4, 6.5, 6.5],
  },
  GME: {
    ticker: "GME",
    name: "GameStop Corp.",
    sentiment: 8.9,
    rating: "Very Bullish",
    prediction: "+12.7%",
    currentPrice: 18.52,
    mentions: 2341,
    posts: 178,
    comments: 2163,
    topKeywords: ["diamond hands", "DRS", "to the moon", "Ryan Cohen"],
    summary:
      "Extremely bullish community sentiment. High engagement with focus on stock fundamentals and retail ownership.",
    historicalSentiment: [8.1, 8.4, 8.6, 8.7, 8.9],
  },
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    sentiment: 8.2,
    rating: "Bullish",
    prediction: "+6.8%",
    currentPrice: 495.22,
    mentions: 1534,
    posts: 112,
    comments: 1422,
    topKeywords: ["AI", "GPUs", "data center", "Jensen"],
    summary:
      "Strong bullish sentiment fueled by AI boom and data center demand. High confidence in continued growth.",
    historicalSentiment: [7.5, 7.8, 8.0, 8.1, 8.2],
  },
  AMC: {
    ticker: "AMC",
    name: "AMC Entertainment",
    sentiment: 7.1,
    rating: "Bullish",
    prediction: "+4.3%",
    currentPrice: 5.87,
    mentions: 1876,
    posts: 134,
    comments: 1742,
    topKeywords: ["apes", "short squeeze", "box office", "hold"],
    summary:
      "Bullish community with strong retail support. Focus on debt reduction and box office recovery.",
    historicalSentiment: [6.8, 6.9, 7.0, 7.0, 7.1],
  },
  SPY: {
    ticker: "SPY",
    name: "S&P 500 ETF",
    sentiment: 5.8,
    rating: "Slightly Bullish",
    prediction: "+1.2%",
    currentPrice: 456.73,
    mentions: 1123,
    posts: 89,
    comments: 1034,
    topKeywords: ["calls", "puts", "market direction", "Fed"],
    summary:
      "Mixed sentiment with cautious optimism. Traders watching Fed policy and economic indicators closely.",
    historicalSentiment: [5.5, 5.6, 5.7, 5.8, 5.8],
  },
  PLTR: {
    ticker: "PLTR",
    name: "Palantir Technologies",
    sentiment: 7.6,
    rating: "Bullish",
    prediction: "+5.9%",
    currentPrice: 28.41,
    mentions: 967,
    posts: 73,
    comments: 894,
    topKeywords: ["AI contracts", "government", "Karp", "growth"],
    summary:
      "Strong bullish sentiment driven by AI contract wins and revenue growth. Community confident in long-term prospects.",
    historicalSentiment: [6.9, 7.2, 7.4, 7.5, 7.6],
  },
  AMD: {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    sentiment: 6.9,
    rating: "Moderately Bullish",
    prediction: "+3.4%",
    currentPrice: 121.33,
    mentions: 734,
    posts: 56,
    comments: 678,
    topKeywords: ["chips", "data center", "Intel competitor", "AI"],
    summary:
      "Positive sentiment with focus on data center growth and AI chip development. Some caution on competition.",
    historicalSentiment: [6.5, 6.7, 6.8, 6.9, 6.9],
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    sentiment: 7.3,
    rating: "Bullish",
    prediction: "+3.8%",
    currentPrice: 378.91,
    mentions: 845,
    posts: 61,
    comments: 784,
    topKeywords: ["Azure", "OpenAI", "cloud", "enterprise"],
    summary:
      "Bullish sentiment supported by cloud growth and AI integration. Seen as stable growth play.",
    historicalSentiment: [7.0, 7.1, 7.2, 7.3, 7.3],
  },
  META: {
    ticker: "META",
    name: "Meta Platforms",
    sentiment: 6.2,
    rating: "Moderately Bullish",
    prediction: "+2.6%",
    currentPrice: 338.54,
    mentions: 612,
    posts: 47,
    comments: 565,
    topKeywords: ["VR", "ad revenue", "Zuckerberg", "metaverse"],
    summary:
      "Cautiously bullish with focus on ad revenue recovery and cost-cutting measures. Mixed views on metaverse.",
    historicalSentiment: [5.8, 5.9, 6.0, 6.1, 6.2],
  },
};

function StockDetails() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    // Simulate loading stages
    const stages = [
      "Fetching Reddit posts...",
      "Analyzing sentiment...",
      "Calculating metrics...",
      "Generating insights...",
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      setLoadingStage(currentStage);

      if (currentStage >= stages.length) {
        clearInterval(interval);
        setTimeout(() => {
          const stockData = mockStockData[ticker.toUpperCase()];
          if (stockData) {
            setStock(stockData);
            setLoading(false);
          } else {
            // Stock not found, redirect to home
            navigate("/");
          }
        }, 500);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [ticker, navigate]);

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 7) return "sentiment-bullish";
    if (sentiment >= 5) return "sentiment-neutral";
    return "sentiment-bearish";
  };

  const SentimentIcon =
    stock?.sentiment >= 7
      ? TrendingUp
      : stock?.sentiment >= 5
      ? Minus
      : TrendingDown;

  if (loading) {
    const stages = [
      "Fetching Reddit posts...",
      "Analyzing sentiment...",
      "Calculating metrics...",
      "Generating insights...",
    ];

    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2 className="loading-title">Analyzing ${ticker}</h2>
          <div className="loading-stages">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className={`loading-stage ${
                  idx < loadingStage
                    ? "stage-complete"
                    : idx === loadingStage
                    ? "stage-active"
                    : "stage-pending"
                }`}
              >
                {stage}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-details-container">
      <div className="stock-details-content">
        {/* Header */}
        <div className="details-header">
          <button onClick={() => navigate("/")} className="back-button">
            <ArrowLeft size={20} />
            Back to Search
          </button>
          <div className="header-info">
            <p className="live-label">Live Analysis</p>
            <p className="update-time">Updated just now</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="details-card">
          {/* Stock Header */}
          <div className="stock-header">
            <div className="stock-info">
              <h1 className="stock-ticker">${stock.ticker}</h1>
              <p className="stock-name">{stock.name}</p>
              <p className="stock-price">${stock.currentPrice}</p>
            </div>
            <div
              className={`sentiment-badge ${getSentimentColor(
                stock.sentiment
              )}`}
            >
              <div className="sentiment-score-wrapper">
                <SentimentIcon size={32} />
                <span className="sentiment-score">{stock.sentiment}</span>
              </div>
              <p className="sentiment-label">Sentiment Score</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Rating</p>
              <p className={`stat-value ${getSentimentColor(stock.sentiment)}`}>
                {stock.rating}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Prediction</p>
              <p
                className={`stat-value ${
                  stock.prediction.startsWith("+")
                    ? "prediction-positive"
                    : "prediction-negative"
                }`}
              >
                {stock.prediction}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Mentions</p>
              <p className="stat-value">{stock.mentions.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Posts</p>
              <p className="stat-value">{stock.posts}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="summary-section">
            <h3 className="section-title">Community Summary</h3>
            <p className="summary-text">{stock.summary}</p>
          </div>

          {/* Sentiment Trend */}
          <div className="trend-section">
            <h3 className="section-title">Sentiment Trend (5 Days)</h3>
            <div className="trend-chart">
              {stock.historicalSentiment.map((value, idx) => (
                <div key={idx} className="trend-bar-wrapper">
                  <div
                    className={`trend-bar ${getSentimentColor(value)}`}
                    style={{ height: `${(value / 10) * 100}%` }}
                  ></div>
                  <p className="trend-value">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Keywords */}
          <div className="keywords-section">
            <h3 className="section-title">Trending Keywords</h3>
            <div className="keywords-list">
              {stock.topKeywords.map((keyword, idx) => (
                <span key={idx} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <strong>Disclaimer:</strong> This tool is NOT financial advice. Data
          represents sentiment from Reddit communities and should only be used
          as insights into niche stock enthusiast opinions.
        </div>
      </div>
    </div>
  );
}

export default StockDetails;
