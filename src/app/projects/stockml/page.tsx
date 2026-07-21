import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PopIn } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Stock Price Prediction ML — Leo Chang",
  description: "LSTM stock prediction research testing Twitter sentiment signal. Accepted in the Journal of Emerging Investigators (JEI).",
};

const authors = [
  { name: "Leo Chang", role: "Lead Researcher & Developer", affiliation: "Princeton Day School" },
  { name: "Aditya Saraf", role: "Co-Researcher", affiliation: "Cornell University" },
  { name: "Jenjen Chen", role: "Co-Researcher", affiliation: "Yardley, PA" },
];

const methodology = [
  {
    step: 1,
    title: "Data Collection",
    desc: "Gathered daily stock prices for AAPL, TSLA, and MSFT from September 2021 to September 2022 via Yahoo Finance, alongside 80,793 labeled tweets mentioning each ticker symbol from a publicly available Kaggle dataset.",
  },
  {
    step: 2,
    title: "Feature Engineering",
    desc: "Constructed 13 technical features (log returns, intraday high-low range, close-to-open change, 5/10/20-day SMAs, price-to-SMA ratios, 14-day RSI, volume moving average, volume ratio, rolling volatility) plus 3 sentiment metrics (mean polarity, polarity standard deviation, tweet count) for each trading day.",
  },
  {
    step: 3,
    title: "Model Architecture",
    desc: "Designed two LSTM architectures: a baseline model with a single 50-unit layer using dropout (0.2), and a sentiment-enhanced model with three stacked LSTM layers (128/64/32 units) plus batch normalization, L2 regularization, and dropout (0.2–0.3). Both used the Adam optimizer with early stopping.",
  },
  {
    step: 4,
    title: "Validation",
    desc: "Applied five-fold time series cross-validation respecting temporal ordering. Statistical significance assessed via paired t-tests comparing fold-level RMSE between baseline and sentiment models.",
  },
];

const results = [
  {
    stock: "AAPL",
    degradation: "39.7%",
    pValue: "0.316",
    significant: false,
    baselineRMSE: "Lower",
    detail: "Sentiment features introduced noise that worsened predictions, though the difference was not statistically significant (t = 1.16, p = 0.316).",
  },
  {
    stock: "TSLA",
    degradation: "32.5%",
    pValue: "0.003",
    significant: true,
    baselineRMSE: "Lower",
    detail: "Tesla showed statistically significant degradation (p < 0.01) when sentiment features were added, despite its reputation as a sentiment-driven stock.",
  },
  {
    stock: "MSFT",
    degradation: "24.3%",
    pValue: "0.300",
    significant: false,
    baselineRMSE: "Lower",
    detail: "Sentiment features worsened predictions with a sizable effect, though the difference was not statistically significant (t = 1.33, p = 0.300).",
  },
];

const techStackItems = [
  {
    category: "Machine Learning",
    items: ["TensorFlow/Keras", "Scikit-learn", "LSTM Networks"],
  },
  {
    category: "Data & Visualization",
    items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    category: "Sentiment & Stats",
    items: ["TextBlob", "SciPy", "NLTK"],
  },
  {
    category: "Financial Data",
    items: ["Yahoo Finance API", "13 Technical Indicators"],
  },
];

const figures = [
  { src: "/images/stock-prediction/Figure1_Model_Performance_Comparison.png", caption: "Model Performance Comparison" },
  { src: "/images/stock-prediction/Figure2_AAPL_Price_Predictions.png", caption: "AAPL Price Predictions" },
  { src: "/images/stock-prediction/Figure3_TSLA_Price_Predictions.png", caption: "TSLA Price Predictions" },
  { src: "/images/stock-prediction/Figure4_MSFT_Price_Predictions.png", caption: "MSFT Price Predictions" },
  { src: "/images/stock-prediction/Figure5_Statistical_Significance_Analysis_v2.png", caption: "Statistical Significance Analysis" },
  { src: "/images/stock-prediction/Figure6_Permutation_Feature_Importance.png", caption: "Permutation Feature Importance" },
  { src: "/images/stock-prediction/Figure7_Directional_Accuracy_Comparison_v2.png", caption: "Directional Accuracy Comparison" },
];

