import { ArrowRight, Filter, Search, SlidersHorizontal } from "lucide-react";
import VehicleCard from "./VehicleCard";

const vehicles = [
  { name: "Atlas Rhino X-1", code: "V-702", type: "Heavy Transport • All-Terrain", status: "READY FOR DISPATCH", energy: "98%", range: "640 km", selected: true },
  { name: "Vanguard Interceptor", code: "V-114", type: "Rapid Pursuit • Urban", status: "READY FOR DISPATCH", energy: "72%", range: "310 km" },
  { name: "Aegis Hauler M2", code: "V-901", type: "Maintenance", status: "IN MAINTENANCE", energy: "--", range: "Oct 26, 0900" },
];

export default function VehicleSelector({ selectedVehicle, onSelectVehicle }) {
  return <section className="vehicle-selector"><header className="asset-search"><label><Search size={16} /><input type="search" placeholder="Search by callsign, model, or capability..." /></label><button type="button"><Filter size={14} /> Filters</button><button type="button"><SlidersHorizontal size={14} /> Sort: Readiness</button></header><div className="asset-heading"><div><p>Operational assets</p><h2>Select a vehicle</h2></div><span>3 assets available</span></div><div className="dispatch-vehicle-grid">{vehicles.map((vehicle) => <VehicleCard key={vehicle.code} vehicle={vehicle} isSelected={selectedVehicle === vehicle.code} onSelect={() => onSelectVehicle(vehicle.code)} />)}</div><footer className="selector-footer"><span>{selectedVehicle ? `Asset ${selectedVehicle} selected for assignment` : "Select an asset to continue"}</span><button type="button">Proceed to personnel <ArrowRight size={16} /></button></footer></section>;
}
