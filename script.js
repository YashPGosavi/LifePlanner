// C is a Proxy — theme-sensitive keys read live CSS variables so light/dark
// mode works without any hardcoded colour strings in the view templates.
const _Cstatic = {
  accent: "#C8F135",
  blue: "#35C8F1",
  yellow: "#F1C135",
  red: "#F14C35",
  green: "#35F18C",
  pink: "#FF6B9D",
  purple: "#C835F1",
  orange: "#F18C35",
};
const _CcssMap = {
  bg:       "--bg",
  surface:  "--surface",
  surface2: "--surface2",
  surface3: "--surface3",
  border:   "--border",
  text:     "--text",
  muted:    "--muted",
};
const C = new Proxy(_Cstatic, {
  get(target, key) {
    if (_CcssMap[key]) {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(_CcssMap[key]).trim();
    }
    return target[key];
  }
});
// SVG icons for tabs — cleaner, theme-aware, no emoji rendering inconsistency
const SVG_ICONS = {
  daily:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  habits:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  weekly:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/><rect x="11" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/></svg>`,
  monthly:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="8" y1="19" x2="12" y2="19"/></svg>`,
  annual:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  insights: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/><line x1="12" y1="16" x2="12" y2="18" stroke-width="2"/></svg>`,
  profile:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
};

const MOOD_SVG = {
  awful: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <line x1="9" y1="10" x2="9" y2="10"/>
  <line x1="15" y1="10" x2="15" y2="10"/>
  <path d="M8 16c1.5-2 6.5-2 8 0"/>
  </svg>`,

  bad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <line x1="9" y1="10" x2="9" y2="10"/>
  <line x1="15" y1="10" x2="15" y2="10"/>
  <line x1="9" y1="16" x2="15" y2="16"/>
  </svg>`,

  okay: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <line x1="9" y1="10" x2="9" y2="10"/>
  <line x1="15" y1="10" x2="15" y2="10"/>
  <line x1="8" y1="15" x2="16" y2="15"/>
  </svg>`,

  good: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <line x1="9" y1="10" x2="9" y2="10"/>
  <line x1="15" y1="10" x2="15" y2="10"/>
  <path d="M8 15c2 2 6 2 8 0"/>
  </svg>`,

  great: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <circle cx="9" cy="10" r="1"/>
  <circle cx="15" cy="10" r="1"/>
  <path d="M8 14c2.5 3 5.5 3 8 0"/>
  </svg>`
};


const TABS = [
  { id: "daily",    label: "Today",    icon: SVG_ICONS.daily },
  { id: "habits",   label: "Habits",   icon: SVG_ICONS.habits },
  { id: "weekly",   label: "Week",     icon: SVG_ICONS.weekly },
  { id: "monthly",  label: "Month",    icon: SVG_ICONS.monthly },
  { id: "annual",   label: "Annual",   icon: SVG_ICONS.annual },
  { id: "insights", label: "Insights", icon: SVG_ICONS.insights },
  { id: "profile",  label: "Profile",  icon: SVG_ICONS.profile },
];
const MOODS = [
  { id: 0, label: "Awful", icon: MOOD_SVG.awful },
  { id: 1, label: "Bad", icon: MOOD_SVG.bad },
  { id: 2, label: "Okay", icon: MOOD_SVG.okay },
  { id: 3, label: "Good", icon: MOOD_SVG.good },
  { id: 4, label: "Great", icon: MOOD_SVG.great },
];
const WEATHERS = [
  { id: 0, emoji: "☀️", label: "Sunny" },
  { id: 1, emoji: "⛅", label: "Partly" },
  { id: 2, emoji: "☁️", label: "Cloudy" },
  { id: 3, emoji: "🌧️", label: "Rainy" },
  { id: 4, emoji: "❄️", label: "Snowy" },
];
const HABIT_EMOJIS = [
  "✨","🏃","📚","💧","🧘","💪","🎯","🌱","✍️","🍎","😴","🎨","🎵","💊","🚶","🔥","🥗","💻","🏋️","🧹","🎾","🚴",
];
const HABIT_COLORS = [
  "#C8F135","#35C8F1","#F1C135","#F14C35","#35F18C","#C835F1","#F18C35","#FF6B9D",
];
const FREQ = ["Daily", "Weekdays", "Weekends"];
const STEPS_GOAL = 10000;
const MONTHS_S = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const lsGet = (k) => {
  try {
    return JSON.parse(localStorage.getItem(k) || "null");
  } catch {
    return null;
  }
};
const lsSet = (k, v) => localStorage.setItem(k, JSON.stringify(v));

function emptyPlan(date) {
  return {
    id: dk(date),
    date: new Date(date).toISOString(),
    mood: null,
    weather: null,
    todos: [],
    habitsDone: [],
    waterGlasses: 0,
    steps: 0,
    exerciseNote: "",
    notes: "",
    moneyEntries: [],
    scheduleItems: [],
  };
}

const S = {
  dayPlans: lsGet("lp_dayPlans") || {},
  habits: lsGet("lp_habits") || [],
  profile: lsGet("lp_profile") || null,
  tab: "daily",
  selDate: new Date(),
  wkOffset: 0,
  moOffset: 0,
  annYear: new Date().getFullYear(),
  modal: null,
  selCalDay: null,
  _mType: "expense",
  _hForm: { emoji: "✨", color: C.accent, frequency: "Daily" },
  density: lsGet("lp_density") || "comfortable",
  theme: lsGet("lp_theme") || "system", // "system" | "light" | "dark"
};

const planCache = {};
const savePlans = () => lsSet("lp_dayPlans", S.dayPlans);
const saveHabits = () => lsSet("lp_habits", S.habits);
const saveProfile = () => lsSet("lp_profile", S.profile);
const saveDensity = () => lsSet("lp_density", S.density);
const saveTheme = () => lsSet("lp_theme", S.theme);

function applyTheme() {
  const root = document.documentElement;
  if (S.theme === "light") {
    root.setAttribute("data-theme", "light");
  } else if (S.theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    // system: remove attribute, let CSS media query decide
    root.removeAttribute("data-theme");
  }
}

