function DataTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <div className="empty-state">אין נתונים להצגה</div>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="table-card">
      <div className="table-wrap">
        <table>
          
           
          
        </table>
      </div>
    </div>
  );
}

export default DataTable;