const metrics = [
  { number: "80,793", label: "LABELED TWEETS ANALYZED" },
  { number: "+32%", label: "AVG RMSE, SENTIMENT MODELS" },
  { number: "3", label: "STOCKS · 5-FOLD TIME-SERIES CV" },
];

export default function StockMLPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-20">
      {/* Back link */}
      <PopIn>
        <Link
          href="/projects"
          className="font-mono text-xs font-semibold tracking-[0.08em] no-underline text-foreground hover:underline inline-block mb-7"
        >
          &larr; ALL PROJECTS
        </Link>
      </PopIn>

      {/* Hero */}
      <PopIn delay={0.06}>
        <div className="flex gap-2 flex-wrap mb-5">
          <span className="font-sans font-bold text-[10.5px] tracking-[0.08em] uppercase border-2 border-foreground bg-ink-yellow px-[11px] py-1 rounded-full">
            ACCEPTED FOR PUBLICATION
          </span>
          <span className="font-mono text-[10.5px] font-semibold border-2 border-foreground px-[11px] py-1 rounded-full">
            LEAD RESEARCHER
          </span>
        </div>
        <h1 className="font-sans font-extrabold text-5xl md:text-[76px] leading-[0.95] tracking-[-0.04em] m-0 mb-5">
          Stock Price Prediction ML
        </h1>
        <p className="font-sans font-medium text-[21px] leading-[1.45] max-w-[760px] m-0 mb-4">
          Does Twitter sentiment actually help LSTM stock prediction? A three-stock,
          80,793-tweet study says no &mdash; sentiment features consistently made
          predictions worse.
        </p>
        <div className="font-mono text-xs font-medium tracking-[0.06em] text-muted uppercase mb-8">
          Accepted for Publishing &mdash; Journal of Emerging Investigators &middot; June 2024 &ndash; Present
        </div>
      </PopIn>

      {/* Metrics */}
      <PopIn delay={0.12}>
        <div className="grid sm:grid-cols-3 gap-[18px] mb-14">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] px-5 py-[18px]"
            >
              <div className="font-sans font-extrabold text-[38px] tracking-[-0.03em]">{m.number}</div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted">{m.label}</div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Overview */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Overview
        </h2>
        <div className="font-sans text-[16px] leading-[1.65] text-secondary max-w-[760px] space-y-4 mb-14">
          <p className="m-0">
            This research investigates whether incorporating Twitter sentiment analysis
            improves LSTM-based stock price prediction. The study tested three major
            stocks &mdash; Apple (AAPL), Tesla (TSLA), and Microsoft (MSFT) &mdash;
            comparing baseline technical-indicator models against sentiment-enhanced
            variants over a one-year period.
          </p>
          <p className="m-0">
            Contrary to popular assumptions in financial machine learning literature, the
            research found that sentiment features consistently degraded prediction
            accuracy across all three stocks, providing empirical evidence against the
            naive integration of social media sentiment into price prediction models.
          </p>
          <p className="m-0">
            The hypothesis was tested by comparing a one-layer baseline LSTM trained on
            technical indicators against a three-layer sentiment-augmented LSTM that
            added daily Twitter sentiment metrics (mean polarity, polarity dispersion,
            and tweet count). Both models used early
            stopping and dropout, and were validated through five-fold time series
            cross-validation preserving chronological ordering. Across all equities,
            the increase in RMSE was 32.1%, with only Tesla showing statistically
            significant degradation (t&nbsp;=&nbsp;6.50, p&nbsp;=&nbsp;0.003). The
            sentiment models showed signs of overfitting &mdash; smaller training
            losses but greater validation losses &mdash; and permutation importance
            analysis indicated that sentiment features contributed less than 5% to
            total predictive importance. These findings suggest that publicly available
            tweet-level sentiment data may contain insufficient information to improve
            predictions for highly traded, large-capitalization technology companies,
            and may instead reduce model performance due to excessive noise.
          </p>
        </div>
      </PopIn>

      {/* Key Finding */}
      <PopIn delay={0.06}>
        <div className="border-[3px] border-foreground bg-ink-yellow shadow-[4px_4px_0_var(--color-ink-shadow)] p-7 md:p-9 mb-14 max-w-[860px]">
          <div className="font-mono text-[13px] font-semibold tracking-[0.14em] uppercase mb-3">
            Key Finding
          </div>
          <p className="font-sans font-extrabold text-xl md:text-2xl leading-snug tracking-[-0.02em] m-0">
            Sentiment-enhanced models underperformed baseline by ~32% average RMSE
          </p>
          <p className="font-sans text-[15px] leading-[1.55] mt-3 m-0">
            Across all three stocks tested (80,793 tweets analyzed, Sep 2021 &ndash; Sep 2022),
            adding Twitter sentiment features to LSTM models consistently worsened prediction
            accuracy compared to technical-indicator-only baselines.
          </p>
        </div>
      </PopIn>

      {/* Authors */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Authors
        </h2>
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {authors.map((a) => (
            <div key={a.name} className="ink-card p-6">
              <h3 className="font-sans font-extrabold text-base tracking-[-0.02em] m-0 mb-1">{a.name}</h3>
              <p className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase m-0 mb-1">{a.role}</p>
              <p className="font-mono text-[11px] font-medium text-muted m-0">{a.affiliation}</p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Methodology */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Methodology
        </h2>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {methodology.map((m) => (
            <div key={m.step} className="ink-card p-6 flex items-start gap-4">
              <span className="flex-none w-9 h-9 border-2 border-foreground bg-ink-yellow flex items-center justify-center font-mono text-sm font-bold">
                {m.step}
              </span>
              <div>
                <h3 className="font-sans font-extrabold text-base tracking-[-0.02em] m-0 mb-1.5">{m.title}</h3>
                <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Results by stock */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Results by Stock
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {results.map((r) => (
            <div key={r.stock} className="ink-card p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-sans font-extrabold text-xl tracking-[-0.02em] m-0">{r.stock}</h3>
                <span className="font-mono text-[10.5px] font-semibold text-muted">
                  BASELINE RMSE: {r.baselineRMSE.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-tint-red px-3.5 py-1.5 rounded-full">
                  {r.degradation} degradation
                </span>
                <span
                  className={`font-mono text-[11px] font-semibold px-3.5 py-1.5 rounded-full ${
                    r.significant
                      ? "border-2 border-foreground bg-ink-yellow"
                      : "border-2 border-dashed border-muted text-muted"
                  }`}
                >
                  p = {r.pValue}
                  {r.significant ? " (significant)" : ""}
                </span>
              </div>
              <p className="font-sans text-[14px] leading-[1.55] text-secondary m-0">{r.detail}</p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Research figures */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Research Figures
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {figures.map((fig, i) => (
            <div
              key={fig.src}
              className="border-[3px] border-foreground bg-white shadow-[4px_4px_0_var(--color-ink-shadow)] p-3"
            >
              <Image src={fig.src} alt={fig.caption} width={600} height={400} className="w-full h-auto" />
              <p className="font-mono text-[11px] font-medium text-muted pt-2.5 m-0">
                FIG. {String(i + 1).padStart(2, "0")} &mdash; {fig.caption}
              </p>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Technical stack */}
      <PopIn>
        <h2 className="font-mono text-[13px] font-semibold tracking-[0.14em] text-muted uppercase mb-5">
          Technical Stack
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {techStackItems.map((s) => (
            <div key={s.category} className="ink-card p-6 h-full">
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.1em] text-muted uppercase m-0 mb-3.5">
                {s.category}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="font-sans font-bold text-xs tracking-[0.04em] border-2 border-foreground bg-white px-3.5 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopIn>

      {/* Back to projects */}
      <PopIn>
        <Link href="/projects" className="ink-btn ink-btn--dark no-underline">
          &larr; ALL PROJECTS
        </Link>
      </PopIn>
    </main>
  );
}
