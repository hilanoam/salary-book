import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function OfficersPage() {
  const [inspectorRows, setInspectorRows] = useState([]);
  const [lawRows, setLawRows] = useState([]);
  const [captainRows, setCaptainRows] = useState([]);
  const [majorRows, setMajorRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      loadJson("inspectors.json").then(setInspectorRows),
      loadJson("lawyers.json").then(setLawRows),
      loadJson("captain.json").then(setCaptainRows),
      loadJson("major.json").then(setMajorRows),
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 🔥 מאחדים את כל הטבלאות
  const combinedRows = useMemo(() => {
    const addType = (rows, type) =>
      rows.map((row) => ({
        סוג: type,
        ...row,
      }));

    return [
      ...addType(inspectorRows, "מפקח"),
      ...addType(lawRows, "משפטנים"),
      ...addType(captainRows, "פקד"),
      ...addType(majorRows, 'רפ"ק'),
    ];
  }, [inspectorRows, lawRows, captainRows, majorRows]);

  return (
    <div className="page-wrapper">
      <section className="intro-page wide">
        <header className="intro-main-header">
          <h1>שכר קצינים</h1>

          <p className="intro-subtitle">
            טבלת שכר לכלל דרגות הקצינים
          </p>
        </header>

        <div className="intro-body">
          <DataTable rows={combinedRows} loading={loading} />
        </div>
      </section>
    </div>
  );
}

export default OfficersPage;