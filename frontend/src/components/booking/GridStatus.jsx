import { RadioTower } from "lucide-react";
export default function GridStatus() {
  return <section className="grid-status"><header><RadioTower size={15} /><span>Grid Status</span></header><div><p>Network <strong><i /> Stable</strong></p><span className="network-progress"><i /></span><small>Secure uplink · 99.9% signal integrity</small></div></section>;
}
