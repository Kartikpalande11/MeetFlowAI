function Sidebar({
  activePage,
  setActivePage,
  user,
  onLogout
}) {

  return (

    <aside className="sidebar">

      <div className="brand">

        <div className="brand-icon">
          🤖
        </div>

        <div>

          <h2>AI Meeting</h2>

          <span>Task Manager</span>

        </div>

      </div>


      <nav>

        <button
          className={
            activePage === "dashboard"
              ? "nav-item active"
              : "nav-item"
          }

          onClick={() =>
            setActivePage("dashboard")
          }
        >
          <span>⌂</span>
          Dashboard
        </button>


        <button
          className={
            activePage === "tasks"
              ? "nav-item active"
              : "nav-item"
          }

          onClick={() =>
            setActivePage("tasks")
          }
        >
          <span>✓</span>
          Tasks
        </button>


        <button
          className={
            activePage === "meeting"
              ? "nav-item active"
              : "nav-item"
          }

          onClick={() =>
            setActivePage("meeting")
          }
        >
          <span>◉</span>
          Meeting Analyzer
        </button>

      </nav>


      <div className="sidebar-bottom">

        <div className="mini-ai">
          ✨
        </div>

        <p>
          Turn meetings
          <br />
          into action
        </p>

      </div>


      <div className="sidebar-user">

        <div className="sidebar-avatar">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="sidebar-user-info">

          <strong>
            {user?.name || "User"}
          </strong>

          <span>
            {user?.email || ""}
          </span>

        </div>

        <button
          className="logout-btn"
          onClick={onLogout}
          title="Logout"
        >
          ↪
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;