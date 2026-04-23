import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadJson("sergeants.json").then(setRows).catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader
        title="שכר נגדים"
        subtitle="כל טבלאות הנגדים"
      />

      <DataTable rows={rows} />
    </div>
  );
}

export default SergeantsPage;