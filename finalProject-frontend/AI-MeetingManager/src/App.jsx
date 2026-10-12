// import { useEffect, useState } from "react";

// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";

// import Dashboard from "./pages/Dashboard";
// import Tasks from "./pages/Tasks";
// import MeetingAnalyzerPage from "./pages/MeetingAnalyzerPage";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// import TaskModal from "./components/TaskModal";

// import {
//   getTasks,
//   createTask as createTaskApi,
//   updateTask as updateTaskApi,
//   deleteTask as deleteTaskApi,
//   updateTaskStatus as updateTaskStatusApi,
//   searchTasks as searchTasksApi
// } from "./api/taskApi";


// function App() {

//   // -----------------------------
//   // AUTHENTICATION
//   // -----------------------------

//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true"
//   );

//   const [showSignup, setShowSignup] = useState(false);

//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("meetingUser")) || null
//   );


//   // -----------------------------
//   // PAGE
//   // -----------------------------

//   const [activePage, setActivePage] =
//     useState("dashboard");

//   const [searchTerm, setSearchTerm] =
//     useState("");


//   // -----------------------------
//   // TASK MODAL
//   // -----------------------------

//   const [showTaskModal, setShowTaskModal] =
//     useState(false);

//   const [editingTask, setEditingTask] =
//     useState(null);


//   // -----------------------------
//   // TASK DATA
//   // -----------------------------

//   const [tasks, setTasks] = useState([]);


//   // -----------------------------
//   // LOAD TASKS FROM BACKEND
//   // -----------------------------
// useEffect(() => {

//     if (isLoggedIn) {
//         loadTasks();
//     }

// }, [isLoggedIn]);

//   const loadTasks = async () => {

//     try {

//       const data = await getTasks();

//       console.log(
//         "Tasks loaded from backend:",
//         data
//       );

//       setTasks(data);

//     } catch (error) {

//       console.error(
//         "Error loading tasks:",
//         error
//       );

//     }

//   };


//   // -----------------------------
//   // BACKEND SEARCH
//   // -----------------------------

//   useEffect(() => {

//     const searchFromBackend = async () => {

//       // If search box is empty,
//       // load all tasks again

//       if (!searchTerm.trim()) {

//         await loadTasks();

//         return;
//       }


//       try {

//         const data =
//           await searchTasksApi(
//             searchTerm.trim()
//           );

//         console.log(
//           "Search results:",
//           data
//         );

//         setTasks(data);

//       } catch (error) {

//         console.error(
//           "Error searching tasks:",
//           error
//         );

//       }

//     };


//     const timer = setTimeout(() => {

//       searchFromBackend();

//     }, 300);


//     return () => clearTimeout(timer);

//   }, [searchTerm]);


//   // -----------------------------
//   // NEW TASK
//   // -----------------------------

//   const [newTask, setNewTask] = useState({

//     title: "",
//     description: "",
//     priority: "Medium",
//     dueDate: ""

//   });


//   // -----------------------------
//   // LOGIN
//   // -----------------------------

//   const handleLogin = (loggedUser) => {

//     setUser(loggedUser);

//     setIsLoggedIn(true);

//     setActivePage("dashboard");

//   };


//   // -----------------------------
//   // SIGNUP
//   // -----------------------------

//   const handleSignup = () => {

//     setShowSignup(false);

//   };


//   // -----------------------------
//   // LOGOUT
//   // -----------------------------

//   const handleLogout = () => {

//     localStorage.removeItem("isLoggedIn");

//     localStorage.removeItem("meetingUser");

//     localStorage.removeItem("jwtToken");

//     setIsLoggedIn(false);

//     setUser(null);

//     setShowSignup(false);
// };


//   // -----------------------------
//   // OPEN ADD TASK
//   // -----------------------------

//   const openNewTaskModal = () => {

//     setEditingTask(null);

//     setNewTask({

//       title: "",
//       description: "",
//       priority: "Medium",
//       dueDate: ""

//     });

//     setShowTaskModal(true);

//   };


//   // -----------------------------
//   // EDIT TASK
//   // -----------------------------

