import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import UserProfileModal from "../components/UserProfileModal";
import {
  Users, ShieldCheck, Cpu, Activity, Search, Filter,
  UserCheck, UserX, Trash2, ArrowUpRight, Clock, AlertCircle, RefreshCw, FileText
} from "lucide-react";

function AdminDashboard() {
  const { token, user } = useAuth();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("users"); // 'users' | 'audit' | 'analytics'
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, usersRes, logsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/admin/stats", { headers }),
        axios.get("http://localhost:8000/api/admin/users", { headers }),
        axios.get("http://localhost:8000/api/admin/audit-logs", { headers })
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data.users || []);
      setAuditLogs(logsRes.data.audit_logs || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setMessage({ type: "error", text: "Failed to load admin panel data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleRoleToggle = async (targetEmail, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await axios.put(
        `http://localhost:8000/api/admin/users/${targetEmail}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: "success", text: `Updated ${targetEmail} role to ${newRole.toUpperCase()}` });
      fetchAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.detail || "Failed to update role" });
    }
  };

  const handleStatusToggle = async (targetEmail, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    try {
      await axios.put(
        `http://localhost:8000/api/admin/users/${targetEmail}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: "success", text: `User ${targetEmail} status set to ${newStatus.toUpperCase()}` });
      fetchAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.detail || "Failed to update status" });
    }
  };

  const handleDeleteUser = async (targetEmail) => {
    if (!window.confirm(`Are you sure you want to delete user ${targetEmail}?`)) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/users/${targetEmail}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: "success", text: `Deleted user ${targetEmail}` });
      fetchAdminData();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.detail || "Failed to delete user" });
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        
        {/* Title Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                Administrator Operations Center
              </h1>
              <span style={{
                background: "rgba(139, 92, 246, 0.2)",
                color: "#a78bfa",
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "12px",
                fontWeight: 700
              }}>
                ADMIN ONLY
              </span>
            </div>
            <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Manage platform users, update access roles, and monitor system audit security logs
            </p>
          </div>

          <button onClick={fetchAdminData} className="btn btn-secondary" style={{ fontSize: "0.875rem" }}>
            <RefreshCw size={16} /> Refresh Data
          </button>
        </div>

        {message && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: message.type === "success" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            color: message.type === "success" ? "#10b981" : "#ef4444",
            border: `1px solid ${message.type === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`
          }}>
            <AlertCircle size={18} />
            {message.text}
          </div>
        )}

        {/* High-Level Analytics Cards */}
        {stats && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "32px"
          }}>
            <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(59, 130, 246, 0.15)",
                color: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Users size={24} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Total Registered Users</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.total_users}</div>
              </div>
            </div>

            <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "var(--brand-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <UserCheck size={24} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Active Users</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.active_users}</div>
              </div>
            </div>

            <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(139, 92, 246, 0.15)",
                color: "#8b5cf6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>System Admins</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.total_admins}</div>
              </div>
            </div>

            <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(245, 158, 11, 0.15)",
                color: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Cpu size={24} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Predictions Generated</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.total_predictions}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: "12px",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "24px"
        }}>
          <button
            onClick={() => setActiveTab("users")}
            style={{
              padding: "10px 18px",
              background: "none",
              border: "none",
              borderBottom: activeTab === "users" ? "3px solid #8b5cf6" : "3px solid transparent",
              color: activeTab === "users" ? "#8b5cf6" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Users size={18} /> User Management Table
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            style={{
              padding: "10px 18px",
              background: "none",
              border: "none",
              borderBottom: activeTab === "audit" ? "3px solid #8b5cf6" : "3px solid transparent",
              color: activeTab === "audit" ? "#8b5cf6" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FileText size={18} /> System Audit Trail ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: User Management Table */}
        {activeTab === "users" && (
          <div className="card" style={{ padding: "0", overflow: "hidden" }}>
            
            {/* Search & Filter Controls */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap"
            }}>
              <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
                <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search user name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 14px 9px 40px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  style={{
                    padding: "9px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem"
                  }}
                >
                  <option value="all">All Roles</option>
                  <option value="user">User Role</option>
                  <option value="admin">Admin Role</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: "9px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem"
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>

            {/* Users Data Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                    <th style={{ padding: "14px 24px" }}>User</th>
                    <th style={{ padding: "14px 24px" }}>Email</th>
                    <th style={{ padding: "14px 24px" }}>Role</th>
                    <th style={{ padding: "14px 24px" }}>Status</th>
                    <th style={{ padding: "14px 24px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
                        No matching users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.email} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "14px 24px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img src={u.avatar} alt={u.name} style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
                            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 24px", color: "var(--text-secondary)" }}>{u.email}</td>
                        <td style={{ padding: "14px 24px" }}>
                          <span style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            background: u.role === "admin" ? "rgba(139, 92, 246, 0.15)" : "rgba(16, 185, 129, 0.15)",
                            color: u.role === "admin" ? "#8b5cf6" : "#10b981"
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: "14px 24px" }}>
                          <span style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            background: u.status === "active" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.15)",
                            color: u.status === "active" ? "#10b981" : "#ef4444"
                          }}>
                            {u.status || "active"}
                          </span>
                        </td>
                        <td style={{ padding: "14px 24px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                            
                            {/* Role Toggle */}
                            <button
                              onClick={() => handleRoleToggle(u.email, u.role)}
                              title={u.role === "admin" ? "Demote to User" : "Promote to Admin"}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "6px",
                                border: "1px solid var(--border-color)",
                                background: "var(--bg-primary)",
                                color: "var(--text-primary)",
                                fontSize: "0.775rem",
                                fontWeight: 600,
                                cursor: "pointer"
                              }}
                            >
                              {u.role === "admin" ? "Make User" : "Make Admin"}
                            </button>

                            {/* Block / Unblock */}
                            <button
                              onClick={() => handleStatusToggle(u.email, u.status)}
                              title={u.status === "blocked" ? "Unblock Account" : "Block Account"}
                              style={{
                                padding: "6px 10px",
                                borderRadius: "6px",
                                border: "none",
                                background: u.status === "blocked" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                                color: u.status === "blocked" ? "#10b981" : "#ef4444",
                                fontSize: "0.775rem",
                                fontWeight: 600,
                                cursor: "pointer"
                              }}
                            >
                              {u.status === "blocked" ? "Unblock" : "Block"}
                            </button>

                            {/* Delete Button */}
                            {u.email !== user?.email && (
                              <button
                                onClick={() => handleDeleteUser(u.email)}
                                title="Delete User"
                                style={{
                                  padding: "6px 8px",
                                  borderRadius: "6px",
                                  border: "none",
                                  background: "rgba(239, 68, 68, 0.15)",
                                  color: "#ef4444",
                                  cursor: "pointer"
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Audit Logs */}
        {activeTab === "audit" && (
          <div className="card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-color)", fontWeight: 700 }}>
              Recent Security Audit Events
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                    <th style={{ padding: "12px 20px" }}>Timestamp</th>
                    <th style={{ padding: "12px 20px" }}>User Email</th>
                    <th style={{ padding: "12px 20px" }}>Action</th>
                    <th style={{ padding: "12px 20px" }}>Event Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
                        No security audit logs recorded yet
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "12px 20px", color: "var(--text-muted)", fontFamily: "monospace", fontSize: "0.8rem" }}>
                          {log.timestamp}
                        </td>
                        <td style={{ padding: "12px 20px", fontWeight: 600 }}>{log.email}</td>
                        <td style={{ padding: "12px 20px" }}>
                          <span style={{
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "0.725rem",
                            fontWeight: 700,
                            background: log.action.includes("ADMIN") ? "rgba(139, 92, 246, 0.15)" : "rgba(59, 130, 246, 0.15)",
                            color: log.action.includes("ADMIN") ? "#8b5cf6" : "#3b82f6"
                          }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: "12px 20px", color: "var(--text-secondary)" }}>{log.details}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;
