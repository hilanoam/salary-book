import { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { loadJson } from "../services/dataService";
import DataTable from "../components/DataTable";

const FILTERS_BY_TYPE = {
    נגד: [
    { key: "מקצוע", label: "מקצוע", displayOnly: true },
    { key: "דירוג", label: "דירוג" },
    { key: "פעילות", label: "רמת פעילות" },
     { key: "ותק", label: "ותק" },
    { key: "קבוצת תמריץ", label: "קבוצת תמריץ" },
    { key: "גמול א'", label: "גמול א'" },
    { key: "דרגת שכר", label: "דרגת שכר" },
    { key: "תמריץ חדש", label: "תמריץ חדש" },
    ],

  קצין: [
    { key: "מקצוע", label: "מקצוע", displayOnly: true },
    { key: "דרגת שכר", label: "דרגת שכר" },
    { key: "שלב", label: "שלב" },
    { key: "תמריץ", label: "תמריץ" },
    { key: "דירוג", label: "דירוג" },
    { key: "רמה", label: "רמה" },
    { key: "ותק", label: "ותק" },
    { key: "פעילות", label: "פעילות" },
    { key: "גמול א'", label: "גמול א'" },
    { key: "גמול ב'", label: "גמול ב'"},
  ],
};

function uniqueValues(values) {
  return [
    ...new Set(
      values.filter((v) => v !== undefined && v !== null && v !== "")
    ),
  ].sort((a, b) =>
    String(a).localeCompare(String(b), "he", { numeric: true })
  );
}

function ProfileBuilderPage() {
  const resultRef = useRef(null);

  const [employeeType, setEmployeeType] = useState("");
  const [salaryRows, setSalaryRows] = useState([]);
  const [professionsRows, setProfessionsRows] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJson("professions.json")
      .then(setProfessionsRows)
      .catch(() => setProfessionsRows([]));
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setSalaryRows([]);
        setFilters({});

        if (employeeType === "נגד") {
          const data = await loadJson("sergeants.json").catch(() => []);
          setSalaryRows(data);
        }

        if (employeeType === "קצין") {
          const [inspectors, lawyers, captain, major] = await Promise.all([
            loadJson("inspectors.json").catch(() => []),
            loadJson("lawyers.json").catch(() => []),
            loadJson("captain.json").catch(() => []),
            loadJson("major.json").catch(() => [])
          ]);

          setSalaryRows([...inspectors, ...lawyers, ...captain, ...major]);
        }

        } catch (err) {
          console.error(err);
        } finally {
            setTimeout(() => {
              setLoading(false);
            }, 300);
          
        }
    }

    if (employeeType) {
      loadData().catch(console.error);
    }
  }, [employeeType]);

  const currentFields = FILTERS_BY_TYPE[employeeType] || [];

  const professionOptions = useMemo(() => {
    return uniqueValues(
        professionsRows.map((row) => {
        const number = row["מספר מקצוע"] ?? "";
        const name = row["שם מקצוע"] || row["מקצוע"] || "";

        if (number && name) return `${number} - ${name}`;
        return name || number;
        })
    );
    }, [professionsRows]);

  // עדכון הפונקציה למניעת נעילה בין קבוצת תמריץ לאחוז תמריץ
  function getRowsForField(currentKey) {
    return salaryRows.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key === currentKey) return true;
        if (key === "מקצוע") return true;

        // משחרר את הנעילה ההדדית: כשמחשבים אופציות לקבוצת תמריץ, מתעלמים מהאחוז שנבחר ב"תמריץ חדש"
        if (currentKey === "קבוצת תמריץ" && key === "תמריץ חדש") return true;

        return String(row[key] ?? "") === String(value);
      })
    );
  }

  function getOptions(field) {
    if (field.displayOnly && field.key === "מקצוע") {
      return professionOptions;
    }

    return uniqueValues(getRowsForField(field.key).map((row) => row[field.key]));
  }

