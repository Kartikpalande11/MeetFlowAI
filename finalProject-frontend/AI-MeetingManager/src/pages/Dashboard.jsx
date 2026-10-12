import StatCard from "../components/StatCard";
import TaskTable from "../components/TaskTable";

function Dashboard({
  tasks,
  toggleTask,
  deleteTask,
  editTask,
  openNewTaskModal,
  searchTerm
}) {

  const totalTasks = tasks.length;

  const pendingTasks =
    tasks.filter(
      (task) => task.status === "PENDING"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;


  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            DASHBOARD👋
          </h1>

          <p>
            Here's what's happening with your tasks today.
          </p>

        </div>


        <button
          className="primary-btn"
          onClick={openNewTaskModal}
        >
          + Add Task
        </button>

      </div>


      <div className="stats-grid">

        <StatCard
          icon="📋"
          title="Total Tasks"
          value={totalTasks}
          type="blue"
        />

        <StatCard
          icon="◷"
          title="Pending"
          value={pendingTasks}
          type="yellow"
        />

        <StatCard
          icon="✓"
          title="Completed"
          value={completedTasks}
          type="green"
        />

      </div>


      <div className="section-header">

        <div>

          <h2>
            Recent Tasks
          </h2>

          <p>
            Manage your latest tasks
          </p>

        </div>


        <button
          className="view-all-btn"
          onClick={openNewTaskModal}
        >
          + Add Task
        </button>

      </div>


      <TaskTable
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
        searchTerm={searchTerm}
      />

    </div>
  );
}

export default Dashboard;