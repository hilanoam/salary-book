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
    <div>
      <PageHeader
        title="החזר הוצאות אישיות"
        subtitle="טבלת החזר הוצאות לפי דרגת שכר"
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
                  <td>{row.rank}</td>
                  <td>{row.amount} ₪</td>
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