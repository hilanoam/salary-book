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
    loadJson("מפקח.json").then(setInspectorRows);
    loadJson("משפטנים.json").then(setLawRows);
    loadJson("פקד.json").then(setCaptainRows);
    loadJson("רפק.json").then(setMajorRows);
  }, []);

  return (
    <div>
      <PageHeader
        title="שכר קצינים"
      />

      <section className="section-block">
        <h3>מפקח</h3>
        <DataTable rows={inspectorRows.slice(0, 20)} />
      </section>

      <section className="section-block">
        <h3>משפטנים</h3>
        <DataTable rows={lawRows.slice(0, 20)} />
      </section>

      <section className="section-block">
        <h3>פקד</h3>
        <DataTable rows={captainRows.slice(0, 20)} />
      </section>

      <section className="section-block">
        <h3>רפ״ק</h3>
        <DataTable rows={majorRows.slice(0, 20)} />
      </section>
    </div>
  );
}

export default OfficersPage;