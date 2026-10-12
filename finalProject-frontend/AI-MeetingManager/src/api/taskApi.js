const API_URL = "http://localhost:8081/api/tasks";


// ======================================
// GET JWT HEADERS
// ======================================

const getHeaders = () => {

    const token =
        localStorage.getItem("jwtToken");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};


// ======================================
// GET ALL TASKS
// ======================================

export const getTasks = async () => {

    const response = await fetch(
        API_URL,
        {
            method: "GET",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch tasks: ${response.status}`
        );
    }

    return await response.json();
};


// ======================================
// CREATE TASK
// ======================================

export const createTask = async (task) => {

    const response = await fetch(
        API_URL,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(task)
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to create task: ${response.status}`
        );
    }

    return await response.json();
};


// ======================================
// UPDATE TASK
// ======================================

export const updateTask = async (
    id,
    task
) => {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(task)
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to update task: ${response.status}`
        );
    }

    return await response.json();
};


// ======================================
// DELETE TASK
// ======================================

export const deleteTask = async (id) => {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to delete task: ${response.status}`
        );
    }

    return await response.text();
};


// ======================================
// UPDATE TASK STATUS
// ======================================

export const updateTaskStatus = async (
    id,
    status
) => {

    const response = await fetch(
        `${API_URL}/${id}/status`,
        {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({
                status: status
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to update task status: ${response.status}`
        );
    }

    return await response.json();
};


// ======================================
// SEARCH TASKS
// ======================================

export const searchTasks = async (
    keyword
) => {

    const response = await fetch(
        `${API_URL}/search?keyword=${encodeURIComponent(keyword)}`,
        {
            method: "GET",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to search tasks: ${response.status}`
        );
    }

    return await response.json();
};