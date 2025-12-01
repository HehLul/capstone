import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageSquare, BarChart3, Users } from "lucide-react";
import "./Home.css";

function Home() {
  const [ticker, setTicker] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ticker.trim()) {
      navigate(`/stock/${ticker.toUpperCase()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero-section">
          <h1 className="hero-title">Reddit Stock Sentiment</h1>
          <p className="hero-subtitle">
            Analyze what Reddit thinks about your favorite stocks
          </p>
          <p className="hero-description">
            Powered by r/wallstreetbets and community insights
          </p>
        </div>

        <div className="search-section">
          <div className="search-wrapper">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter stock ticker (e.g., TSLA, AAPL, GME)"
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              <Search size={24} />
            </button>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <MessageSquare className="feature-icon" size={24} />
            <p className="feature-text">Real Posts</p>
          </div>
          <div className="feature-card">
            <BarChart3 className="feature-icon" size={24} />
            <p className="feature-text">AI Analysis</p>
          </div>
          <div className="feature-card">
            <Users className="feature-icon" size={24} />
            <p className="feature-text">Community</p>
          </div>
        </div>

        <p className="suggested-tickers">
          Try: TSLA, AAPL, GME, NVDA, AMC, SPY, PLTR, AMD, MSFT, META
        </p>
      </div>
    </div>
  );
}

export default Home;
