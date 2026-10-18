
import { useState } from "react";
import DataTable from "../components/DataTable";

const studentsRows = [
  {
    "מקצוע": "סטודנט מנהלה תואר ראשון",
    "מס מקצוע": "10159",
    "שכר שעתי": "35.41",
  },
  {
    "מקצוע": "סטודנט מנהלה תואר שני",
    "מס מקצוע": "10159",
    "שכר שעתי": "40.41",
  },
  {
    "מקצוע": "סטודנט משל״ט",
    "מס מקצוע": "10156",
    "שכר שעתי": "40.78",
  },
  {
    "מקצוע": "סטודנט סיור/יס״מ",
    "מס מקצוע": "10158",
    "שכר שעתי": "46.50",
  },
  {
    "מקצוע": "סטודנט מב״ס",
    "מס מקצוע": "10176",
    "שכר שעתי": "51.90",
  },
  {
    "מקצוע": "סטודנט סיגינט",
    "מס מקצוע": "20265",
    "שכר שעתי": "51.90",
  },
  {
    "מקצוע": "סטודנט חוקר",
    "מס מקצוע": "20149",
    "שכר שעתי": "42.49",
  },
];

const rates = [
  {
    role: "עוזרי חוקרים בתחנה",
    items: [
      {
        type: "רגיל",
        rate: "100%",
        hours: [
          "מיום א׳ 06:00 עד יום ה׳ 22:00",
          "יום ו׳ 06:00–14:00",
        ],
      },
      {
        type: "סופ״ש / חג",
        rate: "150%",
        hours: [
          "מיום ה׳ 22:00 עד יום ו׳ 06:00",
          "מיום ו׳ 14:00 עד יום א׳ 06:00",
        ],
        note: "למעט משמרת א׳ ביום ו׳",
      },
    ],
  },
  {
    role: "סיירים",
    items: [
      {
        type: "רגיל",
        rate: "100%",
        hours: [
          "מיום א׳ 06:00 עד יום ה׳ 22:00",
          "יום ו׳ 06:00–14:00",
        ],
        note: "למעט משמרות לילה",
      },
      {
        type: "לילה",
        rate: "150%",
        hours: ["ימים א׳–ד׳ בשעות 22:00–06:00"],
      },
      {
        type: "סופ״ש / חג",
        rate: "175%",
        hours: [
          "מיום ה׳ 22:00 עד יום ו׳ 06:00",
          "מיום ו׳ 14:00 עד יום א׳ 06:00",
        ],
        note: "למעט משמרת א׳ ביום ו׳",
      },
    ],
  },
  {
    role: "מוקדנים במוקד 100",
    items: [
      {
        type: "רגיל",
        rate: "100%",
        hours: [
          "מיום א׳ 06:00 עד יום ה׳ 22:00",
          "יום שבת 06:00–14:00",
        ],
      },
      {
        type: "סופ״ש / חג",
        rate: "150%",
        hours: [
          "מיום ה׳ 22:00 עד יום שבת 06:00",
          "מיום שבת 14:00 עד יום א׳ 06:00",
        ],
        note: "למעט משמרת א׳ בשבת",
      },
    ],
  },
  {
    role: "מטה מנהלי / מקצועי",
    items: [
      {
        type: "רגיל",
        rate: "100%",
        hours: ["מיום א׳ 06:00 עד יום ו׳ 14:00"],
      },
      {
        type: "סופ״ש / חג",
        rate: "150%",
        hours: ["מיום ו׳ 14:00 עד יום א׳ 06:00"],
      },
    ],
  },
];

function StudentsPage() {
  const [openRole, setOpenRole] = useState(null);

  const toggleRole = (index) => {
    setOpenRole((current) =>
      current === index ? null : index
    );
  };

  return (
    <div className="page-wrapper">
      <section className="intro-page">
        <header className="intro-main-header">
          <img
            src="/logo.png"
            alt="לוגו מחלקת שכר"
            className="header-logo"
          />

          <h1>סטודנטים</h1>

          <p className="intro-subtitle">
            טבלת שכר שעתי לסטודנטים ודגשים
            לתוספות לפי סוג השירות
          </p>
        </header>

        <div className="intro-body">
          <h2 className="students-section-title">
            שכר שעתי לפי מקצוע
          </h2>

          <DataTable
            rows={studentsRows}
            showToolbar={false}
            showColumnFilters={false}
          />

          <h2 className="students-section-title">
            תעריפי שכר לפי תפקיד ושעות עבודה
          </h2>


          <div className="students-rate-list">
            {rates.map((group, index) => (
              <div
                className="students-rate-group"
                key={group.role}
              >
                <button
                  type="button"
                  className="students-rate-toggle"
                  onClick={() => toggleRole(index)}
                  aria-expanded={openRole === index}
                >
                  <span>{group.role}</span>
                  <span className="students-rate-arrow">
                    {openRole === index ? "−" : "+"}
                  </span>
                </button>

                {openRole === index && (
                  <div className="students-rate-content">
                    <table className="students-rate-table">
                      <thead>
                        <tr>
                          <th>סוג תעריף</th>
                          <th>תעריף</th>
                          <th>ימים ושעות</th>
                          <th>הערות</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item, i) => (
                          <tr key={i}>
                            <td>{item.type}</td>
                            <td className="students-rate-percent">
                              {item.rate}
                            </td>
                            <td>
                              {item.hours.map((hour, j) => (
                                <div key={j}>{hour}</div>
                              ))}
                            </td>
                            <td>{item.note || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          
            <div className="students-rate-general-note">
              <h3>דגשים חשובים</h3>

              <ul>
                <li>
                  בכל מקרה של סתירה בין האמור במסמך זה
                  לקביעה של גורמי המקצוע לאחר הגיוס,
                  תגבר קביעת גורמי המקצוע לאחר הגיוס.
                </li>

                <li>
                  שכר הסטודנט משולם בגין חודש העבודה הקודם,
                  ובכפוף לסגירת נוכחות. בתלוש השכר הראשון
                  לאחר הגיוס יקבל הסטודנט מקדמה בסך
                  <strong> 3,000 ₪ ברוטו </strong>
                  אשר תקוזז בסיום יחסי עובד–מעביד.
                </li>
              </ul>
            </div>

      
          <p className="students-emphasis">
            על כל שעת עבודה יזוכה הסטודנט
            ב־1.72 ₪ דמי הבראה.
          </p>

          <div className="students-notes">
            <h3>סטודנט מנהלה</h3>

            <p>תוספת ותק בשירות:</p>

            <ul>
              <li>
                עד 12 חודשים תוספת של 0.8 אג׳
                לערך שעת עבודה.
              </li>
              <li>
                מחודש 13 עד חודש 24 תוספת של
                1.3 ₪ לערך שעת עבודה.
              </li>
              <li>
                מחודש 25 ואילך, תוספת של
                1.8 ₪ לערך שעת עבודה.
              </li>
            </ul>

            <p>
              תוספת שירות חובה, צה״ל / משטרה
              חובה / שירות לאומי:
            </p>

            <ul>
              <li>
                0.2 אג׳ תוספת לערך שעת עבודה
                לכל שנת שירות.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentsPage;
