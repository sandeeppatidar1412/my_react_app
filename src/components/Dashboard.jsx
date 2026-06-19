import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Welcome, {user?.username}!</h2>
      <p>
        Your role: <strong>{user?.role}</strong>
      </p>

      <p>This is the dashboard accessible to all authenticated users.</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
