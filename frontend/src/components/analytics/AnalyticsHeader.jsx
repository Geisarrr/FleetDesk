import { Download } from "lucide-react";
import ReportExportButton from "./ReportExportButton";
export default function AnalyticsHeader() { return <section className="analytics-header"><div><p>Decision intelligence</p><h1>Analytics &amp; Reporting</h1><span>Comprehensive telemetry and booking data overview.</span></div><ReportExportButton><Download size={15} /> Export Excel</ReportExportButton></section>; }
