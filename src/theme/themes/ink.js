import { alpha } from "../color";
import { Starfield } from "../backgrounds/Starfield";

const colors = {
  inkDeep: "#05060A",
  ink: "#0A0C14",
  inkSoft: "#11141E",
  inkLine: "#4A5270",
  inkHairline: "#1C2030",

  vellum: "#F4F1E8",
  vellumDim: "#C5C1B1",
  vellumMute: "#8E8A7A",

  gold: "#D4AF37",
  goldSoft: "#8A7223",
  rust: "#A63D2A",
  rustSoft: "#6B281C",
  azure: "#4A90D9",
  azureSoft: "#2C5A8A",
};

const status = {
  validated: {
    label: "VALIDÉ",
    main: colors.gold,
    soft: colors.goldSoft,
    onMain: colors.inkDeep,
    halo: 0.55,
    glow: 0.19,
    animation: "star-pulse 4s ease-in-out infinite",
  },
  failed: {
    label: "ÉCHOUÉ",
    main: colors.rust,
    soft: colors.rustSoft,
    onMain: colors.vellum,
    halo: 0.4,
    glow: 0,
    animation: "star-flicker 5s linear infinite",
  },
  "in-progress": {
    label: "EN COURS",
    main: colors.azure,
    soft: colors.azureSoft,
    onMain: colors.inkDeep,
    halo: 0.35,
    glow: 0.19,
    animation: "none",
  },
  available: {
    label: "INEXPLORÉ",
    main: colors.vellumDim,
    soft: colors.vellumMute,
    onMain: colors.vellum,
    halo: 0,
    glow: 0,
    animation: "none",
  },
};

export const inkTheme = {
  id: "ink",
  label: "Encre & Vélin",
  caption: "constellation d'origine",

  colors,
  status,

  Background: Starfield,

  background: {
    stars: { primary: colors.vellum, accent: colors.gold },
    nebula:
      "linear-gradient(112deg, transparent 34%, rgba(190, 200, 235, 0.05) 50%, transparent 66%), " +
      "radial-gradient(60% 45% at 68% 28%, rgba(120, 145, 200, 0.05), transparent 70%)",
  },

  orbit: {
    done: colors.gold,
    idle: colors.inkLine,
    doneOpacity: 0.6,
    idleOpacity: 0.75,
    strokeWidth: 1.4,
    dash: null,
  },

  node: {
    shape: "disc",
    idleFill: colors.inkSoft,
    idleBorder: colors.vellumMute,
    idleText: colors.vellum,
    borderColor: colors.inkHairline,
    badgeBackground: colors.inkDeep,
  },

  edge: {
    idle: "#7C86A8",
    colorFor: (s) => status[s]?.main ?? "#7C86A8",
    styleFor: (s) => {
      if (s === "validated") return { animated: true, width: 1.6, opacity: 1 };
      if (s === "failed") return { animated: false, width: 1.4, opacity: 0.9, dash: "4,4" };
      if (s === "in-progress") return { animated: true, width: 1.6, opacity: 0.9 };
      return { animated: false, width: 1.6, opacity: 0.95 };
    },
  },

  surface: {
    panel: alpha(colors.ink, 0.95),
    hud: alpha(colors.ink, 0.85),
    tint: (s) => alpha(status[s]?.main ?? colors.inkHairline, 0.08),
    border: (s) => alpha(status[s]?.main ?? colors.inkLine, 0.25),
  },
};
