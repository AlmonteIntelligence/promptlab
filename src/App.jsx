import { useState } from "react";

const CATEGORIES = [
  { id: "career", label: "Career & Work", icon: "💼", description: "Promotions, pivots, job searches" },
  { id: "money", label: "Money & Finance", icon: "💰", description: "Saving, budgeting, investing" },
  { id: "business", label: "Business & Sales", icon: "📈", description: "Prospects, pitches, growth" },
  { id: "health", label: "Health & Wellness", icon: "🧠", description: "Fitness, habits, mental health" },
  { id: "relationships", label: "Relationships", icon: "❤️", description: "Communication, conflict, family" },
  { id: "travel", label: "Travel & Adventure", icon: "✈️", description: "Trips, budgets, itineraries" },
  { id: "learning", label: "Learning & Growth", icon: "📚", description: "New skills, self-improvement" },
  { id: "creativity", label: "Creativity & Writing", icon: "✍️", description: "Ideas, content, creative blocks" },
  { id: "social", label: "Social Media & Brand", icon: "📱", description: "Growth, content, audience" },
  { id: "life", label: "Life Decisions", icon: "🧭", description: "Big choices, major transitions" },
  { id: "custom", label: "Something Else", icon: "⚡", description: "Describe your own situation — anything goes" },
];