function updateFavicon() {
  // Determine effective theme (system resolves via media query)
  let effective = S.theme;
  if (effective === "system") {
    effective = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  const suffix = effective === "light" ? "-light" : "-dark";

  // Update <link rel="icon">
  let link = document.querySelector('link[rel="icon"]');
  if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
  link.href = `appIcon${suffix}.png`;
  link.type = "image/png";

  // Update apple-touch-icon
  let apple = document.querySelector('link[rel="apple-touch-icon"]');
  if (apple) apple.href = `appIcon${suffix}.png`;
}

function cycleTheme() {
  const order = ["system", "light", "dark"];
  S.theme = order[(order.indexOf(S.theme) + 1) % order.length];
  saveTheme();
  applyTheme();
  updateFavicon();
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = themeIcon();
}

function themeIcon() {
  if (S.theme === "light") return "☀️";
  if (S.theme === "dark") return "🌙";
  return "💻"; // system
}
const getDayPlan = (d) => {
  const k = dk(d);
  if (planCache[k]) return planCache[k];
  const p = S.dayPlans[k]
    ? { ...emptyPlan(d), ...S.dayPlans[k] }
    : emptyPlan(d);
  planCache[k] = p;
  return p;
};
function saveDayPlan(p) {
  S.dayPlans[p.id] = p;
  planCache[p.id] = p;
  savePlans();
}
function patchDay(d, patch) {
  const p = { ...getDayPlan(d), ...patch };
  saveDayPlan(p);
}

function dk(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function isToday(date) {
  const t = new Date(), d = new Date(date);
  return t.getFullYear() === d.getFullYear() && t.getMonth() === d.getMonth() && t.getDate() === d.getDate();
}
function startOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}
function uid() {
  return crypto.randomUUID?.() || Math.random().toString(36).slice(2);
}
function fmt(date, opts) {
  return new Date(date).toLocaleDateString("en-US", opts);
}
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtTime(t24) {
  try {
    const [h, m] = t24.split(":");
    const hr = parseInt(h);
    return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
  } catch {
    return t24;
  }
}

function render() {
  applyTheme();
  if (!S.profile) {
    renderOnboard();
    return;
  }
  const ds = fmt(new Date(), { weekday: "short", month: "short", day: "numeric" });
  document.getElementById("hdDate").textContent = ds;
  const hf = document.getElementById("header-footer");
  if (window.innerWidth >= 768) {
    hf.style.display = "block";
    hf.textContent = ds;
  } else {
    hf.style.display = "none";
  }
  // Theme toggle button
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.textContent = themeIcon();

  document.getElementById("tabs").innerHTML = TABS.map(
    (t) => `<button class="tab-btn${S.tab === t.id ? " active" : ""}" onclick="switchTab('${t.id}')"><span class="ti">${t.icon}</span><span class="tl">${t.label}</span></button>`,
  ).join("");
  updateFavicon();
  renderContent();
}
function switchTab(id) {
  S.tab = id;
  S.modal = null;
  render();
}
function renderContent() {
  const views = {
    daily: vDaily,
    habits: vHabits,
    weekly: vWeekly,
    monthly: vMonthly,
    annual: vAnnual,
    insights: vInsights,
    profile: vProfile,
  };
  const el = document.getElementById("content");
  el.className = `density-${S.density}`;
  el.innerHTML = `<div class="page">${(views[S.tab] || vDaily)()}</div>`;
  renderModal();
}

/* ── Helpers ── */
function ring(progress, color, size, center) {
  const r = (size - 10) / 2, c = 2 * Math.PI * r, dash = c * Math.min(progress, 1);
  return `<div style="position:relative;width:${size}px;height:${size}px;flex-shrink:0;"><svg width="${size}" height="${size}" style="transform:rotate(-90deg)"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}26" stroke-width="8"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="8" stroke-dasharray="${dash} ${c}" stroke-linecap="round"/></svg><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">${center || ""}</div></div>`;
}
function pbar(p, color, h) {
  h = h || 5;
  return `<div style="background:${color}26;border-radius:99px;height:${h}px;overflow:hidden;"><div style="width:${Math.min(p, 1) * 100}%;height:100%;background:${color};border-radius:99px;transition:width .6s ease;"></div></div>`;
}
function statTile(title, value, color, icon) {
  return `<div class="stat-tile" style="background:${color}12;border:1px solid ${color}30;"><div class="stat-icon">${icon}</div><div class="stat-val" style="color:${color};">${value}</div><div class="stat-lbl">${title}</div></div>`;
}

/* ══════════════════════════════════
   DAILY VIEW
══════════════════════════════════ */
function vDaily() {
  const d = S.selDate, p = getDayPlan(d);
  const tmr = new Date();
  tmr.setHours(23, 59, 59, 999);
  const isT = isToday(d), canFwd = d < tmr;
  const todaysHabits = S.habits.filter((h) => habitAllowedOnDate(h, d));
  const habDone = (p.habitsDone || []).filter((id) => todaysHabits.some((h) => h.id === id));
  const habPct = todaysHabits.length ? habDone.length / todaysHabits.length : 0;
  const todos = p.todos || [], doneTodos = todos.filter((i) => i.isDone).length;
  const schedItems = p.scheduleItems || [];

  const schedHTML =
    schedItems.length === 0
      ? `<div style="font-size:12px;font-family:var(--mono);color:${C.muted};text-align:center;padding:10px 0;">No events — tap + to add</div>`
      : schedItems.map((item, i) => `<div class="sched-item"><div class="sched-badge">${esc(item.time)}</div><div class="sched-text">${esc(item.text)}</div><button class="sched-del" onclick="deleteSchedItem(${i})">✕</button></div>`).join("");

  const entries = p.moneyEntries || [];
  const inc = sumMoney(p, "income");
  const exp = sumMoney(p, "expense");
  const net = inc - exp;

  return `
<!-- Date nav -->
<div class="card card-solo">
  <div class="date-nav">
    <button class="nav-arrow" onclick="navDate(-1)">‹</button>
    <div style="flex:1;text-align:center;">
      <div style="font-weight:700;font-size:16px;color:${isT ? C.accent : C.text};">${isT ? "Today" : fmt(d, { weekday: "long" })}</div>
      <div style="font-size:12px;color:${C.muted};font-family:var(--mono);">${fmt(d, { month: "long", day: "numeric", year: "numeric" })}</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      ${!isT ? `<button class="today-pill" onclick="goToday()">Today</button>` : ""}
      <button class="nav-arrow" onclick="navDate(1)" style="opacity:${canFwd ? 1 : 0.3};">›</button>
    </div>
  </div>
  ${!isT ? `<div style="margin-top:10px;padding:8px 12px;background:${C.accent}12;border:1px solid ${C.accent}28;border-radius:10px;font-size:12px;color:${C.accent};font-family:var(--mono);text-align:center;">📅 Viewing ${fmt(d, { weekday: "short", month: "short", day: "numeric" })}</div>` : ""}
</div>

<!-- Mood + Weather -->
<div class="card-pair">
  <div class="card">
    <span class="slabel">Mood</span>
    <div class="mood-row">${MOODS.map((m) => `<button class="mood-btn" onclick="setMood(${m.id})" style="${p.mood === m.id ? `background:${m.color}22;border-color:${m.color};` : ""}"><div style="font-size:26px;">${m.emoji}</div><div style="font-size:8px;font-family:var(--mono);color:${p.mood === m.id ? m.color : C.muted};">${m.label}</div></button>`).join("")}</div>
  </div>
  <div class="card">
    <span class="slabel">Weather</span>
    <div style="display:flex;gap:6px;">${WEATHERS.map((w) => `<button onclick="setWeather(${w.id})" style="flex:1;background:${p.weather === w.id ? C.accent + "18" : "none"};border:1.5px solid ${p.weather === w.id ? C.accent : C.border};border-radius:12px;padding:10px 4px;cursor:pointer;transition:all .2s;"><div style="font-size:20px;">${w.emoji}</div><div style="font-size:8px;font-family:var(--mono);color:${p.weather === w.id ? C.accent : C.muted};margin-top:4px;">${w.label}</div></button>`).join("")}</div>
  </div>
</div>

<!-- Schedule + To-Do -->
<div class="card-pair">
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <span class="slabel" style="margin-bottom:0;">📅 Schedule</span>
      <button style="color:${C.accent};font-size:22px;line-height:1;padding:0 4px;font-weight:300;" onclick="openSchedModal()">+</button>
    </div>
    ${schedHTML}
  </div>
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <span class="slabel" style="margin-bottom:0;">✅ To-Do${todos.length > 0 ? ` <span style="color:${C.accent};">${doneTodos}/${todos.length}</span>` : ""}
      </span>
      <button style="color:${C.accent};font-size:22px;line-height:1;padding:0 4px;font-weight:300;" onclick="openAddText('todos')">+</button>
    </div>
    ${todos.length > 0 && doneTodos > 0 ? `<div style="margin-bottom:10px;">${pbar(doneTodos / todos.length, C.accent)}</div>` : ""}
    ${todos.length === 0 ? `<div style="font-size:12px;font-family:var(--mono);color:${C.muted};text-align:center;padding:8px 0;">Tap + to add tasks</div>` : ""}
    ${(todos || []).map((it) => `<div class="cl-item"><button class="cl-check" onclick="toggleCL('todos','${it.id}')" style="${it.isDone ? `background:${C.accent};border-color:${C.accent};color:#000;` : `border-color:${C.accent}40;`}">${it.isDone ? "✓" : ""}</button><span style="flex:1;font-size:14px;min-width:0;word-break:break-word;overflow-wrap:break-word;white-space:normal;${it.isDone ? `color:${C.muted};text-decoration:line-through;` : ""}">${esc(it.text)}</span><button class="icon-btn" onclick="deleteCL('todos','${it.id}')">✕</button></div>`).join("")}
  </div>
</div>

<!-- Habits Today + Steps -->
<div class="card-pair">
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <span class="slabel" style="margin-bottom:0;">Habits Today</span>
      ${ring(habPct, C.accent, 44, `<span style="font-size:10px;font-weight:700;color:${C.text};">${Math.round(habPct * 100)}%</span>`)}
    </div>
    ${S.habits.length === 0 ? `<div style="font-size:12px;font-family:var(--mono);color:${C.muted};">Add habits in Habits tab →</div>` : ""}
    ${S.habits
      .filter((h) => habitAllowedOnDate(h, d))
      .map((h) => {
        const done = habDone.includes(h.id);
        return `<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(42,42,50,.4);min-width:0;overflow:hidden;"><button onclick="toggleHabitDay('${h.id}')" style="width:24px;height:24px;border-radius:8px;border:1.5px solid ${done ? h.color : h.color + "40"};background:${done ? h.color : "none"};cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#000;flex-shrink:0;transition:all .2s;">${done ? "✓" : ""}</button><span style="font-size:16px;flex-shrink:0;">${h.emoji}</span><span style="flex:1;font-size:14px;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${esc(h.name)}</span><span style="background:${h.color}20;border-radius:99px;padding:3px 9px;font-size:12px;font-weight:700;font-family:var(--mono);color:${h.color};flex-shrink:0;">🔥${h.currentStreak || 0}d</span></div>`;
      })
      .join("")}
  </div>
  <div class="card">
    <span class="slabel">Steps · ${(p.steps || 0).toLocaleString()} / ${STEPS_GOAL.toLocaleString()}</span>
    <div style="display:flex;align-items:center;gap:16px;">
      ${ring(Math.min((p.steps || 0) / STEPS_GOAL, 1), (p.steps || 0) >= STEPS_GOAL ? C.green : C.accent, 72, `<div style="text-align:center;"><div style="font-size:14px;">👟</div><div style="font-size:12px;font-weight:700;font-family:var(--mono);color:${(p.steps || 0) >= STEPS_GOAL ? C.green : C.accent};">${(p.steps || 0) >= 1000 ? ((p.steps || 0) / 1000).toFixed(1) + "k" : p.steps || 0}</div></div>`)}
      <div style="flex:1;">
        <input type="number" min="0" max="99999" inputmode="numeric" placeholder="Enter steps" value="${p.steps || ""}" style="font-size:20px;font-weight:700;font-family:var(--mono);color:${C.accent};background:none;border:none;border-bottom:1px solid ${C.border};border-radius:0;padding:4px 0;width:100%;" onblur="setSteps(parseInt(this.value)||0)" onkeydown="if(event.key==='Enter'){this.blur();}"/>
        <div class="step-presets">${[2000, 5000, 7500, 10000].map((v) => `<button class="step-preset" onclick="setSteps(${v})" style="color:${(p.steps || 0) >= v ? C.accent : C.muted};border-color:${(p.steps || 0) >= v ? C.accent + "40" : C.border};">${v >= 1000 ? v / 1000 + "k" : v}</button>`).join("")}</div>
      </div>
    </div>
  </div>
</div>

<!-- Water + Exercise -->
<div class="card-pair">
  <div class="card">
    <span class="slabel">Water · ${p.waterGlasses || 0}/8</span>
    <div class="water-row">${[...Array(8)].map((_, i) => `<span class="water-cup${i < (p.waterGlasses || 0) ? " filled" : ""}" onclick="setWater(${i + 1})">💧</span>`).join("")}</div>
    <div style="margin-top:8px;">${pbar((p.waterGlasses || 0) / 8, C.blue)}</div>
  </div>
  <div class="card">
    <span class="slabel">Exercise</span>
    <textarea placeholder="e.g. 30 min run, gym, yoga…" style="min-height:80px;" oninput="saveExercise(this.value)">${esc(p.exerciseNote || "")}</textarea>
  </div>
</div>

<!-- Money -->
<div class="card card-solo">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
    <span class="slabel" style="margin-bottom:0;">💰 Money</span>
    <button style="color:${C.green};font-size:22px;padding:0 4px;font-weight:300;" onclick="openAddMoney()">+</button>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:${entries.length ? 12 : 0}px;">
    ${[
      ["IN", `₹${inc.toFixed(2)}`, C.green],
      ["OUT", `₹${exp.toFixed(2)}`, C.red],
      ["NET", `₹${net.toFixed(2)}`, net >= 0 ? C.green : C.red],
    ]
      .map(([l, v, col]) => `<div style="text-align:center;background:${col}12;border:1px solid ${col}30;border-radius:10px;padding:10px 8px;"><div style="font-size:9px;font-family:var(--mono);color:${C.muted};">${l}</div><div style="font-size:14px;font-weight:700;color:${col};font-family:var(--mono);">${v}</div></div>`)
      .join("")}
  </div>
  ${entries.map((e) => `<div class="money-row"><div style="width:8px;height:8px;border-radius:99px;background:${e.type === "income" ? C.green : C.red};flex-shrink:0;"></div><span style="flex:1;font-size:13px;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${esc(e.description)}</span>${e.category ? `<span style="font-size:10px;font-family:var(--mono);color:${C.muted};flex-shrink:0;">${esc(e.category)}</span>` : ""}<span style="font-size:14px;font-weight:700;font-family:var(--mono);color:${e.type === "income" ? C.green : C.red};flex-shrink:0;">${e.type === "income" ? "+" : "-"}₹${e.amount.toFixed(2)}</span><button class="icon-btn" onclick="deleteMoney('${e.id}')">✕</button></div>`).join("")}
