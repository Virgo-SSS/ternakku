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
import { KeuanganPage } from "../pages/keuangan/keuanganPage";
import { WorkerPage } from "../pages/worker/WorkerPage";
import { EditWorkerPage } from "../pages/worker/EditWorkerPage";


import { AccountPage } from "../pages/account/AccountPage";
import { Connections } from "../pages/account/ConnectionsPage";
import { NotificationPage } from "../pages/account/NotificationPage";
import { MaintenancePage } from "../pages/misc/MaintenancePage";

import Home from "../pages/Home";
import { Navigate } from "react-router-dom";



const AppRoutes = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            <Route path="/Dashboard" element={<DashboardPage />} />
            
            <Route path="/ternak" element={<TernakPage />} />
            <Route path="/ternak/create" element={<CreateTernakPage />} />
            <Route path="/ternak/informasisapi" element={<InformasiSapi />} />

            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/keuangan" element={<KeuanganPage />} />
            
            <Route path="/pekerja" element={<WorkerPage />} />
            <Route path="/pekerja/:id" element={<EditWorkerPage />} />

            {/* Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

            {/* not used i think ? */}
            <Route path="/account/settings" element={<AccountPage />} />
            <Route path="/account/notifications" element={<NotificationPage />} />
            <Route path="/account/connections" element={<Connections />} />
            <Route path="/misc/under-maintenance" element={<MaintenancePage />} />
        </Routes>
    )
}
export default AppRoutes;