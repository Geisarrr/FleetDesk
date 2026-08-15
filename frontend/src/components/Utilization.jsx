const models = [{ name: "Toyota Hilux", type: "Pickup truck", percent: 82 }, { name: "Toyota Innova", type: "MPV", percent: 51 }, { name: "Mitsubishi Triton", type: "Pickup truck", percent: 71 }];
export default function Utilization() {
  return <article className="glass-card utilization"><div className="card-heading"><div><p>Top performers</p><h2>Model utilization</h2></div><button type="button">Details →</button></div><div>{models.map((model) => <div className="util-row" key={model.name}><div className="vehicle-symbol">◆</div><div className="util-copy"><strong>{model.name}</strong><span>{model.type}</span><div className="progress"><i style={{ width: `${model.percent}%` }} /></div></div><b>{model.percent}%</b></div>)}</div></article>;
}