</div>

<!-- Notes -->
<div class="card card-solo">
  <span class="slabel">Notes</span>
  <textarea placeholder="Thoughts, reflections…" style="min-height:90px;" oninput="saveNote(this.value)">${esc(p.notes || "")}</textarea>
</div>`;
}

/* ══════════════════════════════════
   HABITS VIEW
══════════════════════════════════ */
function vHabits() {
  const today = new Date(), p = getDayPlan(today),
    todaysHabits = S.habits.filter((h) => habitAllowedOnDate(h, today)),
    habDone = (p.habitsDone || []).filter((id) => todaysHabits.some((h) => h.id === id));

  const habPct = todaysHabits.length ? habDone.length / todaysHabits.length : 0;
  const l30 = Array.from({ length: 30 }, (_, i) => addDays(today, -29 + i));

  const cards = S.habits
    .map((h) => {
      const done30 = l30.map((d) => {
        if (!habitAllowedOnDate(h, d)) return null;
        return (getDayPlan(d).habitsDone || []).includes(h.id);
      });
      const isDoneToday = habDone.includes(h.id);
      const allowedDays = done30.filter((v) => v !== null).length;
      const count30 = done30.filter((v) => v === true).length;
      const pct30 = allowedDays ? count30 / allowedDays : 0;
      return `<div class="hb-card" style="${isDoneToday ? `border-color:${h.color}50;` : ""}">
  <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
    <div class="hb-emoji-wrap" style="background:${h.color}18;flex-shrink:0;">${h.emoji}</div>
    <div style="flex:1;min-width:0;">
      <div style="font-size:16px;font-weight:600;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${esc(h.name)}</div>
      <div style="font-size:11px;font-family:var(--mono);color:${C.muted};margin-top:2px;">${h.frequency}</div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
        <button onclick="toggleHabitDay('${h.id}')" style="padding:6px 14px;border-radius:9px;border:1.5px solid ${isDoneToday ? h.color : h.color + "40"};background:${isDoneToday ? h.color : "none"};cursor:pointer;font-size:13px;font-weight:700;color:${isDoneToday ? "#000" : h.color};transition:all .2s;">${isDoneToday ? "✓ Done" : "Mark Done"}</button>
        <span class="hb-streak" style="background:${h.color}20;color:${h.color};">🔥 ${h.currentStreak || 0}d</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0;">
      ${ring(pct30, h.color, 54, `<div style="text-align:center;line-height:1.2;"><div style="font-size:10px;font-weight:700;color:${C.text};">${Math.round(pct30 * 100)}%</div><div style="font-size:8px;color:${C.muted};font-family:var(--mono);">30d</div></div>`)}
      <div style="display:flex;gap:6px;">
        <button class="icon-btn" style="font-size:16px;" onclick="openHabitModal('${h.id}')">✎</button>
        <button class="icon-btn" style="font-size:16px;" onclick="deleteHabit('${h.id}')">🗑</button>
      </div>
    </div>
  </div>
  <div style="font-size:9px;font-family:var(--mono);color:${C.muted};letter-spacing:1px;margin-bottom:6px;">LAST 30 DAYS</div>
  <div class="hb-hm">${done30.map((done) => `<div class="hb-hm-cell" style="background:${done === true ? h.color : done === false ? h.color + "20" : C.surface2};"></div>`).join("")}</div>
  <div class="hb-footer"><span>Longest: ${h.longestStreak || 0}d</span><span style="color:${h.color};">${Math.round(pct30 * 100)}% in 30 days</span></div>
  ${pbar(pct30, h.color)}
</div>`;
    })
    .join("");

  return `<div class="card card-solo" style="background:linear-gradient(135deg,${C.surface},${C.surface3});">
  <div style="display:flex;align-items:center;gap:16px;">
    ${ring(habPct, C.accent, 70, `<div style="text-align:center;"><div style="font-size:18px;font-weight:700;color:${C.text};">${Math.round(habPct * 100)}%</div></div>`)}
    <div style="flex:1;">
      <div style="font-size:18px;font-weight:700;margin-bottom:6px;">${habDone.length}/${S.habits.length} habits today</div>
      ${pbar(habPct, C.accent, 8)}
      <div style="font-size:11px;font-family:var(--mono);color:${C.muted};margin-top:6px;">${S.habits.length === 0 ? "Add your first habit below" : habPct === 1 ? "🎉 All done today!" : habPct > 0.5 ? "More than halfway!" : "Let's get started!"}</div>
    </div>
  </div>
</div>
${S.habits.length === 0 ? `<div class="card card-solo" style="text-align:center;padding:32px;color:${C.muted};font-family:var(--mono);font-size:13px;">No habits yet.<br><br>Tap the button below to add your first habit.</div>` : ""}
<div class="habits-grid">${cards}</div>
<button class="btn btn-a btn-full" onclick="openHabitModal()" style="font-size:15px;padding:16px;border-radius:16px;margin-top:4px;">+ Add Habit</button>`;
}

/* ══════════════════════════════════
   WEEKLY VIEW
══════════════════════════════════ */
function vWeekly() {
  const offset = S.wkOffset, refDay = addDays(new Date(), offset * 7), sow = startOfWeek(refDay);
  const wdays = Array.from({ length: 7 }, (_, i) => addDays(sow, i)), canFwd = offset < 0;
  const weekPlans = wdays.map((d) => getDayPlan(d));
  let totalAllowed = 0, totalDone = 0;

  S.habits.forEach((h) => {
    wdays.forEach((d) => {
      if (habitAllowedOnDate(h, d)) {
        totalAllowed++;
        if ((getDayPlan(d).habitsDone || []).includes(h.id)) totalDone++;
      }
    });
  });

  const habRate = totalAllowed ? totalDone / totalAllowed : 0;
  const moodDays = weekPlans.filter((p) => p.mood != null);
  const avgMood = moodDays.length > 0 ? moodDays.reduce((s, p) => s + p.mood, 0) / moodDays.length : null;
  const weekSpend = weekPlans.reduce((s, p) => s + sumMoney(p, "expense"), 0);
  const tasksDone = weekPlans.reduce((s, p) => s + (p.todos || []).filter((t) => t.isDone).length, 0);
  const totalSteps = weekPlans.reduce((s, p) => s + (p.steps || 0), 0);

  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
  <button class="nav-arrow" onclick="S.wkOffset--;renderContent();">‹</button>
  <div style="text-align:center;">
    <div style="font-size:15px;font-weight:700;">${fmt(wdays[0], { month: "short", day: "numeric" })} – ${fmt(wdays[6], { month: "short", day: "numeric", year: "numeric" })}</div>
    ${offset !== 0 ? `<button style="margin-top:4px;font-size:10px;font-family:var(--mono);color:${C.accent};background:${C.accent}18;border:1px solid ${C.accent}30;border-radius:6px;padding:2px 8px;cursor:pointer;" onclick="S.wkOffset=0;renderContent();">← This Week</button>` : ""}
  </div>
  <button class="nav-arrow" onclick="if(S.wkOffset<0){S.wkOffset++;renderContent();}" style="opacity:${canFwd ? 1 : 0.3};">›</button>
</div>

<div class="sg4">
  <div class="stat-tile" style="background:${C.accent}12;border:1px solid ${C.accent}30;"><div class="stat-icon">🔥</div><div class="stat-val" style="color:${C.accent};">${Math.round(habRate * 100)}%</div><div class="stat-lbl">Habit Rate</div></div>
  <div class="stat-tile" style="background:${C.yellow}12;border:1px solid ${C.yellow}30;"><div class="stat-icon">${avgMood != null ? MOODS[Math.round(avgMood)].emoji : "—"}</div><div class="stat-val" style="color:${C.yellow};font-size:18px;">${avgMood != null ? MOODS[Math.round(avgMood)].label : "—"}</div><div class="stat-lbl">Avg Mood</div></div>
  <div class="stat-tile" style="background:${C.red}12;border:1px solid ${C.red}30;"><div class="stat-icon">💳</div><div class="stat-val" style="color:${C.red};">₹${Math.round(weekSpend)}</div><div class="stat-lbl">Spent</div></div>
  <div class="stat-tile" style="background:${C.blue}12;border:1px solid ${C.blue}30;"><div class="stat-icon">✅</div><div class="stat-val" style="color:${C.blue};">${tasksDone}</div><div class="stat-lbl">Tasks Done</div></div>
</div>

<div class="wk-cols card-solo" style="margin-bottom:14px;">
  ${wdays
    .map((date) => {
      const pp = getDayPlan(date), today = isToday(date), sv = pp.steps || 0, sok = sv >= STEPS_GOAL * 0.5;
      return `<div class="wk-col" style="${today ? `border-color:${C.accent};background:linear-gradient(135deg,${C.surface},${C.accent}08);` : ""}" onclick="jumpToDate('${dk(date)}')">
    <div style="font-size:9px;font-family:var(--mono);color:${today ? C.accent : C.muted};font-weight:600;">${fmt(date, { weekday: "short" }).toUpperCase()}</div>
    <div style="font-size:22px;font-weight:700;color:${today ? C.accent : C.text};">${new Date(date).getDate()}</div>
    ${pp.mood != null ? `<div style="font-size:18px;">${MOODS[pp.mood]?.emoji}</div>` : `<div style="font-size:16px;opacity:.15;">·</div>`}
    ${pp.weather != null ? `<div style="font-size:14px;">${WEATHERS[pp.weather]?.emoji}</div>` : ""}
    ${pp.habitsDone.length > 0 ? `<div style="font-size:10px;font-family:var(--mono);color:${C.accent};">🔥${pp.habitsDone.length}</div>` : ""}
    ${sv > 0 ? `<div style="font-size:10px;font-family:var(--mono);color:${sok ? C.green : C.muted};">👟${sv >= 1000 ? (sv / 1000).toFixed(1) + "k" : sv}</div>` : ""}
    ${(pp.todos || []).filter((t) => t.isDone).length > 0 ? `<div style="font-size:9px;font-family:var(--mono);color:${C.blue};">✅${(pp.todos || []).filter((t) => t.isDone).length}</div>` : ""}
    ${(pp.waterGlasses || 0) > 0 ? `<div style="font-size:9px;font-family:var(--mono);color:${C.blue};">💧${pp.waterGlasses}</div>` : ""}
  </div>`;
    })
    .join("")}
</div>

<!-- Habit Matrix + Week Summary -->
<div class="card-pair">
  <div class="card">
    <span class="slabel">Habit Matrix</span>
    ${
      S.habits.length === 0
        ? `<div style="font-size:12px;font-family:var(--mono);color:${C.muted};">No habits to show</div>`
        : `
    <div style="display:grid;grid-template-columns:1fr repeat(7,24px) 36px;align-items:center;gap:4px;margin-bottom:10px;">
      <div style="font-size:9px;font-family:var(--mono);color:${C.muted};">HABIT</div>
      ${wdays.map((d) => `<div style="text-align:center;font-size:9px;font-family:var(--mono);color:${isToday(d) ? C.accent : C.muted};">${fmt(d, { weekday: "narrow" })}</div>`).join("")}
      <div style="font-size:9px;font-family:var(--mono);color:${C.muted};text-align:center;">%</div>
    </div>
    ${S.habits.map((h) => {
        const allowedDays = wdays.filter((d) => habitAllowedOnDate(h, d));
        const doneDays = allowedDays.filter((d) => (getDayPlan(d).habitsDone || []).includes(h.id));
        const cnt = doneDays.length;
        const pct = allowedDays.length > 0 ? cnt / allowedDays.length : 0;
        return `<div style="display:grid;grid-template-columns:1fr repeat(7,24px) 36px;align-items:center;gap:4px;margin-bottom:6px;"><div style="flex:1;font-size:12px;display:flex;align-items:center;gap:5px;overflow:hidden;min-width:0;"><span style="flex-shrink:0;">${h.emoji}</span><span style="word-break:break-word;overflow-wrap:break-word;white-space:normal;">${esc(h.name)}</span></div>${wdays.map((d) => {
          const allowed = habitAllowedOnDate(h, d);
          const done = allowed && (getDayPlan(d).habitsDone || []).includes(h.id);
          return `<div style="width:20px;height:20px;border-radius:5px;background:${!allowed ? C.surface2 : done ? h.color : h.color + "20"};display:flex;align-items:center;justify-content:center;">${done ? `<span style="font-size:10px;font-weight:900;color:#000;">✓</span>` : ""}</div>`;
        }).join("")}<div style="width:36px;font-size:10px;font-family:var(--mono);color:${h.color};text-align:center;">${Math.round(pct * 100)}%</div></div>`;
      }).join("")}`
    }
  </div>
  <div class="card">
    <span class="slabel">Week Summary</span>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <div style="background:${C.blue}12;border:1px solid ${C.blue}30;border-radius:12px;padding:12px;"><div style="font-size:11px;font-family:var(--mono);color:${C.muted};">TOTAL STEPS</div><div style="font-size:22px;font-weight:700;color:${C.blue};font-family:var(--mono);">${totalSteps >= 1000 ? Math.round(totalSteps / 1000) + "k" : totalSteps}</div></div>
      <div style="background:${C.green}12;border:1px solid ${C.green}30;border-radius:12px;padding:12px;"><div style="font-size:11px;font-family:var(--mono);color:${C.muted};">AVG WATER</div><div style="font-size:22px;font-weight:700;color:${C.green};font-family:var(--mono);">${(weekPlans.reduce((s, p) => s + (p.waterGlasses || 0), 0) / 7).toFixed(1)}<span style="font-size:12px;"> gl</span></div></div>
    </div>
  </div>
</div>`;
}

