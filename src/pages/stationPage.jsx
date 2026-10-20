
const promotionRows = [
  {
    currentRank: 'סמ"ר',
    nextRank: 'רס"ל',
    payRank: 'רס"ל 0',
    duration: "—",
    note: 'עד לקידום דרגת כתף רס"ר לא יקודם בדרגת ביניים של רס"ר',
  },
  {
    currentRank: 'רס"ל',
    nextRank: 'רס"ר',
    payRank: 'רס"ר 0',
    duration: "—",
    note: 'עד לקידום דרגת כתף רס"ר לא יקודם בדרגת ביניים של רס"ר',
  },
  {
    currentRank: 'רס"ל',
    nextRank: 'רס"ר',
    payRank: "—",
    duration: "2 שנים",
    note: "במקום 3 שנים – קיצור של שנה",
  },
  {
    currentRank: 'רס"ר',
    nextRank: 'רס"מ',
    payRank: "—",
    duration: "6 שנים",
    note: "במקום 7 שנים – קיצור של שנה",
  },
  {
    currentRank: 'רס"מ',
    nextRank: 'רס"ב',
    payRank: "—",
    duration: "7 שנים",
    note: "במקום 8 שנים – קיצור של שנה",
  },
];

function StationPage() {
  return (
    <div className="page-wrapper" dir="rtl">
      <section className="intro-page">

        <header className="intro-main-header">
          <img
            src="/logo.png"
            alt="לוגו מחלקת שכר"
            className="header-logo"
          />

          <h1>קפ"ז תחנות</h1>

          <p className="intro-subtitle">
            קיצור פרק זמן לקידום בדרגות לשוטרי התחנות
          </p>

          <span className="station-date">
            תחולה: 01.01.2025
          </span>
        </header>

        <div className="station-content">

          <div className="station-intro">
            במסגרת חיזוק והעצמת התחנות, להלן תקציר
            תנאי קידום הדרגות עבור שוטרי משטרת ישראל.
          </div>

          <section className="station-section">
            <h2>אוכלוסיית היעד</h2>

            <p>
              שוטרים בתפקידים ייעודיים בתחנות בלבד,
              כגון סיירים, חוקרים, בלשים, רכזי מודיעין
              ומש"קים.
            </p>

            <p>
              <strong>חריג:</strong> תחנות מחוז ירושלים,
              שבהן קיים ת"ש דיפרנציאלי קודם,
              אינן נכללות בהסדר.
            </p>
          </section>

          <section className="station-section">
            <h2>מעבר מדרגה לדרגה</h2>

            <p className="station-table-description">
              פירוט פרקי הזמן והקיצור הניתן במסגרת
              הסדר קפ"ז תחנות.
            </p>

            <div className="station-table-container">
              <table className="station-table">
                <thead>
                  <tr>
                    <th>דרגה נוכחית</th>
                    <th>דרגה הבאה</th>
                    <th>דרגת שכר</th>
                    <th>פז"מ</th>
                    <th>הערות</th>
                  </tr>
                </thead>

                <tbody>
                  {promotionRows.map((row, index) => (
                    <tr key={index}>
                      <td className="station-rank">
                        {row.currentRank}
                      </td>
                      <td className="station-next-rank">
                        {row.nextRank}
                      </td>
                      <td>{row.payRank}</td>
                      <td className="station-duration">
                        {row.duration}
                      </td>
                      <td className="station-note">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="station-table-footnote">
              קיצור הפז"מ כפוף לעמידה בתנאי ההסדר.
            </p>
          </section>

          <section className="station-section">
            <h2>תנאים עיקריים לקידום</h2>

            <p>
              הקידום מותנה בעמידה בכל קריטריוני
              ההערכה ובהמלצת מפקד.
            </p>

            <p>
              עיכוב בדרגה לא יחול במקרים חריגים,
              כגון מגבלה רפואית או צורך ארגוני.
            </p>
          </section>

          <section className="station-section">
            <h2>התחייבות לשירות ומעבר יחידה</h2>

            <p>
              שוטר שקיבל קיצור פז"מ מחויב לתקופת
              שירות בתחנה.
            </p>

            <p>
              מעבר ליחידה אחרת בטרם השלמת התקופה
              יגרור עיכוב בקידום הדרגה הבא,
              בהתאם למשך התקופה שחסרה.
            </p>
          </section>

          <div className="station-footer-note">
            המידע מהווה תקציר של תנאי ההסדר.
            יש לפעול בהתאם להוראות ולנהלים התקפים.
          </div>

        </div>
      </section>
    </div>
  );
}

export default StationPage;
