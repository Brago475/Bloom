/*"use strict";


function formatCount(num, prefix = "") {
    const abs = Math.abs(num);
    let value = num;

    if (abs >= 1e9) {
        value = (num / 1e9).toFixed(1);
        if (value.replace(".", "").length > 3) value = Math.floor(num / 1e9);
        return `${prefix}${value}B`;
    } else if (abs >= 1e6) {
        value = (num / 1e6).toFixed(1);
        if (value.replace(".", "").length > 3) value = Math.floor(num / 1e6);
        return `${prefix}${value}M`;
    } else if (abs >= 1e3) {
        value = (num / 1e3).toFixed(1);
        if (value.replace(".", "").length > 3) value = Math.floor(num / 1e3);
        return `${prefix}${value}K`;
    } else {
        return `${prefix}${num}`;
    }
}

const userId = {
    name: null,
    identity: null,
    image: null,
    message: null,
    date: null,
};

const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".comments");
const userName = document.querySelector(".user");

userComment.addEventListener("input", e => {
    if (!userComment.value) {
        publishBtn.setAttribute("disabled", "disabled");
        publishBtn.classList.remove("abled");
    } else {
        publishBtn.removeAttribute("disabled");
        publishBtn.classList.add("abled");
    }
});

function addPost() {
    if (!userComment.value) return;

    const timeStamp = new Date();
    const formattedDate = timeStamp.toLocaleDateString();
    const formattedTime = timeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    userId.name = userName.value;
    userId.identity = userId.name !== "Anonymous";
    userId.image = userId.identity ? "user.jpg" : "anonymous.png";
    userId.message = userComment.value;
    userId.date = formattedDate;

    let published = `
    <div class="parents">
      <img src="${userId.image}">
      <div>
          <h1>${userId.name}</h1>
          <p>${userId.message}</p>
          <div class="engagements">
              <span class="like-container">
                  <span class="like-count">+0</span>
                  <img src="like.png" class="engagement-icon like">
              </span>
              <span class="dislike-container">
                  <span class="dislike-count">-0</span>
                  <img src="dislike.png" class="engagement-icon dislike">
              </span>
              <span class="share-container">
                  <span class="share-count">0</span>
                  <img src="share.png" class="engagement-icon share">
              </span>
          </div>
          <span class="date">${formattedDate} ${formattedTime}</span>
      </div>
    </div>
`;

    comments.innerHTML += published;
    userComment.value = "";

    let commentsNum = document.querySelectorAll(".parents").length;
    document.getElementById("comment").textContent = commentsNum;

    const latest = comments.querySelector(".parents:last-child");
    const likeBtn = latest.querySelector(".like");
    const dislikeBtn = latest.querySelector(".dislike");
    const shareBtn = latest.querySelector(".share");

    const likeCount = latest.querySelector(".like-count");
    const dislikeCount = latest.querySelector(".dislike-count");
    const shareCount = latest.querySelector(".share-count");


    let liked = false;
    let disliked = false;
    let likeVal = 0;
    let dislikeVal = 0;
    let shareVal = 0;

    likeBtn.addEventListener("click", function () {
        if (!liked) {
            likeVal++;
            if (disliked) {
                disliked = false;
                dislikeBtn.classList.remove("active");
                dislikeVal--;
                dislikeCount.textContent = formatCount(dislikeVal, "-");
            }
            liked = true;
            likeBtn.classList.add("active");
        } else {
            likeVal--;
            liked = false;
            likeBtn.classList.remove("active");
        }
        likeCount.textContent = formatCount(likeVal, "+");
    });

    dislikeBtn.addEventListener("click", function () {
        if (!disliked) {
            dislikeVal++;
            if (liked) {
                liked = false;
                likeBtn.classList.remove("active");
                likeVal--;
                likeCount.textContent = formatCount(likeVal, "+");
            }
            disliked = true;
            dislikeBtn.classList.add("active");
        } else {
            dislikeVal--;
            disliked = false;
            dislikeBtn.classList.remove("active");
        }
        dislikeCount.textContent = formatCount(dislikeVal, "-");
    });

    shareBtn.addEventListener("click", function () {
        const message = latest.querySelector("p").textContent;
        navigator.clipboard.writeText(message).then(() => {
            alert("Message copied to clipboard!");
            shareVal++;
            shareCount.textContent = formatCount(shareVal);
        });
    });
}

publishBtn.addEventListener("click", addPost);
*/