/* ══════════════════════════════════
   MONTHLY VIEW
══════════════════════════════════ */
function vMonthly() {
  const mo = S.moOffset, target = new Date();
  target.setMonth(target.getMonth() + mo, 1);
  const y = target.getFullYear(), m = target.getMonth(), dIM = new Date(y, m + 1, 0).getDate(), fWD = new Date(y, m, 1).getDay();
  const days = Array.from({ length: dIM }, (_, i) => new Date(y, m, i + 1)), plans = days.map((d) => getDayPlan(d));
  const income = plans.reduce((s, p) => s + sumMoney(p, "income"), 0);
  const expense = plans.reduce((s, p) => s + sumMoney(p, "expense"), 0);
  const habDone = plans.reduce((s, p) => s + p.habitsDone.length, 0);
  const totalSteps = plans.reduce((s, p) => s + (p.steps || 0), 0);
  const sel = S.selCalDay;

  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
  <button class="nav-arrow" onclick="S.moOffset--;S.selCalDay=null;renderContent();">‹</button>
  <div style="text-align:center;"><div style="font-size:18px;font-weight:700;">${target.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>${mo !== 0 ? `<button style="font-size:10px;font-family:var(--mono);color:${C.accent};background:${C.accent}18;border:1px solid ${C.accent}30;border-radius:6px;padding:2px 8px;cursor:pointer;margin-top:4px;" onclick="S.moOffset=0;S.selCalDay=null;renderContent();">This Month</button>` : ""}</div>
  <button class="nav-arrow" onclick="if(S.moOffset<0){S.moOffset++;S.selCalDay=null;renderContent();}" style="opacity:${mo < 0 ? 1 : 0.3};">›</button>
</div>
<div class="sg4">${statTile("Income", `₹${income.toFixed(0)}`, C.green, "💰")}${statTile("Expenses", `₹${expense.toFixed(0)}`, C.red, "💸")}${statTile("Habits", String(habDone), C.accent, "🔥")}${statTile("Steps", totalSteps >= 1000 ? Math.round(totalSteps / 1000) + "k" : String(totalSteps), C.blue, "👟")}</div>

<!-- Calendar + Day detail -->
<div class="card-pair">
  <div class="card">
    <span class="slabel">Calendar</span>
    <div class="cal-grid" style="margin-bottom:8px;">${["S", "M", "T", "W", "T", "F", "S"].map((d) => `<div class="cal-dlbl">${d}</div>`).join("")}</div>
    <div class="cal-grid">${Array.from({ length: fWD }).map(() => "<div></div>").join("")}${days.map((date, i) => {
      const pp = plans[i], today = isToday(date), isSel = sel && date.toDateString() === new Date(sel).toDateString();
      return `<button class="cal-cell" onclick="calSel('${date.toISOString()}','${isSel}')"><div class="cal-num" style="${today ? `background:${C.accent};` : ""}${isSel && !today ? `border:1.5px solid ${C.accent};` : ""}"><span style="font-size:13px;font-weight:${today ? 700 : 400};color:${today ? "#000" : isSel ? C.accent : C.text};">${date.getDate()}</span></div>${pp.mood != null ? `<span style="font-size:9px;">${MOODS[pp.mood]?.emoji}</span>` : ""}${pp.habitsDone.length > 0 ? `<div style="display:flex;gap:1px;">${Array.from({ length: Math.min(pp.habitsDone.length, 3) }).map(() => `<div style="width:4px;height:4px;border-radius:99px;background:${C.accent};"></div>`).join("")}</div>` : ""}</button>`;
    }).join("")}</div>
  </div>
  ${sel
    ? `<div class="card" style="border-color:${C.accent}40;">${(() => {
        const sp = getDayPlan(new Date(sel)), si = (sp.moneyEntries || []).filter((e) => e.type === "income").reduce((a, e) => a + e.amount, 0), se = (sp.moneyEntries || []).filter((e) => e.type === "expense").reduce((a, e) => a + e.amount, 0);
        return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><span class="slabel" style="margin-bottom:0;">${fmt(sel, { weekday: "long", month: "long", day: "numeric" })}</span><button class="today-pill" onclick="jumpToDate('${dk(new Date(sel))}')">View →</button></div>${sp.mood != null ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-size:11px;font-family:var(--mono);color:${C.muted};">Mood:</span><span>${MOODS[sp.mood]?.emoji} ${MOODS[sp.mood]?.label}</span></div>` : ""} ${sp.steps ? `<div style="margin-bottom:6px;"><span style="font-size:11px;font-family:var(--mono);color:${C.muted};">Steps:</span> <span style="font-family:var(--mono);color:${C.blue};">👟${sp.steps.toLocaleString()}</span></div>` : ""} ${sp.habitsDone.length > 0 ? `<div style="margin-bottom:6px;"><span style="font-size:11px;font-family:var(--mono);color:${C.muted};">Habits:</span> ${S.habits.filter((h) => sp.habitsDone.includes(h.id)).map((h) => `<span>${h.emoji}</span>`).join("")}</div>` : ""} ${(sp.todos || []).filter((t) => t.isDone).length > 0 ? `<div style="margin-bottom:6px;"><span style="font-size:11px;font-family:var(--mono);color:${C.muted};">Tasks done:</span> <span style="color:${C.blue};">${(sp.todos || []).filter((t) => t.isDone).length}</span></div>` : ""} ${sp.notes ? `<div style="font-size:13px;color:${C.muted};margin-top:4px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${esc(sp.notes.slice(0, 150))}</div>` : ""} ${si > 0 || se > 0 ? `<div style="display:flex;gap:12px;margin-top:8px;">${si > 0 ? `<span style="font-size:12px;font-family:var(--mono);color:${C.green};">+₹${si.toFixed(0)}</span>` : ""}${se > 0 ? `<span style="font-size:12px;font-family:var(--mono);color:${C.red};">-₹${se.toFixed(0)}</span>` : ""}</div>` : ""}`;
      })()}</div>`
    : `<div class="card" style="display:flex;align-items:center;justify-content:center;min-height:200px;"><div style="text-align:center;color:${C.muted};font-size:13px;font-family:var(--mono);">Tap a day<br>to see details</div></div>`
  }
</div>

<!-- Habit completion + Finance -->
<div class="card-pair">
  <div class="card">
    <span class="slabel">Habit Completion</span>
    ${S.habits.length === 0 ? `<div style="font-size:12px;font-family:var(--mono);color:${C.muted};">No habits</div>` : ""}
    ${S.habits.map((h) => {
      const allowedDays = days.filter((d) => habitAllowedOnDate(h, d));
      const done = allowedDays.filter((d) => (getDayPlan(d).habitsDone || []).includes(h.id)).length;
      const pp = allowedDays.length ? done / allowedDays.length : 0;
      return `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;gap:6px;min-width:0;"><span style="font-size:13px;flex:1;min-width:0;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${h.emoji} ${esc(h.name)}</span><span style="font-size:11px;font-family:var(--mono);color:${h.color};flex-shrink:0;">${done}/${allowedDays.length}</span></div>${pbar(pp, h.color)}</div>`;
    }).join("")}
  </div>
  <div class="card">
    <span class="slabel">Finance</span>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:12px;">
      <div><div style="font-size:9px;font-family:var(--mono);color:${C.muted};">INCOME</div><div style="font-size:26px;font-weight:700;color:${C.green};font-family:var(--mono);">₹${income.toFixed(0)}</div></div>
      <div><div style="font-size:9px;font-family:var(--mono);color:${C.muted};">EXPENSES</div><div style="font-size:26px;font-weight:700;color:${C.red};font-family:var(--mono);">₹${expense.toFixed(0)}</div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid ${C.border};"><span style="font-size:12px;font-family:var(--mono);color:${C.muted};">Net Balance</span><span style="font-size:20px;font-weight:700;font-family:var(--mono);color:${income - expense >= 0 ? C.green : C.red};">₹${(income - expense).toFixed(0)}</span></div>
  </div>
</div>`;
}

/* ══════════════════════════════════
   ANNUAL VIEW
══════════════════════════════════ */
function vAnnual() {
  const y = S.annYear, thisYear = new Date().getFullYear();
  const ys = new Date(y, 0, 1), ye = y === thisYear ? new Date() : new Date(y, 11, 31);
  const totalDays = Math.floor((ye - ys) / 864e5) + 1;
  const allDays = Array.from({ length: totalDays }, (_, i) => addDays(ys, i)),
    allPlans = allDays.map((d) => S.dayPlans[dk(d)] || emptyPlan(d));
  const totalSteps = allPlans.reduce((s, p) => s + (p.steps || 0), 0);
  const totalIncome = allPlans.reduce((s, p) => s + sumMoney(p, "income"), 0);
  const totalExpense = allPlans.reduce((s, p) => s + sumMoney(p, "expense"), 0);
  const daysLogged = allPlans.filter((p) => S.dayPlans[p.id]).length;
  const habitsCompleted = allPlans.reduce((s, p) => s + p.habitsDone.length, 0);
  const moodDays = allPlans.filter((p) => p.mood != null);
  const avgMood = moodDays.length > 0 ? moodDays.reduce((s, p) => s + p.mood, 0) / moodDays.length : null;
  const bestStreakH = S.habits.reduce((b, h) => (h.longestStreak || 0) > b.val ? { name: h.name, val: h.longestStreak || 0 } : b, { name: "—", val: 0 });
  const heatDays = allDays;
  const heatWeeks = [];
  for (let i = 0; i < heatDays.length; i += 7) heatWeeks.push(heatDays.slice(i, i + 7));
  const monthData = Array.from({ length: 12 }, (_, mi) => {
    const mDays = Array.from({ length: new Date(y, mi + 1, 0).getDate() }, (_, i) => new Date(y, mi, i + 1));
    const mPlans = mDays.map((d) => getDayPlan(d));
    return {
      name: MONTHS_S[mi],
      steps: mPlans.reduce((s, p) => s + (p.steps || 0), 0),
      income: mPlans.reduce((s, p) => s + sumMoney(p, "income"), 0),
      expense: mPlans.reduce((s, p) => s + sumMoney(p, "expense"), 0),
      habits: mPlans.reduce((s, p) => s + p.habitsDone.length, 0),
      moodDays: mPlans.filter((p) => p.mood != null),
    };
  });
  const maxSteps = Math.max(...monthData.map((m) => m.steps), 1),
    maxHabits = Math.max(...monthData.map((m) => m.habits), 1),
    maxExpense = Math.max(...monthData.map((m) => m.expense), 1);
  const ranked = S.habits.map((h) => {
    const allowedDays = allDays.filter((d) => habitAllowedOnDate(h, d));
    const done = allowedDays.filter((d) => (getDayPlan(d).habitsDone || []).includes(h.id)).length;
    const pct = allowedDays.length ? done / allowedDays.length : 0;
    return { h, done, pct };
  }).sort((a, b) => b.done - a.done);

  function actColor(plan) {
    const intensity = S.habits.length > 0 ? plan.habitsDone.length / S.habits.length : 0;
    const hasAny = plan.habitsDone.length > 0 || plan.mood != null || plan.steps > 0 || plan.notes;
    if (!hasAny) return `${C.muted}18`;
    return `rgba(200,241,53,${0.2 + intensity * 0.8})`;
  }
  function moodColor(plan) {
    if (plan.mood === null || plan.mood === undefined) return null;
    return (["#8B1A1A", "#8B4A1A", "#6B6A1A", "#2A6B3A", "#1A8B4A"][plan.mood] || null);
  }

  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
  <button class="nav-arrow" onclick="S.annYear--;renderContent();">‹</button>
  <div style="font-size:20px;font-weight:700;">${y} Annual Report</div>
  <button class="nav-arrow" onclick="if(S.annYear<${thisYear}){S.annYear++;renderContent();}" style="opacity:${y < thisYear ? 1 : 0.3};">›</button>
</div>
<div class="sg4">${statTile("Days Logged", String(daysLogged), C.accent, "📅")}${statTile("Total Steps", totalSteps >= 1000 ? Math.round(totalSteps / 1000) + "k" : String(totalSteps), C.blue, "👟")}${statTile("Habits Done", String(habitsCompleted), C.green, "🔥")}${statTile("Net Money", `₹${Math.round(totalIncome - totalExpense)}`, totalIncome >= totalExpense ? C.green : C.red, "💰")}</div>
<div class="sg2">${statTile("Avg Mood", avgMood != null ? `${MOODS[Math.round(avgMood)]?.emoji} ${(avgMood + 1).toFixed(1)}` : "—", C.yellow, "😊")}${statTile("Best Streak", `${bestStreakH.val}d`, C.orange, "🏆")}</div>

<div class="card card-solo">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span class="slabel" style="margin-bottom:0;">Activity Heatmap</span><div style="display:flex;gap:4px;align-items:center;"><span style="font-size:9px;font-family:var(--mono);color:${C.muted};">LESS</span>${[0.1, 0.3, 0.55, 0.75, 1].map((v) => `<div style="width:10px;height:10px;border-radius:2px;background:rgba(200,241,53,${v});"></div>`).join("")}<span style="font-size:9px;font-family:var(--mono);color:${C.muted};">MORE</span></div></div>
  <div class="annual-hm">${heatWeeks.map((week) => `<div class="annual-col">${week.map((day) => { const pp = getDayPlan(day), bg = actColor(pp), isTdy = isToday(day); return `<div class="ahm-cell" style="background:${bg};${isTdy ? `outline:1.5px solid ${C.accent};outline-offset:1px;` : ""}"></div>`; }).join("")}</div>`).join("")}</div>
</div>

<div class="card card-solo">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span class="slabel" style="margin-bottom:0;">Mood Heatmap</span>
    <div style="display:flex;gap:5px;">${MOODS.map((m) => `<div style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:99px;background:${m.color};"></div><span style="font-size:8px;font-family:var(--mono);color:${C.muted};">${m.label}</span></div>`).join("")}</div>
  </div>
  <div class="annual-hm">${heatWeeks.map((week) => `<div class="annual-col">${week.map((day) => { const pp = getDayPlan(day), mc = moodColor(pp), isTdy = isToday(day); return `<div class="ahm-cell" style="background:${mc || C.muted + "18"};${isTdy ? `outline:1.5px solid ${C.green};outline-offset:1px;` : ""}"></div>`; }).join("")}</div>`).join("")}</div>
</div>

<div class="card card-solo"><span class="slabel">Month-by-Month</span><div class="ann-months">${monthData.map((m, mi) => {
  const isCurrent = mi === new Date().getMonth() && y === thisYear;
  const mAvgMood = m.moodDays.length > 0 ? m.moodDays.reduce((s, p) => s + p.mood, 0) / m.moodDays.length : null;
  return `<div class="ann-month-card" style="${isCurrent ? `border-color:${C.accent}40;` : ""}"><div class="ann-month-name" style="${isCurrent ? `color:${C.accent};` : ""}">${m.name}</div><div class="ann-bar-row"><span class="ann-bar-label" style="color:${C.blue};">👟</span><div class="ann-bar-track"><div class="ann-bar-fill" style="width:${(m.steps / maxSteps) * 100}%;background:${C.blue};"></div></div><span class="ann-bar-val" style="color:${C.blue};">${m.steps >= 1000 ? Math.round(m.steps / 1000) + "k" : m.steps}</span></div><div class="ann-bar-row"><span class="ann-bar-label" style="color:${C.accent};">🔥</span><div class="ann-bar-track"><div class="ann-bar-fill" style="width:${(m.habits / maxHabits) * 100}%;background:${C.accent};"></div></div><span class="ann-bar-val" style="color:${C.accent};">${m.habits}</span></div><div class="ann-bar-row"><span class="ann-bar-label" style="color:${C.red};">💸</span><div class="ann-bar-track"><div class="ann-bar-fill" style="width:${(m.expense / maxExpense) * 100}%;background:${C.red};"></div></div><span class="ann-bar-val" style="color:${C.red};">₹${Math.round(m.expense)}</span></div>${mAvgMood != null ? `<div style="text-align:center;margin-top:6px;font-size:16px;">${MOODS[Math.round(mAvgMood)]?.emoji || ""}</div>` : '<div style="margin-top:10px;height:20px;"></div>'}</div>`;
}).join("")}</div></div>

<!-- Habit performance + Mood distribution -->
<div class="card-pair">
  <div class="card">
    <span class="slabel">Habit Performance — ${y}</span>
    ${ranked.length === 0 ? `<div style="font-size:12px;font-family:var(--mono);color:${C.muted};">No habits tracked</div>` : ""}
    ${ranked.map(({ h, done, pct }, i) => `<div style="margin-bottom:12px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;min-width:0;"><span style="font-size:12px;font-family:var(--mono);color:${C.muted};width:20px;flex-shrink:0;">#${i + 1}</span><span style="flex-shrink:0;">${h.emoji}</span><span style="flex:1;font-size:13px;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${esc(h.name)}</span><span style="font-size:11px;font-family:var(--mono);color:${h.color};flex-shrink:0;">${done}d · ${Math.round(pct * 100)}%</span></div>${pbar(pct, h.color)}</div>`).join("")}
  </div>
  <div class="card">
    <span class="slabel">Mood Distribution</span>
    <div style="display:flex;gap:8px;align-items:flex-end;height:100px;">${MOODS.map((mood) => {
      const cnt = allPlans.filter((p) => p.mood === mood.id).length,
        h = moodDays.length > 0 ? Math.max((cnt / moodDays.length) * 70, 2) : 2;
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;justify-content:flex-end;"><div style="font-size:9px;font-family:var(--mono);color:${C.muted};">${cnt}</div><div style="width:100%;height:${h}px;background:${mood.color};border-radius:3px 3px 0 0;"></div><div style="font-size:16px;">${mood.emoji}</div></div>`;
    }).join("")}</div>
  </div>
</div>

<div class="card card-solo"><span class="slabel">Finance — ${y}</span><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px;"><div style="text-align:center;"><div style="font-size:9px;font-family:var(--mono);color:${C.muted};">INCOME</div><div style="font-size:20px;font-weight:700;color:${C.green};font-family:var(--mono);">₹${Math.round(totalIncome)}</div></div><div style="text-align:center;"><div style="font-size:9px;font-family:var(--mono);color:${C.muted};">EXPENSES</div><div style="font-size:20px;font-weight:700;color:${C.red};font-family:var(--mono);">₹${Math.round(totalExpense)}</div></div><div style="text-align:center;"><div style="font-size:9px;font-family:var(--mono);color:${C.muted};">NET</div><div style="font-size:20px;font-weight:700;color:${totalIncome >= totalExpense ? C.green : C.red};font-family:var(--mono);">₹${Math.round(totalIncome - totalExpense)}</div></div></div>${pbar(totalExpense / (totalIncome || 1), C.red, 8)}<div style="display:flex;justify-content:space-between;margin-top:4px;font-size:10px;font-family:var(--mono);color:${C.muted};"><span>Savings: ${totalIncome > 0 ? Math.round((1 - totalExpense / totalIncome) * 100) : 0}%</span><span>${Math.round((totalExpense / (totalIncome || 1)) * 100)}% spent</span></div></div>`;
}

