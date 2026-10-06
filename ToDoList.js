document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('addTaskForm');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDate');
    const dueTimeInput = document.getElementById('dueTime');
    const taskPriorityInput = document.getElementById('taskPriority');
    const taskList = document.getElementById('taskList');
    const priorities = ['urgent', 'high', 'normal', 'low'];

    // Add a new task
    addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText || !dueDateInput.value || !dueTimeInput.value || !taskPriorityInput.value) return;

        addTask(taskText, dueDateInput.value, dueTimeInput.value, taskPriorityInput.value);
        addTaskForm.reset();
    });

    // Add task function
    function addTask(taskText, dueDate, dueTime, priority) {
        const li = document.createElement('li');
        li.dataset.priority = priority;
        const details = document.createElement('div');
        details.className = 'task-details';
        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = taskText;
        const deadline = document.createElement('time');
        deadline.className = 'task-deadline';
        deadline.dateTime = `${dueDate}T${dueTime}`;
        const parsedDate = new Date(`${dueDate}T${dueTime}`);
        deadline.textContent = `Due ${parsedDate.toLocaleDateString()} at ${parsedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        const urgency = document.createElement('span');
        urgency.className = `task-priority priority-${priority}`;
        urgency.textContent = `${priority[0].toUpperCase()}${priority.slice(1)} urgency`;
        details.append(title, deadline, urgency);

        const actions = document.createElement('div');
        actions.className = 'task-actions';
        actions.innerHTML = '<button type="button" class="complete">Complete</button><button type="button" class="edit">Edit</button><button type="button" class="delete">Delete</button>';
        li.append(details, actions);
        const nextTask = Array.from(taskList.children).find((task) =>
            priorities.indexOf(task.dataset.priority) > priorities.indexOf(priority)
        );
        taskList.insertBefore(li, nextTask || null);

        const completeButton = li.querySelector('.complete');
        const editButton = li.querySelector('.edit');
        const deleteButton = li.querySelector('.delete');

        // Mark task as complete
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Edit task
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit the task:', taskText);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                li.querySelector('span').textContent = newTaskText.trim();
            }
        });

        // Delete task
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });
    }
});
