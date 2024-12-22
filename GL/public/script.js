// Initialize Gantt Chart
gantt.init("gantt");

// Initialize empty data (start with no tasks)
gantt.parse({ data: [] });

// Add new task via the form
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("taskName").value;
    const startDate = document.getElementById("startDate").value;
    const duration = parseInt(document.getElementById("duration").value);

    // Add the task to the Gantt chart
    gantt.addTask({
        id: gantt.uid(), // Unique task ID
        text: taskName,
        start_date: startDate,
        duration: duration,
        progress: 0
    });

    // Reset the form after adding the task
    e.target.reset();
});

// Export data to server
document.getElementById("exportButton").addEventListener("click", () => {
    const data = gantt.serialize(); // Gather Gantt data
    fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => console.error("Error:", error));
});

// Load data when the page loads
window.addEventListener("load", () => {
    fetch("/load")
        .then(response => response.json())
        .then(data => {
            gantt.parse(data); // Load the data into the Gantt chart
        })
        .catch(error => console.error("Error loading data:", error));
});
