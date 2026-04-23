import PageHeader from "../components/PageHeader";

function ProfessionsPage() {
  return (
    <div>
      <PageHeader
        title="טבלת מקצועות, קבוצות ותמריצים"
        subtitle="בהמשך נחבר כאן את טבלת המקצועות המלאה"
      />

      <div className="hero-card">
        <p>
          כאן יוצגו המקצועות, קבוצות התמריץ והקשרים לטבלאות השכר.
        </p>
      </div>
    </div>
  );
}

export default ProfessionsPage;