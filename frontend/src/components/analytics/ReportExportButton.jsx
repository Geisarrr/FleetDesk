import { exportAnalyticsReport } from "../../services/analyticsService";
function canExportReport() { try { const user = JSON.parse(localStorage.getItem("user") || "{}"); return (user.role?.name ?? user.role) !== "Approver"; } catch { return true; } }
export default function ReportExportButton({ children }) { const allowed = canExportReport(); return <button type="button" className="export-report" disabled={!allowed} onClick={exportAnalyticsReport} title={allowed ? "Download analytics report" : "Approver cannot export sensitive reports"}>{children}</button>; }
