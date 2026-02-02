"use strict";

const postBtn = document.getElementById('postBtn');
const postInput = document.getElementById('postInput');
const postImageInput = document.getElementById('postImage');
const feed = document.getElementById('feed');

let imagePreviewURL = ''; 

postImageInput.addEventListener('change', function () {
  const file = postImageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreviewURL = e.target.result; 
      console.log('Image preview URL: ', imagePreviewURL); 
    };
    reader.readAsDataURL(file); 
  }
});

// Handle post submission
postBtn.addEventListener('click', function () {
  const text = postInput.value.trim();
  if (!text && !imagePreviewURL) {
    alert('Please enter text or upload an image.');
    return;
  }

  const imageFile = postImageInput.files[0]; 

  const formData = new FormData();
  formData.append('content', text);

  if (imageFile) {
    formData.append('image', imageFile); 
  }

  fetch('save_post.php', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const postElement = document.createElement('div');
        postElement.classList.add('feed-post');
        let postHTML = `
          <div class="post-header">
            <img src="${currentUser.profilePic}" alt="User" class="post-profile-pic">
            <div class="post-user-info">
              <strong>${currentUser.name}</strong>
              <span>${currentUser.handle}</span>
            </div>
          </div>
          <p class="post-text">${text}</p>
        `;
        
        if (imagePreviewURL) postHTML += `<img src="${imagePreviewURL}" alt="Post Image" class="post-image">`;

        postHTML += `
          <div class="post-actions-container">
            <div class="post-actions-left">
              <box-icon name="chat" class="comment-icon"></box-icon>
            </div>
            <div class="post-actions-right">
              <box-icon name="share-alt" class="share-icon"></box-icon>
              <box-icon name="bookmark" class="bookmark-icon"></box-icon>
            </div>
          </div>
        `;

        postElement.innerHTML = postHTML;
        feed.prepend(postElement);
        
        postInput.value = '';
        postImageInput.value = ''; 
        imagePreviewURL = ''; 
      } else {
        alert("Failed to post: " + data.error);
      }
    });
});

function loadAllPosts() {
  fetch('load-posts.php')
    .then(res => res.json())
    .then(posts => {
      const feed = document.getElementById('feed');
      feed.innerHTML = '';
      
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('feed-post');

        let postHTML = `
          <div class="post-header">
            <img src="${post.profile_pic}" alt="User" class="post-profile-pic">
            <div class="post-user-info">
              <strong>${post.username}</strong>
              <span>@${post.username}</span>
            </div>
          </div>
          <p class="post-text">${post.content}</p>
        `;

        if (post.image_path) {
          postHTML += `<img src="${post.image_path}" alt="Post Image" class="post-image">`;
        }

        postHTML += `
          <div class="post-actions-container">
            <div class="post-actions-left">
              <box-icon name="chat" class="comment-icon"></box-icon>
            </div>
            <div class="post-actions-right">
              <box-icon name="share-alt" class="share-icon"></box-icon>
              <box-icon name="bookmark" class="bookmark-icon"></box-icon>
            </div>
          </div>
        `;

        postElement.innerHTML = postHTML;
        feed.appendChild(postElement);
      });
    })
    .catch(err => {
      console.error("Error loading posts:", err);
    });
}
