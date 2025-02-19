document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        users.forEach(user => {
            const userItem = document.createElement("div");
            userItem.classList.add("user");
            userItem.innerHTML = `<a href="user-detail.html?id=${user.id}">${user.name}</a>`;
            userList.appendChild(userItem);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});
