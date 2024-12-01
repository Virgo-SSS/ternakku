import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { DashboardPage } from "../pages/DashboardPage";
import { TernakPage } from "../pages/ternak/TernakPage";
import { CreateTernakPage } from "../pages/ternak/CreateTernakPage";
import InformasiSapi from "../pages/ternak/InformasiSapi";
import { CalendarPage } from "../pages/calendar/calendarPage";
import { TaskPage } from "../pages/task/TaskPage";
import { FinanceDashboardPage } from "../pages/finance/FinanceDashboardPage";
import { CreateTransactionPage } from "../pages/finance/CreateTransactionPage";

import { AccountPage } from "../pages/account/AccountPage";
import { Connections } from "../pages/account/ConnectionsPage";
import { NotificationPage } from "../pages/account/NotificationPage";
import { MaintenancePage } from "../pages/misc/MaintenancePage";

import { PekerjaPage } from "../pages/pekerja/PekerjaPage";

import Home from "../pages/Home";
import { Navigate } from "react-router-dom";
import FinanceDetailPage from "../pages/finance/FinanceDetailPage";


const AppRoutes = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            {/* Dashboard */}
            <Route path="/Dashboard" element={<DashboardPage />} />

            {/* Ternak */}
            <Route path="/ternak" element={<TernakPage />} />
            <Route path="/ternak/create" element={<CreateTernakPage />} />
            <Route path="/ternak/informasisapi" element={<InformasiSapi />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/task" element={<TaskPage />} />
            
            {/* Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="/account/settings" element={<AccountPage />} />
            <Route path="/account/notifications" element={<NotificationPage />} />
            <Route path="/account/connections" element={<Connections />} />

            <Route path="/misc/under-maintenance" element={<MaintenancePage />} />

            {/* Pekerja */}
            <Route path="/pekerja" element={<PekerjaPage />} />

            {/* Finance */}
            <Route path="/keuangan" element={<FinanceDashboardPage />} />
            <Route path="keuangan/detail" element={<FinanceDetailPage />} />
            <Route path="/transaction/create" element={<CreateTransactionPage />} />
        </Routes>
    )
}
export default AppRoutes;