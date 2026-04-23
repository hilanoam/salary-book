function DataTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <div className="empty-state">אין נתונים להצגה</div>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="table-card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col}>
                    {row[col] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;