import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsSearchPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadJson("נגדים.json")
      .then((data) => setRows(data))
      .catch((error) => {
        console.error("שגיאה בטעינת נתוני נגדים:", error);
        setRows([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [rows, search]);

  return (
    <div>
      <PageHeader
        title="שכר נגדים - חיפוש לפי מקצוע"
      />

    
    </div>
  );
}

export default SergeantsSearchPage;