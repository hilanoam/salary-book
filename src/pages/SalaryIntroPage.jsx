import PageHeader from "../components/PageHeader";

function SalaryIntroPage() {
  return (
    <div>
      <PageHeader
        title="שכר מתגייסים"
        subtitle="מידע כללי על מבנה השכר והדגשים המרכזיים"
      />

      <div className="hero-card">
        <p>
          בעמוד זה יוצגו בהמשך עקרונות חישוב השכר, דגשים למתגייסים,
          הסברים על רכיבי שכר, ותנאים כלליים.
        </p>
      </div>
    </div>
  );
}

export default SalaryIntroPage;