//   const editTask = (task) => {

//     setEditingTask(task);

//     setNewTask({

//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       dueDate: task.dueDate

//     });

//     setShowTaskModal(true);

//   };


//   // -----------------------------
//   // CREATE / UPDATE TASK
//   // -----------------------------

//   const createTask = async () => {

//     if (!newTask.title.trim()) {

//       alert("Please enter task title.");

//       return;

//     }


//     // -----------------------------
//     // UPDATE EXISTING TASK
//     // -----------------------------

//     if (editingTask) {

//       try {

//         const updatedTask = {

//           title:
//             newTask.title,

//           description:
//             newTask.description,

//           priority:
//             newTask.priority,

//           status:
//             editingTask.status,

//           assignedTo:
//             editingTask.assignedTo || "",

//           dueDate:
//             newTask.dueDate || null

//         };


//         const savedTask =
//           await updateTaskApi(
//             editingTask.id,
//             updatedTask
//           );


//         console.log(
//           "Task updated in backend:",
//           savedTask
//         );


//         setTasks((previousTasks) =>

//           previousTasks.map((task) =>

//             task.id === editingTask.id
//               ? savedTask
//               : task

//           )

//         );


//       } catch (error) {

//         console.error(
//           "Error updating task:",
//           error
//         );

//         alert(
//           "Failed to update task."
//         );

//         return;

//       }

//     }


//     // -----------------------------
//     // CREATE NEW TASK
//     // -----------------------------

//     else {

//       try {

//         const task = {

//           title:
//             newTask.title,

//           description:
//             newTask.description,

//           priority:
//             newTask.priority,

//           // Backend uses uppercase
//           status:
//             "PENDING",

//           assignedTo:
//             "",

//           dueDate:
//             newTask.dueDate || null

//         };


//         const savedTask =
//           await createTaskApi(task);


//         console.log(
//           "Task saved to backend:",
//           savedTask
//         );


//         setTasks((previousTasks) => [

//           ...previousTasks,

//           savedTask

//         ]);


//       } catch (error) {

//         console.error(
//           "Error creating task:",
//           error
//         );

//         alert(
//           "Failed to create task."
//         );

//         return;

//       }

//     }


//     // -----------------------------
//     // RESET FORM
//     // -----------------------------

//     setNewTask({

//       title: "",
//       description: "",
//       priority: "Medium",
//       dueDate: ""

//     });

//     setEditingTask(null);

//     setShowTaskModal(false);

//   };


//   // -----------------------------
//   // DELETE TASK
//   // -----------------------------

//   const deleteTask = async (id) => {

//     const confirmDelete =
//       window.confirm(
//         "Are you sure you want to delete this task?"
//       );


//     if (!confirmDelete) {

//       return;

//     }


//     try {

//       await deleteTaskApi(id);


//       console.log(
//         "Task deleted from backend:",
//         id
//       );


//       setTasks((previousTasks) =>

//         previousTasks.filter(
//           (task) => task.id !== id
//         )

//       );


//     } catch (error) {

//       console.error(
//         "Error deleting task:",
//         error
//       );

//       alert(
//         "Failed to delete task."
//       );

//     }

//   };


//   // -----------------------------
//   // COMPLETE / PENDING
//   // -----------------------------

//   const toggleTask = async (id) => {

//     // Find the task

//     const task = tasks.find(
//       (task) => task.id === id
//     );


//     if (!task) {

//       return;

//     }


//     // Backend uses:
//     // PENDING
//     // COMPLETED

//     const newStatus =
//       task.status === "COMPLETED"
//         ? "PENDING"
//         : "COMPLETED";


//     try {

//       // Send status to backend

//       const updatedTask =
//         await updateTaskStatusApi(
//           id,
//           newStatus
//         );


//       console.log(
//         "Task status updated:",
//         updatedTask
//       );


//       // Update React state

//       setTasks((previousTasks) =>

//         previousTasks.map((task) =>

//           task.id === id
//             ? updatedTask
//             : task

//         )

//       );


//     } catch (error) {

//       console.error(
//         "Error updating task status:",
//         error
//       );