/* ══════════════════════════════════
   INSIGHTS VIEW
══════════════════════════════════ */
function vInsights() {
  const l30 = Array.from({ length: 30 }, (_, i) => addDays(new Date(), -i)), p30 = l30.map((d) => getDayPlan(d));
  const habRate = S.habits.length > 0 ? p30.reduce((s, p) => s + p.habitsDone.length, 0) / (S.habits.length * 30) : 0;
  const allT = p30.reduce((s, p) => s + (p.todos || []).length, 0),
    doneT = p30.reduce((s, p) => s + (p.todos || []).filter((i) => i.isDone).length, 0);
  const taskRate = allT > 0 ? doneT / allT : 0,
    moodDays = p30.flatMap((p) => (p.mood != null ? [p.mood] : [])),
    moodRate = moodDays.length / 30;
  const spend = p30.reduce((s, p) => s + sumMoney(p, "expense"), 0);
  const totalSteps30 = p30.reduce((s, p) => s + (p.steps || 0), 0),
    stepsGoalDays = p30.filter((p) => (p.steps || 0) >= STEPS_GOAL).length;
  const insights = [];
  if (S.habits.length > 0) {
    if (habRate > 0.8) insights.push({ title: "🏆 Excellent Habits!", body: `${Math.round(habRate * 100)}% completion!`, type: "success", icon: "🏆" });
    else if (habRate > 0.5) insights.push({ title: "📈 Good Habit Rate", body: `${Math.round(habRate * 100)}% completion. Keep going!`, type: "warning", icon: "📈" });
    else insights.push({ title: "⚠️ Habits Need Attention", body: `Only ${Math.round(habRate * 100)}%.`, type: "danger", icon: "⚠️" });
  }
  if (stepsGoalDays > 20) insights.push({ title: "🚶 Step Goal Crusher!", body: `Hit ${STEPS_GOAL.toLocaleString()} on ${stepsGoalDays}/30 days!`, type: "success", icon: "👟" });
  else if (stepsGoalDays < 5 && totalSteps30 > 0) insights.push({ title: "👟 Walk More", body: `Only ${stepsGoalDays} days hitting step goal.`, type: "warning", icon: "🚶" });
  if (spend > 1000) insights.push({ title: "💸 High Spending", body: `₹${Math.round(spend)} in 30 days.`, type: "danger", icon: "💳" });
  else if (spend > 0) insights.push({ title: "✅ Spending in Check", body: `₹${Math.round(spend)} in 30 days.`, type: "success", icon: "✅" });
  if (moodDays.length > 5) {
    const avg = moodDays.reduce((a, b) => a + b, 0) / moodDays.length;
    if (avg >= 3) insights.push({ title: `${MOODS[Math.round(avg)]?.emoji} Great Mood`, body: `Average: ${MOODS[Math.round(avg)]?.label}`, type: "success", icon: "😊" });
    else if (avg < 2) insights.push({ title: "😔 Low Mood", body: "Consider exercise & sleep.", type: "danger", icon: "❤️" });
  }
  const gw = p30.filter((p) => (p.waterGlasses || 0) >= 6).length;
  if (gw > 20) insights.push({ title: "💧 Great Hydration!", body: `${gw}/30 days with 6+ glasses.`, type: "success", icon: "💧" });
  else if (gw < 10) insights.push({ title: "💧 Drink More Water", body: `Only ${gw} days with enough hydration.`, type: "warning", icon: "💧" });
  if (taskRate > 0.75) insights.push({ title: "✅ High Productivity", body: `${Math.round(taskRate * 100)}% of tasks done!`, type: "success", icon: "📋" });
  if (insights.length === 0) insights.push({ title: "📊 Start Logging!", body: "Insights appear as you log daily.", type: "info", icon: "📊" });
  const iC = { success: C.green, warning: C.yellow, danger: C.red, info: C.blue };
  const moodHist = l30.slice().reverse().map((d) => getDayPlan(d).mood);
  const ranked = S.habits.map((h) => {
    const allowedDays = l30.filter((d) => habitAllowedOnDate(h, d));
    const done = allowedDays.filter((d) => (getDayPlan(d).habitsDone || []).includes(h.id)).length;
    const pct = allowedDays.length ? done / allowedDays.length : 0;
    return { h, d: done, pct };
  }).sort((a, b) => b.d - a.d);

  return `<div class="card card-solo"><span class="slabel">30-Day Overview</span><div style="display:flex;justify-content:space-around;flex-wrap:wrap;gap:12px;">${[
    ["Habits", habRate, C.accent],
    ["Tasks", taskRate, C.blue],
    ["Logged", moodRate, C.yellow],
    ["Steps", stepsGoalDays / 30, C.green],
  ].map(([l, p, col]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">${ring(p, col, 68, `<span style="font-size:13px;font-weight:700;color:${C.text};">${Math.round(p * 100)}%</span>`)}<span style="font-size:9px;font-family:var(--mono);color:${C.muted};">${l}</span></div>`).join("")}</div></div>
