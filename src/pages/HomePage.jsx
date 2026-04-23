import PageHeader from "../components/PageHeader";

function HomePage() {
  return (
    <div>
      <PageHeader
        title="הקדמה"
        subtitle="ברוכה הבאה לחוברת השכר הדיגיטלית"
      />

      <div className="hero-card">
        <h3>חוברת שכר דיגיטלית</h3>
        <p>
          מערכת זו מחליפה את חוברת ה-PDF ומציגה את נתוני השכר בצורה נוחה,
          ברורה, ידידותית ומתעדכנת.
        </p>
      </div>

      <div className="cards-grid">
        <div className="info-card">
          <h4>חיפוש מהיר</h4>
          <p>מעבר קל בין מסלולים, קבוצות וטבלאות.</p>
        </div>

        <div className="info-card">
          <h4>נתונים מסודרים</h4>
          <p>הצגת טבלאות שכר בצורה ברורה ונקייה.</p>
        </div>

        <div className="info-card">
          <h4>עדכון קל</h4>
          <p>אפשר לעדכן Excel ולהציג נתונים חדשים באתר.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;