//       alert(
//         "Failed to update task status."
//       );

//     }

//   };


//   // -----------------------------
//   // ADD AI TASK
//   // -----------------------------

//   const addAiTask = async (item) => {

//     try {

//       const task = {

//         title:
//           item.task,

//         description:
//           `Assigned to ${item.person}`,

//         priority:
//           "MEDIUM",

//         status:
//           "PENDING",

//         assignedTo:
//           item.person || "",

//         dueDate:
//           null

//       };


//       const savedTask =
//         await createTaskApi(task);


//       setTasks((previousTasks) => [

//         ...previousTasks,

//         savedTask

//       ]);


//     } catch (error) {

//       console.error(
//         "Error adding AI task:",
//         error
//       );

//       alert(
//         "Failed to add AI task."
//       );

//     }

//   };


//   // -----------------------------
//   // PAGE RENDER
//   // -----------------------------

//   const renderPage = () => {

//     switch (activePage) {

//       case "dashboard":

//         return (

//           <Dashboard

//             tasks={tasks}

//             toggleTask={toggleTask}

//             deleteTask={deleteTask}

//             editTask={editTask}

//             openNewTaskModal={
//               openNewTaskModal
//             }

//             searchTerm={searchTerm}

//           />

//         );


//       case "tasks":

//         return (

//           <Tasks

//             tasks={tasks}

//             toggleTask={toggleTask}

//             deleteTask={deleteTask}

//             editTask={editTask}

//             openNewTaskModal={
//               openNewTaskModal
//             }

//             searchTerm={searchTerm}

//           />

//         );


//       case "meeting":

//         return (

//           <MeetingAnalyzerPage
//             addAiTask={addAiTask}
//           />

//         );


//       default:

//         return (

//           <Dashboard

//             tasks={tasks}

//             toggleTask={toggleTask}

//             deleteTask={deleteTask}

//             editTask={editTask}

//             openNewTaskModal={
//               openNewTaskModal
//             }

//             searchTerm={searchTerm}

//           />

//         );

//     }

//   };


//   // -----------------------------
//   // LOGIN / SIGNUP SCREEN
//   // -----------------------------

//   if (!isLoggedIn) {

//     if (showSignup) {

//       return (

//         <Signup

//           goToLogin={() =>
//             setShowSignup(false)
//           }

//         />

//       );

//     }


//     return (

//       <Login

//         onLogin={handleLogin}

//         goToSignup={() =>
//           setShowSignup(true)
//         }

//       />

//     );

//   }


//   // -----------------------------
//   // MAIN APPLICATION
//   // -----------------------------

//   return (

//     <div className="app-container">

//       <Sidebar

//         activePage={activePage}

//         setActivePage={setActivePage}

//         user={user}

//         onLogout={handleLogout}

//       />


//       <div className="main-area">

//         <Topbar

//           user={user}

//           searchTerm={searchTerm}

//           setSearchTerm={setSearchTerm}

//         />


//         <main className="content">

//           {renderPage()}

//         </main>

//       </div>


//       <TaskModal

//         showTaskModal={
//           showTaskModal
//         }

//         setShowTaskModal={
//           setShowTaskModal
//         }

//         newTask={
//           newTask
//         }

//         setNewTask={
//           setNewTask
//         }

//         createTask={
//           createTask
//         }

//         editingTask={
//           editingTask
//         }

//       />

//     </div>

//   );

// }


// export default App;








import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import MeetingAnalyzerPage from "./pages/MeetingAnalyzerPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import TaskModal from "./components/TaskModal";

import {
  getTasks,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  updateTaskStatus as updateTaskStatusApi,
  searchTasks as searchTasksApi
} from "./api/taskApi";


