import PageHeader from "../components/PageHeader";

function StudentsPage() {
  return (
    <div>
      <PageHeader
        title="סטודנטים"
        subtitle="מסלול ייעודי לסטודנטים"
      />

      <div className="hero-card">
        <p>
          כאן יוצגו נתוני השכר הרלוונטיים למסלולי סטודנטים.
        </p>
      </div>
    </div>
  );
}

export default StudentsPage;