const QUESTIONS = {
  career: [
    { id: "situation", label: "What's your current situation?", placeholder: "e.g. I've been in the same role for 3 years, I'm burned out in finance, I just got passed over for a promotion..." },
    { id: "goal", label: "What outcome do you actually want?", placeholder: "e.g. A VP title, a complete industry change, more money without switching jobs..." },
    { id: "constraints", label: "What's holding you back or complicating this?", placeholder: "e.g. I have no degree, I'm supporting a family, I have a non-compete..." },
    { id: "timeline", label: "What's your timeline?", placeholder: "e.g. I need to make a move in 6 months, no rush, end of year..." },
  ],
  money: [
    { id: "situation", label: "What's your current money situation?", placeholder: "e.g. I make $80K but can't save anything, I have $30K in debt, I want to save for a house..." },
    { id: "goal", label: "What's the specific outcome you need?", placeholder: "e.g. Save $10K in 12 months, pay off credit cards, afford a trip to Japan..." },
    { id: "constraints", label: "What are your biggest obstacles?", placeholder: "e.g. Irregular income, high rent, bad spending habits, supporting others..." },
    { id: "lifestyle", label: "What are you unwilling to give up?", placeholder: "e.g. Going out, my gym membership, travel — be honest..." },
  ],
  business: [
    { id: "situation", label: "Describe your business or role", placeholder: "e.g. I run a 2-person consulting firm, I'm a sales rep at a SaaS company, I'm launching a service..." },
    { id: "goal", label: "What specific result do you need?", placeholder: "e.g. 5 new clients this quarter, improve my close rate, better qualifying leads..." },
    { id: "target", label: "Who exactly are you selling to?", placeholder: "e.g. Construction company owners, interior design studios, mid-market HR teams..." },
    { id: "struggle", label: "Where does your current approach break down?", placeholder: "e.g. I get ghosted after demos, I can't get past gatekeepers, my emails get no replies..." },
  ],
  health: [
    { id: "situation", label: "What's your current health situation?", placeholder: "e.g. I haven't worked out in 2 years, I'm always exhausted, I eat well but can't lose weight..." },
    { id: "goal", label: "What does success look like for you?", placeholder: "e.g. Lose 20 lbs, feel less anxious, build a consistent routine, sleep better..." },
    { id: "constraints", label: "What makes this hard for you specifically?", placeholder: "e.g. No time, no gym access, chronic pain, travel schedule, no motivation..." },
    { id: "tried", label: "What have you already tried?", placeholder: "e.g. Keto, running, therapy, intermittent fasting — and why it didn't stick..." },
  ],
  relationships: [
    { id: "situation", label: "What's the relationship situation?", placeholder: "e.g. My partner and I fight about money, I can't set limits with my family, I want to reconnect with an old friend..." },
    { id: "goal", label: "What do you want to happen?", placeholder: "e.g. A calm, productive conversation, more respect, a resolution, just to be heard..." },
    { id: "dynamic", label: "Describe the other person's style", placeholder: "e.g. They get defensive, they shut down, they're very emotional, they dismiss my concerns..." },
    { id: "tried", label: "What have you already tried?", placeholder: "e.g. Direct conversations that turned into fights, saying nothing, writing a letter..." },
  ],
  travel: [
    { id: "trip", label: "What kind of trip are you planning?", placeholder: "e.g. 10-day Europe solo trip, weekend road trip from NYC, family vacation on $3K..." },
    { id: "goal", label: "What does the perfect version of this trip feel like?", placeholder: "e.g. Off the beaten path, total relaxation, adventure-packed, cultural immersion..." },
    { id: "constraints", label: "What are your real constraints?", placeholder: "e.g. Budget of $2K, traveling with kids, only 7 days PTO, hate flying..." },
    { id: "worry", label: "What's your biggest concern about this trip?", placeholder: "e.g. Overspending, it feeling too touristy, not knowing the language, safety..." },
  ],
  learning: [
    { id: "skill", label: "What do you want to learn?", placeholder: "e.g. Python, how to invest, public speaking, UI design, a new language..." },
    { id: "goal", label: "Why does it matter — what will you do with it?", placeholder: "e.g. Switch careers, freelance, start a business, pass a certification..." },
    { id: "constraints", label: "What are your real limitations?", placeholder: "e.g. 30 min a day max, no budget, easily distracted, complete beginner..." },
    { id: "style", label: "How do you learn best?", placeholder: "e.g. Videos, doing projects, reading, a structured course, a teacher..." },
  ],
  creativity: [
    { id: "project", label: "What are you working on?", placeholder: "e.g. A newsletter, a novel, a brand, a YouTube channel, a business name..." },
    { id: "stuck", label: "Where exactly are you stuck or what do you need?", placeholder: "e.g. Can't find my voice, stuck on the structure, need 10 ideas for next month..." },
    { id: "audience", label: "Who is this for?", placeholder: "e.g. Small business owners, parents, people in their 30s figuring life out..." },
    { id: "vibe", label: "What tone or style are you going for?", placeholder: "e.g. Raw and honest, polished and professional, funny but smart..." },
  ],
  social: [
    { id: "platform", label: "What platform(s)?", placeholder: "e.g. Instagram, LinkedIn, TikTok, all of them..." },
    { id: "goal", label: "What's the actual goal?", placeholder: "e.g. Grow to 10K followers, get clients, build authority, monetize..." },
    { id: "niche", label: "What's your niche or topic?", placeholder: "e.g. Interior design, personal finance, fitness for busy parents, AI tools..." },
    { id: "struggle", label: "What's not working right now?", placeholder: "e.g. No engagement, don't know what to post, can't stay consistent, no growth..." },
  ],
  life: [
    { id: "decision", label: "What's the decision or transition you're facing?", placeholder: "e.g. Should I move cities, leave my marriage, quit my job, go back to school..." },
    { id: "options", label: "What are the options you're weighing?", placeholder: "e.g. Stay vs. leave, this job vs. that job, now vs. wait a year..." },
    { id: "fear", label: "What's the fear underneath this?", placeholder: "e.g. Making the wrong call, disappointing people, financial risk, being alone..." },
    { id: "values", label: "What matters most to you right now?", placeholder: "e.g. Security, freedom, family, growth, proving something to myself..." },
  ],
  custom: [
    { id: "situation", label: "Describe your situation in plain terms", placeholder: "Whatever it is — just write it out like you'd explain it to a smart friend..." },
    { id: "goal", label: "What outcome do you want from the AI?", placeholder: "e.g. A step-by-step plan, a script, a framework, an honest assessment..." },
    { id: "context", label: "What context does the AI need to give you the best answer?", placeholder: "Your background, constraints, what you've tried, what's at stake..." },
    { id: "avoid", label: "What do you NOT want? What would be useless?", placeholder: "e.g. Generic advice, a listicle, a motivational speech — be specific..." },
  ],
};

const SYSTEM_PROMPT = `You are a master prompt engineer. Your job is to take information about a user's real situation and generate a single, expertly-crafted AI prompt they can paste into Claude or ChatGPT to get an exceptionally detailed, personalized, actionable response.

Your output must be ONLY the prompt itself — no preamble, no explanation, no "Here is your prompt:" introduction. Just the raw prompt text.

The prompt you write must:
1. Open with a role-framing instruction (e.g. "Act as a senior financial advisor who specializes in...")
2. Establish full context from the user's inputs so the AI understands the specific situation
3. Define the exact output format and structure requested
4. Include chain-of-thought instruction (e.g. "Before answering, analyze X, consider Y, then...")
5. Add constraints that prevent generic advice (e.g. "Do not give generic tips. Every recommendation must account for [specific constraint].")
6. Close with a follow-up instruction (e.g. "After your response, ask me the one question that would help you refine your advice further.")

The prompt should be 200-350 words. It should read like it was written by someone who deeply understands both the subject matter AND how to get the best out of AI. Make it feel powerful and specific — not a template with brackets, but a fully realized prompt built for this exact person's situation.`;