function App() {

  // -----------------------------
  // AUTHENTICATION
  // -----------------------------

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showSignup, setShowSignup] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("meetingUser")) || null
  );


  // -----------------------------
  // PAGE
  // -----------------------------

  const [activePage, setActivePage] =
    useState("dashboard");

  const [searchTerm, setSearchTerm] =
    useState("");


  // -----------------------------
  // TASK MODAL
  // -----------------------------

  const [showTaskModal, setShowTaskModal] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);


  // -----------------------------
  // TASK DATA
  // -----------------------------

  const [tasks, setTasks] = useState([]);


  // -----------------------------
  // LOAD TASKS FROM BACKEND
  // -----------------------------

  useEffect(() => {

    if (isLoggedIn) {
      loadTasks();
    }

  }, [isLoggedIn]);


  const loadTasks = async () => {

    try {

      const data = await getTasks();

      console.log(
        "Tasks loaded from backend:",
        data
      );

      setTasks(data);

    } catch (error) {

      console.error(
        "Error loading tasks:",
        error
      );

    }

  };


  // -----------------------------
  // BACKEND SEARCH
  // -----------------------------

  useEffect(() => {

    if (!isLoggedIn) {
      return;
    }

    const searchFromBackend = async () => {

      if (!searchTerm.trim()) {

        await loadTasks();

        return;
      }


      try {

        const data =
          await searchTasksApi(
            searchTerm.trim()
          );

        console.log(
          "Search results:",
          data
        );

        setTasks(data);

      } catch (error) {

        console.error(
          "Error searching tasks:",
          error
        );

      }

    };


    const timer = setTimeout(() => {

      searchFromBackend();

    }, 300);


    return () => clearTimeout(timer);

  }, [searchTerm, isLoggedIn]);


  // -----------------------------
  // NEW TASK
  // -----------------------------

  const [newTask, setNewTask] = useState({

    title: "",
    description: "",
    priority: "Medium",
    dueDate: ""

  });


  // -----------------------------
  // LOGIN
  // -----------------------------

  const handleLogin = (loggedUser) => {

    setUser(loggedUser);

    setIsLoggedIn(true);

    setActivePage("dashboard");

  };


  // -----------------------------
  // SIGNUP
  // -----------------------------

  const handleSignup = (newUser) => {

    setUser(newUser);

    setIsLoggedIn(true);

    setActivePage("dashboard");

  };


  // -----------------------------
  // LOGOUT
  // -----------------------------

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("meetingUser");

    localStorage.removeItem("jwtToken");

    setIsLoggedIn(false);

    setUser(null);

    setShowSignup(false);

    setTasks([]);

  };


  // -----------------------------
  // OPEN ADD TASK
  // -----------------------------

  const openNewTaskModal = () => {

    setEditingTask(null);

    setNewTask({

      title: "",
      description: "",
      priority: "Medium",
      dueDate: ""

    });

    setShowTaskModal(true);

  };


  // -----------------------------
  // EDIT TASK
  // -----------------------------

  const editTask = (task) => {

    setEditingTask(task);

    setNewTask({

      title: task.title || "",

      description: task.description || "",

      priority: task.priority || "Medium",

      dueDate: task.dueDate
        ? task.dueDate.substring(0, 10)
        : ""

    });

    setShowTaskModal(true);

  };


  // -----------------------------
  // CREATE / UPDATE TASK
  // -----------------------------

  const createTask = async () => {

    if (!newTask.title.trim()) {

      alert("Please enter task title.");

      return;

    }


    // -----------------------------
    // UPDATE EXISTING TASK
    // -----------------------------

    if (editingTask) {

      try {

        const updatedTask = {

          title:
            newTask.title,

          description:
            newTask.description,

          priority:
            newTask.priority,

          status:
            editingTask.status,

          assignedTo:
            editingTask.assignedTo || "",

          dueDate:
            newTask.dueDate
              ? newTask.dueDate
              : null

        };


        const savedTask =
          await updateTaskApi(
            editingTask.id,
            updatedTask
          );


        console.log(
          "Task updated in backend:",
          savedTask
        );


        setTasks((previousTasks) =>

          previousTasks.map((task) =>

            task.id === editingTask.id
              ? savedTask
              : task

          )

        );


      } catch (error) {

        console.error(
          "Error updating task:",
          error
        );

        alert(
          "Failed to update task."
        );

        return;

      }

    }


    // -----------------------------
    // CREATE NEW TASK
    // -----------------------------

    else {

      try {

        const task = {

          title:
            newTask.title,

          description:
            newTask.description,

          priority:
            newTask.priority,

          status:
            "PENDING",

          assignedTo:
            "",

          dueDate:
            newTask.dueDate
              ? newTask.dueDate
              : null

        };


        console.log(
          "Creating task:",
          task
        );


        const savedTask =
          await createTaskApi(task);


        console.log(
          "Task saved to backend:",
          savedTask
        );


        setTasks((previousTasks) => [

          ...previousTasks,

          savedTask

        ]);


      } catch (error) {

        console.error(
          "Error creating task:",
          error
        );

        alert(
          "Failed to create task."
        );

        return;

      }

    }


    // -----------------------------
    // RESET FORM
    // -----------------------------

    setNewTask({

      title: "",
      description: "",
      priority: "Medium",
      dueDate: ""

    });

    setEditingTask(null);

    setShowTaskModal(false);

  };


  // -----------------------------
  // DELETE TASK
  // -----------------------------

  const deleteTask = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await deleteTaskApi(id);


      console.log(
        "Task deleted from backend:",
        id
      );


      setTasks((previousTasks) =>

        previousTasks.filter(
          (task) => task.id !== id
        )

      );


    } catch (error) {

      console.error(
        "Error deleting task:",
        error
      );

      alert(
        "Failed to delete task."
      );

    }

  };


  // -----------------------------
  // COMPLETE / PENDING
  // -----------------------------

  const toggleTask = async (id) => {

    const task = tasks.find(
      (task) => task.id === id
    );


    if (!task) {

      return;

    }


    const currentStatus =
      String(task.status || "").toUpperCase();


    const newStatus =
      currentStatus === "COMPLETED"
        ? "PENDING"
        : "COMPLETED";


    try {

      const updatedTask =
        await updateTaskStatusApi(
          id,
          newStatus
        );


      console.log(
        "Task status updated:",
        updatedTask
      );


      setTasks((previousTasks) =>

        previousTasks.map((task) =>

          task.id === id
            ? updatedTask
            : task

        )

      );


    } catch (error) {

      console.error(
        "Error updating task status:",
        error
      );

      alert(
        "Failed to update task status."
      );

    }

  };


  // -----------------------------
  // CONVERT AI DEADLINE
  // -----------------------------

  // -----------------------------
