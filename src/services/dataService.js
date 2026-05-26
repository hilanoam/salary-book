// ניצור אובייקט Map מחוץ לפונקציה כדי שישמור את הנתונים בזיכרון
// לאורך כל חיי האפליקציה (כל עוד המשתמש לא רענן את הדף)
const fetchCache = new Map();

export async function loadJson(fileName) {
  // 1. נבדוק אם הקובץ כבר קיים במטמון
  if (fetchCache.has(fileName)) {
    return fetchCache.get(fileName); // מחזיר את ה-Promise ששמרנו
  }

  // 2. אם לא, ניצור את בקשת הרשת (אבל עדיין לא נמתין לה עם await)
  const fetchPromise = fetch(`/data/${fileName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${fileName}`);
      }
      return response.json();
    })
    .catch((error) => {
      // 3. טיפול חכם בשגיאות: אם הבקשה נכשלה, נמחק אותה מהמטמון
      // כדי שבפעם הבאה שהמשתמש ינסה, ננסה להביא אותה שוב מהשרת
      fetchCache.delete(fileName);
      throw error;
    });

  // 4. נשמור את ה-Promise במטמון
  fetchCache.set(fileName, fetchPromise);

  // 5. נחזיר את ה-Promise
  return fetchPromise;
}