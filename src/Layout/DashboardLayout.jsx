import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DasNavbar from "../Component/shared/DasNavbar";
import Sidebar from "../Component/shared/Sidebar";

const DashboardLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handletheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] font-['Poppins']">
      
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col min-h-screen">
          
          <DasNavbar theme={theme} handletheme={handletheme} />

          <main className="p-6 md:p-10 flex-1 overflow-y-auto">
            <div className="container mx-auto">
              
              

              <div className="min-h-[70vh]">
                <Outlet context={{ theme }} />
              </div>

            </div>
          </main>

          {/*  Minimalist Footer */}
          <footer className="py-6 px-10 text-center border-t border-[var(--primary)]/5">
             <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--text-main)]/30 font-bold">
               &copy; 2026 TravelEase Elite Fleet | Secure Executive Terminal
             </p>
          </footer>
        </div>

        {/*  Sidebar Component */}
        <div className="drawer-side z-[100]">
          <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;