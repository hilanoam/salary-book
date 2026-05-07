import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsSearchPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    loadJson("professions.json")
      .then(setRows)
      .catch((error) => {
        console.error("שגיאה בטעינת טבלת מקצועות:", error);
        setRows([]);
      });
  }, []);

  const displayRows = useMemo(() => {
    return rows
      .map((row) => ({
        "מספר מקצוע": row["מספר מקצוע"],
        "שם מקצוע": row["שם מקצוע"],
        "קבוצת תמריץ": row["קבוצת תמריץ"],
        'אחוז תמריץ רס"ל': row['אחוז תמריץ רס"ל'],
        'אחוז תמריץ רס"ר-רנ"ג':
          row['אחוז תמריץ רס"ר-רנ"ג'] ??
          row['אחוז תמריץ רס"ר- רנ"ג'],
      }))
      .filter((row) => {
        const searchText = search.trim().toLowerCase();

        const matchesSearch =
          !searchText ||
          String(row["מספר מקצוע"] ?? "").toLowerCase().includes(searchText) ||
          String(row["שם מקצוע"] ?? "").toLowerCase().includes(searchText);

        const matchesGroup =
          !group || String(row["קבוצת תמריץ"] ?? "") === String(group);

        return matchesSearch && matchesGroup;
      });
  }, [rows, search, group]);

  return (
    <div className="page-wrapper">
      <section className="intro-page">
        <header className="intro-main-header">
           <img
              src="/logo.png"
              alt="לוגו מחלקת שכר"
              className="header-logo"
            />
          <div className="intro-badge">טבלת מקצועות · קבוצות ותמריצים</div>

          <h1>חיפוש לפי מקצוע</h1>

          <p className="intro-subtitle">
            חיפוש לפי שם מקצוע או מספר מקצוע, כולל קבוצת תמריץ ואחוזי תמריץ
          </p>
        </header>

        <div className="intro-body">
          <div className="filters-card professions-filters">
            <input
              type="text"
              className="search-input"
              placeholder="חפשי לפי שם מקצוע או מספר מקצוע..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="search-input"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="">כל קבוצות התמריץ</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                <option key={g} value={String(g)}>
                  קבוצה {g}
                </option>
              ))}
            </select>
          </div>

          <p className="results-counter">
            מוצגות {displayRows.length} רשומות
          </p>

          <DataTable rows={displayRows} />
        </div>
      </section>
    </div>
  );
}

export default SergeantsSearchPage;