"use strict";


function formatCount(num, prefix = "") {
  const abs = Math.abs(num);
  let value = num;

  if (abs >= 1e9) {
    value = (num / 1e9).toFixed(1);
    if (value.replace(".", "").length > 3) value = Math.floor(num / 1e9);
    return `${prefix}${value}B`;
  } else if (abs >= 1e6) {
    value = (num / 1e6).toFixed(1);
    if (value.replace(".", "").length > 3) value = Math.floor(num / 1e6);
    return `${prefix}${value}M`;
  } else if (abs >= 1e3) {
    value = (num / 1e3).toFixed(1);
    if (value.replace(".", "").length > 3) value = Math.floor(num / 1e3);
    return `${prefix}${value}K`;
  } else {
    return `${prefix}${num}`;
  }
}

const currentUser = {
  name: "Peter Parker",
  handle: "@peterparker",
  profilePic: "assets/profile-user (2).png"
};


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
    }
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

        if (imagePreviewURL) {
          postHTML += `<img src="${imagePreviewURL}" alt="Post Image" class="post-image">`;
        }

        postHTML += `
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
                <div class="options-menu">
                  <div class="option-item edit-post">Edit</div>
                  <div class="option-item delete-post">Delete</div>
                  <div class="option-item make-private">Make Private</div>
                </div>
              </div>
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


document.addEventListener('click', function (e) {
  if (e.target.classList.contains('like-icon') ||
    e.target.classList.contains('dislike-icon') ||
    e.target.classList.contains('bookmark-icon')) {
    e.target.classList.toggle('active');
  }

  if (e.target.classList.contains('share-icon')) {
    alert('Share functionality coming soon!');
  }

  if (e.target.classList.contains('dots-icon')) {
    const options = e.target.closest('.post-options');
    options.classList.toggle('active');
  }

  if (e.target.classList.contains('edit-post')) {
    const postText = e.target.closest('.feed-post').querySelector('.post-text');
    const newText = prompt('Edit your post:', postText.textContent);
    if (newText !== null) {
      postText.textContent = newText;
    }
  }

  if (e.target.classList.contains('delete-post')) {
    if (confirm('Are you sure you want to delete this post?')) {
      e.target.closest('.feed-post').remove();
    }
  }

  if (e.target.classList.contains('make-private')) {
    alert('Post marked as private!');
  }
});




document.addEventListener('click', function(e) {
  const post = e.target.closest('.feed-post');
  if (!post) return;

  const likeIcon = post.querySelector('.like-icon');
  const dislikeIcon = post.querySelector('.dislike-icon');
  const likeCount = post.querySelector('.like-count') || createCountSpan(likeIcon, '+');
  const dislikeCount = post.querySelector('.dislike-count') || createCountSpan(dislikeIcon, '-');


  if (e.target === likeIcon) {
    if (likeIcon.classList.contains('active')) {
      likeIcon.classList.remove('active');
      updateCount(likeCount, -1);
    } else {
      likeIcon.classList.add('active');
      updateCount(likeCount, 1);
      if (dislikeIcon.classList.contains('active')) {
        dislikeIcon.classList.remove('active');
        updateCount(dislikeCount, -1);
      }
    }
  }


  if (e.target === dislikeIcon) {
    if (dislikeIcon.classList.contains('active')) {
      dislikeIcon.classList.remove('active');
      updateCount(dislikeCount, -1);
    } else {
      dislikeIcon.classList.add('active');
      updateCount(dislikeCount, 1);
      if (likeIcon.classList.contains('active')) {
        likeIcon.classList.remove('active');
        updateCount(likeCount, -1);
      }
    }
  }


  function createCountSpan(icon, prefix) {
    const span = document.createElement('span');
    span.className = prefix === '+' ? 'like-count' : 'dislike-count';
    span.textContent = prefix + '0';
    icon.parentNode.insertBefore(span, icon.nextSibling);
    return span;
  }

  function updateCount(span, change) {
    let current = parseInt(span.textContent.replace(/[+-]/, '')) || 0;
    current += change;
    span.textContent = (span.classList.contains('like-count') ? '+' : '-') + current;
  }
});


window.addEventListener('DOMContentLoaded', function() {
  fetch('load_posts.php')
    .then(res => res.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('feed-post');
        postElement.innerHTML = `
          <div class="post-header">
            <img src="${currentUser.profilePic}" class="post-profile-pic" alt="User" />
            <div class="post-user-info">
              <strong>${currentUser.name}</strong>
              <span>${currentUser.handle}</span>
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
    });
});


