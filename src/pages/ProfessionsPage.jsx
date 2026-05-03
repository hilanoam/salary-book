import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function ProfessionsPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJson("professions.json")
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
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

          <DataTable rows={filteredRows} loading={loading} />
        </div>
      </section>
    </div>
  );
}

export default ProfessionsPage;