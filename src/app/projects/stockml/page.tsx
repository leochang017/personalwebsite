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
    desc: "Gathered daily stock prices for AAPL, TSLA, and MSFT from September 2021 to September 2022 via Yahoo Finance API, alongside 80,793 tweets mentioning each ticker symbol from the Twitter API.",
  },
  {
    step: 2,
    title: "Feature Engineering",
    desc: "Constructed 13 technical indicators (RSI, MACD, Bollinger Bands, EMA, SMA, ATR, OBV, Stochastic Oscillator, Williams %R, CCI, MFI, ROC, ADX) plus 3 sentiment metrics (polarity, subjectivity, tweet volume) for each trading day.",
  },
  {
    step: 3,
    title: "Model Architecture",
    desc: "Designed two LSTM architectures: a baseline model with a single 32-unit layer trained on technical indicators only, and a sentiment-enhanced model with dual 64/32-unit stacked layers plus dropout (10\u201330%), L2 regularizers, and batch normalization trained on combined features.",
  },
  {
    step: 4,
    title: "Validation",
    desc: "Applied 3-fold time series cross-validation respecting temporal ordering. Statistical significance assessed via paired t-tests comparing fold-level RMSE between baseline and sentiment models.",
  },
];

const results = [
  {
    stock: "AAPL",
    degradation: "39.7%",
    pValue: "0.245",
    significant: false,
    baselineRMSE: "Lower",
    detail: "Sentiment features introduced noise that worsened predictions, though the difference was not statistically significant at the 0.05 level.",
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
    pValue: "0.021",
    significant: true,
    baselineRMSE: "Lower",
    detail: "Statistically significant degradation (p < 0.05), confirming that sentiment features actively harmed prediction accuracy for Microsoft.",
  },
];

const techStackItems = [
  {
    category: "Machine Learning",
    items: ["TensorFlow/Keras", "PyTorch", "Scikit-learn", "LSTM Networks"],
  },
  {
    category: "Data & Visualization",
    items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    category: "Sentiment & Stats",
    items: ["TextBlob", "SciPy", "Twitter API"],
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
                Published
              </span>
            </div>
            <p className="text-muted text-lg md:text-xl font-body mb-2">
              Published Research &mdash; Journal of Emerging Investigators
            </p>
            <a
              href="https://emerginginvestigators.org/articles/evaluating-the-impact-of-twitter-sentiment-analysis-on-lstm-based-stock-price-prediction"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent font-semibold no-underline hover:underline mt-2"
            >
              Read the Published Paper &rarr;
            </a>
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

        {/* Personal Reflection */}
        <SlideIn direction="left" delay={0.1}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 mb-14">
            <h2 className="font-sans text-xl font-bold mb-4">Personal Reflection</h2>
            <div className="font-body text-secondary leading-relaxed space-y-4">
              <p>
                About halfway through the project I noticed that the results appeared to be
                overly clean. As such, I went back and reviewed my data pipeline for potential
                bias, I reviewed whether my training/test split was accurate, and I reviewed
                whether my findings would hold under scrutiny. I also had to continually ask
                myself questions about my own work.
              </p>
              <p>
                The paper went through peer review. Peer review is the process of having other
                researchers examine your research methods and defend them against criticism from
                others. The reviewers challenged some of my assumptions and I was forced to
                articulate not only what I had found, but also why my methodology was valid and
                where it was limited.
              </p>
              <p>
                The experience of completing this project helped me understand that real research
                requires much more time than I previously assumed. In addition, the critiques
                that I received from others have greatly influenced how I now deal with future
                projects. This lesson has carried over into all of my projects, including
                NapkinNotes, a mobile app that enables me to share class notes with my
                classmates, and when I design curricula for the students I teach at the
                Ti-Ratana Welfare Society in Malaysia.
              </p>
            </div>
          </div>
        </SlideIn>

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
