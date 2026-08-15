import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";

const statusClass = { Active: "active", Maintenance: "maintenance", Inactive: "inactive" };

export default function VehicleTable({ vehicles, total }) {
  return <><div className="vehicle-table-scroll"><table className="vehicle-table"><thead><tr><th>License Plate</th><th>Type</th><th>Brand &amp; Model</th><th>Year</th><th>Region / Site</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{vehicles.map((vehicle) => <tr key={vehicle.license}><td className="plate">{vehicle.license}</td><td>{vehicle.type}</td><td className="model">{vehicle.brand}</td><td>{vehicle.year}</td><td>{vehicle.region}</td><td><span className={`vehicle-status ${statusClass[vehicle.status]}`}><i />{vehicle.status}</span></td><td><button className="edit-vehicle" type="button" aria-label={`Edit ${vehicle.license}`}><Pencil size={14} /></button></td></tr>)}{vehicles.length === 0 && <tr><td className="empty-vehicles" colSpan="7">No vehicles match these filters.</td></tr>}</tbody></table></div><footer className="vehicle-pagination"><span>Showing {vehicles.length ? `1-${vehicles.length}` : "0"} of {total}</span><div><button type="button" aria-label="Previous page"><ChevronLeft size={15} /></button><button type="button" aria-label="Next page"><ChevronRight size={15} /></button></div></footer></>;
}
