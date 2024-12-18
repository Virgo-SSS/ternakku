import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CowPage } from "../pages/cow/CowPage";
import { CreateCowPage } from "../pages/cow/CreateCowPage";
import { CowDetailPage } from "../pages/cow/CowDetailPage";
import { CalendarPage } from "../pages/calendar/calendarPage";
import { TaskPage } from "../pages/task/TaskPage";
import { FinanceDashboardPage } from "../pages/finance/FinanceDashboardPage";
import { CreateTransactionPage } from "../pages/finance/CreateTransactionPage";
import { WorkerPage } from "../pages/worker/WorkerPage";
import { EditWorkerPage } from "../pages/worker/EditWorkerPage";
import { ProfilePage } from "../pages/profile/ProfilePage";

import { EditCowPage } from "../pages/cow/EditCowPage";
import { FinanceDetailPage } from "../pages/finance/FinanceDetailPage";
import { EditTransactionPage } from "../pages/finance/EditTransacationPage";

import { AccountPage } from "../pages/account/AccountPage";
import { Connections } from "../pages/account/ConnectionsPage";
import { NotificationPage } from "../pages/account/NotificationPage";
import { MaintenancePage } from "../pages/misc/MaintenancePage";

import Home from "../pages/Home";
import { Navigate } from "react-router-dom";
import RequireAuth from "../components/auth/RequireAuth";
import RequireGuest from "../components/auth/RequireGuest";


const AppRoutes = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/ternak" element={<CowPage />} />
                <Route path="/ternak/create" element={<CreateCowPage />} />
                <Route path="/ternak/edit/:id" element={<EditCowPage />} />
                <Route path="/ternak/:id" element={<CowDetailPage />} />
                
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/task" element={<TaskPage />} />
                
                <Route path="/pekerja" element={<WorkerPage />} />
                <Route path="/pekerja/:id" element={<EditWorkerPage />} />

                {/* Finance */}
                <Route path="/keuangan" element={<FinanceDashboardPage />} />
                <Route path="/keuangan/detail" element={<FinanceDetailPage />} />
                <Route path="/keuangan/create" element={<CreateTransactionPage />} />
                <Route path="/keuangan/edit/:id" element={<EditTransactionPage />} />
                
                <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route element={<RequireGuest/>}>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* not used i think ? */}
            <Route path="/misc/under-maintenance" element={<MaintenancePage />} />
            <Route path="/account/settings" element={<AccountPage />} />
            <Route path="/account/notifications" element={<NotificationPage />} />
            <Route path="/account/connections" element={<Connections />} />
        </Routes>
    )
}

export default AppRoutes;