import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { X, User, Lock, Camera, Check, AlertCircle } from "lucide-react";

function UserProfileModal({ isOpen, onClose }) {
  const { user, token, updateUserProfileState } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen || !user) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.put(
        "http://localhost:8000/api/user/profile",
        {
          name,
          avatar,
          current_password: currentPassword || undefined,
          new_password: newPassword || undefined
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updateUserProfileState({ name, avatar });
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.detail || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const avatarsList = [
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
    `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`,
    `https://api.dicebear.com/7.x/micah/svg?seed=${user.email}`,
    `https://api.dicebear.com/7.x/personas/svg?seed=${user.name}`
  ];

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(6px)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "20px",
        maxWidth: "480px",
        width: "100%",
        overflow: "hidden",
        boxShadow: "var(--shadow-lg)"
      }} className="animate-fade-in">
        
        {/* Modal Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Profile Management
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleUpdate} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
          
          {message && (
            <div style={{
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: message.type === "success" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
              color: message.type === "success" ? "#10b981" : "#ef4444"
            }}>
              {message.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}

          {/* Avatar Selector */}
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
              Choose Avatar
            </label>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {avatarsList.map((av, idx) => (
                <img
                  key={idx}
                  src={av}
                  alt="avatar option"
                  onClick={() => setAvatar(av)}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: avatar === av ? "3px solid var(--brand-green)" : "2px solid var(--border-color)",
                    padding: "2px",
                    transition: "transform 0.2s"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: "0.95rem"
              }}
              required
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--border-color)",
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                cursor: "not-allowed"
              }}
            />
          </div>

          {/* Change Password */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "14px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
              Change Password (Optional)
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: "0.95rem"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserProfileModal;
