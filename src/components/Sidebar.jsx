import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [openSergeants, setOpenSergeants] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>חוברת שכר</h2>
        <p>דוגמית אתר</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          הקדמה
        </NavLink>

        <NavLink to="/salary-intro" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          שכר מתגייסים
        </NavLink>

        <NavLink to="/personal-expenses" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          החזר הוצאות אישיות
        </NavLink>

        <NavLink to="/professions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          טבלת מקצועות קבוצות ותמריצים
        </NavLink>

        <NavLink to="/students" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          סטודנטים
        </NavLink>

        <NavLink to="/retirees" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          שמ"ז גמלאי
        </NavLink>

        <NavLink to="/jerusalem" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          מחוז ירושלים - גיוס בדרגת שכר רס"ר 8
        </NavLink>

        <div className="nav-group">
          <button
            className="nav-item nav-toggle"
            onClick={() => setOpenSergeants(!openSergeants)}
            type="button"
          >
            <span>שכר נגדים</span>
            <span>{openSergeants ? "−" : "+"}</span>
          </button>

          {openSergeants && (
            <div className="sub-nav">
              <NavLink to="/sergeants" end className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                כל הטבלאות
              </NavLink>

              <NavLink to="/sergeants/search" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                חיפוש לפי מקצוע
              </NavLink>

              <NavLink to="/sergeants/group/1" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 1
              </NavLink>

              <NavLink to="/sergeants/group/2" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 2
              </NavLink>

              <NavLink to="/sergeants/group/3" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 3
              </NavLink>

              <NavLink to="/sergeants/group/4" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 4
              </NavLink>

              <NavLink to="/sergeants/group/5" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 5
              </NavLink>

              <NavLink to="/sergeants/group/6" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 6
              </NavLink>

              <NavLink to="/sergeants/group/7" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 7
              </NavLink>

              <NavLink to="/sergeants/group/8" className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                קבוצה 8
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/officers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          שכר קצינים
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;