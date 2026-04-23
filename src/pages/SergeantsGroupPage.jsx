import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsGroupPage() {
  const { groupId } = useParams();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadJson("sergeants.json").then(setRows).catch(console.error);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter(
      (row) => Number(row["קבוצת תמריץ"]) === Number(groupId)
    );
  }, [rows, groupId]);

  return (
    <div>
      <PageHeader
        title={`שכר נגדים - קבוצה ${groupId}`}
        subtitle={`הצגת טבלת קבוצה ${groupId} בלבד`}
      />

      <DataTable rows={filteredRows} />
    </div>
  );
}

export default SergeantsGroupPage;