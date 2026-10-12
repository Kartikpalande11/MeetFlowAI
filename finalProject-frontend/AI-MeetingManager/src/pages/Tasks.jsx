import TaskTable from "../components/TaskTable";

function Tasks({
  tasks,
  toggleTask,
  deleteTask,
  editTask,
  openNewTaskModal,
  searchTerm
}) {

  return (
    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            My Tasks
          </h1>

          <p>
            Create, update and manage your tasks.
          </p>

        </div>

        <button
          className="primary-btn"
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

export default Tasks;