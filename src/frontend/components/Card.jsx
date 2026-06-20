export function Card({ title, children, footer }) {
  return (
    <div className="d365-card">
      {title && <div className="d365-card-header">{title}</div>}
      <div className="d365-card-body">{children}</div>
      {footer && <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--d365-border)' }}>{footer}</div>}
    </div>
  );
}