<div class="sg2">${statTile("30d Steps", totalSteps30 >= 1000 ? Math.round(totalSteps30 / 1000) + "k" : String(totalSteps30), C.blue, "👟")}${statTile("Goal Days", `${stepsGoalDays}/30`, C.green, "🎯")}</div>
${insights.map((ins) => `<div class="ins-card" style="border:1px solid ${iC[ins.type]}40;"><div class="ins-icon-wrap" style="background:${iC[ins.type]}20;">${ins.icon}</div><div><div style="font-size:14px;font-weight:600;margin-bottom:4px;">${ins.title}</div><div style="font-size:12px;font-family:var(--mono);color:${C.muted};">${ins.body}</div></div></div>`).join("")}

<!-- Mood chart + Habit leaderboard -->
<div class="card-pair">
  <div class="card">
    <span class="slabel">Mood — Last 30 Days</span>
    <div style="display:flex;align-items:flex-end;gap:3px;height:60px;">
      ${moodHist.map((m) => {
        const safe = Number.isInteger(m) && m >= 0 && m < MOODS.length;
        return `<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;"><div style="background:${safe ? MOODS[m].color : C.muted + "20"};border-radius:3px;height:${safe ? `${(m + 1) * 12}px` : "4px"};"></div></div>`;
      }).join("")}
    </div>
    <div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;">
      ${MOODS.map((m) => `<div style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:99px;background:${m.color};"></div><span style="font-size:8px;font-family:var(--mono);color:${C.muted};">${m.label}</span></div>`).join("")}
    </div>
  </div>
  <div class="card">
    <span class="slabel">Habit Leaderboard — 30 Days</span>
    ${ranked.length === 0 ? `<div style="font-size:12px;font-family:var(--mono);color:${C.muted};">No habits yet</div>` : ""}
    ${ranked.map(({ h, d, pct }, i) => `<div style="margin-bottom:12px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;min-width:0;"><span style="font-size:12px;font-family:var(--mono);color:${C.muted};width:20px;flex-shrink:0;">#${i + 1}</span><span style="flex-shrink:0;">${h.emoji}</span><span style="flex:1;font-size:13px;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${esc(h.name)}</span><span style="font-size:11px;font-family:var(--mono);color:${h.color};flex-shrink:0;">${d}/${l30.filter((d) => habitAllowedOnDate(h, d)).length}</span></div>${pbar(pct, h.color)}</div>`).join("")}
  </div>
</div>`;
}

/* ══════════════════════════════════
   PROFILE VIEW
══════════════════════════════════ */
function vProfile() {
  const p = S.profile, initials = p.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const bestStreak = S.habits.reduce((b, h) => ((h.longestStreak || 0) > b ? h.longestStreak || 0 : b), 0);
  const bestH = S.habits.find((h) => h.longestStreak === bestStreak);
  const densities = [
    { id: "compact", icon: "▤", label: "Compact" },
    { id: "comfortable", icon: "▥", label: "Comfortable" },
    { id: "spacious", icon: "▦", label: "Spacious" },
  ];
  const yearSteps = Array.from({ length: 365 }, (_, i) => addDays(new Date(new Date().getFullYear(), 0, 1), i)).reduce((s, d) => s + (getDayPlan(d).steps || 0), 0);
  const bestStreakLabel = bestH ? `${bestH.longestStreak || 0}d · ${(bestH.name || "").slice(0, 16)}${(bestH.name || "").length > 16 ? "…" : ""}` : null;

  return `
<div class="card-pair">
  <div class="card">
    <div style="display:flex;align-items:center;gap:14px;">
      <div class="profile-ava">${initials}</div>
      <div style="min-width:0;">
        <div style="font-size:18px;font-weight:600;word-break:break-word;overflow-wrap:break-word;white-space:normal;">${esc(p.fullName)}</div>
        <div style="font-size:11px;font-family:var(--mono);color:${C.muted};">Joined ${fmt(p.joinDate, { month: "short", day: "numeric", year: "numeric" })}</div>
      </div>
    </div>
  </div>
  <div class="card">
    <span class="slabel">Your Stats</span>
    ${[
      ["📅", "Days logged", Object.keys(S.dayPlans).length],
      ["🔥", "Habits tracked", S.habits.length],
      ["👟", "Steps this year", yearSteps.toLocaleString()],
      bestH ? ["🏆", "Best streak", bestStreakLabel] : null,
    ]
      .filter(Boolean)
      .map(([icon, label, value]) => `<div class="stat-row"><span style="font-size:14px;">${icon} ${label}</span><span style="font-size:13px;color:${C.muted};font-family:var(--mono);word-break:break-word;overflow-wrap:break-word;white-space:normal;max-width:120px;">${value}</span></div>`)
      .join("")}
  </div>
