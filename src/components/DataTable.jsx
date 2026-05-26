import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function DataTable({ rows, showToolbar = true, showColumnFilters = true, loading = false }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();

  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  const isProfessionsTable = useMemo(() => {
    return (
      columns.includes("מקצוע") ||
      columns.includes("מספר מקצוע") ||
      columns.includes("קבוצת פעילות") ||
      columns.includes("רמת פעילות")
    );
  }, [columns]);

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
          : String(bValue ?? "").localeCompare(String(bValue ?? ""), "he");
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

  function handleRowClick(row) {
    if (!isProfessionsTable) return;

    const group =
      row["קבוצת פעילות"] ||
      row["קבוצת תמריץ"] ||
      row["קבוצה"];

    if (!group) return;

    navigate(`/sergeants/group/${encodeURIComponent(group)}`);
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

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>טוען נתונים...</p>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return <div className="empty-state">אין נתונים להצגה</div>;
  }

  // בדיקת קיום עמודות גמול לצורך החישוב הצבעוני
  const hasGemulA = columns.includes("גמול א'");
  const hasGemulB = columns.includes("גמול ב'");

  return (
    <div className="smart-table-card">
      {showToolbar && (
        <div className="table-toolbar">
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
      )}

      {showColumnFilters && (
        <div className="column-filters">
          {columns.map((col) => (
            <div className="filter-field" key={col}>
              <label>{col}</label>
              <select
                value={filters[col] || ""}
                onChange={(e) => updateFilter(col, e.target.value)}
              >
                <option value="">הכל</option>

                {[...new Set(rows.map((row) => row[col]).filter(Boolean))]
                  .sort((a, b) => String(a).localeCompare(String(b), "he"))
                  .map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>
      )}

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
            {filteredRows.map((row, rowIndex) => {
              // חישוב אובייקט הסטייל לפי סטטוס הגמולים בשורה
              let cellStyle = {};

              if (hasGemulA) {
                const valA = row["גמול א'"];
                const valB = row["גמול ב'"];

                if (!hasGemulB) {
                  // מקרה של גמול א' בלבד
                  if (valA === "כן") {
                    cellStyle = { backgroundColor: "#d4edda52", color: "#155724" };
                  } else if (valA === "לא") {
                    cellStyle = { backgroundColor: "#f8d7da86", color: "#721c24" };
                  }
                } else {
                  // מקרה של גמול א' וגם גמול ב'
                  if (valA === "לא" && valB === "לא") {
                    cellStyle = { backgroundColor: "#f8d7da86", color: "#721c24" };
                  } else if (valA === "כן" && valB === "לא") {
                    cellStyle = { backgroundColor: "#ffe8cc7e", color: "#a0522d" };
                  } else if (valA === "כן" && valB === "כן") {
                    cellStyle = { backgroundColor: "#d4edda70", color: "#155724" };
                  }
                }
              }

              return (
                <tr
                  key={rowIndex}
                  onClick={() => handleRowClick(row)}
                  style={{
                    cursor: isProfessionsTable ? "pointer" : "default"
                  }}
                >
                  {columns.map((col) => {
                    const isSalary =
                      (
                        col.includes("משכורת") ||
                        col.includes("ברוטו") ||
                        col.includes("בסוף שבוע") ||
                        col.includes("וסייר") ||
                        col.includes("שכר")
                      ) &&
                      !col.includes("דרגת שכר");

                    const isPercent =
                      col.includes("אחוז") ||
                      col.includes("אחוז תמריץ");

                    return (
                      <td 
                        key={col} 
                        className={isSalary ? "salary-cell" : ""}
                        style={cellStyle} // הזרקת הרקע הדינמי לכל תא ותא
                      >
                        {(() => {
                          let value = row[col];

                          if (value === "אחיד") {
                            value = "אחיד / טכנאי לא ישים";
                          }

                          const num = Number(value);

                          if (!isNaN(num) && value !== "") {
                            if (isProfessionsTable) {
                              return value;
                            }

                            return num.toLocaleString("he-IL");
                          }

                          return value ?? "";
                        })()}

                        {isPercent && row[col] ? "%" : ""}
                        {isSalary && row[col] ? " ₪" : ""}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;