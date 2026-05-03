import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJson("professions.json")
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="שכר נגדים"
        subtitle="כל טבלאות הנגדים"
      />

      <DataTable rows={rows}  loading={loading} />
    </div>
  );
}

export default SergeantsPage;