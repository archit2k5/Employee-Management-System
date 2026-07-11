import { useState } from "react";
import { Icon } from "../components/common/Icons";
import Toggle from "../components/common/Toggle";
import { companyConfig, systemToggles } from "../data/mockData";
import "./SystemSettingsPage.css";

const fieldLabels = [
  { key: "companyName", label: "Company Name" },
  { key: "industry", label: "Industry" },
  { key: "headquarters", label: "Headquarters" },
  { key: "fiscalYearStart", label: "Fiscal Year Start" },
  { key: "defaultCurrency", label: "Default Currency" },
  { key: "workWeek", label: "Work Week" },
];

export default function SystemSettingsPage() {
  const [config, setConfig] = useState(companyConfig);
  const [toggles, setToggles] = useState(systemToggles);

  function updateField(key, value) {
    setConfig((c) => ({ ...c, [key]: value }));
  }

  function toggleSwitch(key) {
    setToggles((list) => list.map((t) => (t.key === key ? { ...t, value: !t.value } : t)));
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Configure company settings and permissions</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="card settings-card">
          <h3 className="chart-card-title">Company Configuration</h3>
          <form
            className="settings-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {fieldLabels.map((f) => (
              <div key={f.key} className="settings-field">
                <label htmlFor={f.key}>{f.label}</label>
                <input
                  id={f.key}
                  type="text"
                  value={config[f.key]}
                  onChange={(e) => updateField(f.key, e.target.value)}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary settings-save-btn">
              Save Configuration
            </button>
          </form>
        </div>

        <div className="settings-side-col">
          <div className="card settings-card">
            <h3 className="chart-card-title">Data Backup</h3>
            <p className="settings-backup-meta">Last backup: Jul 2, 2024 at 03:00 UTC</p>
            <div className="settings-backup-actions">
              <button className="btn btn-primary">
                <Icon.Download size={15} />
                Backup Now
              </button>
              <button className="btn btn-secondary">
                <Icon.Refresh size={15} />
                Restore
              </button>
            </div>
          </div>

          <div className="card settings-card">
            <h3 className="chart-card-title">System Toggles</h3>
            <div className="settings-toggle-list">
              {toggles.map((t) => (
                <div key={t.key} className="settings-toggle-row">
                  <span>{t.label}</span>
                  <Toggle checked={t.value} onChange={() => toggleSwitch(t.key)} label={t.label} />
                </div>
              ))}
            </div>
          </div>

          <div className="card settings-card settings-danger-card">
            <h3 className="chart-card-title">Danger Zone</h3>
            <p className="settings-danger-copy">These actions are irreversible. Proceed with caution.</p>
            <div className="settings-danger-actions">
              <button className="btn btn-danger">
                <Icon.AlertTriangle size={15} />
                Purge Test Data
              </button>
              <button className="btn btn-danger">
                <Icon.AlertTriangle size={15} />
                Reset All Permissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
