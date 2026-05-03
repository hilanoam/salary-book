import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function SergeantsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJson("sergeants.json")
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      <section className="intro-page wide">
        <header className="intro-main-header">
          <h1>שכר נגדים</h1>

          <p className="intro-subtitle">
           טבלת שכר לכלל קבוצות הנגדים
          </p>
        </header>

        <div className="intro-body">
          <DataTable rows={rows} loading={loading} />
        </div>
      </section>
    </div>
  );
}

export default SergeantsPage;