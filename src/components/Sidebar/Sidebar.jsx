const users = [
  { id: 2, name: "User2" }
];

const Sidebar = ({ setSelectedUser }) => {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/auth";
  };

  return (
    <div className="d-flex flex-column h-100">

      {/* Users */}
      <div>
        <h4 className="p-3 border-bottom">Users</h4>

        <ul className="list-group">
          {users.map(user => (
            <li
              key={user.id}
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout at bottom */}
      <div className="mt-auto p-3 border-top">
        <button className="btn btn-danger w-100" onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;