function TaskModal({
  showTaskModal,
  setShowTaskModal,
  newTask,
  setNewTask,
  createTask,
  editingTask
}) {

  if (!showTaskModal) {
    return null;
  }


  const handleInputChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setNewTask({
      ...newTask,
      [name]: value
    });
  };


  return (

    <div
      className="modal-overlay"
      onClick={() =>
        setShowTaskModal(false)
      }
    >

      <div
        className="modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="modal-header">

          <div>

            <h2>
              {editingTask
                ? "Edit Task"
                : "Add New Task"}
            </h2>

            <p>
              {editingTask
                ? "Update task details"
                : "Create a new task"}
            </p>

          </div>


          <button
            className="close-btn"
            onClick={() =>
              setShowTaskModal(false)
            }
          >
            ×
          </button>

        </div>


        <label>
          Task Title <span>*</span>
        </label>

        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={newTask.title}
          onChange={handleInputChange}
        />


        <label>
          Description
        </label>

        <textarea
          name="description"
          placeholder="Enter task description"
          value={newTask.description}
          onChange={handleInputChange}
        />


        <label>
          Priority
        </label>

        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>


        <label>
          Deadline
        </label>

        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />


        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={() =>
              setShowTaskModal(false)
            }
          >
            Cancel
          </button>


          <button
            className="primary-btn"
            onClick={createTask}
          >

            {editingTask
              ? "Update Task"
              : "Create Task"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskModal;