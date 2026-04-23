import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsGroupPage() {
  const { groupId } = useParams();
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

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      Object.values(row).some((value) => String(value ?? "").includes(groupId))
    );
  }, [rows, groupId]);

  return (
    <div>
      <PageHeader
        title={`שכר נגדים - קבוצה ${groupId}`}
      />

      {loading ? (
        <div className="empty-state">טוען נתונים...</div>
      ) : (
        <DataTable rows={filteredRows} />
      )}
    </div>
  );
}

export default SergeantsGroupPage;