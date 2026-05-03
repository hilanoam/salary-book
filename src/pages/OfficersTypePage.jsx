import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";


const officersMap = {
  inspectors: {
    file: "inspectors.json",
    title: "מפקח",
    subtitle: "טבלת שכר מפקח",
  },
  lawyers: {
    file: "lawyers.json",
    title: "משפטנים",
    subtitle: "טבלת שכר משפטנים",
  },
  captain: {
    file: "captain.json",
    title: "פקד",
    subtitle: "טבלת שכר פקד",
  },
  major: {
    file: "major.json",
    title: 'רפ"ק',
    subtitle: 'טבלת שכר רפ"ק',
  },
};

function OfficersTypePage() {
  const { type } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const config = useMemo(() => officersMap[type], [type]);

  useEffect(() => {
    if (!config) return;
    loadJson(config.file).then(setRows).catch(console.error)
    .finally(() => setLoading(false));
  }, [config]);

  if (!config) {
    return <div className="empty-state">העמוד לא נמצא</div>;
  }

  return (
    <div>
      <PageHeader
        title={`שכר קצינים - ${config.title}`}
        subtitle={config.subtitle}
      />

      <DataTable rows={rows} loading={loading}  />
    </div>
  );
}

export default OfficersTypePage;