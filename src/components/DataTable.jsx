import { useMemo, useState } from "react";

function DataTable({ rows }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (!rows) return [];

    let result = [...rows];

    if (globalSearch.trim()) {
      const search = globalSearch.toLowerCase();

      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value ?? "").toLowerCase().includes(search)
        )
      );
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      result = result.filter((row) =>
        String(row[key] ?? "").toLowerCase().includes(value.toLowerCase())
      );
    });

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        const aNumber = Number(aValue);
        const bNumber = Number(bValue);

        if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
          return sortConfig.direction === "asc"
            ? aNumber - bNumber
            : bNumber - aNumber;
        }

        return sortConfig.direction === "asc"
          ? String(aValue ?? "").localeCompare(String(bValue ?? ""), "he")
          : String(bValue ?? "").localeCompare(String(aValue ?? ""), "he");
      });
    }

    return result;
  }, [rows, globalSearch, filters, sortConfig]);

  function handleSort(column) {
    setSortConfig((prev) => {
      if (prev.key === column) {
        return {
          key: column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }

      return { key: column, direction: "asc" };
    });
  }

  function updateFilter(column, value) {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  }

  function clearFilters() {
    setGlobalSearch("");
    setFilters({});
    setSortConfig({ key: null, direction: "asc" });
  }

  if (!rows || rows.length === 0) {
    return <div className="empty-state">אין נתונים להצגה</div>;
  }

  return (
    <div className="smart-table-card">
      <div className="table-toolbar">
        <div>
          <h3>טבלת נתונים</h3>
          <p>
            מוצגות {filteredRows.length} שורות מתוך {rows.length}
          </p>
        </div>

        <div className="toolbar-actions">
          <input
            className="table-search"
            type="text"
            placeholder="חיפוש כללי בטבלה..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />

          <button className="clear-btn" type="button" onClick={clearFilters}>
            איפוס
          </button>
        </div>
      </div>

      <div className="column-filters">
        {columns.map((col) => (
          <div className="filter-field" key={col}>
            <label>{col}</label>
            <input
              type="text"
              placeholder={`סינון לפי ${col}`}
              value={filters[col] || ""}
              onChange={(e) => updateFilter(col, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="table-wrap">
        <table className="salary-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} onClick={() => handleSort(col)}>
                  <span>{col}</span>
                  <span className="sort-icon">
                    {sortConfig.key === col
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : "↕"}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => {
                  const isSalary = col.includes("משכורת") || col.includes("ברוטו");

                  return (
                    <td key={col} className={isSalary ? "salary-cell" : ""}>
                      {row[col] ?? ""}
                      {isSalary && row[col] ? " ₪" : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;