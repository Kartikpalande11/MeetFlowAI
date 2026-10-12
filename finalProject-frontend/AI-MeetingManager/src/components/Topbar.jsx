function Topbar({
  user,
  searchTerm,
  setSearchTerm
}) {

  return (

    <header className="topbar">

      <div className="search-box">

        <span>⌕</span>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

      </div>


      <div className="topbar-right">

        <span className="notification">
          ♧
        </span>


        <div className="profile">

          <div className="profile-avatar">

            {user?.name?.charAt(0).toUpperCase() || "U"}

          </div>

          <span>
            {user?.name || "User"}
          </span>

          <span>⌄</span>

        </div>

      </div>

    </header>
  );
}

export default Topbar;