document.getElementById('forumPostForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    const user = "User123"; // Replace with real user system
    const avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHUndSzxcF1UbSXX3bVILVaUbSIhoc_GEA8g&s"; // Placeholder avatar URL
  
    // Create a new post
    const post = {
      title,
      content,
      user,
      avatar,
      time: new Date().toLocaleString(),
      replies: [],
      upvotes: 0,
      downvotes: 0
    };
  
    // Save the post in localStorage
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    posts.push(post);
    localStorage.setItem('forumPosts', JSON.stringify(posts));
  
    // Reset the form
    document.getElementById('forumPostForm').reset();
  
    // Reload the posts
    loadPosts();
  });
  
  // Function to load and display posts
  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    const postsContainer = document.getElementById('forumPosts');
    postsContainer.innerHTML = '';
  
    posts.forEach((post, index) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'forum-post';
      postDiv.innerHTML = `
        <div class="post-header">
          <img src="${post.avatar}" alt="User Avatar" class="user-avatar">
          <div>
            <h4>${post.title}</h4>
            <p><strong>${post.user}</strong> - ${post.time}</p>
          </div>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
        </div>
        <div class="post-footer">
          <button onclick="toggleReplyForm(${index})">Reply</button>
          <div class="vote-section">
            <button onclick="upvotePost(${index})">👍 ${post.upvotes}</button>
            <button onclick="downvotePost(${index})">👎 ${post.downvotes}</button>
          </div>
        </div>
        <div id="replySection${index}" class="reply-section" style="display:none;">
          <textarea id="replyContent${index}" placeholder="Write a reply..."></textarea>
          <button onclick="postReply(${index})">Post Reply</button>
          <div id="replies${index}" class="replies">
            ${post.replies.map(reply => `<p>${reply}</p>`).join('')}
          </div>
        </div>
      `;
      postsContainer.appendChild(postDiv);
    });
  }
  
  // Function to handle upvote
  function upvotePost(postIndex) {
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    posts[postIndex].upvotes++;
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    loadPosts();
  }
  
  // Function to handle downvote
  function downvotePost(postIndex) {
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    posts[postIndex].downvotes++;
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    loadPosts();
  }
  
  // Function to toggle the reply form visibility
  function toggleReplyForm(postIndex) {
    const replySection = document.getElementById(`replySection${postIndex}`);
    replySection.style.display = replySection.style.display === 'none' ? 'block' : 'none';
  }
  
  // Function to handle posting a reply
  function postReply(postIndex) {
    const replyContent = document.getElementById(`replyContent${postIndex}`).value;
    if (!replyContent) return;
  
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    posts[postIndex].replies.push(replyContent);
    localStorage.setItem('forumPosts', JSON.stringify(posts));
  
    document.getElementById(`replyContent${postIndex}`).value = '';
    loadPosts();
  }
  
  // Load posts on page load
  loadPosts();
  // Expose functions to global scope so onclick works
window.upvotePost = upvotePost;
window.downvotePost = downvotePost;
window.toggleReplyForm = toggleReplyForm;
window.postReply = postReply;

