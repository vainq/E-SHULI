// apps/frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Schools from "./pages/Schools";
import PastPapers from "./pages/PastPapers";
import ENotes from "./pages/ENotes";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import AdminLogin from "./pages/AdminLogin";
import AdminUploads from "./pages/AdminUploads";
import { getToken } from "./lib/auth";
import StickyBannerAd from "./components/StickyBannerAd";
import { ToastProvider } from "./components/Toast";

/* DEV ONLY: kill any old service worker + caches that can cause blank page
   and stale `/src/main.tsx` references. */
if (import.meta.env.DEV && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
    console.info("[DEV] Unregistered service workers");
  });
  if (window.caches?.keys) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
    console.info("[DEV] Cleared caches");
  }
}

// Load AdSense only in production (avoid dev noise)
const client = import.meta.env.VITE_ADSENSE_CLIENT;
if (import.meta.env.PROD && client && typeof document !== "undefined") {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <StickyBannerAd />
          <main className="flex-1 container mx-auto px-3 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/past-papers" element={<PastPapers />} />
              <Route path="/e-notes" element={<ENotes />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/uploads"
                element={getToken() ? <AdminUploads /> : <Navigate to="/admin" replace />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// Register SW only in production. In dev we intentionally do NOT register it.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {});
  });
}
