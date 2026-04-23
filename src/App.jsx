import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import SalaryIntroPage from "./pages/SalaryIntroPage";
import PersonalExpensesPage from "./pages/PersonalExpensesPage";
import ProfessionsPage from "./pages/ProfessionsPage";
import StudentsPage from "./pages/StudentsPage";
import RetireesPage from "./pages/RetireesPage";
import JerusalemPage from "./pages/JerusalemPage";
import SergeantsPage from "./pages/SergeantsPage";
import SergeantsSearchPage from "./pages/SergeantsSearchPage";
import SergeantsGroupPage from "./pages/SergeantsGroupPage";
import OfficersPage from "./pages/OfficersPage";
import OfficersTypePage from "./pages/OfficersTypePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="salary-intro" element={<SalaryIntroPage />} />
        <Route path="personal-expenses" element={<PersonalExpensesPage />} />
        <Route path="professions" element={<ProfessionsPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="retirees" element={<RetireesPage />} />
        <Route path="jerusalem" element={<JerusalemPage />} />

        <Route path="sergeants" element={<SergeantsPage />} />
        <Route path="sergeants/search" element={<SergeantsSearchPage />} />
        <Route path="sergeants/group/:groupId" element={<SergeantsGroupPage />} />

        <Route path="officers" element={<OfficersPage />} />
        <Route path="officers/:type" element={<OfficersTypePage />} />
      </Route>
    </Routes>
  );
}

export default App;