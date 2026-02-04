document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LOAD SAVED POSTS FROM LOCAL STORAGE
    loadPosts();

    // 2. HANDLE POST CREATION
    const postBtn = document.getElementById('postBtn');
    const postInput = document.getElementById('postInput');
    const feedStream = document.getElementById('feedStream');

    postBtn.addEventListener('click', function() {
        const content = postInput.value;
        if (content.trim() === "") return;

        // Create Post Object
        const newPost = {
            id: Date.now(), // Unique ID based on time
            text: content,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            likes: 0,
            likedByMe: false
        };

        // Save to Local Storage
        savePostToStorage(newPost);

        // Render to Screen (Add to top)
        addPostToDOM(newPost, true);

        postInput.value = '';
    });

    // --- HELPER FUNCTIONS ---

    function savePostToStorage(post) {
        let posts = JSON.parse(localStorage.getItem('myPosts')) || [];
        posts.unshift(post); // Add to beginning of array
        localStorage.setItem('myPosts', JSON.stringify(posts));
    }

    function loadPosts() {
        let posts = JSON.parse(localStorage.getItem('myPosts')) || [];
        posts.forEach(post => {
            addPostToDOM(post, false);
        });
    }

    function addPostToDOM(post, isNew) {
        // HTML Template for a post
        const postHTML = `
            <div class="card post ${isNew ? 'new-post-animation' : ''}" data-id="${post.id}">
                <div class="post-header">
                    <div class="post-author-info">
                        <img src="https://pbs.twimg.com/profile_images/1919689960548139008/KESdylXb_400x400.jpg">
                        <div>
                            <h4 class="author-name">Racque Cordeta</h4>
                            <span class="timestamp">${post.time} · <i class="fa-solid fa-earth-americas"></i></span>
                        </div>
                    </div>
                    <i class="fa-solid fa-trash delete-btn" style="cursor:pointer; color:#ccc;"></i>
                </div>
                <div class="post-content">
                    <p>${post.text}</p>
                </div>
                <hr>
                <div class="post-actions-row">
                    <div class="action-btn like-btn ${post.likedByMe ? 'liked' : ''}">
                        <i class="${post.likedByMe ? 'fa-solid' : 'fa-regular'} fa-thumbs-up icon"></i> 
                        <span class="like-text">${post.likedByMe ? 'Liked' : 'Like'}</span>
                    </div>
                    <div class="action-btn"><i class="fa-regular fa-message"></i> Comment</div>
                    <div class="action-btn"><i class="fa-solid fa-share"></i> Share</div>
                </div>
            </div>
        `;

        if (isNew) {
            feedStream.insertAdjacentHTML('afterbegin', postHTML);
        } else {
            feedStream.insertAdjacentHTML('beforeend', postHTML);
        }

        // Re-attach listeners to the new buttons
        const currentPostElement = document.querySelector(`[data-id="${post.id}"]`);
        
        // Delete Button Logic
        currentPostElement.querySelector('.delete-btn').addEventListener('click', function() {
            deletePost(post.id, currentPostElement);
        });

        // Like Button Logic
        currentPostElement.querySelector('.like-btn').addEventListener('click', function() {
            toggleLike(this);
        });
    }

    function deletePost(id, element) {
        if(confirm("Delete this post?")) {
            // Remove from screen
            element.remove();
            
            // Remove from Storage
            let posts = JSON.parse(localStorage.getItem('myPosts')) || [];
            posts = posts.filter(p => p.id !== id);
            localStorage.setItem('myPosts', JSON.stringify(posts));
        }
    }

    function toggleLike(btn) {
        btn.classList.toggle('liked');
        const icon = btn.querySelector('.icon');
        const text = btn.querySelector('.like-text');
        
        if (btn.classList.contains('liked')) {
            icon.classList.replace('fa-regular', 'fa-solid');
            text.innerText = "Liked";
        } else {
            icon.classList.replace('fa-solid', 'fa-regular');
            text.innerText = "Like";
        }
    }
});
