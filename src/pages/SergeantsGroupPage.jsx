import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsGroupPage() {
  const { groupId } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJson("sergeants.json")
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter(
      (row) => Number(row["קבוצת תמריץ"]) === Number(groupId)
    );
  }, [rows, groupId]);

  return (
    <div className="page-wrapper">
      <section className="intro-page wide">
        <header className="intro-main-header">
           <img
              src="/logo.png"
              alt="לוגו מחלקת שכר"
              className="header-logo"
            />
          <h1>שכר נגדים - קבוצה {groupId}</h1>

          <p className="intro-subtitle">
            הצגת טבלת שכר לנגדים בקבוצת תמריץ {groupId}
          </p>
        </header>

        <div className="intro-body">
          <DataTable
            key={groupId}
            rows={filteredRows}
          />
        </div>
      </section>
    </div>
  );
}

export default SergeantsGroupPage;