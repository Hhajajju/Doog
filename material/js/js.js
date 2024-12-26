let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(reward, taskUrl) {
    // Get the timestamp of the last task completion from localStorage
    const lastCompleted = parseInt(localStorage.getItem(taskUrl + '_timestamp')) || 0;
    const currentTime = Date.now(); // Current time in milliseconds

    // Check if 1 hour (3600000 ms) has passed since the last task completion
    if (currentTime - lastCompleted < 3600000) {
        const timeLeft = Math.floor((3600000 - (currentTime - lastCompleted)) / 1000);
        alert(`You have already completed this task. Please wait ${timeLeft} seconds before completing it again.`);
        return;
    }

    // Update balance with the reward
    balance += reward;
    updateBalance();

    // Save the current timestamp to localStorage
    localStorage.setItem(taskUrl + '_timestamp', currentTime);

    // Save the updated balance to localStorage
    localStorage.setItem('balance', balance);

    // Mark the task as completed (optional)
    localStorage.setItem(taskUrl, 'true');

    // Open the task URL in a new window
    window.open(taskUrl, '_blank');
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

// Initial balance update on page load
updateBalance();
