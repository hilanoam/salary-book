import PageHeader from "../components/PageHeader";

function PersonalExpensesPage() {
  const expenses = [
    { rank: 'רס"ל', amount: 229 },
    { rank: 'רס"ר', amount: 344 },
    { rank: "מפקח", amount: 350 },
    { rank: "פקד", amount: 580 },
    { rank: 'רפ"ק', amount: 701 },
  ];

  return (
    <div className="page-wrapper">

      <section className="intro-page">
        <header className="intro-main-header">
 

          <h1>החזר הוצאות אישיות</h1>

          <p className="intro-subtitle">
            טבלת החזרי אש״ל גלובלי והוצאות טלפון לפי דרגת שכר
          </p>
        </header>

        <div className="intro-body">
          <p>
            תשלום החזר הוצאות אישיות משולם לכל שוטר בהתאם לדרגתו,
            ומוגדר כתשלום נוסף לשכר החודשי השוטף.
          </p>

          <p>
            התשלום כולל אש״ל גלובלי, הכולל הוצאות אוכל, שתייה ולינה,
            וכן הוצאות טלפון לפי דרגה.
          </p>

          <h3>אש״ל גלובלי</h3>

          <p>
            אש״ל גלובלי הוא תוספת כספית גלובלית המשולמת במשכורתו של השוטר
            לצורך כיסוי הוצאות כלכלה בעת תפקיד.
          </p>

          <p>
            ערך התוספת נקבע על פי עלות יום הוצאות כלכלה כפול מספר ימי הזכאות
            להם זכאי השוטר על פי דרגתו. עלות יום הוצאות כלכלה נקבעת בהוראות
            החשב הכללי במשרד האוצר ומתעדכנת מעת לעת.
          </p>

          <h3>טבלת החזר הוצאות אישיות לפי דרגה</h3>

          <div className="mini-table-wrap">
            <table className="mini-table">
              <thead>
                <tr>
                  <th>דרגת שכר</th>
                  <th>החזר הוצאות אישיות ברוטו</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((row) => (
                  <tr key={row.rank}>
                    <td>{row.rank}</td>
                    <td>{row.amount.toLocaleString()} ₪</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            במסירת סימולציית שכר למועמד לגיוס, יש להוסיף את סכום החזר
            ההוצאות האישיות לפי דרגה לנתון "סה״כ משכורת ברוטו" המפורט
            בטבלאות שבהמשך.
          </p>

          <p>
            שני הסכומים יחד מרכיבים את שכר הברוטו של השוטר.
          </p>

          <div className="content-note">
            <strong>לתשומת לבכם:</strong>
            <p>*המידע מעודכן לתאריך 01.05.2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonalExpensesPage;