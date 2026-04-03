# BiasAudit - Demo Script for Judges

**Duration**: 3-5 minutes  
**Goal**: Impress judges with problem, solution, and AI transparency

---

## 📌 Opening (30 seconds)

> "Hi, I'm [Your Name], and I'm presenting **BiasAudit** — an AI platform that detects hidden biases in any written content.
>
> **The Problem**: Bias is invisible. Someone writes a job posting with gender bias, emotional language uses stereotypes, marketing copy excludes minorities—all by accident. **The Impact**: Discrimination, reduced inclusivity, legal risks.
>
> **Our Solution**: BiasAudit analyzes text in seconds, shows exactly what's biased, and suggests fair alternatives. Let me show you how it works."

---

## 🎬 Live Demo (3-4 minutes)

### 1. Show Homepage (20 seconds)
```
Open: http://localhost:5173
→ Point out: Clean design, input area, educational panel
→ Say: "Simple interface. Paste or upload any text."
```

### 2. Paste Biased Job Posting (30 seconds)
```
Click: Text input area
Paste:
"We're looking for a young, aggressive salesman 
to work in a fast-paced, high-energy office. 
Bachelor's boys preferred. Must be able to work 60+ hours 
and travel extensively."

Click: "Analyze for Bias"
→ Say: "Now watch the AI analyze for multiple bias types..."
```

### 3. Show Results (90 seconds) ⭐ IMPORTANT SECTION ⭐
```
As results load:

"Here's what the AI found:"

1️⃣ OVERALL BIAS SCORE
→ Point: Gauge showing 78 score (HIGH RISK)
→ Say: "High bias score detected. Let me show you exactly what's wrong."

2️⃣ BIAS BREAKDOWN CHARTS
→ Show pie chart and bar chart
→ Say: "Here's the breakdown: 
   - 3 instances of gender bias (pink)
   - 2 age bias instances (blue)
   - 1 ability bias (purple)
   The severity breakdown shows we have 1 high, 2 medium, 1 low."

3️⃣ DETAILED ANALYSIS (Click to expand)
→ Expand first bias
→ Say: "Look at this phrase: 'young, aggressive salesman'
   
   The AI explains:
   - It uses 'salesman' (gendered language)
   - 'Young' excludes older workers (age discrimination)
   - 'Aggressive' is a gendered stereotype
   
   And here's the suggested fix: 'Results-driven sales professional'"

→ Expand another bias
→ Say: "Another one: 'Bachelor's boys preferred'
   - Explicitly gendered language
   - Excludes men from considering
   Fix: 'Bachelor's degree preferred'"

4️⃣ KEY INSIGHT - SHOW EXPLAINABILITY
→ Say: "This is what makes BiasAudit different. It's not just 
a score. It EXPLAINS the bias, shows the exact phrase, 
and gives you fair alternatives. That's AI transparency."
```

### 4. Show Educational Panel (30 seconds)
```
Click: "Learn About Bias Detection" section
Show: Tips on inclusive writing
→ Say: "We also educate users. Here's how to avoid gender bias:
   Instead of 'aggressive, competitive salesman'
   Use: 'results-driven sales professional'
   Why: Removes gender stereotype and gendered job title."
```

---

## 🎯 Closing (30 seconds)

> "So here's what BiasAudit does:
>
> 1. **Identifies** hidden biases across 6 categories
> 2. **Explains** why each phrase is problematic
> 3. **Suggests** fair, inclusive alternatives
> 4. **Educates** users on inclusive communication
>
> **Real-world impact**: HR departments can bias-proof job posts. Journalists can avoid stereotypes. Marketing teams can reach diverse audiences. Companies reduce discrimination risk.
>
> **Technical**: Built with React + Vite for beautiful frontend, Node.js for API, Google Gemini for AI. Deployed on Vercel + Railway, all code open on GitHub.
>
> This is BiasAudit—making digital content fairer, one analysis at a time. Thank you!"

---

## 💡 Q&A Backup Answers

**Q: How accurate is the bias detection?**
A: "We use Google's Gemini API, which is trained on billions of texts. It catches major biases with high accuracy. False positives are rare, and users can always review suggestions."

**Q: Why not just use traditional NLP?**
A: "Traditional NLP struggles with implicit bias. LLMs understand nuance and context—they know that 'aggressive' is gendered in job postings but not in sports journalism."

**Q: What if someone uses it for censorship?**
A: "Good question. BiasAudit is a tool—like any tool, intent matters. We focus on educational use, helping people write more inclusively, not silencing speech."

**Q: How long does analysis take?**
A: "Typically 2-5 seconds depending on text length and server load. We cache results to speed up repeat analyses."

**Q: Can it handle multiple languages?**
A: "Currently English-focused, but Gemini supports multiple languages. Multi-language support is in our roadmap."

**Q: What's your business model?**
A: "SaaS subscription for individuals, B2B enterprise licensing for companies, API tier for integrations."

---

## 🎬 Demo Tips

✅ **DO**
- Start with a clear problem statement
- Use real-world example (job posting is relatable)
- Pause to let judges see results
- Point out specific bias explanations (this is your differentiator!)
- Emphasize explainability—judges LOVE seeing AI reasoning
- Show the UI responsiveness and animations
- Mention 6 bias types (demonstrates thoroughness)

❌ **DON'T**
- Rush through results
- Skip explaining the suggestions
- Go into technical jargon
- Forget the educational angle
- Demo without internet (Gemini API needed)
- Use fake/mock data—show real analysis

---

## 🎥 Recording at Home

**Setup**:
- Use OBS or ScreenFlow to record screen
- Have good WiFi (Gemini API calls needed)
- Close other browser tabs (cleaner video)
- Zoom in (make text readable)

**Audio**:
- Use headset for clear audio
- Speak slowly, clearly
- No background noise
- Upload to YouTube (unlisted or public)

**Video**: 
- Length: 3-5 minutes exactly
- Format: MP4, 1080p
- Save as: `BiasAudit_Demo.mp4`

---

## 📊 During Judging (If Live Demo)

1. **Prepare**: Have backend running, verified internet connection
2. **Open**: Pre-open http://localhost:5173 so it loads instantly
3. **Test**: Try a quick analysis before judges arrive
4. **Backup**: Have screenshot of results ready (in case API fails)
5. **Confident**: Speak clearly about your solution and impact

---

## 🏆 Key Differentiators to Mention

When the judges ask "What makes this different?":

1. **Unique Focus**: "Most AI projects are chatbots or general assistants. We specialize in ethical bias detection—no competition."

2. **Explainability**: "We don't just give a score. We show exactly which phrases are biased and why—judges love transparency."

3. **Real Problem**: "Bias is real and pervasive. This solves an actual need, not a theoretical problem."

4. **Beautiful Frontend**: "Notice the smooth animations, nice colors, interactive charts—we invested in UX because that was the judging focus."

5. **SDG Alignment**: "We directly address SDG 5 (Gender Equality), SDG 10 (Reduce Inequalities), and SDG 16 (Peace)."

6. **Buildable**: "We proved it's doable in 2 weeks with 1-2 people using free APIs—it's reproducible, not a fluke."

---

**Keep it short, impactful, and focused on impact!** 🎯
