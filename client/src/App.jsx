import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/doctors/Doctors";
import AddDoctor from "./pages/doctors/AddDoctor";
import EditDoctor from "./pages/doctors/EditDoctor";

import Cases from "./pages/cases/Cases";
import AddCase from "./pages/cases/AddCase";
import EditCase from "./pages/cases/EditCase";
import CaseDetails from "./pages/cases/CaseDetails";

import Challans from "./pages/challans/Challans";
import ChallanDetails from "./pages/challans/ChallanDetails";

import Billing from "./pages/billing/Billing";
import InvoiceDetails from "./pages/billing/InvoiceDetails";

import Payments from "./pages/payments/Payments";
import AddPayment from "./pages/payments/AddPayment";

import Reports from "./pages/reports/Reports";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
                <Route path="/doctors/add" element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
                <Route path="/doctors/edit/:id" element={<ProtectedRoute><EditDoctor /></ProtectedRoute>} />

                <Route path="/cases" element={<ProtectedRoute><Cases /></ProtectedRoute>} />
                <Route path="/cases/add" element={<ProtectedRoute><AddCase /></ProtectedRoute>} />
                <Route path="/cases/edit/:id" element={<ProtectedRoute><EditCase /></ProtectedRoute>} />
                <Route path="/cases/:id" element={<ProtectedRoute><CaseDetails /></ProtectedRoute>} />

                <Route path="/challans" element={<ProtectedRoute><Challans /></ProtectedRoute>} />
                <Route path="/challans/:id" element={<ProtectedRoute><ChallanDetails /></ProtectedRoute>} />

                <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
                <Route path="/billing/:doctorId" element={<ProtectedRoute><InvoiceDetails /></ProtectedRoute>} />

                <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
                <Route path="/payments/add" element={<ProtectedRoute><AddPayment /></ProtectedRoute>} />

                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;