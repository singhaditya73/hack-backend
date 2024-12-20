import React, { useState } from "react";
import './RoleManagement.css';

const RoleManagement = () => {
  // Initial roles data with description, users, and permissions
  const [roles, setRoles] = useState([
    {
      role: "Admin",
      description: "Full system access",
      permissions: ["Read", "Write", "Execute"],
      members: [],
    },
    {
      role: "Security Analyst",
      description: "Monitor and analyze security events",
      permissions: ["Read", "Write"],
      members: [],
    },
    {
      role: "Incident Responder",
      description: "Respond to security incidents",
      permissions: ["Read"],
      members: [],
    },
  ]);

  // States for managing modals and member inputs
  const [selectedRole, setSelectedRole] = useState(null);
  const [newMember, setNewMember] = useState({ username: "", password: "" });
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [viewMembers, setViewMembers] = useState(null); // Track which role's members are being viewed

  // Handle member input changes
  const handleMemberInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  // Function to handle adding a new member
  const addMember = () => {
    if (
      newMember.username.trim() &&
      newMember.password.trim() &&
      selectedRole !== null
    ) {
      const updatedRoles = [...roles];
      updatedRoles[selectedRole].members.push({ ...newMember });
      setRoles(updatedRoles);
      setNewMember({ username: "", password: "" }); // Clear inputs
    }
  };

  // Function to handle editing a member
  const saveEditMember = () => {
    const updatedRoles = [...roles];
    updatedRoles[selectedRole].members[editingMemberId] = { ...newMember };
    setRoles(updatedRoles);
    setEditingMemberId(null); // Stop editing
    setNewMember({ username: "", password: "" }); // Clear inputs
  };

  // Function to handle deleting a member
  const deleteMember = (memberIndex) => {
    const updatedRoles = [...roles];
    updatedRoles[selectedRole].members.splice(memberIndex, 1);
    setRoles(updatedRoles);
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>

      {/* Add Member Section */}
      <div className="add-member-section">
        <select
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole || ""}
        >
          <option value="" disabled>
            Select a Role
          </option>
          {roles.map((role, index) => (
            <option key={index} value={index}>
              {role.role}
            </option>
          ))}
        </select>

        {selectedRole !== null && (
          <>
            <input
              type="text"
              name="username"
              value={newMember.username}
              onChange={handleMemberInputChange}
              placeholder="Enter username"
            />
            <input
              type="password"
              name="password"
              value={newMember.password}
              onChange={handleMemberInputChange}
              placeholder="Enter password"
            />
            {editingMemberId !== null ? (
              <button onClick={saveEditMember}>Save Changes</button>
            ) : (
              <button onClick={addMember}>+ Add Member</button>
            )}
          </>
        )}
      </div>

      {/* Roles and Members Table */}
      {roles.map((role, roleIndex) => (
        <div key={roleIndex} className="role-section">
          <h3>{role.role}</h3>
          <p>{role.description}</p>
          <p>Members: {role.members.length}</p>
          <button
            onClick={() =>
              setViewMembers(viewMembers === roleIndex ? null : roleIndex)
            }
          >
            {viewMembers === roleIndex ? "Hide Members" : "View Members"}
          </button>

          {viewMembers === roleIndex && (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {role.members.map((member, memberIndex) => (
                  <tr key={memberIndex}>
                    <td>{member.username}</td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedRole(roleIndex);
                          setEditingMemberId(memberIndex);
                          setNewMember(member);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteMember(memberIndex)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoleManagement;