</div>

<div class="card card-solo">
  <span class="slabel">View Density</span>
  <div style="display:flex;gap:8px;">
    ${densities.map((d) => `<button onclick="setDensity('${d.id}')" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 8px;border-radius:12px;border:1.5px solid ${S.density === d.id ? C.accent : C.border};background:${S.density === d.id ? C.accent + "18" : "none"};cursor:pointer;"><span style="font-size:20px;color:${S.density === d.id ? C.accent : C.muted};">${d.icon}</span><span style="font-size:11px;font-family:var(--mono);font-weight:700;color:${S.density === d.id ? C.accent : C.muted};">${d.label.toUpperCase()}</span></button>`).join("")}
  </div>
</div>

<div class="card card-solo">
  <span class="slabel">Data & Backup</span>
  <div style="font-size:11px;color:${C.muted};margin-bottom:14px;padding:10px;background:${C.surface2};border-radius:8px;line-height:1.6;">✅ All data stored <strong style="color:${C.text};">locally on your device</strong>. No server, no account.</div>
  <button class="btn btn-g btn-full" style="margin-bottom:8px;" onclick="exportData()">📤 Export Data (JSON)</button>
  <button class="btn btn-g btn-full" style="margin-bottom:8px;color:${C.accent};border-color:${C.accent}40;" onclick="document.getElementById('importFile').click()">📥 Import Data (JSON)</button>
  <input type="file" id="importFile" accept=".json" style="display:none;" onchange="importData(this)"/>
  <button class="btn btn-g btn-full" onclick="confirmClear()" style="background:${C.red}20;border:1px solid ${C.red}40;color:${C.red};border-radius:10px;padding:10px 16px;cursor:pointer;font-size:14px;width:100%;text-align:left;">🗑 Clear All Data</button>