const styles = {
  wrap: {
    minHeight: "100vh",
    background: "#080812",
    color: "#e8e6e0",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  header: {
    padding: "20px 24px",
    borderBottom: "0.5px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBox: {
    width: "36px", height: "36px",
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    borderRadius: "10px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px",
  },
  brandName: {
    fontWeight: 700, fontSize: "16px", letterSpacing: "-0.3px",
    background: "linear-gradient(135deg, #ffffff, #a78bfa)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  brandSub: { fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "1px" },
  backBtn: {
    background: "transparent", border: "0.5px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.5)", padding: "7px 14px", borderRadius: "8px",
    cursor: "pointer", fontSize: "13px",
  },
  body: { maxWidth: "600px", margin: "0 auto", padding: "32px 20px" },
  headline: {
    textAlign: "center",
    fontSize: "clamp(26px, 6vw, 38px)",
    fontWeight: 800,
    letterSpacing: "-0.8px",
    lineHeight: 1.15,
    background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    marginBottom: "10px",
  },
  tagline: {
    textAlign: "center", fontSize: "14px",
    color: "rgba(255,255,255,0.35)", marginBottom: "32px", lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.09)",
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    textAlign: "left",
    color: "#e8e6e0",
    transition: "all 0.18s",
  },
  cardWide: {
    gridColumn: "span 2",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconBox: {
    width: "36px", height: "36px",
    borderRadius: "9px",
    background: "rgba(124,58,237,0.15)",
    border: "0.5px solid rgba(124,58,237,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  cardTitle: { fontWeight: 600, fontSize: "13px", color: "rgba(255,255,255,0.9)", marginBottom: "3px" },
  cardDesc: { fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 },
  sectionTitle: {
    display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px",
  },
  sectionEmoji: { fontSize: "22px" },
  sectionLabel: { fontSize: "20px", fontWeight: 700, letterSpacing: "-0.4px" },
  sectionHint: { fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "24px" },
  qBlock: { marginBottom: "20px" },
  qLabel: {
    display: "block", fontSize: "13px", fontWeight: 600,
    marginBottom: "8px", color: "rgba(255,255,255,0.7)",
  },
  qNum: {
    display: "inline-flex", width: "20px", height: "20px",
    background: "rgba(124,58,237,0.2)", borderRadius: "50%",
    alignItems: "center", justifyContent: "center",
    fontSize: "10px", marginRight: "8px", color: "#a78bfa", fontWeight: 700,
    flexShrink: 0,
  },
  textarea: {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", padding: "12px", color: "#e8e6e0",
    fontSize: "14px", resize: "vertical", outline: "none",
    lineHeight: 1.6, boxSizing: "border-box", fontFamily: "inherit",
  },
  generateBtn: {
    width: "100%", padding: "16px", border: "none",
    borderRadius: "12px", fontSize: "15px", fontWeight: 700,
    cursor: "pointer", letterSpacing: "-0.2px", transition: "all 0.2s",
    marginTop: "4px",
  },
  errorBox: {
    background: "rgba(220,38,38,0.1)", border: "0.5px solid rgba(220,38,38,0.3)",
    borderRadius: "10px", padding: "12px", marginBottom: "16px",
    color: "#fca5a5", fontSize: "13px",
  },
  readyBadge: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    background: "rgba(16,185,129,0.1)", border: "0.5px solid rgba(16,185,129,0.25)",
    borderRadius: "20px", padding: "5px 14px", marginBottom: "14px",
    color: "#34d399", fontSize: "12px", fontWeight: 600,
  },
  resultTitle: {
    fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "6px",
  },
  resultSub: { fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "24px" },
  promptBox: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "14px", padding: "20px", marginBottom: "16px",
  },
  promptText: {
    fontSize: "14px", lineHeight: 1.85, color: "rgba(255,255,255,0.8)",
    whiteSpace: "pre-wrap", margin: 0,
  },
  copyBtn: {
    flex: 1, padding: "14px", border: "none",
    borderRadius: "12px", color: "#fff",
    fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
  },
  regenBtn: {
    padding: "14px 20px",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", color: "rgba(255,255,255,0.5)",
    fontSize: "14px", cursor: "pointer",
  },
  tipBox: {
    background: "rgba(124,58,237,0.07)",
    border: "0.5px solid rgba(124,58,237,0.15)",
    borderRadius: "12px", padding: "16px",
  },
  tipLabel: {
    fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: "0 0 6px 0",
    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px",
  },
  tipText: { fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 },
  tipAccent: { color: "#a78bfa" },
};

export default function App() {
  const [step, setStep] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [answers, setAnswers] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const questions = selectedCategory ? QUESTIONS[selectedCategory.id] : [];
  const allAnswered = questions.every(q => answers[q.id]?.trim().length > 0);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setGeneratedPrompt("");
    const categoryLabel = selectedCategory.label;
    const answersText = questions.map(q => `${q.label}\n${answers[q.id]}`).join("\n\n");
    const userMessage = `Category: ${categoryLabel}\n\n${answersText}`;
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      if (text) { setGeneratedPrompt(text); setStep("result"); }
      else setError("Something went wrong. Try again.");
    } catch (e) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep("category");
    setSelectedCategory(null);
    setAnswers({});
    setGeneratedPrompt("");
    setError("");
  };

  const cardHover = e => {
    e.currentTarget.style.borderColor = "rgba(167,139,250,0.35)";
    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
  };
  const cardLeave = e => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={styles.logoBox}>⚡</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <div style={styles.brandName}>PromptLab</div>
  <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.15)" }} />
  <div style={styles.brandSub}>AI Prompt Engine</div>
