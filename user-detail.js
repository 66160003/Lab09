document.addEventListener("DOMContentLoaded", async () => {
    const userId = new URLSearchParams(window.location.search).get("id");
    const userDetail = document.getElementById("user-detail");
    const viewPostsBtn = document.getElementById("view-posts");

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        userDetail.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        `;

        viewPostsBtn.addEventListener("click", () => {
            window.location.href = `user-posts.html?id=${userId}`;
        });

    } catch (error) {
        console.error("Error fetching user details:", error);
    }
});