// CONVERT AI DEADLINE
// -----------------------------

const convertAiDeadline = (deadline) => {

    if (!deadline) {
        return null;
    }

    const value =
        String(deadline)
            .trim()
            .toLowerCase();

    console.log(
        "AI deadline received:",
        deadline
    );


    // -----------------------------
    // NO DEADLINE
    // -----------------------------

    if (
        value === "not specified" ||
        value === "none" ||
        value === "n/a" ||
        value === "null" ||
        value === "no deadline" ||
        value === "not mentioned"
    ) {
        return null;
    }


    // -----------------------------
    // YYYY-MM-DD
    // -----------------------------

    if (
        /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {

        console.log(
            "AI deadline already valid:",
            value
        );

        return value;
    }


    // -----------------------------
    // TODAY
    // -----------------------------

    if (value === "today") {

        const today = new Date();

        const result =
            formatAiDate(today);

        console.log(
            "Converted today:",
            result
        );

        return result;
    }


    // -----------------------------
    // TOMORROW
    // -----------------------------

    if (value === "tomorrow") {

        const tomorrow =
            new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const result =
            formatAiDate(tomorrow);

        console.log(
            "Converted tomorrow:",
            result
        );

        return result;
    }


    // -----------------------------
    // WEEKDAY
    // -----------------------------

    const weekdays = {

        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6

    };


    if (
        Object.prototype.hasOwnProperty.call(
            weekdays,
            value
        )
    ) {

        const today =
            new Date();

        const currentDay =
            today.getDay();

        const targetDay =
            weekdays[value];

        let daysToAdd =
            targetDay - currentDay;


        // If today is the same day
        // or target day already passed,
        // use next week's occurrence.

        if (daysToAdd <= 0) {
            daysToAdd += 7;
        }


        const targetDate =
            new Date(today);

        targetDate.setDate(
            today.getDate() + daysToAdd
        );


        const result =
            formatAiDate(targetDate);


        console.log(
            `Converted ${deadline} to:`,
            result
        );


        return result;
    }


    // -----------------------------
    // NORMAL DATE
    // -----------------------------

    const parsedDate =
        new Date(deadline);


    if (
        !isNaN(parsedDate.getTime())
    ) {

        const result =
            formatAiDate(parsedDate);

        console.log(
            "Converted normal date:",
            result
        );

        return result;
    }


    // -----------------------------
    // UNKNOWN FORMAT
    // -----------------------------

    console.warn(
        "Could not convert AI deadline:",
        deadline
    );

    return null;
};


// -----------------------------
// FORMAT DATE AS YYYY-MM-DD
// -----------------------------

const formatAiDate = (date) => {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

  // -----------------------------
  // ADD AI TASK
  // -----------------------------

  const addAiTask = async (item) => {

    try {

      const aiDeadline =
        convertAiDeadline(
          item.deadline
        );


      const task = {

        title:
          item.task,

        description:
          `Assigned to ${item.person}`,

        priority:
          "MEDIUM",

        status:
          "PENDING",

        assignedTo:
          item.person || "",

        dueDate:
          aiDeadline

      };


      console.log(
        "AI task being created:",
        task
      );


      const savedTask =
        await createTaskApi(task);


      console.log(
        "AI task saved:",
        savedTask
      );


      setTasks((previousTasks) => [

        ...previousTasks,

        savedTask

      ]);


    } catch (error) {

      console.error(
        "Error adding AI task:",
        error
      );

      alert(
        "Failed to add AI task."
      );

    }

  };


  // -----------------------------
  // PAGE RENDER
  // -----------------------------

  const renderPage = () => {

    switch (activePage) {

      case "dashboard":

        return (

          <Dashboard

            tasks={tasks}

            toggleTask={toggleTask}

            deleteTask={deleteTask}

            editTask={editTask}

            openNewTaskModal={
              openNewTaskModal
            }

            searchTerm={searchTerm}

          />

        );


      case "tasks":

        return (

          <Tasks

            tasks={tasks}

            toggleTask={toggleTask}

            deleteTask={deleteTask}

            editTask={editTask}

            openNewTaskModal={
              openNewTaskModal
            }

            searchTerm={searchTerm}

          />

        );


      case "meeting":

        return (

          <MeetingAnalyzerPage
            addAiTask={addAiTask}
          />

        );


      default:

        return (

          <Dashboard

            tasks={tasks}

            toggleTask={toggleTask}

            deleteTask={deleteTask}

            editTask={editTask}

            openNewTaskModal={
              openNewTaskModal
            }

            searchTerm={searchTerm}

          />

        );

    }

  };


  // -----------------------------
  // LOGIN / SIGNUP SCREEN
  // -----------------------------

  if (!isLoggedIn) {

    if (showSignup) {

      return (

        <Signup

          goToLogin={() =>
            setShowSignup(false)
          }

        />

      );

    }


    return (

      <Login

        onLogin={handleLogin}

        goToSignup={() =>
          setShowSignup(true)
        }

      />

    );

  }


  // -----------------------------
  // MAIN APPLICATION
  // -----------------------------

  return (

    <div className="app-container">

      <Sidebar

        activePage={activePage}

        setActivePage={setActivePage}

        user={user}

        onLogout={handleLogout}

      />


      <div className="main-area">

        <Topbar

          user={user}

          searchTerm={searchTerm}

          setSearchTerm={setSearchTerm}

        />


        <main className="content">

          {renderPage()}

        </main>

      </div>


      <TaskModal

        showTaskModal={
          showTaskModal
        }

        setShowTaskModal={
          setShowTaskModal
        }

        newTask={
          newTask
        }

        setNewTask={
          setNewTask
        }

        createTask={
          createTask
        }

        editingTask={
          editingTask
        }

      />

    </div>

  );

}


export default App;