</div>
          </div>
        </div>
        {step !== "category" && (
          <button onClick={handleReset} style={styles.backBtn}>← Start Over</button>
        )}
      </div>

      <div style={styles.body}>

        {step === "category" && (
          <div>
            <h1 style={styles.headline}>What are you trying<br />to figure out?</h1>
            <p style={styles.tagline}>Answer a few questions. Get a prompt that actually gets you somewhere.</p>
            <div style={styles.grid}>
              {CATEGORIES.filter(c => c.id !== "custom").map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat); setStep("questions"); }}
                  style={styles.card}
                  onMouseEnter={cardHover}
                  onMouseLeave={cardLeave}
                >
                  <div style={{ ...styles.iconBox, marginBottom: "10px" }}>{cat.icon}</div>
                  <div style={styles.cardTitle}>{cat.label}</div>
                  <div style={styles.cardDesc}>{cat.description}</div>
                </button>
              ))}
              <button
                onClick={() => { setSelectedCategory(CATEGORIES.find(c => c.id === "custom")); setStep("questions"); }}
                style={{ ...styles.card, ...styles.cardWide }}
                onMouseEnter={cardHover}
                onMouseLeave={cardLeave}
              >
                <div style={styles.iconBox}>⚡</div>
                <div>
                  <div style={styles.cardTitle}>Something Else</div>
                  <div style={styles.cardDesc}>Describe your own situation — anything goes</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === "questions" && selectedCategory && (
          <div>
            <div style={styles.sectionTitle}>
              <span style={styles.sectionEmoji}>{selectedCategory.icon}</span>
              <h2 style={{ ...styles.sectionLabel, margin: 0 }}>{selectedCategory.label}</h2>
            </div>
            <p style={styles.sectionHint}>Be specific — the more honest your answers, the more powerful your prompt.</p>
            {questions.map((q, i) => (
              <div key={q.id} style={styles.qBlock}>
                <label style={styles.qLabel}>
                  <span style={styles.qNum}>{i + 1}</span>
                  {q.label}
                </label>
                <textarea
                  value={answers[q.id] || ""}
                  onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder={q.placeholder}
                  rows={3}
                  style={styles.textarea}
                  onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
            ))}
            {error && <div style={styles.errorBox}>{error}</div>}
            <button
              onClick={handleGenerate}
              disabled={!allAnswered || loading}
              style={{
                ...styles.generateBtn,
                background: allAnswered && !loading
                  ? "linear-gradient(135deg, #7c3aed, #a78bfa)"
                  : "rgba(255,255,255,0.05)",
                color: allAnswered && !loading ? "#fff" : "rgba(255,255,255,0.2)",
                cursor: allAnswered && !loading ? "pointer" : "default",
              }}
            >
              {loading ? "Building your prompt..." : "Generate My Prompt →"}
            </button>
          </div>
        )}

        {step === "result" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={styles.readyBadge}>
                <span>✓</span><span>Prompt ready</span>
              </div>
              <h2 style={styles.resultTitle}>Your expert prompt</h2>
              <p style={styles.resultSub}>Copy and paste this directly into Claude or ChatGPT.</p>
            </div>
            <div style={styles.promptBox}>
              <p style={styles.promptText}>{generatedPrompt}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <button onClick={handleCopy} style={{
                ...styles.copyBtn,
                background: copied
                  ? "linear-gradient(135deg, #065f46, #047857)"
                  : "linear-gradient(135deg, #7c3aed, #a78bfa)",
              }}>
                {copied ? "✓ Copied!" : "Copy Prompt"}
              </button>
              <button onClick={() => { setStep("questions"); setGeneratedPrompt(""); }} style={styles.regenBtn}>
                Regenerate
              </button>
            </div>
            <div style={styles.tipBox}>
              <p style={styles.tipLabel}>Pro tip</p>
              <p style={styles.tipText}>
                After the AI responds, follow up with:{" "}
                <span style={styles.tipAccent}>"What's the one thing I haven't considered that could change everything here?"</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}