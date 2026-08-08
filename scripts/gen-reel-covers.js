const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "assets", "img", "reels");
const W = 540, H = 960;

const COLORS = {
  graphite: "#131519",
  bg2: "#0B0C0F",
  chrome: "#F3F4F1",
  smoke: "#A0A6AF",
  red: "#EE1119"
};

// icon path generators, centered at (0,0), native ~54px wide, stroke-based
// "feather" icons are on a 24x24 grid (Feather Icons, MIT) and get re-centered + rescaled to match
const ICONS = {
  van: { body: `<path d="M-27,8 V-8 a3,3 0 0 1 3,-3 h18 V8"/><path d="M-6,-3.5 h7.4 l6.6,6.2 a3,3 0 0 1 1,2.2 V8 h-5.2"/><circle cx="-20" cy="9.8" r="4"/><circle cx="8.8" cy="9.8" r="4"/><path d="M-16,9.8 h20.8"/><path d="M-27,8 H-22"/><path d="M-20.4,-6 h8.8"/>` },
  toolbox: { body: `<rect x="-24" y="-6" width="48" height="27" rx="3"/><path d="M-9,-6 v-4.5 a4.5,4.5 0 0 1 4.5,-4.5 h9 a4.5,4.5 0 0 1 4.5,4.5 V-6"/><path d="M-24,4 h48"/><path d="M-6.5,4 v6.2 h13 V4"/>` },
  bolt: { body: `<path d="M2,-22 -16,3 h11 l-3,19 21,-25 h-11 z"/>` },
  team: { body: `<circle cx="0" cy="-10" r="8.5"/><path d="M-18,20 c0,-11 8,-16.5 18,-16.5 s18,5.5 18,16.5"/>` },
  // Feather "settings" gear icon, 24x24 grid
  gear: { feather: true, body: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>` },
  // Feather "tool" wrench icon, 24x24 grid
  wrench: { feather: true, body: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>` },
  pin: { body: `<path d="M0,26 C0,26 -16,10.5 -16,-3 a16,16 0 0 1 32,0 C16,10.5 0,26 0,26 Z"/><circle cx="0" cy="-3" r="6"/>` },
  moon: { body: `<path d="M20,4 A19,19 0 1 1 1,-19 A15,15 0 0 0 20,4 Z"/>` }
};

const REELS = [
  { file: "reel-socorro-br116.svg", lines: ["SOCORRO NA", "BR-116"], sub: "Oficina móvel em ação", icon: "van" },
  { file: "reel-oficina-fisica.svg", lines: ["DENTRO DA OFICINA", "FÍSICA"], sub: "Estrutura em Caxias do Sul", icon: "toolbox" },
  { file: "reel-diagnostico.svg", lines: ["DIAGNÓSTICO", "ELETRÔNICO"], sub: "Scanner direto na estrada", icon: "bolt" },
  { file: "reel-bastidores-equipe.svg", lines: ["BASTIDORES DA", "EQUIPE"], sub: "Quem resolve o seu chamado", icon: "team" },
  { file: "reel-embreagem.svg", lines: ["EMBREAGEM TROCADA", "NO LOCAL"], sub: "Oficina móvel resolvendo", icon: "gear" },
  { file: "reel-ferramental.svg", lines: ["FERRAMENTAL", "COMPLETO"], sub: "Bancada da oficina física", icon: "wrench" },
  { file: "reel-frota.svg", lines: ["ATENDIMENTO DE", "FROTA"], sub: "No pátio da transportadora", icon: "pin" },
  { file: "reel-madrugada.svg", lines: ["CHAMADO DE", "MADRUGADA"], sub: "Atendimento 24h de verdade", icon: "moon" }
];

function hazardStripe(y, h) {
  const stripes = Array.from({length: 26}, (_, i) => {
    const x = -60 + i * 26;
    return `<polygon points="${x},${y+h} ${x+14},${y} ${x+28},${y} ${x+14},${y+h}" fill="${COLORS.chrome}"/>`;
  }).join("");
  return `<clipPath id="hz"><rect x="0" y="${y}" width="${W}" height="${h}"/></clipPath>
  <g clip-path="url(#hz)"><rect x="0" y="${y}" width="${W}" height="${h}" fill="${COLORS.red}"/>${stripes}</g>`;
}

const BASE_STROKE = 2.4;   // stroke width for the hand-drawn (native ~54px) icons
const ICON_SCALE = 1.3;    // overall icon-to-badge size boost
const FEATHER_SCALE = 54 / 24; // rescale a 24x24 feather icon to match the ~54px native icons

function iconMarkup(icon) {
  if (icon.feather) {
    const strokeW = (BASE_STROKE / FEATHER_SCALE).toFixed(3);
    return `<g transform="scale(${FEATHER_SCALE}) translate(-12,-12)" stroke-width="${strokeW}">${icon.body}</g>`;
  }
  return icon.body;
}

function svgFor(reel) {
  const iconBody = iconMarkup(ICONS[reel.icon]);
  const titleLines = reel.lines.map((line, i) =>
    `<tspan x="${W/2}" dy="${i === 0 ? 0 : 50}">${escapeXml(line)}</tspan>`
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${COLORS.graphite}"/>
      <stop offset="1" stop-color="${COLORS.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="60%">
      <stop offset="0" stop-color="${COLORS.red}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${COLORS.red}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${COLORS.bg2}" stop-opacity="0"/>
      <stop offset=".55" stop-color="${COLORS.bg2}" stop-opacity=".88"/>
      <stop offset="1" stop-color="${COLORS.bg2}" stop-opacity=".97"/>
    </linearGradient>
    <pattern id="grid" width="27" height="27" patternUnits="userSpaceOnUse">
      <path d="M0,27 L27,0" stroke="${COLORS.chrome}" stroke-opacity=".045" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${hazardStripe(0, 10)}

  <g transform="translate(${W/2},290)">
    <circle r="66" fill="${COLORS.red}" fill-opacity=".12" stroke="${COLORS.red}" stroke-opacity=".55" stroke-width="2"/>
    <g fill="none" stroke="${COLORS.chrome}" stroke-width="${BASE_STROKE}" stroke-linecap="round" stroke-linejoin="round" transform="scale(${ICON_SCALE})">
      ${iconBody}
    </g>
  </g>

  <rect x="0" y="620" width="${W}" height="${H-620}" fill="url(#scrim)"/>
  <text x="${W/2}" y="760" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="40" letter-spacing="0.5" fill="${COLORS.chrome}">${titleLines}</text>
  <text x="${W/2}" y="${reel.lines.length > 1 ? 862 : 812}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="600" font-size="19" letter-spacing="0.3" fill="${COLORS.smoke}">${escapeXml(reel.sub)}</text>
</svg>`;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
for (const reel of REELS) {
  fs.writeFileSync(path.join(OUT_DIR, reel.file), svgFor(reel), "utf8");
  console.log("wrote", reel.file);
}
