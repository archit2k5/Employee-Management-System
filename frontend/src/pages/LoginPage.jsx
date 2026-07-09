import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/common/Icons";
import "./LoginPage.css";

const roleTabs = ["Employee", "HR", "Admin"];
const authTabs = ["Password", "OTP"];

const heroStats = [
  { label: "Employees", value: "108", icon: Icon.Users },
  { label: "Departments", value: "6", icon: Icon.Building },
  { label: "Open Roles", value: "8", icon: Icon.FileText },
  { label: "Uptime", value: "99.9%", icon: Icon.Activity },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Admin");
  const [authMode, setAuthMode] = useState("Password");
  const [email, setEmail] = useState("j.rodriguez@nexus.io");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire up real auth call
    if (role === "Admin") {
      navigate("/admin/analytics");
    }
  }

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-brand">
          <span className="login-brand-icon">
            <Icon.Layers size={18} />
          </span>
          <span className="login-brand-name">Nexus Technologies</span>
        </div>

        <div className="login-hero-copy">
          <h1>
            People-first
            <br />
            workforce platform
          </h1>
          <p>
            Streamline HR operations, track performance, and empower your team —
            all in one unified workspace.
          </p>
        </div>

        <div className="login-hero-stats">
          {heroStats.map((s) => (
            <div className="login-hero-stat card" key={s.label}>
              <s.icon size={18} />
              <div className="login-hero-stat-value">{s.value}</div>
              <div className="login-hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="login-panel">
        <div className="login-panel-inner">
          <h2>Sign in</h2>
          <p className="login-panel-subtitle">Welcome back to Nexus Technologies</p>

          <div className="login-role-tabs">
            {roleTabs.map((r) => (
              <button
                key={r}
                type="button"
                className={`login-role-tab ${role === r ? "login-role-tab-active" : ""}`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="login-auth-tabs">
            {authTabs.map((a) => (
              <button
                key={a}
                type="button"
                className={`login-auth-tab ${authMode === a ? "login-auth-tab-active" : ""}`}
                onClick={() => setAuthMode(a)}
              >
                {a}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <label className="login-field-label" htmlFor="email">Email</label>
            <div className="login-input">
              <Icon.Mail size={16} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>

            {authMode === "Password" ? (
              <>
                <label className="login-field-label" htmlFor="password">Password</label>
                <div className="login-input">
                  <Icon.Lock size={16} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="login-input-eye"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <Icon.EyeOff size={16} /> : <Icon.Eye size={16} />}
                  </button>
                </div>
                <a href="#forgot-password" className="login-forgot-link">Forgot password?</a>
              </>
            ) : (
              <p className="login-otp-hint">We'll send a one-time code to your email.</p>
            )}

            <button type="submit" className="btn btn-primary login-submit-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
