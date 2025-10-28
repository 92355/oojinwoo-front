import { useTheme } from "../theme/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      className="outline"
      aria-label={isDark ? "라이트 모드로" : "다크 모드로"}
      title={isDark ? "라이트 모드" : "다크 모드"}
      style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
    >
      <span style={{ fontSize: 18 }}>{isDark ? "🌞" : "🌙"}</span>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
