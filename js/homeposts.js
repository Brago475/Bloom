"use strict";


const feed = document.getElementById('feed');

function loadAllPosts() {
  fetch('../load-home-posts.php')  // Update to match the correct filename and path
    .then(res => res.json())
    .then(posts => {
      feed.innerHTML = '';

      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('feed-post');

        postElement.innerHTML = `
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
            </div>
          </div>
        `;

        feed.appendChild(postElement);
      });
    })
    .catch(err => {
      console.error("❌ Failed to load posts:", err);
    });
}

window.addEventListener('DOMContentLoaded', loadAllPosts);
