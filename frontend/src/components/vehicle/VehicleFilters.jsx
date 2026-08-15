import { ChevronDown, Filter } from "lucide-react";

function FilterSelect({ value, options, onChange, label }) {
  return <label className="filter-select"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={13} /></label>;
}

export default function VehicleFilters({ type, status, onTypeChange, onStatusChange }) {
  return <div className="vehicle-filters"><div className="filter-title"><Filter size={14} /> Filters</div><div className="filter-controls"><FilterSelect label="Vehicle type" value={type} onChange={onTypeChange} options={["All Types", "Sedan", "SUV", "Van"]} /><FilterSelect label="Vehicle status" value={status} onChange={onStatusChange} options={["All Statuses", "Active", "Maintenance", "Inactive"]} /></div></div>;
}
