import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------------- LocalStorage Helpers ---------------------- */
  const loadUsers = () => {
    const saved = localStorage.getItem("users_db");

    // If no users exist yet → create a starter users list
    if (!saved) {
      const starter = [
        {
          user_id: 1,
          username: "Admin",
          email: "admin@example.com",
          user_role: 1, // admin
        },
      ];
      localStorage.setItem("users_db", JSON.stringify(starter));
      setUsers(starter);
      return;
    }

    setUsers(JSON.parse(saved));
  };

  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users_db", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  useEffect(() => {
    loadUsers();
    setLoading(false);
  }, []);

  /* ---------------------- FILTER USERS ---------------------- */
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------- UPDATE USER ---------------------- */
  const handleSave = () => {
    if (!selectedUser) return;

    const updated = users.map((u) =>
      u.user_id === selectedUser.user_id ? selectedUser : u
    );

    saveUsers(updated);
    setSelectedUser(null);
  };

  /* ---------------------- DELETE USER ---------------------- */
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const updated = users.filter((u) => u.user_id !== id);
    saveUsers(updated);
  };

  return (
    <>
      <AdminNavbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Admin — Manage Users</h2>

        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search users..."
            style={{ width: "250px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border"></div>
              </div>
            ) : (
              <table className="table table-striped mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>User Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>

                        <td>
                          {user.user_role === 1 ? (
                            <span className="badge bg-danger">Admin</span>
                          ) : (
                            <span className="badge bg-secondary">User</span>
                          )}
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            onClick={() => setSelectedUser({ ...user })}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(user.user_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-3">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* -------------------- EDIT USER MODAL -------------------- */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Edit User</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setSelectedUser(null)}
              ></button>
            </div>

            <div className="modal-body">
              {selectedUser && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedUser.username}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={selectedUser.user_role}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          user_role: Number(e.target.value),
                        })
                      }
                    >
                      <option value={0}>User</option>
                      <option value={1}>Admin</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