document.addEventListener('click', function(e) {
  if (e.target.classList.contains('comment-icon')) {
    const post = e.target.closest('.feed-post');
    let commentBox = post.querySelector('.comment-box');
    if (!commentBox) {
      commentBox = document.createElement('div');
      commentBox.classList.add('comment-box');
      commentBox.innerHTML = `
        <div class="comment-input-container">
          <img src="${currentUser.profilePic}" class="comment-profile-pic" alt="Profile Pic">
          <input type="text" placeholder="Write a comment..." class="comment-input">
          <button class="submit-comment">Post</button>
        </div>
        <div class="comments-container"></div>
      `;
      post.appendChild(commentBox);
    }
  }

  if (e.target.classList.contains('submit-comment')) {
    const post = e.target.closest('.feed-post');
    const input = post.querySelector('.comment-input');
    const commentsContainer = post.querySelector('.comments-container');
    const text = input.value.trim();
    if (text) {
      const commentHTML = `
        <div class="comment">
          <img src="${currentUser.profilePic}" class="comment-profile-pic" alt="Profile Pic">
          <strong>${currentUser.name}</strong> <span>${currentUser.handle}</span>
          <p>${text}</p>
        </div>
      `;
      commentsContainer.innerHTML += commentHTML;
      input.value = '';
    }
  }
});
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots-icon')) {
    const menu = e.target.nextElementSibling;
    menu.classList.toggle('hidden');
  } else {
    document.querySelectorAll('.options-menu').forEach(menu => menu.classList.add('hidden'));
  }
});
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('submit-comment-btn')) {
    const commentInput = e.target.previousElementSibling;
    const commentText = commentInput.value.trim();
    const commentsContainer = e.target.closest('.comment-section').querySelector('.existing-comments');

    if (commentText) {
      const commentHTML = `
        <div class="comment">
          <img src="${currentUser.profilePic}" class="comment-profile-pic" />
          <strong>${currentUser.name}</strong> <span>${currentUser.handle}</span>
          <p>${commentText}</p>
        </div>
      `;
      commentsContainer.innerHTML += commentHTML;
      commentInput.value = '';
    }
  }
});
// Multi-Step Form Logic
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const formSteps = document.querySelectorAll('.form-step');

let currentStep = 0;

nextBtns.forEach(button => {
  button.addEventListener('click', () => {
    formSteps[currentStep].classList.remove('active');
    currentStep++;
    formSteps[currentStep].classList.add('active');
  });
});

prevBtns.forEach(button => {
  button.addEventListener('click', () => {
    formSteps[currentStep].classList.remove('active');
    currentStep--;
    formSteps[currentStep].classList.add('active');
  });
});
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const container = document.querySelector('.container');

registerBtn.addEventListener('click', () => {
  container.classList.add('active'); // Show register form
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active'); // Show login form
});
