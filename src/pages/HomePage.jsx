function HomePage() {
  return (
    <section className="intro-page">
      <header className="intro-main-header">
        <img
          src="/logo.png"
          alt="לוגו מחלקת שכר"
          className="header-logo" 
        />
        <div className="intro-badge">גרסה 01 · 01.10.2026</div>

        <h1>חוברת שכר למתגייסים</h1>

        <p className="intro-subtitle">
           חשבות המשטרה  ·  מחלקת שכר וגמלאות
        </p>

      </header>

      <div className="intro-body">
        <p>
          מחלקת שכר וגמלאות שמה לה יעדים רבים העוסקים בשיפור המקצועיות,
          דיוק איכות השכר ומתן שירות מיטבי.
        </p>

        <p>
          במסגרת תהליכים שונים לשיפור השירות והנגשת המידע השכרי ומתוך הבנת
          חשיבות המידע השכרי למגויסים, אנו פועלים כל העת לשדרג ולשפר את
          השירותים שלנו, וכפועל יוצא מכך עודכנה והורחבה חוברת זו כאבן דרך
          לבאות.
        </p>

        <p>
          אנו מתייחסים ברגישות המירבית לשכר השוטרים ולכן בכל שאלה ואי הבנה
          ניתן לפנות לחוליית הסברה בחשבות לקבלת מענה פרטני.
        </p>

        <p>
          חוברת דיגיטלית זו מרכזת ומנגישה נתונים אודות שכר המתגייסים למשטרת
          ישראל.
        </p>

        <h3>מטרת החוברת</h3>
        <ul>
          <li>הצגת המידע באופן ברור, פשוט ונגיש.</li>
          <li>
            להוות כלי עזר למערך האמ״ש ולמפקדים לקבל אומדן שכר למתגייס בהתאם
            לפרופילי גיוס נפוצים.
          </li>
          <li>לשקף את חישובי השכר לפי טבלת המקצועות במשטרת ישראל.</li>
        </ul>

        <h3>לתשומת לבכם</h3>
        <ul>
          <li>המידע בחוברת עשוי להשתנות מעת לעת.</li>
          <li>בשנת 2026 קיים ניכוי שכר של 1.2%.</li>
          <li>החישובים נכונים למועד עדכון גרסת החוברת: 01.10.2026.</li>
        </ul>
      </div>

      
        <div className="signatures-section">
          <div className="signature-greeting">בברכה,</div>

          <div className="official-signatures">
           
          <div className="official-signature">
            <div className="signature-line signature-name">
              <span>חגית</span>
              <span>גולדשטיין</span>
              <span>מויאל, תנ״צ</span>
            </div>

            <div className="signature-line">
              <span>חשבת</span>
              <span>משטרת</span>
              <span>ישראל</span>
            </div>

            <div className="signature-line">
              <span>חשבות</span>
              <span>המשטרה</span>
            </div>
          </div>


            
          <div className="official-signature">
            <div className="signature-line signature-name">
              <span>עדה</span>
              <span>בראל, נצ״מ</span>
            </div>

            <div className="signature-line">
              <span>רמ״ח</span>
              <span>שכר</span>
              <span>וגמלאות</span>
            </div>

            <div className="signature-line">
              <span>חשבות</span>
              <span>המשטרה</span>
            </div>
          </div>

          </div>
        </div>


      
    </section>
  );
}

export default HomePage;