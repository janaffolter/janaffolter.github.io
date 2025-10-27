import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StablecoinPredictionChart = () => {
  const [data, setData] = useState(null);
  const [enabledTickers, setEnabledTickers] = useState({
    'JPM-bull': true,
    'JPM-base': true,
    'JPM-bear': false,
    'GS-bull': true,
    'GS-base': true,
    'GS-bear': false,
    'XLF-bull': false,
    'XLF-base': true,
    'XLF-bear': false
  });

  useEffect(() => {
    // Load JSON data (replace with your actual data loading logic)
    fetch('/stablecoin_predictions.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error loading data:', error));
  }, []);

  if (!data) {
    return <div className="loading">Loading prediction data...</div>;
  }

  // Transform data for chart
  const transformDataForChart = () => {
    const years = ['2025', '2026', '2027', '2028', '2029', '2030'];
    
    return years.map(year => {
      const chartPoint = { year: parseInt(year) };
      
      // Add stock data
      Object.entries(data.stocks).forEach(([ticker, stockData]) => {
        ['bull', 'base', 'bear'].forEach(scenario => {
          const key = `${ticker}-${scenario}`;
          if (enabledTickers[key]) {
            chartPoint[key] = stockData.predictions[year][scenario];
          }
        });
      });
      
      // Add ETF data (convert percentage to index starting at 100)
      Object.entries(data.etfs).forEach(([ticker, etfData]) => {
        ['bull', 'base', 'bear'].forEach(scenario => {
          const key = `${ticker}-${scenario}`;
          if (enabledTickers[key]) {
            const growthRate = etfData.growth_predictions[year][scenario];
            // Convert percentage growth to index value (starting at 100 in 2025)
            const baseValue = year === '2025' ? 100 : 100;
            chartPoint[key] = year === '2025' ? 100 : 
              100 * Math.pow(1 + (growthRate / 100), parseInt(year) - 2025);
          }
        });
      });
      
      return chartPoint;
    });
  };

  const toggleTicker = (tickerScenario) => {
    setEnabledTickers(prev => ({
      ...prev,
      [tickerScenario]: !prev[tickerScenario]
    }));
  };

  const chartData = transformDataForChart();

  const getLineColor = (tickerScenario) => {
    const [ticker, scenario] = tickerScenario.split('-');
    const baseColors = {
      'JPM': { bull: '#10b981', base: '#3b82f6', bear: '#f59e0b' },
      'GS': { bull: '#22c55e', base: '#6366f1', bear: '#ef4444' },
      'XLF': { bull: '#8b5cf6', base: '#06b6d4', bear: '#f97316' }
    };
    return baseColors[ticker]?.[scenario] || '#6b7280';
  };

  const formatTooltipValue = (value, name) => {
    const [ticker] = name.split('-');
    if (ticker === 'XLF') {
      return [`${value.toFixed(1)}`, name];
    }
    return [`$${value.toFixed(0)}`, name];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p className="tooltip-label">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.dataKey.includes('XLF') ? 
                `Index ${entry.value.toFixed(1)}` : 
                `$${entry.value.toFixed(0)}`}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="prediction-chart-container">
      <h2>Stablecoin Investment Predictions 2025-2030</h2>
      
      {/* Control Panel */}
      <div className="control-panel">
        <div className="ticker-controls">
          <h3>JPMorgan (JPM) - Stock Price</h3>
          <div className="button-group">
            {['bull', 'base', 'bear'].map(scenario => (
              <button
                key={`JPM-${scenario}`}
                className={`toggle-btn ${enabledTickers[`JPM-${scenario}`] ? 'active' : ''}`}
                onClick={() => toggleTicker(`JPM-${scenario}`)}
                style={{ 
                  backgroundColor: enabledTickers[`JPM-${scenario}`] ? getLineColor(`JPM-${scenario}`) : '#e5e7eb',
                  color: enabledTickers[`JPM-${scenario}`] ? 'white' : '#6b7280'
                }}
              >
                JPM {scenario.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="ticker-controls">
          <h3>Goldman Sachs (GS) - Stock Price</h3>
          <div className="button-group">
            {['bull', 'base', 'bear'].map(scenario => (
              <button
                key={`GS-${scenario}`}
                className={`toggle-btn ${enabledTickers[`GS-${scenario}`] ? 'active' : ''}`}
                onClick={() => toggleTicker(`GS-${scenario}`)}
                style={{ 
                  backgroundColor: enabledTickers[`GS-${scenario}`] ? getLineColor(`GS-${scenario}`) : '#e5e7eb',
                  color: enabledTickers[`GS-${scenario}`] ? 'white' : '#6b7280'
                }}
              >
                GS {scenario.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="ticker-controls">
          <h3>Financial ETF (XLF) - Index Value</h3>
          <div className="button-group">
            {['bull', 'base', 'bear'].map(scenario => (
              <button
                key={`XLF-${scenario}`}
                className={`toggle-btn ${enabledTickers[`XLF-${scenario}`] ? 'active' : ''}`}
                onClick={() => toggleTicker(`XLF-${scenario}`)}
                style={{ 
                  backgroundColor: enabledTickers[`XLF-${scenario}`] ? getLineColor(`XLF-${scenario}`) : '#e5e7eb',
                  color: enabledTickers[`XLF-${scenario}`] ? 'white' : '#6b7280'
                }}
              >
                XLF {scenario.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={600}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              domain={['dataMin', 'dataMax']}
              type="number"
              scale="linear"
            />
            <YAxis 
              label={{ value: 'Price ($) / Index Value', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Render lines for enabled tickers */}
            {Object.entries(enabledTickers).map(([tickerScenario, enabled]) => {
              if (!enabled) return null;
              
              const [ticker, scenario] = tickerScenario.split('-');
              return (
                <Line
                  key={tickerScenario}
                  type="monotone"
                  dataKey={tickerScenario}
                  stroke={getLineColor(tickerScenario)}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={`${ticker} ${scenario.toUpperCase()}`}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Info Panel */}
      <div className="info-panel">
        <h3>Investment Insights</h3>
        <div className="insights">
          <div className="insight-card">
            <h4>JPMorgan (JPM)</h4>
            <p>Conservative growth with strong stablecoin infrastructure development. Base case shows recovery to +46% by 2030.</p>
          </div>
          <div className="insight-card">
            <h4>Goldman Sachs (GS)</h4>
            <p>Aggressive growth potential driven by stablecoin market leadership. Base case projects +198% growth by 2030.</p>
          </div>
          <div className="insight-card">
            <h4>Financial ETF (XLF)</h4>
            <p>Diversified exposure to banking sector with steady 7-10% annual growth expected through stablecoin adoption.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StablecoinPredictionChart;