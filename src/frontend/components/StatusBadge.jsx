export function StatusBadge({ status }) {
  const statusMap = {
    open: { label: 'Open', class: 'badge-info', icon: '🔴' },
    confirmed: { label: 'Confirmed', class: 'badge-warning', icon: '🟠' },
    shipped: { label: 'Shipped', class: 'badge-info', icon: '🔵' },
    received: { label: 'Received', class: 'badge-success', icon: '🟢' },
  };

  const statusInfo = statusMap[status] || { label: 'Unknown', class: 'badge-info' };

  return (
    <span className={`d365-badge ${statusInfo.class}`}>
      {statusInfo.icon} {statusInfo.label}
    </span>
  );
}
