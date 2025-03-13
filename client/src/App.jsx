import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AuthorityRoutes from "./routes/AuthorityRoutes";
import ContractorRoutes from "./routes/ContractorRoutes";
import ScrollToTop from "./components/ScollToTop";
import About from "./pages/about/About";
import ContactPage from "./pages/Contact/ContactPage";

function App() {
    return (
        <div className="App">
            <Toaster />
            <ScrollToTop />
            <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<UserRoutes />} />
                <Route path="/authority/*" element={<AuthorityRoutes />} />
                <Route path="/contractor/*" element={<ContractorRoutes />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </div>
    );
}

export default App;
