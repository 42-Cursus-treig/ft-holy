import { useState } from "react";
import { GITHUB_CLIENT_ID, ADMIN_USERNAME } from "../config";

export const AuthModal = ({ onClose, auth }) => {
  const [pat, setPat] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      style={{ background: "rgba(5, 6, 10, 0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--ink)",
          border: "1px solid var(--ink-line)",
          borderRadius: 2,
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
              className="font-mono text-2xl text-gold text-center py-3 tracking-widest"
              style={{ border: "1px solid var(--gold-soft)", borderRadius: 1, background: "rgba(212, 175, 55, 0.05)" }}
            >
              {auth.deviceInfo.user_code}
            </div>
            <a
              href={auth.deviceInfo.verification_uri}
              target="_blank"
              rel="noreferrer"
              className="block text-center text-azure smallcaps text-[10px] hover:text-vellum"
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
                  autoComplete="false"
                  onChange={(e) => setPat(e.target.value)}
                  placeholder="ghp_…"
                  className="w-full px-3 py-2 bg-slate-900 text-white font-mono text-sm border border-slate-600 rounded-sm focus:border-yellow-500 focus:outline-none"                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={!pat.trim() || submitting}
                className="w-full py-2 smallcaps text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "var(--gold)",
                  color: "var(--ink-deep)",
                  border: "1px solid var(--gold-soft)",
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
              <p className="text-rust text-xs mt-3 font-mono">{auth.error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};