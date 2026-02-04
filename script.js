// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {


    // ==================================================
    // 1. HANDLE "LIKE" BUTTON CLICK INTERACTIONS
    // ==================================================
   
    // Function to attach event listeners to like buttons
    // We need this function because when we create a NEW post,
    // its like button needs to be activated.
    function attachLikeListeners() {
        // Select all elements with class '.like-btn'
        const likeButtons = document.querySelectorAll('.like-btn');


        likeButtons.forEach(button => {
            // Remove old listener to avoid duplicates if re-running
            button.removeEventListener('click', toggleLike);
            // Add new listener
            button.addEventListener('click', toggleLike);
        });
    }


    function toggleLike(e) {
        // 'this' refers to the button clicked
        const button = this;
        const icon = button.querySelector('.icon');


        // Toggle the 'liked' CSS class (turns text blue)
        button.classList.toggle('liked');


        // Toggle between solid thumbs-up and outline thumbs-up
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


        // Get current time string suitable for a post
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


        // CREATE THE NEW POST HTML STRUCTURE
        // We use backticks (`) for a template literal string
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


        // Insert the new HTML at the BEGINNING of the feed stream container
        feedStream.insertAdjacentHTML('afterbegin', newPostHTML);


        // Clear the input field
        postInput.value = '';


        // IMPORTANT: Re-run the function to attach listeners so the
        // new post's like button actually works.
        attachLikeListeners();
    });
});


// document.addEventListener('DOMContentLoaded', function() {
    
//     // 1. LOAD SAVED POSTS FROM LOCAL STORAGE
//     loadPosts();

//     // 2. HANDLE POST CREATION
//     const postBtn = document.getElementById('postBtn');
//     const postInput = document.getElementById('postInput');
//     const feedStream = document.getElementById('feedStream');

//     postBtn.addEventListener('click', function() {
//         const content = postInput.value;
//         if (content.trim() === "") return;

//         // Create Post Object
//         const newPost = {
//             id: Date.now(), // Unique ID based on time
//             text: content,
//             time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             likes: 0,
//             likedByMe: false
//         };

//         // Save to Local Storage
//         savePostToStorage(newPost);

//         // Render to Screen (Add to top)
//         addPostToDOM(newPost, true);

//         postInput.value = '';
//     });

//     // --- HELPER FUNCTIONS ---

//     function savePostToStorage(post) {
//         let posts = JSON.parse(localStorage.getItem('myPosts')) || [];
//         posts.unshift(post); // Add to beginning of array
//         localStorage.setItem('myPosts', JSON.stringify(posts));
//     }

//     function loadPosts() {
//         let posts = JSON.parse(localStorage.getItem('myPosts')) || [];
//         posts.forEach(post => {
//             addPostToDOM(post, false);
//         });
//     }

//     function addPostToDOM(post, isNew) {
//         // HTML Template for a post
//         const postHTML = `
//             <div class="card post ${isNew ? 'new-post-animation' : ''}" data-id="${post.id}">
//                 <div class="post-header">
//                     <div class="post-author-info">
//                         <img src="https://pbs.twimg.com/profile_images/1919689960548139008/KESdylXb_400x400.jpg">
//                         <div>
//                             <h4 class="author-name">Racque Cordeta</h4>
//                             <span class="timestamp">${post.time} · <i class="fa-solid fa-earth-americas"></i></span>
//                         </div>
//                     </div>
//                     <i class="fa-solid fa-trash delete-btn" style="cursor:pointer; color:#ccc;"></i>
//                 </div>
//                 <div class="post-content">
//                     <p>${post.text}</p>
//                 </div>
//                 <hr>
//                 <div class="post-actions-row">
//                     <div class="action-btn like-btn ${post.likedByMe ? 'liked' : ''}">
//                         <i class="${post.likedByMe ? 'fa-solid' : 'fa-regular'} fa-thumbs-up icon"></i> 
//                         <span class="like-text">${post.likedByMe ? 'Liked' : 'Like'}</span>
//                     </div>
//                     <div class="action-btn"><i class="fa-regular fa-message"></i> Comment</div>
//                     <div class="action-btn"><i class="fa-solid fa-share"></i> Share</div>
//                 </div>
//             </div>
//         `;

//         if (isNew) {
//             feedStream.insertAdjacentHTML('afterbegin', postHTML);
//         } else {
//             feedStream.insertAdjacentHTML('beforeend', postHTML);
//         }

//         // Re-attach listeners to the new buttons
//         const currentPostElement = document.querySelector(`[data-id="${post.id}"]`);
        
//         // Delete Button Logic
//         currentPostElement.querySelector('.delete-btn').addEventListener('click', function() {
//             deletePost(post.id, currentPostElement);
//         });

//         // Like Button Logic
//         currentPostElement.querySelector('.like-btn').addEventListener('click', function() {
//             toggleLike(this);
//         });
//     }

//     function deletePost(id, element) {
//         if(confirm("Delete this post?")) {
//             // Remove from screen
//             element.remove();
            
//             // Remove from Storage
//             let posts = JSON.parse(localStorage.getItem('myPosts')) || [];
//             posts = posts.filter(p => p.id !== id);
//             localStorage.setItem('myPosts', JSON.stringify(posts));
//         }
//     }

//     function toggleLike(btn) {
//         btn.classList.toggle('liked');
//         const icon = btn.querySelector('.icon');
//         const text = btn.querySelector('.like-text');
        
//         if (btn.classList.contains('liked')) {
//             icon.classList.replace('fa-regular', 'fa-solid');
//             text.innerText = "Liked";
//         } else {
//             icon.classList.replace('fa-solid', 'fa-regular');
//             text.innerText = "Like";
//         }
//     }
// });
