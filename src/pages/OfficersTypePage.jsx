import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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

    setLoading(true);

    loadJson(config.file)
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [config]);

  if (!config) {
    return (
      <div className="page-wrapper">
        <section className="intro-page">
          <header className="intro-main-header">
            <h1>העמוד לא נמצא</h1>
            <p className="intro-subtitle">לא נמצאה טבלת קצינים מתאימה</p>
          </header>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="intro-page wide">
        <header className="intro-main-header">
           <img
              src="/logo.png"
              alt="לוגו מחלקת שכר"
              className="header-logo"
            />
          <h1>שכר קצינים - {config.title}</h1>

          <p className="intro-subtitle">
            {config.subtitle}
          </p>
        </header>

        <div className="intro-body">
          <DataTable key={type} rows={rows} loading={loading} />
        </div>
      </section>
    </div>
  );
}

export default OfficersTypePage;