import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-shell">
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(true)}
        type="button"
      >
        ☰
      </button>

      <div
        className={isSidebarOpen ? "mobile-overlay show" : "mobile-overlay"}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPath={location.pathname}
      />

      <main className="content-area">
        <Outlet />

        <footer className="site-footer-logo">
          <img src="/topcenter.png" alt="מקצוענות באנשים מצוינות בתוצאות" />
        </footer>
      </main>
    </div>
  );
}

export default MainLayout;