import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import { loadJson } from "../services/dataService";

function OfficersPage() {
  const [inspectorRows, setInspectorRows] = useState([]);
  const [lawRows, setLawRows] = useState([]);
  const [captainRows, setCaptainRows] = useState([]);
  const [majorRows, setMajorRows] = useState([]);

  useEffect(() => {
    loadJson("inspectors.json").then(setInspectorRows).catch(console.error);
    loadJson("lawyers.json").then(setLawRows).catch(console.error);
    loadJson("captain.json").then(setCaptainRows).catch(console.error);
    loadJson("major.json").then(setMajorRows).catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader
        title="שכר קצינים"
        subtitle="טבלאות מפקח, משפטנים, פקד ורפ״ק"
      />

      <section className="section-block">
        <h3>מפקח</h3>
        <DataTable rows={inspectorRows} />
      </section>

      <section className="section-block">
        <h3>משפטנים</h3>
        <DataTable rows={lawRows} />
      </section>

      <section className="section-block">
        <h3>פקד</h3>
        <DataTable rows={captainRows} />
      </section>

      <section className="section-block">
        <h3>רפ״ק</h3>
        <DataTable rows={majorRows} />
      </section>
    </div>
  );
}

export default OfficersPage;