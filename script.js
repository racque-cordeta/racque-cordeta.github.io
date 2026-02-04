// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // ==================================================
    // 1. HANDLE "LIKE" BUTTON CLICK INTERACTIONS
    // ==================================================
   
    // Function to attach event listeners to like buttons
    function attachLikeListeners() {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(button => {
            button.removeEventListener('click', toggleLike);
            button.addEventListener('click', toggleLike);
        });
    }

    function toggleLike(e) {
        const button = this;
        const icon = button.querySelector('.icon');
        button.classList.toggle('liked');
        if (button.classList.contains('liked')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    }

    // Initial attachment for existing hardcoded posts
    attachLikeListeners();


    // ==================================================
    // 2. HANDLE MOCK "CREATE POST" functionality
    // ==================================================

    const postInput = document.getElementById('postInput');
    const postBtn = document.getElementById('postBtn');
    const feedStream = document.getElementById('feedStream');

    postBtn.addEventListener('click', function() {
        const content = postInput.value;

        // Don't post if empty
        if (content.trim() === "") {
            alert("Please write something first!");
            return;
        }

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newPostHTML = `
            <div class="card post new-post-animation">
                <div class="post-header">
                    <div class="post-author-info">
                        <img src="https://i.pravatar.cc/150?img=60" alt="Author">
                        <div>
                            <h4 class="author-name">Alex Developer</h4>
                            <span class="timestamp">Just now at ${timeString} · <i class="fa-solid fa-earth-americas"></i></span>
                        </div>
                    </div>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
                <div class="post-content">
                    <p>${content}</p>
                    </div>
                <div class="post-stats">
                    <span>Be the first to like this</span>
                </div>
                <hr>
                <div class="post-actions-row">
                    <div class="action-btn like-btn">
                        <i class="fa-regular fa-thumbs-up icon"></i> Like
                    </div>
                    <div class="action-btn">
                        <i class="fa-regular fa-message"></i> Comment
                    </div>
                    <div class="action-btn">
                        <i class="fa-solid fa-share"></i> Share
                    </div>
                </div>
            </div>
        `;

        feedStream.insertAdjacentHTML('afterbegin', newPostHTML);
        postInput.value = '';
        attachLikeListeners();
    });
});