</div>
<div class="card card-solo" style="text-align:center;"><div style="font-size:13px;font-weight:600;margin-bottom:4px;">Life Planner</div><div style="font-size:10px;font-family:var(--mono);color:${C.muted};">v2.1 · Offline · No account needed</div></div>`;
}

/* ══════════════════════════════════
   MODAL
══════════════════════════════════ */
function renderModal() {
  document.getElementById("modalOverlay")?.remove();
  if (!S.modal) return;
  const div = document.createElement("div");
  div.id = "modalOverlay";
  div.className = "modal-bg";
  div.onclick = (e) => { if (e.target === div) { S.modal = null; renderModal(); } };
  div.innerHTML = `<div class="modal-sheet">${buildModal(S.modal)}</div>`;
  document.body.appendChild(div);
  setTimeout(() => div.querySelector("[autofocus]")?.focus(), 80);
}
function closeModal() {
  S.modal = null;
  renderModal();
}
function buildModal(m) {
  if (m.type === "addText")
    return `<div class="modal-hd"><div class="modal-title">Add Task</div><button style="font-size:22px;color:${C.muted};" onclick="closeModal()">×</button></div><input autofocus type="text" id="mText" placeholder="Enter task…" onkeydown="if(event.key==='Enter')submitText()"/><div style="display:flex;gap:10px;margin-top:14px;"><button class="btn btn-g" style="flex:1;" onclick="closeModal()">Cancel</button><button class="btn btn-a" style="flex:1;" onclick="submitText()">Add</button></div>`;
  if (m.type === "addSched")
    return `<div class="modal-hd"><div class="modal-title">Add Schedule Item</div><button style="font-size:22px;color:${C.muted};" onclick="closeModal()">×</button></div><div class="form-lbl" style="margin-top:0;">TIME</div><input type="time" id="mSchedTime" value="09:00" style="margin-bottom:10px;"/><div class="form-lbl">WHAT</div><input autofocus type="text" id="mSchedText" placeholder="e.g. Team meeting, Gym, Lunch…" onkeydown="if(event.key==='Enter')submitSched()"/><div style="display:flex;gap:10px;margin-top:16px;"><button class="btn btn-g" style="flex:1;" onclick="closeModal()">Cancel</button><button class="btn btn-a" style="flex:1;" onclick="submitSched()">Add</button></div>`;
  if (m.type === "addMoney") {
    const isInc = S._mType === "income";
    return `<div class="modal-hd"><div class="modal-title">Add Transaction</div><button style="font-size:22px;color:${C.muted};" onclick="closeModal()">×</button></div><div style="display:flex;gap:8px;margin-bottom:14px;"><button onclick="document.activeElement?.blur();S._mType='expense';renderModal();" style="flex:1;padding:10px 0;border-radius:8px;border:1.5px solid ${!isInc ? C.red : C.border};background:${!isInc ? C.red + "20" : "none"};color:${!isInc ? C.red : C.muted};cursor:pointer;font-weight:600;font-size:13px;">Expense</button><button onclick="document.activeElement?.blur();S._mType='income';renderModal();" style="flex:1;padding:10px 0;border-radius:8px;border:1.5px solid ${isInc ? C.green : C.border};background:${isInc ? C.green + "20" : "none"};color:${isInc ? C.green : C.muted};cursor:pointer;font-weight:600;font-size:13px;">Income</button></div><input autofocus type="text" id="mMoneyDesc" placeholder="Description" style="margin-bottom:10px;"/><input type="number" id="mMoneyAmt" placeholder="Amount" min="0" step="0.01" inputmode="decimal" style="margin-bottom:10px;"/><input type="text" id="mMoneyCat" placeholder="Category (optional)" style="margin-bottom:16px;"/><div style="display:flex;gap:10px;"><button class="btn btn-g" style="flex:1;" onclick="closeModal()">Cancel</button><button class="btn btn-a" style="flex:1;" onclick="submitMoney()">Add</button></div>`;
  }
  if (m.type === "addHabit" || m.type === "editHabit") {
    const h = m.habit || {}, f = S._hForm;
    return `<div class="modal-hd"><div class="modal-title">${m.type === "editHabit" ? "Edit Habit" : "New Habit"}</div><button style="font-size:22px;color:${C.muted};" onclick="closeModal()">×</button></div><div class="form-lbl" style="margin-top:0;">NAME & ICON</div><div style="display:flex;gap:8px;margin-bottom:10px;"><input type="text" id="hbEmoji" value="${f.emoji}" style="width:54px;flex-shrink:0;" oninput="S._hForm.emoji=this.value"/><input autofocus type="text" id="hbName" value="${esc(S._hForm._name != null ? S._hForm._name : (h ? h.name || '' : ''))}" placeholder="Habit name" style="flex:1;"/></div><div class="emoji-grid">${HABIT_EMOJIS.map((e) => `<button class="ep-btn" onclick="pickE('${e}')" style="background:${f.emoji === e ? f.color + "30" : "none"};border-color:${f.emoji === e ? f.color : "transparent"};">${e}</button>`).join("")}</div><div class="form-lbl">COLOR</div><div class="color-row">${HABIT_COLORS.map((col) => `<button class="cp-dot" onclick="pickC('${col}')" style="background:${col};border-color:${f.color === col ? "white" : "transparent"};"></button>`).join("")}</div><div class="form-lbl">FREQUENCY</div><div style="display:flex;gap:8px;margin-bottom:18px;">${FREQ.map((fr) => `<button onclick="pickF('${fr}')" style="flex:1;padding:10px 0;border-radius:8px;border:1.5px solid ${f.frequency === fr ? f.color : C.border};background:${f.frequency === fr ? f.color + "20" : "none"};color:${f.frequency === fr ? f.color : C.muted};cursor:pointer;font-size:12px;font-weight:600;">${fr}</button>`).join("")}</div><div style="display:flex;gap:10px;"><button class="btn btn-g" style="flex:1;" onclick="closeModal()">Cancel</button><button class="btn" style="flex:1;background:${f.color};color:#000;" onclick="submitHabit('${h.id || ""}')">${m.type === "editHabit" ? "Save" : "Add"}</button></div>`;
  }
  if (m.type === "jumpDate")
    return `<div class="modal-hd"><div class="modal-title">Go to Date</div><button style="font-size:22px;color:${C.muted};" onclick="closeModal()">×</button></div><div class="form-lbl" style="margin-top:0;">SELECT DATE</div><input type="date" id="mJumpDate" value="${dk(S.selDate)}" max="${dk(new Date())}" style="margin-bottom:16px;font-size:15px;"/><div style="display:flex;gap:10px;"><button class="btn btn-g" style="flex:1;" onclick="closeModal()">Cancel</button><button class="btn btn-a" style="flex:1;" onclick="submitJumpDate()">Go</button></div>`;
  return "";
}

/* ══════════════════════════════════
   ACTIONS
══════════════════════════════════ */
function navDate(n) {
  const next = addDays(S.selDate, n);
  const tmr = new Date();
  tmr.setHours(23, 59, 59, 999);
  if (n > 0 && next > tmr) return;
  S.selDate = next;
  renderContent();
}
function goToday() { S.selDate = new Date(); renderContent(); }
function jumpToDate(isoKey) {
  const parts = isoKey.split("-");
  S.selDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  S.tab = "daily";
  render();
}
function openJumpDate() { S.modal = { type: "jumpDate" }; renderModal(); }
function submitJumpDate() {
  const v = document.getElementById("mJumpDate")?.value;
  if (!v) return;
  const parts = v.split("-");
  S.selDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  closeModal();
  renderContent();
}
function setMood(id) {
  const p = getDayPlan(S.selDate);
  patchDay(S.selDate, { mood: p.mood === id ? null : id });
  renderContent();
}
function setWeather(id) {
  const p = getDayPlan(S.selDate);
  patchDay(S.selDate, { weather: p.weather === id ? null : id });
  renderContent();
}
function setWater(n) {
  const p = getDayPlan(S.selDate);
  patchDay(S.selDate, { waterGlasses: p.waterGlasses === n ? n - 1 : n });
  renderContent();
}
function setSteps(n) {
  patchDay(S.selDate, { steps: Math.max(0, n) });
  // Do not call renderContent() here — the steps input is still focused on
  // Android after onchange fires, and rebuilding innerHTML closes the keyboard.
  // A full render will happen when the user taps elsewhere (blur → no keyboard).
}
// saveNote/saveExercise: persist only, no render — textarea keeps focus
function saveNote(v) { patchDay(S.selDate, { notes: v }); }
function saveExercise(v) { patchDay(S.selDate, { exerciseNote: v }); }
function toggleCL(field, id) {
  const p = getDayPlan(S.selDate);
  p[field] = (p[field] || []).map((i) => i.id === id ? { ...i, isDone: !i.isDone } : i);
  saveDayPlan(p);
  renderContent();
}
function deleteCL(field, id) {
  const p = getDayPlan(S.selDate);
  p[field] = (p[field] || []).filter((i) => i.id !== id);
  saveDayPlan(p);
  renderContent();
}
function openAddText(field) { S.modal = { type: "addText", field }; renderModal(); }
function submitText() {
  const text = document.getElementById("mText")?.value.trim();
  if (!text) return;
  const p = getDayPlan(S.selDate);
  p[S.modal.field] = [...(p[S.modal.field] || []), { id: uid(), text, isDone: false }];
  saveDayPlan(p);
  closeModal();
  renderContent();
}
function openSchedModal() { S.modal = { type: "addSched" }; renderModal(); }
function submitSched() {
  const time = document.getElementById("mSchedTime")?.value || "09:00";
  const text = document.getElementById("mSchedText")?.value.trim();
  if (!text) return;
  const p = getDayPlan(S.selDate);
  const items = [...(p.scheduleItems || []), { id: uid(), time: fmtTime(time), text, _raw: time }];
  items.sort((a, b) => a._raw.localeCompare(b._raw));
  p.scheduleItems = items;
  saveDayPlan(p);
  closeModal();
  renderContent();
}
function deleteSchedItem(idx) {
  const p = getDayPlan(S.selDate);
  p.scheduleItems = (p.scheduleItems || []).filter((_, i) => i !== idx);
  saveDayPlan(p);
  renderContent();
}
function openAddMoney() { S._mType = "expense"; S.modal = { type: "addMoney" }; renderModal(); }
function submitMoney() {
  const desc = document.getElementById("mMoneyDesc")?.value.trim();
  const amt = parseFloat(document.getElementById("mMoneyAmt")?.value);
  const cat = document.getElementById("mMoneyCat")?.value.trim();
  if (!desc || !amt || amt <= 0) return;
  const p = getDayPlan(S.selDate);
  p.moneyEntries = [...(p.moneyEntries || []), { id: uid(), type: S._mType, description: desc, amount: amt, category: cat }];
  saveDayPlan(p);
  closeModal();
  renderContent();
}
function deleteMoney(id) {
  const p = getDayPlan(S.selDate);
  p.moneyEntries = (p.moneyEntries || []).filter((e) => e.id !== id);
  saveDayPlan(p);
  renderContent();
}
function toggleHabitDay(habitId) {
  const d = S.selDate, p = getDayPlan(d), h = S.habits.find((x) => x.id === habitId);
  if (!h) return;
  if (!habitAllowedOnDate(h, d)) return;
  const was = (p.habitsDone || []).includes(habitId);
  p.habitsDone = was ? p.habitsDone.filter((i) => i !== habitId) : [...(p.habitsDone || []), habitId];
  saveDayPlan(p);
  S.habits = S.habits.map((h) => {
    if (h.id !== habitId) return h;
    const newStreak = calcHabitStreak(habitId);
    return { ...h, currentStreak: newStreak, longestStreak: Math.max(h.longestStreak || 0, newStreak) };
  });
  saveHabits();
  renderContent();
}
function habitAllowedOnDate(habit, date) {
  const d = new Date(date).getDay();
  if (habit.frequency === "Daily") return true;
  if (habit.frequency === "Weekdays") return d >= 1 && d <= 5;
  if (habit.frequency === "Weekends") return d === 0 || d === 6;
  return true;
}
function calcHabitStreak(habitId) {
  const habit = S.habits.find((h) => h.id === habitId);
  if (!habit) return 0;
  let streak = 0, d = new Date();
  const limit = new Date(S.profile?.joinDate || 0);
  while (d >= limit) {
    const p = getDayPlan(d);
    if (!habitAllowedOnDate(habit, d)) { d = addDays(d, -1); continue; }
    if ((p.habitsDone || []).includes(habitId)) { streak++; d = addDays(d, -1); } else { break; }
  }
  return streak;
}
function sumMoney(plan, type) {
  return (plan.moneyEntries || []).filter((e) => e.type === type).reduce((a, e) => a + e.amount, 0);
}
function openHabitModal(id) {
  const h = id ? S.habits.find((x) => x.id === id) : null;
  S._hForm = { emoji: h?.emoji || "✨", color: h?.color || HABIT_COLORS[0], frequency: h?.frequency || "Daily", _name: h?.name || "" };
  S.modal = { type: id ? "editHabit" : "addHabit", habit: h };
  renderModal();
}
function _saveHbName() {
  const el = document.getElementById("hbName");
  if (el) S._hForm._name = el.value;
}
function pickE(e) {
  document.activeElement?.blur();
  _saveHbName();
  S._hForm.emoji = e;
  const el = document.getElementById("hbEmoji");
  if (el) el.value = e;
  renderModal();
}
function pickC(c) { document.activeElement?.blur(); _saveHbName(); S._hForm.color = c; renderModal(); }
function pickF(f) { document.activeElement?.blur(); _saveHbName(); S._hForm.frequency = f; renderModal(); }
function deleteHabit(id) {
  if (!confirm("Delete this habit?")) return;
  S.habits = S.habits.filter((h) => h.id !== id);
  const todayKey = dk(new Date());
  if (S.dayPlans[todayKey]) {
    S.dayPlans[todayKey].habitsDone = (S.dayPlans[todayKey].habitsDone || []).filter((h) => h !== id);
  }
  saveHabits();
  savePlans();
  recalculateAllStreaks();
  renderContent();
}
function submitHabit(editId) {
  const name = document.getElementById("hbName")?.value.trim();
  if (!name) return;
  const f = S._hForm;
  if (editId) {
    S.habits = S.habits.map((h) => h.id === editId ? { ...h, name, emoji: f.emoji, color: f.color, frequency: f.frequency } : h);
  } else {
    S.habits.push({ id: uid(), name, emoji: f.emoji || "✨", color: f.color || HABIT_COLORS[0], frequency: f.frequency || "Daily", currentStreak: 0, longestStreak: 0, order: S.habits.length });
  }
  saveHabits();
  closeModal();
  renderContent();
}
function calSel(iso, isSel) { S.selCalDay = isSel === "true" ? null : iso; renderContent(); }
function setDensity(d) { S.density = d; saveDensity(); renderContent(); }
function exportData() {
  const blob = new Blob([JSON.stringify({ profile: S.profile, dayPlans: S.dayPlans, habits: S.habits }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "lifeplanner-backup.json";
  a.click();
}
function importData(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.dayPlans) { S.dayPlans = data.dayPlans; Object.keys(planCache).forEach((k) => delete planCache[k]); }
      if (data.profile) S.profile = data.profile;
      if (Array.isArray(data.habits)) {
        const ids = new Set(S.habits.map((h) => h.id));
        S.habits = [...S.habits, ...data.habits.filter((h) => !ids.has(h.id))];
      }
      recalculateAllStreaks();
      savePlans();
      saveHabits();
      saveProfile();
      input.value = "";
      alert("✅ Import successful!");
      renderContent();
    } catch (err) {
      alert("❌ Import failed: " + err.message);
    }
  };
  reader.readAsText(file);
}
function confirmClear() {
  if (confirm("Delete all data permanently?") && confirm("This cannot be undone.")) {
    ["lp_dayPlans", "lp_habits", "lp_profile"].forEach((k) => localStorage.removeItem(k));
    location.reload();
  }
}
function recalculateAllStreaks() {
  S.habits = S.habits.map((h) => {
    const streak = calcHabitStreak(h.id);
    return { ...h, currentStreak: streak, longestStreak: Math.max(h.longestStreak || 0, streak) };
  });
  saveHabits();
}

/* ══════════════════════════════════
   ONBOARD
══════════════════════════════════ */
function renderOnboard() {
  document.getElementById("header").style.display = "none";
  document.getElementById("content").style.display = "none";
  let el = document.getElementById("onboard");
  if (!el) {
    el = document.createElement("div");
    el.id = "onboard";
    document.getElementById("app").appendChild(el);
  }
  el.innerHTML = `<div class="ob-wrap"><div class="ob-icon">📅</div><h1 class="ob-title">Welcome to<br>Life Planner</h1><p class="ob-sub">Your personal offline planner.<br>Set up your profile to get started.</p><input class="ob-input" id="obName" type="text" placeholder="Your Name" autocomplete="name" oninput="document.getElementById('obBtn').disabled=!this.value.trim()" onkeydown="if(event.key==='Enter'&&this.value.trim())obStart()"/><button class="ob-btn" id="obBtn" onclick="obStart()" disabled>Start Planning →</button><p class="ob-note">All data stored locally · No account · Works offline</p></div>`;
  setTimeout(() => document.getElementById("obName")?.focus(), 200);
}
function obStart() {
  const name = (document.getElementById("obName")?.value || "").trim();
  if (!name) return;
  S.profile = { userID: uid(), fullName: name, joinDate: new Date().toISOString() };
  saveProfile();
  document.getElementById("onboard")?.remove();
  document.getElementById("header").style.display = "";
  document.getElementById("content").style.display = "";
  render();
}

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && S.modal) closeModal(); });

function setVH() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}
setVH();
applyTheme(); // Apply saved theme immediately to avoid flash
updateFavicon(); // Set correct favicon before first paint

let resizeTimeout;
function isKeyboardOpen() {
  // Focused input/textarea means software keyboard is open
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return true;
  // visualViewport API: keyboard open shrinks viewport significantly
  if (window.visualViewport) {
    return window.visualViewport.height < window.innerHeight * 0.75;
  }
  return false;
}

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setVH();
    // Never re-render while the software keyboard is open —
    // doing so destroys the focused input which closes the keyboard,
    // which triggers another resize, creating an infinite flicker loop.
    if (!isKeyboardOpen()) render();
  }, 200);
});

// Use visualViewport resize instead of window resize when available —
// it fires only for layout changes, NOT for keyboard show/hide on Android.
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => { setVH(); }, 100);
  });
}

render();

/* ══════════════════════════════════
   SERVICE WORKER
══════════════════════════════════ */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/service-worker.js");
      console.log("Service Worker registered");
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            alert("New version available. Refresh to update.");
          }
        };
      };
    } catch (err) {
      console.error("Service Worker failed:", err);
    }
  });
}
