import { useState } from "react";

const CATEGORIES = [
  { id: "career", label: "Career & Work", icon: "💼", description: "Promotions, pivots, job searches, workplace dynamics" },
  { id: "money", label: "Money & Finance", icon: "💰", description: "Saving, budgeting, debt, investing, side income" },
  { id: "business", label: "Business & Sales", icon: "📈", description: "Prospects, pitches, pricing, growth, outreach" },
  { id: "health", label: "Health & Wellness", icon: "🧠", description: "Fitness, mental health, habits, sleep, stress" },
  { id: "relationships", label: "Relationships", icon: "❤️", description: "Communication, conflict, dating, family, boundaries" },
  { id: "travel", label: "Travel & Adventure", icon: "✈️", description: "Trips, budgets, itineraries, solo or group travel" },
  { id: "learning", label: "Learning & Growth", icon: "📚", description: "New skills, studying, courses, self-improvement" },
  { id: "creativity", label: "Creativity & Writing", icon: "✍️", description: "Writing, content, ideas, creative blocks" },
  { id: "social", label: "Social Media & Brand", icon: "📱", description: "Content strategy, growth, posting, audience building" },
  { id: "life", label: "Life Decisions", icon: "🧭", description: "Big choices, direction, purpose, major transitions" },
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
      if (text) {
        setGeneratedPrompt(text);
        setStep("result");
      } else {
        setError("Something went wrong. Try again.");
      }
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

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e6e0",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{
        borderBottom: "1px solid #1e1e2e",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0d0d15",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>⚡</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.3px" }}>PromptLab</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>AI Prompt Generator</div>
          </div>
        </div>
        {step !== "category" && (
          <button onClick={handleReset} style={{
            background: "transparent", border: "1px solid #2a2a3e",
            color: "#9ca3af", padding: "6px 14px", borderRadius: "6px",
            cursor: "pointer", fontSize: "13px",
          }}>← Start Over</button>
        )}
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 20px" }}>

        {step === "category" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h1 style={{
                fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800,
                letterSpacing: "-0.8px", lineHeight: 1.15,
                background: "linear-gradient(135deg, #e8e6e0 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "12px",
              }}>
                What are you trying to figure out?
              </h1>
              <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: 1.6 }}>
                Answer a few questions. Get a prompt that actually gets you somewhere.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => { setSelectedCategory(cat); setStep("questions"); }}
                  style={{
                    background: "#111120", border: "1px solid #1e1e2e",
                    borderRadius: "10px", padding: "16px", textAlign: "left",
                    cursor: "pointer", transition: "all 0.15s", color: "#e8e6e0",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#6c63ff"; e.currentTarget.style.background = "#13131f"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.background = "#111120"; }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "6px" }}>{cat.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{cat.label}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.4 }}>{cat.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "questions" && selectedCategory && (
          <div>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontSize: "24px" }}>{selectedCategory.icon}</span>
                <h2 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.4px" }}>
                  {selectedCategory.label}
                </h2>
              </div>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>
                Be specific — the more honest your answers, the more powerful your prompt.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "28px" }}>
              {questions.map((q, i) => (
                <div key={q.id}>
                  <label style={{
                    display: "block", fontSize: "14px", fontWeight: 600,
                    marginBottom: "8px", color: "#c4c2be",
                  }}>
                    <span style={{
                      display: "inline-block", width: "22px", height: "22px",
                      background: "#1e1e2e", borderRadius: "50%",
                      textAlign: "center", lineHeight: "22px",
                      fontSize: "11px", marginRight: "8px", color: "#a78bfa",
                    }}>{i + 1}</span>
                    {q.label}
                  </label>
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder={q.placeholder}
                    rows={3}
                    style={{
                      width: "100%", background: "#111120", border: "1px solid #1e1e2e",
                      borderRadius: "8px", padding: "12px", color: "#e8e6e0",
                      fontSize: "14px", resize: "vertical", outline: "none",
                      lineHeight: 1.6, boxSizing: "border-box",
                      fontFamily: "inherit", transition: "border-color 0.15s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#6c63ff"}
                    onBlur={e => e.target.style.borderColor = "#1e1e2e"}
                  />
                </div>
              ))}
            </div>
            {error && (
              <div style={{
                background: "#1f1015", border: "1px solid #7f1d1d",
                borderRadius: "8px", padding: "12px", marginBottom: "16px",
                color: "#fca5a5", fontSize: "13px",
              }}>{error}</div>
            )}
            <button
              onClick={handleGenerate}
              disabled={!allAnswered || loading}
              style={{
                width: "100%", padding: "16px",
                background: allAnswered && !loading
                  ? "linear-gradient(135deg, #6c63ff, #a78bfa)"
                  : "#1e1e2e",
                border: "none", borderRadius: "10px",
                color: allAnswered && !loading ? "#fff" : "#4b5563",
                fontSize: "15px", fontWeight: 700,
                cursor: allAnswered && !loading ? "pointer" : "default",
                letterSpacing: "-0.2px", transition: "all 0.2s",
              }}
            >
              {loading ? "Building your prompt..." : "Generate My Prompt →"}
            </button>
          </div>
        )}

        {step === "result" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#13201a", border: "1px solid #166534",
                borderRadius: "20px", padding: "6px 14px", marginBottom: "16px",
              }}>
                <span style={{ color: "#4ade80", fontSize: "12px" }}>✓</span>
                <span style={{ color: "#4ade80", fontSize: "12px", fontWeight: 600 }}>Prompt ready</span>
              </div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "8px" }}>
                Your expert prompt
              </h2>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>
                Copy and paste this directly into Claude or ChatGPT.
              </p>
            </div>
            <div style={{
              background: "#111120", border: "1px solid #2a2a3e",
              borderRadius: "12px", padding: "20px", marginBottom: "16px",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: "12px", right: "12px",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#a78bfa", opacity: 0.6,
              }} />
              <p style={{
                fontSize: "14px", lineHeight: 1.8, color: "#d1cfc9",
                whiteSpace: "pre-wrap", margin: 0,
              }}>{generatedPrompt}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
              <button onClick={handleCopy} style={{
                flex: 1, padding: "14px",
                background: copied
                  ? "linear-gradient(135deg, #065f46, #047857)"
                  : "linear-gradient(135deg, #6c63ff, #a78bfa)",
                border: "none", borderRadius: "10px", color: "#fff",
                fontSize: "14px", fontWeight: 700, cursor: "pointer",
                transition: "all 0.2s",
              }}>
                {copied ? "✓ Copied!" : "Copy Prompt"}
              </button>
              <button onClick={() => { setStep("questions"); setGeneratedPrompt(""); }} style={{
                padding: "14px 20px", background: "#111120",
                border: "1px solid #2a2a3e", borderRadius: "10px",
                color: "#9ca3af", fontSize: "14px", cursor: "pointer",
              }}>
                Regenerate
              </button>
            </div>
            <div style={{
              background: "#0f0f1a", border: "1px solid #1e1e2e",
              borderRadius: "10px", padding: "16px",
            }}>
              <p style={{ fontSize: "12px", color: "#4b5563", margin: "0 0 8px 0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Pro tip</p>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
                After the AI responds, follow up with: <span style={{ color: "#a78bfa" }}>"What's the one thing I haven't considered that could change everything here?"</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}