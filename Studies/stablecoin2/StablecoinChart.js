class StablecoinPredictionChart {
  constructor(canvasId) {
    this.ctx = document.getElementById(canvasId).getContext('2d');
    this.data = null;
    this.scenarioMap = ['bear', 'base', 'bull'];
    this.tickers = ['JPM', 'GS', 'XLF', 'CRCL'];
    this.settings = {};
    this.initSettings();
    this.loadData().then(() => {
      this.attachControls();
      this.createChart();
    });
  }

  initSettings() {
    this.tickers.forEach(t => {
      this.settings[t] = { enabled: true, scenario: 'base' };
    });
  }

  async loadData() {
    const resp = await fetch('stablecoin_predictions.json');
    this.data = await resp.json();
  }

  attachControls() {
    document.querySelectorAll('.ticker-control').forEach(div => {
      const t = div.dataset.ticker;
      const cb = div.querySelector('.toggle-checkbox');
      cb.addEventListener('change', () => {
        this.settings[t].enabled = cb.checked;
        this.updateChart();
      });
      const slider = div.querySelector('.scenario-slider');
      const label = div.querySelector('.scenario-label');
      slider.addEventListener('input', () => {
        const scen = this.scenarioMap[slider.value];
        this.settings[t].scenario = scen;
        label.textContent = scen.toUpperCase();
        this.updateChart();
      });
    });
  }

  transformDatasets() {
    const years = [2025, 2026, 2027, 2028, 2029, 2030];
    return this.tickers
      .filter(t => this.settings[t].enabled)
      .map(ticker => {
        const scenario = this.settings[ticker].scenario;
        const current = ticker === 'XLF'
          ? 100
          : this.data.stocks[ticker]?.current_price ?? 0;
        const data = years.map(year => {
          let val;
          if (ticker === 'XLF') {
            const rate = this.data.etfs.XLF.growth_predictions[year][scenario];
            val = year === 2025
              ? 100
              : 100 * Math.pow(1 + rate / 100, year - 2025);
          } else if (ticker === 'CRCL') {
            val = this.data.stocks.CRCL.predictions[year][scenario];
          } else {
            val = this.data.stocks[ticker].predictions[year][scenario];
          }
          return +(((val - current) / current) * 100).toFixed(1);
        });
        const colorMap = {
          JPM: { bull: '#10b981', base: '#3b82f6', bear: '#f59e0b' },
          GS: { bull: '#22c55e', base: '#6366f1', bear: '#ef4444' },
          XLF: { bull: '#8b5cf6', base: '#06b6d4', bear: '#f97316' },
          CRCL: { bull: '#00bcd4', base: '#0288d1', bear: '#01579b' }
        };
        return {
          label: `${ticker} ${scenario.toUpperCase()}`,
          data,
          fill: false,
          borderColor: colorMap[ticker][scenario],
          backgroundColor: colorMap[ticker][scenario],
          tension: 0.3
        };
      });
  }

  createChart() {
    const years = [2025, 2026, 2027, 2028, 2029, 2030];
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: { labels: years, datasets: this.transformDatasets() },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Year' } },
          y: {
            title: { display: true, text: '% Gain from Current' },
            ticks: { callback: v => `${v}%` }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`
            }
          }
        }
      }
    });
  }

  updateChart() {
    this.chart.data.datasets = this.transformDatasets();
    this.chart.update();
  }
}

if (typeof module !== 'undefined') module.exports = StablecoinPredictionChart;
