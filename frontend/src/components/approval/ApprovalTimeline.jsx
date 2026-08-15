import ApprovalStep from "./ApprovalStep";
export default function ApprovalTimeline({ steps }) { return <div className="approval-timeline">{steps.map((step, index) => <ApprovalStep step={step} key={step.title} isLast={index === steps.length - 1} />)}</div>; }
