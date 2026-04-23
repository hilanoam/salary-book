import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJson("נגדים.json")
      .then((data) => setRows(data))
      .catch((error) => {
        console.error("שגיאה בטעינת נתוני נגדים:", error);
        setRows([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="שכר נגדים"
        subtitle="כל טבלאות הנגדים במקום אחד."
      />

      {loading ? (
        <div className="empty-state">טוען נתונים...</div>
      ) : (
        <DataTable rows={rows} />
      )}
    </div>
  );
}

export default SergeantsPage;