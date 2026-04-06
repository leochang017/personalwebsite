import { FadeUp, SlideIn, ScaleIn } from "@/components/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/CountUp";
import Image from "next/image";
import Link from "next/link";

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
    desc: "Designed two LSTM architectures: a baseline model with a single 50-unit layer using dropout (0.2), and a sentiment-enhanced model with three stacked LSTM layers (128/64/32 units) plus batch normalization, L2 regularization, and dropout (0.2\u20130.3). Both used the Adam optimizer with early stopping.",
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

export default function StockMLPage() {
  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        <FadeUp>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors font-body mb-10 no-underline"
          >
            <span>&larr;</span> Back to Projects
          </Link>
        </FadeUp>

        {/* Hero Section */}
        <FadeUp delay={0.05}>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-3 flex-wrap">
              <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight">
                Stock Price Prediction ML
              </h1>
              <span className="font-mono text-[11px] font-bold uppercase text-olive bg-olive/10 px-3 py-1 rounded-full">
                Accepted for Publishing
              </span>
            </div>
            <p className="text-muted text-lg md:text-xl font-body mb-2">
              Accepted for Publishing &mdash; Journal of Emerging Investigators
            </p>
            <p className="text-muted text-sm font-body">June 2024 – Present</p>
          </div>
        </FadeUp>

        {/* Overview */}
        <SlideIn direction="left" delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-8">
            <h2 className="font-sans text-xl font-bold mb-4">Overview</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                This research investigates whether incorporating Twitter sentiment analysis
                improves LSTM-based stock price prediction. The study tested three major
                stocks &mdash; Apple (AAPL), Tesla (TSLA), and Microsoft (MSFT) &mdash;
                comparing baseline technical-indicator models against sentiment-enhanced
                variants over a one-year period.
              </p>
              <p>
                Contrary to popular assumptions in financial machine learning literature, the
                research found that sentiment features consistently degraded prediction
                accuracy across all three stocks, providing empirical evidence against the
                naive integration of social media sentiment into price prediction models.
              </p>
              <p>
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
          </div>
        </SlideIn>

        {/* Key Finding */}
        <ScaleIn delay={0.15}>
          <div className="bg-accent/8 border border-accent/20 rounded-2xl p-8 md:p-10 mb-14 text-center">
            <p className="text-[10px] font-bold uppercase text-accent tracking-widest mb-3">
              Key Finding
            </p>
            <p className="font-sans text-xl md:text-2xl font-black text-foreground leading-snug">
              Sentiment-enhanced models underperformed baseline by ~32% average RMSE
            </p>
            <p className="text-sm text-muted font-body mt-3">
              Across all three stocks tested (80,793 tweets analyzed, Sep 2021 &ndash; Sep 2022), adding Twitter sentiment features to LSTM models
              consistently worsened prediction accuracy compared to technical-indicator-only baselines.
            </p>
          </div>
        </ScaleIn>

        {/* Authors */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Authors</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {authors.map((a, i) => (
            <FadeUp key={a.name} delay={i * 0.08}>
              <div className="bg-surface border border-border rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300">
                <h3 className="font-sans font-bold text-sm mb-1">{a.name}</h3>
                <p className="text-xs text-accent font-semibold mb-1">{a.role}</p>
                <p className="text-[11px] text-muted font-body">{a.affiliation}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Methodology */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Methodology</h2>
        </FadeUp>
        <StaggerList className="space-y-4 mb-14">
          {methodology.map((m) => (
            <StaggerItem key={m.step}>
              <div className="bg-surface border border-border rounded-xl p-6 flex items-start gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-accent">{m.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-bold text-sm mb-1">{m.title}</h3>
                  <p className="text-xs text-muted leading-relaxed font-body">{m.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Results */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Results by Stock</h2>
        </FadeUp>
        <div className="space-y-4 mb-14">
          {results.map((r, i) => (
            <SlideIn key={r.stock} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <div className="bg-surface border border-border rounded-xl p-6 md:p-8 hover:border-accent/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <h3 className="font-sans font-bold text-lg">{r.stock}</h3>
                  <div className="flex gap-3 flex-wrap">
                    <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {r.degradation} degradation
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${
                        r.significant
                          ? "text-accent bg-accent/15 border border-accent/30"
                          : "text-muted bg-surface-light"
                      }`}
                    >
                      p = {r.pValue}
                      {r.significant ? " (significant)" : ""}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-secondary leading-relaxed font-body">{r.detail}</p>
              </div>
            </SlideIn>
          ))}
        </div>

        {/* Research Figures */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-bold mb-6">Research Figures</h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {[
            { src: "/images/stock-prediction/Figure1_Model_Performance_Comparison.png", caption: "Model Performance Comparison" },
            { src: "/images/stock-prediction/Figure2_AAPL_Price_Predictions.png", caption: "AAPL Price Predictions" },
            { src: "/images/stock-prediction/Figure3_TSLA_Price_Predictions.png", caption: "TSLA Price Predictions" },
            { src: "/images/stock-prediction/Figure4_MSFT_Price_Predictions.png", caption: "MSFT Price Predictions" },
            { src: "/images/stock-prediction/Figure5_Statistical_Significance_Analysis.png", caption: "Statistical Significance Analysis" },
            { src: "/images/stock-prediction/Figure6_Permutation_Feature_Importance.png", caption: "Permutation Feature Importance" },
            { src: "/images/stock-prediction/Figure7_Directional_Accuracy_Comparison.png", caption: "Directional Accuracy Comparison" },
          ].map((fig, i) => (
            <FadeUp key={fig.src} delay={i * 0.05}>
              <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <Image src={fig.src} alt={fig.caption} width={600} height={400} className="w-full h-auto" />
                <p className="text-xs text-muted text-center py-3 font-body">{fig.caption}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Technical Stack */}
        <FadeUp>
          <h2 className="font-sans text-2xl font-black mb-6">Technical Stack</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {techStackItems.map((s, i) => (
            <ScaleIn key={s.category} delay={i * 0.06}>
              <div className="bg-surface border border-border rounded-xl p-6 h-full">
                <h3 className="font-sans font-bold text-xs text-accent uppercase tracking-wider mb-3">
                  {s.category}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface-light text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* Back to Projects */}
        <FadeUp>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex px-8 py-3 rounded-full bg-surface border border-border text-secondary font-semibold text-sm no-underline hover:border-accent/40 hover:text-accent transition-all"
            >
              &larr; All Projects
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}
