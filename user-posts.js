document.addEventListener("DOMContentLoaded", async () => {
    const userId = new URLSearchParams(window.location.search).get("id");
    const postsList = document.getElementById("posts-list");
    const userName = document.getElementById("user-name");

    try {
        // ดึงข้อมูล user
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        userName.textContent = user.name;

        // ดึงโพสต์ของ user
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await postsResponse.json();

        posts.forEach(post => {
            const postItem = document.createElement("div");
            postItem.classList.add("post");
            postItem.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="toggle-comments" data-id="${post.id}">ดูความคิดเห็น</button>
                <div class="comments" id="comments-${post.id}" style="display: none;"></div>
            `;
            postsList.appendChild(postItem);
        });

        document.querySelectorAll(".toggle-comments").forEach(button => {
            button.addEventListener("click", async (event) => {
                const postId = event.target.dataset.id;
                const commentsDiv = document.getElementById(`comments-${postId}`);

                if (commentsDiv.style.display === "none") {
                    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                    const comments = await commentsResponse.json();

                    commentsDiv.innerHTML = comments.map(comment =>
                        `<p><strong>${comment.name}:</strong> ${comment.body}</p>`
                    ).join("");

                    commentsDiv.style.display = "block";
                    event.target.textContent = "ซ่อนความคิดเห็น";
                } else {
                    commentsDiv.style.display = "none";
                    event.target.textContent = "ดูความคิดเห็น";
                }
            });
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});
