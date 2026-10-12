function TaskTable({
  tasks,
  toggleTask,
  deleteTask,
  editTask,
  searchTerm = ""
}) {

  // ==============================
  // FILTER TASKS
  // ==============================

  const filteredTasks = tasks.filter((task) => {

    const search = searchTerm
      .toLowerCase()
      .trim();

    if (!search) {
      return true;
    }

    return (
      task.title?.toLowerCase().includes(search) ||

      task.description?.toLowerCase().includes(search) ||

      task.priority?.toLowerCase().includes(search) ||

      task.status?.toLowerCase().includes(search) ||

      task.dueDate?.toLowerCase().includes(search)
    );
  });


  return (

    <div className="task-section">

      <div className="task-table-container">

        <table className="task-table">

          <thead>

            <tr>

              <th>Task</th>

              <th>Priority</th>

              <th>Deadline</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredTasks.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="empty-task"
                >

                  {searchTerm.trim()
                    ? `No tasks found for "${searchTerm}"`
                    : "No tasks available."
                  }

                </td>

              </tr>

            ) : (

              filteredTasks.map((task) => (

                <tr key={task.id}>

                  <td>

                    <div className="task-info">

                      <strong>
                        {task.title}
                      </strong>

                      <span>
                        {task.description}
                      </span>

                    </div>

                  </td>


                  <td>

                    <span
                      className={`priority-badge ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                  </td>


                  <td>

                    {task.dueDate
                      ? task.dueDate
                      : "No deadline"}

                  </td>


                  <td>

                    <button
                      className={`status-badge ${
                        task.status === "COMPLETED"
                          ? "completed"
                          : "pending"
                      }`}
                      onClick={() =>
                        toggleTask(task.id)
                      }
                    >

                      {task.status === "COMPLETED"
                        ? "Completed"
                        : "Pending"}

                    </button>

                  </td>


                  <td>

                    <div className="action-buttons">

                      <button
                        className="action-btn edit"
                        onClick={() =>
                          editTask(task)
                        }
                        title="Edit"
                      >
                        ✏️
                      </button>


                      <button
                        className="action-btn delete"
                        onClick={() =>
                          deleteTask(task.id)
                        }
                        title="Delete"
                      >
                        🗑️
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TaskTable;