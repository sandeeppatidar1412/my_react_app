import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Task4 from "./pages/Task4";
import Factorial from "./pages/Factorial";
import CapitalizeWords from "./pages/CapitalizeWords";
import Crud from "./pages/Crud";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              React Machine Test
            </h1>
            <p className="text-sm text-slate-500">
              Product dashboard, CRUD, and logic tasks.
            </p>
          </div>
          <nav className="flex flex-wrap gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/Crud"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              CRUD
            </NavLink>
            <NavLink
              to="/task4"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Task 4
            </NavLink>
            <NavLink
              to="/Factorial"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Factorial
            </NavLink>
            <NavLink
              to="/CapitalizeWords"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Capitalize Words
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/task4" element={<Task4 />} />
          <Route path="/Factorial" element={<Factorial />} />
          <Route path="/CapitalizeWords" element={<CapitalizeWords />} />
          <Route path="/Crud" element={<Crud />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import RoleBasedRoute from "./components/RoleBasedRoute";
// import Unauthorized from "./components/Unauthorized";
// import AdminPanel from "./components/AdminPanel";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <RoleBasedRoute role="admin">
//               <AdminPanel />
//             </RoleBasedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
