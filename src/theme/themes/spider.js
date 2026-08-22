import { alpha } from "../color";
import { Skyline } from "../backgrounds/Skyline";
import WebEdge from "../../graph/WebEdge";

const RED = "#E0243F";
const RED_DEEP = "#8E1527";
const BLUE = "#3C7DEA";
const BLUE_DEEP = "#22468A";
const VENOM = "#8B34A8";
const VENOM_DEEP = "#4E1A61";

const colors = {
  inkDeep: "#04060E",
  ink: "#080C18",
  inkSoft: "#111829",
  inkLine: "#334166",
  inkHairline: "#1A2138",

  vellum: "#F2F4F8",
  vellumDim: "#BCC5D8",
  vellumMute: "#7C879E",

  gold: RED,
  goldSoft: RED_DEEP,
  rust: VENOM,
  rustSoft: VENOM_DEEP,
  azure: BLUE,
  azureSoft: BLUE_DEEP,
};

const status = {
  validated: {
    label: "VALIDÉ",
    main: RED,
    soft: RED_DEEP,
    onMain: colors.vellum,
    halo: 0.5,
    glow: 0.22,
    animation: "star-pulse 4s ease-in-out infinite",
  },
  failed: {
    label: "ÉCHOUÉ",
    main: VENOM,
    soft: VENOM_DEEP,
    onMain: colors.vellum,
    halo: 0.38,
    glow: 0,
    animation: "star-flicker 5s linear infinite",
  },
  "in-progress": {
    label: "EN COURS",
    main: BLUE,
    soft: BLUE_DEEP,
    onMain: colors.vellum,
    halo: 0.35,
    glow: 0.2,
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

const SILK = "#93A2C4";

export const spiderTheme = {
  id: "spider",
  label: "Sur les toits",
  caption: "skyline et fils de soie",

  colors,
  status,

  Background: Skyline,
  Edge: WebEdge,

  background: {
    sky:
      "linear-gradient(to bottom, #04060E 0%, #070B1A 38%, #101A33 68%, #23253F 88%, #3A2B3E 100%)",
    glow:
      "radial-gradient(120% 55% at 50% 100%, rgba(226, 138, 78, 0.16), transparent 65%)",
    haze:
      "linear-gradient(to bottom, transparent 55%, rgba(10, 14, 26, 0.35) 88%, rgba(4, 6, 14, 0.6) 100%)",
    skyline: {
      far: "#161E36",
      mid: "#0E1527",
      near: "#070B16",
    },
    skylineEdge: "#2A3555",
    window: "#FFCE8A",
  },

  orbit: {
    done: RED,
    idle: SILK,
    doneOpacity: 0.55,
    idleOpacity: 0.35,
    strokeWidth: 1.2,
    dash: "5 7",
  },

    node: {
    shape: "mask",
    idleFill: colors.inkSoft,
    idleBorder: colors.vellumMute,
    idleText: colors.vellum,
    borderColor: colors.inkHairline,
    badgeBackground: colors.inkDeep,

    mask: {
      web: "#12060B",
      webWidth: 1.6,
      webOpacity: 0.5,
      lens: "#EAF2FF",
      lensStroke: colors.ink,
      glint: "#FFFFFF",
    },
  },

  edge: {
    idle: SILK,
    colorFor: (s) => status[s]?.main ?? SILK,
    styleFor: (s) => {
      if (s === "validated") return { animated: true, width: 1.7, opacity: 1 };
      if (s === "failed") return { animated: false, width: 1.4, opacity: 0.85, dash: "4,4" };
      if (s === "in-progress") return { animated: true, width: 1.6, opacity: 0.95 };
      return { animated: false, width: 1.2, opacity: 0.6 };
    },
  },

  surface: {
    panel: alpha(colors.ink, 0.95),
    hud: alpha(colors.ink, 0.85),
    tint: (s) => alpha(status[s]?.main ?? colors.inkHairline, 0.08),
    border: (s) => alpha(status[s]?.main ?? colors.inkLine, 0.25),
  },
};
