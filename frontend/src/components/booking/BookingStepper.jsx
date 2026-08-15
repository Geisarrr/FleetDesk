import { Check } from "lucide-react";

const steps = [
  { label: "Parameters", state: "completed" }, { label: "Assets", state: "active" },
  { label: "Personnel", state: "pending" }, { label: "Clearance", state: "pending" }, { label: "Review", state: "pending" },
];

export default function BookingStepper() {
  return <section className="booking-stepper" aria-label="Dispatch request progress">{steps.map((step, index) => <div className={`booking-step booking-step--${step.state}`} key={step.label}><div className="step-circle">{step.state === "completed" ? <Check size={17} /> : index + 1}</div><div><strong>{step.label}</strong><span>{step.state === "completed" ? "Completed" : step.state === "active" ? "In progress" : "Pending"}</span></div>{index < steps.length - 1 && <i className="step-connector" />}</div>)}</section>;
}
