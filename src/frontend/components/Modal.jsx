export function Modal({ isOpen, title, onClose, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="d365-modal active">
      <div className="d365-modal-content">
        {title && <div className="d365-modal-header">{title}</div>}
        <div className="d365-modal-body">{children}</div>
        {footer && <div className="d365-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
