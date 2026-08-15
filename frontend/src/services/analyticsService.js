const reportRows = [
  { id: "#BK-2023-0891", date: "2023-10-24 08:30", requester: "Sarah Jenkins", vehicle: "Tesla Model 3", driver: "Self Drive", destination: "Downtown Metro Core", status: "Completed", region: "North", site: "Metro HQ", duration: "4.5 Hours", approval: "Fleet Approved" },
  { id: "#BK-2023-0890", date: "2023-10-23 14:15", requester: "Marcus Chen", vehicle: "Ford Transit Custom", driver: "John Doe", destination: "Airport Terminal B", status: "Approved", region: "South", site: "Airport Hub", duration: "6 Hours", approval: "Manager Approved" },
  { id: "#BK-2023-0889", date: "2023-10-23 09:00", requester: "Elena Rostova", vehicle: "Chevy Bolt EV", driver: "Self Drive", destination: "Regional HQ", status: "Rejected", region: "East", site: "Regional HQ", duration: "2 Hours", approval: "Rejected at L1" },
  { id: "#BK-2023-0888", date: "2023-10-22 16:45", requester: "David Kim", vehicle: "Toyota Prius", driver: "Self Drive", destination: "Client Site A", status: "Pending", region: "West", site: "Client Site", duration: "5.5 Hours", approval: "Pending Review" },
  { id: "#BK-2023-0887", date: "2023-10-21 10:30", requester: "Nora Ali", vehicle: "Toyota Hilux", driver: "Kevin Moss", destination: "Sector 7 Depot", status: "Cancelled", region: "North", site: "North Depot", duration: "3 Hours", approval: "Cancelled" },
];
const utilization = [{ name: "Toyota Hilux", value: 92 }, { name: "Ford Ranger", value: 85 }, { name: "Isuzu D-Max", value: 72 }];
export async function getAnalyticsReport() { return reportRows; }
export async function getFleetUtilization() { return utilization; }
export function exportAnalyticsReport() { const blob = new Blob(["Booking ID,Date,Requester,Vehicle,Driver,Destination,Status\n" + reportRows.map((row) => [row.id, row.date, row.requester, row.vehicle, row.driver, row.destination, row.status].join(",")).join("\n")], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "analytics-report.xlsx"; anchor.click(); URL.revokeObjectURL(url); }
