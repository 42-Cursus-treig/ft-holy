import { useTheme } from "../theme";
import { alpha } from "../theme/color";

export const ProfileBadge = ({ profile, size = 76 }) => {
  const { c, theme } = useTheme();

  if (!profile) return null;

  const label = profile.level != null
    ? `${profile.login} - niveau ${profile.level.toFixed(2)}`
    : profile.login;

  return (
    <a
      href={`https://profile.intra.42.fr/users/${encodeURIComponent(profile.login)}`}
      target="_blank"
      rel="noreferrer"
      title={label}
      aria-label={label}
      className="absolute bottom-5 right-5 z-10 block overflow-hidden fade-in group"
      style={{
        width: size,
        height: size,
        background: theme.surface.hud,
        border: `1px solid ${c.inkLine}`,
        borderRadius: 2,
        backdropFilter: "blur(12px)",
        // Ombre portée : neutre, indépendante de la palette.
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
      }}
    >
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt=""
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-serif text-vellum-mute"
          style={{ fontSize: size * 0.4, background: c.inkSoft }}
        >
          {profile.login?.[0]?.toUpperCase() || "?"}
        </div>
      )}

      <span
        className="absolute inset-x-0 bottom-0 py-1 text-center font-mono text-[10px] text-vellum opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: alpha(c.inkDeep, 0.85) }}
      >
        {profile.login}
      </span>
    </a>
  );
};
