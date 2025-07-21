import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ResumeForm from "./components/ResumeForm";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ResumePreview from "./components/ResumePreview";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import About from "./components/about";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ScrollToTop />
          <div className="font-sans">
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className:toast-top-right-custom
              style={{
                margin: "40px",
              }}
              toastStyle={{ marginTop: "20px" }}
            />
            <div className="print:hidden sticky top-0 z-50">
              <Header />
            </div>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/auth-redirect" element={<AuthRedirect />} />

              {/* Protected Routes are defined here */}
              <Route element={<ProtectedRoute />}>
                <Route path="/resume-builder" element={<ResumeForm />} />
                <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
                <Route path="/resume-preview" element={<ResumePreview />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
