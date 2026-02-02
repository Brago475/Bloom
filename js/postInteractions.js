"use strict";

function formatCount(num, prefix = "") {
  const abs = Math.abs(num);
  let value = num;
  if (abs >= 1e9) value = (num / 1e9).toFixed(1);
  else if (abs >= 1e6) value = (num / 1e6).toFixed(1);
  else if (abs >= 1e3) value = (num / 1e3).toFixed(1);
  else return `${prefix}${num}`;
  if (value.replace(".", "").length > 3)
    value = Math.floor(num / Math.pow(10, Math.floor(Math.log10(abs) / 3) * 3));
  return `${prefix}${value}${abs >= 1e9 ? 'B' : abs >= 1e6 ? 'M' : 'K'}`;
}

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
    };
    reader.readAsDataURL(file);
  }
});

postBtn.addEventListener('click', function () {
  const text = postInput.value.trim();
  if (!text && !imagePreviewURL) {
    alert('Please enter text or upload an image.');
    return;
  }
  const formData = new FormData();
  formData.append('content', text);
  formData.append('image_url', imagePreviewURL || '');

  fetch('save_post.php', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const postElement = document.createElement('div');
        postElement.classList.add('feed-section');
        postElement.dataset.id = data.post_id;
        let postHTML = `
          <div class="post-header">
            <img src="${currentUser.profilePic}" alt="User" class="post-profile-pic">
            <div class="post-user-info">
              <strong>@${currentUser.handle.replace('@', '')}</strong>
            </div>
          </div>
          <p class="post-text">${text}</p>
          ${imagePreviewURL ? `<img src="${imagePreviewURL}" alt="Post Image" class="post-image">` : ''}
          <div class="post-actions-container">
            <div class="post-actions-left">
              <box-icon name="like" class="like-icon"></box-icon>
              <box-icon name="dislike" class="dislike-icon"></box-icon>
              <box-icon name="chat" class="comment-icon"></box-icon>
            </div>
            <div class="post-actions-right">
              <box-icon name="share-alt" class="share-icon"></box-icon>
              <box-icon name="bookmark" class="bookmark-icon"></box-icon>
              <div class="post-options">
                <box-icon name="dots-horizontal-rounded" class="dots-icon"></box-icon>
                <div class="options-menu" style="display: none;">
                  <div class="option-item edit-post">Edit</div>
                  <div class="option-item delete-post">Delete</div>
                  <div class="option-item make-private">Make Private</div>
                </div>
              </div>
            </div>
          </div>
          <div class="comments-container hidden"></div>`;
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

// Load existing posts
window.addEventListener('DOMContentLoaded', function () {
  fetch('load_posts.php')
    .then(res => res.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('feed-section');
        postElement.dataset.id = post.id;

        let postHTML = `
          <div class="post-header">
            <img src="${post.profile_pic}" class="post-profile-pic" alt="User" />
            <div class="post-user-info">
              <strong>@${post.username}</strong>
            </div>
          </div>
          <p class="post-text">${post.content}</p>
          ${post.image_url ? `<img src="${post.image_url}" class="post-image" alt="Post Image">` : ''}
          <div class="post-actions-container">
            <div class="post-actions-left">
              <box-icon name="like" class="like-icon"></box-icon>
              <box-icon name="dislike" class="dislike-icon"></box-icon>
              <box-icon name="chat" class="comment-icon"></box-icon>
            </div>
            <div class="post-actions-right">
              <box-icon name="share-alt" class="share-icon"></box-icon>
              <box-icon name="bookmark" class="bookmark-icon"></box-icon>
              ${post.user_id == currentUser.id ? `
                <div class="post-options">
                  <box-icon name="dots-horizontal-rounded" class="dots-icon"></box-icon>
                  <div class="options-menu" style="display: none;">
                    <div class="option-item edit-post">Edit</div>
                    <div class="option-item delete-post">Delete</div>
                    <div class="option-item make-private">Make Private</div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="comments-container hidden"></div>
        `;

        postElement.innerHTML = postHTML;
        feed.appendChild(postElement);
      });
    });
});

document.addEventListener('click', function (e) {
  const post = e.target.closest('.feed-section');
  if (!post) return;
  const postId = Number(post.dataset.id);

  if (e.target.classList.contains('delete-post')) {
    if (confirm('Are you sure you want to delete this post?')) {
      fetch('delete_post.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            post.remove();
          } else {
            alert('Delete failed.');
          }
        });
    }
  }

  if (e.target.classList.contains('edit-post')) {
    const postText = post.querySelector('.post-text');
    const currentText = postText.textContent;
    const newText = prompt('Edit your post:', currentText);
    if (newText && newText !== currentText) {
      fetch('edit_post.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, content: newText })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            postText.textContent = newText;
          } else {
            alert('Edit failed.');
          }
        });
    }
  }
});
