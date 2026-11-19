import type { ObjectFieldProps } from "sanity";

// Cabeçalho de seção da página no Studio: título maior que o dos campos, para
// a hierarquia seção > campo ficar clara. Cores e fonte herdadas do tema do
// Studio (claro/escuro), sem depender de @sanity/ui.
export function SectionField(props: ObjectFieldProps) {
  const { title, description, collapsed, onCollapse, onExpand, children } = props;

  return (
    <div
      style={{
        borderBottom: "1px solid var(--card-border-color)",
        paddingBottom: collapsed ? 0 : 16,
      }}
    >
      <button
        type="button"
        onClick={collapsed ? onExpand : onCollapse}
        aria-expanded={!collapsed}
        style={{
          all: "unset",
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "14px 0",
          fontSize: 19,
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-block",
            fontSize: 13,
            transition: "transform 150ms",
            transform: collapsed ? "rotate(-90deg)" : "none",
          }}
        >
          ▼
        </span>
        {title}
      </button>
      {!collapsed && (
        <div style={{ display: "grid", gap: 24, paddingLeft: 23 }}>
          {description && (
            <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>{description}</p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
