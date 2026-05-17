import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar({ isOpen, onClose }) {
  const [openSergeants, setOpenSergeants] = useState(true);
  const [openOfficers, setOpenOfficers] = useState(true);

  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="sidebar-brand">
        <h2>חוברת שכר</h2>
        <p>מתגייסים 2026
          
        </p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/home"  onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          הקדמה
        </NavLink>

        <NavLink to="/salary-intro"  onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          שכר מתגייסים
        </NavLink>

        <NavLink to="/personal-expenses"  onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          החזר הוצאות אישיות
        </NavLink>

        <NavLink to="/professions"  onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          טבלת מקצועות קבוצות ותמריצים
        </NavLink>

        <NavLink to="/students"  onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          סטודנטים
        </NavLink>

        <NavLink to="/retirees"  onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          שמ"ז גמלאי
        </NavLink>

        <NavLink to="/jerusalem"  onClick={onClose} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          מחוז ירושלים - גיוס בדרגת שכר רס"ר 8
        </NavLink>
        
        <NavLink
          to="/profile-builder"
          onClick={onClose}
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          בניית פרופיל שכר
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
              <NavLink to="/sergeants" end  onClick={onClose} className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                כל הטבלאות
              </NavLink>

              {[1, 2, 3, 4, 5, 6, 7, 8].map((group) => (
                <NavLink
                  key={group}
                  to={`/sergeants/group/${group}`}
                   onClick={onClose} className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}
                >
                  קבוצה {group}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="nav-group">
          <button
            className="nav-item nav-toggle"
            onClick={() => setOpenOfficers(!openOfficers)}
            type="button"
          >
            <span>שכר קצינים</span>
            <span>{openOfficers ? "−" : "+"}</span>
          </button>

          {openOfficers && (
            <div className="sub-nav">
              <NavLink to="/officers" end  onClick={onClose} className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                כל הטבלאות
              </NavLink>

              <NavLink to="/officers/inspectors"  onClick={onClose} className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                מפקח
              </NavLink>

              <NavLink to="/officers/lawyers"  onClick={onClose} className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                משפטנים
              </NavLink>

              <NavLink to="/officers/captain"  onClick={onClose} className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                פקד
              </NavLink>

              <NavLink to="/officers/major"  onClick={onClose} className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}>
                רפ"ק
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;