const visibleFields = useMemo(() => {
  return currentFields.filter((field) => {
    if (field.displayOnly) return true;

    if (field.key === "רמה") {
      return filters["דרגת שכר"] === "פקד";
    }

    const options = getOptions(field);

    if (options.length === 0) return false;

    if (filters[field.key]) return true;

    if (field.hideIfSingleOption && options.length <= 1) {
      return false;
    }

    return true;
  });
}, [currentFields, salaryRows, professionsRows, filters]);

  function updateFilter(key, value) {
    setFilters((prev) => {
      const next = {
        ...prev,
        [key]: value,
      };

      if (employeeType === "נגד" && (key === "מקצוע" || (key === "דרגת שכר" && next["מקצוע"]))) {
        const targetProfStr = key === "מקצוע" ? value : next["מקצוע"];
        
        const foundProfession = professionsRows.find((row) => {
          const number = row["מספר מקצוע"] ?? "";
          const name = row["שם מקצוע"] || row["מקצוע"] || "";
          const optStr = number && name ? `${number} - ${name}` : String(name || number);
          return optStr === targetProfStr;
        });

        if (foundProfession) {
          if (key === "מקצוע" && foundProfession["קבוצת תמריץ"] !== undefined) {
            next["קבוצת תמריץ"] = String(foundProfession["קבוצת תמריץ"]);
          }

          const currentRank = next["דרגת שכר"];
          if (currentRank) {
            let percentVal = null;
            if (currentRank.includes("רס\"ל")) {
              percentVal = foundProfession["אחוז תמריץ רס\"ל"];
            } else {
              percentVal = foundProfession["אחוז תמריץ רס\"ר- רנ\"ג"];
            }

            if (percentVal !== undefined && percentVal !== null) {
              next["תמריץ חדש"] = `${percentVal}%`;
            }
          }
        }
      }

      currentFields.forEach((field) => {
        if (field.key === key) return;
        if (field.displayOnly) return;

        const availableValues = uniqueValues(
          salaryRows
            .filter((row) =>
              Object.entries(next).every(([filterKey, filterValue]) => {
                if (!filterValue) return true;
                if (filterKey === field.key) return true;
                if (filterKey === "מקצוע") return true;

                return String(row[filterKey] ?? "") === String(filterValue);
              })
            )
            .map((row) => row[field.key])
        );

        if (
          next[field.key] &&
          !availableValues.map(String).includes(String(next[field.key]))
        ) {
          next[field.key] = "";
        }
      });

      return next;
    });
  }

  const filteredRows = useMemo(() => {
    return salaryRows.filter((row) =>
      currentFields.every((field) => {
        if (field.displayOnly) return true;

        const value = filters[field.key];
        if (!value) return true;

        return String(row[field.key] ?? "") === String(value);
      })
    );
  }, [salaryRows, filters, currentFields]);

  const selectedSalaryRow = useMemo(() => {
    return filteredRows.length === 1 ? filteredRows[0] : null;
  }, [filteredRows]);

  async function exportToPdf() {
    if (!resultRef.current) return;

    const canvas = await html2canvas(resultRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("salary-profile.pdf");
  }
  if (loading) {
    return (
      <div className="page-wrapper">
        {loading && (
          <div className="page-loading-overlay">
            <div className="loader"></div>
            <p>טוען נתוני שכר...</p>
          </div>
        )}

        <section className="intro-page">
          ...
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="intro-page">
        <header className="intro-main-header">
          <img src="/logo.png" alt="לוגו מחלקת שכר" className="header-logo" />

          <h1>בניית פרופיל שכר</h1>

          <p className="intro-subtitle">
            בחירת סוג עובד וסינון לפי השדות הרלוונטיים לטבלת השכר
          </p>
        </header>

        <div className="intro-body">
          <div className="profile-form-card">
            <div className="profile-grid">
              <label>
                סוג עובד
                <select
                  value={employeeType}
                  onChange={(e) => {
                    setEmployeeType(e.target.value);
                    setFilters({});
                  }}
                >
                  <option value="">בחרי סוג עובד</option>
                  <option value="נגד">נגד</option>
                  <option value="קצין">קצין</option>
                </select>
              </label>

              {visibleFields.map((field) => (
                <label key={field.key}>
                    {field.label}

                    {field.key === "מקצוע" ? (
                    <>
                        <input
                        list="profession-options"
                        value={filters[field.key] || ""}
                        onChange={(e) => updateFilter(field.key, e.target.value)}
                        placeholder="חפש לפי מספר מקצוע או שם מקצוע"
                        />

                        <datalist id="profession-options">
                        {getOptions(field).map((value) => (
                            <option key={value} value={value} />
                        ))}
                        </datalist>
                    </>
                    ) : (
                    <select
                        value={filters[field.key] || ""}
                        onChange={(e) => updateFilter(field.key, e.target.value)}
                    >
                        <option value="">בחרי {field.label}</option>

                        {getOptions(field).map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                    )}
                </label>
                ))}
            </div>
          </div>
            <button
              type="button"
              className="reset-profile-btn"
              onClick={() => {
                setEmployeeType("");
                setFilters({});
                setSalaryRows([]);
              }}
            >
              איפוס פרופיל
            </button>
          {employeeType && filteredRows.length > 1 && (
            <p className="results-counter">
              נמצאו {filteredRows.length} אפשרויות מתאימות. המשיכי לסנן עד לקבלת תוצאה אחת.
            </p>
          )}
        {employeeType && filteredRows.length > 0 && (
            <div className="profile-options-preview">
                <h3>אפשרויות שנמצאו לפי הסינון</h3>

                <DataTable
                rows={filteredRows}
                showToolbar={false}
                showColumnFilters={false}
                />
            </div>
            )}
          {selectedSalaryRow && (
            <>
              <div className="profile-result-card" ref={resultRef}>
                <div className="pdf-logo-wrap">
                    <img src="/topcenter.png" alt="לוגו מחלקת שכר" />
                </div>
                <h2>תוצאת פרופיל שכר</h2>

                <div className="profile-summary-grid">
                  {filters["מקצוע"] && (
                    <div className="summary-item summary-highlight">
                      <span className="summary-label">מקצוע</span>
                      <span className="summary-value">{filters["מקצוע"]}</span>
                    </div>
                  )}

                  {Object.entries(selectedSalaryRow).map(([key, value]) => (
                    <div className="summary-item" key={key}>
                      <span className="summary-label">{key}</span>

                      <span className="summary-value">
                        {key.includes("משכורת")
                          ? `${Number(value).toLocaleString("he-IL")} ₪`
                          : String(value)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="salary-final-box">
                  <span>סה"כ משכורת ברוטו</span>
                  <strong>
                    {Number(selectedSalaryRow['סה"כ משכורת ברוטו']).toLocaleString("he-IL")} ₪
                  </strong>
                </div>

                <footer className="salary-disclaimer">
                    <p>
                    חישובים אלה הינם בגדר אומדן בלבד, אינם סופיים ומבוססים על נתונים משוערים בלבד שטרם נבדקו ואומתו סופית והם כפופים לשינויים.
                    </p>
                    <p>
                    גרסה זו (גרסה 1) כוללת הסכמי שכר שניתנו בפועל עד תאריך 01.01.2026.
                    </p>
                    <p>
                    סימולציה קובעת תבוצע בסמוך ליציאתך לקורס קצינים ע"י חשבי מח' שכר וגמלאות
                    </p>
                </footer>
              </div>

              <button className="clear-btn pdf-btn" type="button" onClick={exportToPdf}>
                ייצוא התוצאה ל־PDF
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfileBuilderPage;