import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function ProfessionsPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    loadJson("professions.json")
      .then(setRows)
      .catch(console.error);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        !search.trim() ||
        Object.values(row).some((val) =>
          String(val ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      const matchesGroup =
        !group || String(row["קבוצת תמריץ"] ?? "") === group;

      return matchesSearch && matchesGroup;
    });
  }, [rows, search, group]);

  return (
    <div className="page-wrapper">
      <section className="intro-page">
        <header className="intro-main-header">

          <h1>חיפוש לפי מקצוע</h1>

          <p className="intro-subtitle">
            חיפוש לפי שם מקצוע או מספר מקצוע וקבלת קבוצת התמריץ ואחוזי התמריץ
          </p>
        </header>

        <div className="intro-body">
          <div className="filters-card professions-filters">
            <input
              className="search-input"
              placeholder="חפשי לפי שם מקצוע, מספר מקצוע..."
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

          <DataTable rows={filteredRows} />
        </div>
      </section>
    </div>
  );
}

export default ProfessionsPage;