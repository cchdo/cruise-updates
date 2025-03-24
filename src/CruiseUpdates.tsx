import { useCruiseUpdates } from "./useCruiseUpdates";

export default function CruiseUpdates() {
  const { updates, loading } = useCruiseUpdates();

  if (loading) return <p>Loading cruise updates...</p>;

  return (
    <div className="container">
      {Object.entries(updates).map(([month, updates]) => (
        <div key={month}>
          <h4>{month}</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr className="info">
                  <th style={{ width: "35%" }}>Cruise Name / Section ID</th>
                  <th style={{ width: "25%" }}>Expocode</th>
                  <th style={{ width: "15%" }}>Year</th>
                  <th style={{ width: "25%" }}>Update Type</th>
                </tr>
              </thead>
              <tbody>
                {updates.map((update) => (
                  <tr key={update.expocode}>
                    <td>
                      <a href={`/cruise/${update.expocode}`} target="_blank" rel="noopener noreferrer">
                        {update.sect_id || "-"}
                      </a>
                    </td>
                    <td>{update.expocode}</td>
                    <td>{update.year}</td>
                    <td>{update.update_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
