import PageHeader from "../components/PageHeader";

function PersonalExpensesPage() {
  const expenses = [
    { "דרגת שכר": 'רס"ל', "החזר הוצאות אישיות ברוטו": 229 },
    { "דרגת שכר": 'רס"ר', "החזר הוצאות אישיות ברוטו": 344 },
    { "דרגת שכר": "מפקח", "החזר הוצאות אישיות ברוטו": 350 },
    { "דרגת שכר": "פקד", "החזר הוצאות אישיות ברוטו": 580 },
    { "דרגת שכר": 'רפ"ק', "החזר הוצאות אישיות ברוטו": 701 },
  ];

  return (
    <div>
      <PageHeader
        title="החזר הוצאות אישיות"
        subtitle="טבלת החזרים לפי דרגת שכר."
      />

      <div className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>דרגת שכר</th>
                <th>החזר הוצאות אישיות ברוטו</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((row, index) => (
                <tr key={index}>
                  <td>{row["דרגת שכר"]}</td>
                  <td>{row["החזר הוצאות אישיות ברוטו"]} ₪</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PersonalExpensesPage;