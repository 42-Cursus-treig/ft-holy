import { useState } from "react";
import { GITHUB_CLIENT_ID } from "../config";
import { useTheme } from "../theme";
import { alpha } from "../theme/color";

export const AuthModal = ({ onClose, auth }) => {
  const [pat, setPat] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { c, statusOf } = useTheme();

  const accent = statusOf("validated");

  const submitPAT = async (e) => {
    e.preventDefault();
    if (!pat.trim()) return;
    setSubmitting(true);
    await auth.loginWithPAT(pat.trim());
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in"
      style={{ background: alpha(c.inkDeep, 0.7), backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: c.ink,
          border: `1px solid ${c.inkLine}`,
          borderRadius: 2,
          // Ombre portée : volontairement neutre, elle ne dépend pas de la palette.
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="smallcaps text-[9px] text-vellum-mute mb-1">ACCÈS</div>
            <h2 className="font-serif text-2xl text-vellum">Authentification</h2>
          </div>
          <button onClick={onClose} className="text-vellum-mute hover:text-vellum text-xl">x</button>
        </div>

        {auth.deviceInfo ? (
          <div className="space-y-3">
            <p className="text-sm text-vellum-dim font-serif">
              Ouvre l'URL ci-dessous et entre ce code :
            </p>
            <div
              className="font-mono text-2xl text-center py-3 tracking-widest"
              style={{
                color: accent.main,
                border: `1px solid ${accent.soft}`,
                borderRadius: 1,
                background: alpha(accent.main, 0.05),
              }}
            >
              {auth.deviceInfo.user_code}
            </div>
            <a
              href={auth.deviceInfo.verification_uri}
              target="_blank"
              rel="noreferrer"
              className="block text-center smallcaps text-[10px] hover:text-vellum transition-colors"
              style={{ color: c.azure }}
            >
              {auth.deviceInfo.verification_uri} ↗
            </a>
            <p className="text-[10px] text-vellum-mute font-mono text-center">
              en attente d'autorisation…
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={submitPAT} className="space-y-3">
              <div>
                <label className="smallcaps text-[9px] text-vellum-mute block mb-1">
                  PERSONAL ACCESS TOKEN
                </label>
                <input
                  type="password"
                  value={pat}
                  autoComplete="off"
                  onChange={(e) => setPat(e.target.value)}
                  placeholder="ghp_…"
                  className="w-full px-3 py-2 font-mono text-sm rounded-sm focus:outline-none transition-colors"
                  style={{
                    background: c.inkDeep,
                    color: c.vellum,
                    border: `1px solid ${c.inkLine}`,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = accent.main)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = c.inkLine)}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={!pat.trim() || submitting}
                className="w-full py-2 smallcaps text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: accent.main,
                  color: accent.onMain,
                  border: `1px solid ${accent.soft}`,
                  borderRadius: 1,
                }}
              >
                {submitting ? "VÉRIFICATION…" : "SE CONNECTER"}
              </button>
            </form>

            {GITHUB_CLIENT_ID && (
              <>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 rule" />
                  <span className="smallcaps text-[9px] text-vellum-mute">OU</span>
                  <div className="flex-1 rule" />
                </div>
                <button
                  onClick={auth.loginWithDevice}
                  className="w-full py-2 smallcaps text-xs text-vellum border border-ink-line rounded-sm hover:border-vellum-dim transition-colors"
                >
                  Device Flow GitHub
                </button>
              </>
            )}

            {auth.error && (
              <p className="text-xs mt-3 font-mono" style={{ color: statusOf("failed").main }}>
                {auth.error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
