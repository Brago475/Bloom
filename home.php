<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'] ?? 'Guest';
$fname = $_SESSION['fname'] ?? '';
$lname = $_SESSION['lname'] ?? '';
$full_name = trim($fname . ' ' . $lname);
$profile_pic = $_SESSION['profile_pic'] ?? 'assets/profileUser.png'; 
$banner_pic = $_SESSION['banner_pic'] ?? 'assets/bannerPh.png'; 
?>

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="styles/style.css" />
  <link rel="stylesheet" href="styles/style2.css" />
  

  <title>Bloom</title>
</head>
<body>
  <nav class="bloom-navbar">
    <div class="navbar-left">
    <img src="<?php echo htmlspecialchars($profile_pic); ?>" alt="Profile" class="profile-pic" id="navProfilePic" onclick="toggleMenu()" />
      <div class="search-container">
        <input type="text" placeholder="Search Bloom" class="search-bar" id="searchInput">
        <box-icon name="search-alt" class="search-icon"></box-icon>
      </div>
    </div>
  
    <div class="navbar-logo">
      <img src="assets/logo.png" class="logo" alt="Logo" />
    </div>
  
    <div class="hamburger" id="hamburger">
      <ion-icon name="menu-sharp"></ion-icon>
    </div>
  
    <div class="navbar-right" id="navbarRight">
      <a href="home.php" class="nav-icon"><box-icon name='home-circle'></box-icon>Home</a>
      <a href="notifications.php" class="nav-icon"><box-icon name='bell'></box-icon>Notifications</a>
      <a href="javascript:void(0);" class="nav-icon" onclick="toggleChat()">
  <box-icon name='message'></box-icon>Messages
</a>

      <a href="Podcast.html" class="nav-icon"><box-icon name='microphone'></box-icon>Podcast</a>
  
      <button class="bloom-btn" id="bloomButton">
        Blossoms
        <img src="assets/blossom.png" alt="Blossom" class="profile-pic">
      </button>
    </div>
  
    <div class="sub-menu-wrap" id="submenu">
      <div class="sub-menu">
      <div class="user-info">
  <img src="<?php echo htmlspecialchars($profile_pic); ?>" alt="User">
  <h3><?php echo htmlspecialchars($full_name ?: $username); ?></h3>
</div>
        </div>
        <hr />
    
        <a href="index.php" class="sub-menu-link">
          <div class="link-left">
            <ion-icon name="create-sharp"></ion-icon>
            <p>Edit Profile</p>
          </div>
          <div class="link-right">
            <span>></span>
          </div>
        </a>
    
        <a href="setting.php" class="sub-menu-link">
          <div class="link-left">
            <ion-icon name="settings-sharp"></ion-icon>
            <p>Setting & Privacy</p>
          </div>
          <div class="link-right">
            <span>></span>
          </div>
        </a>
    
        <a href="support.php" class="sub-menu-link">
          <div class="link-left">
            <ion-icon name="help-circle-sharp"></ion-icon>
            <p>Help & Support</p>
          </div>
          <div class="link-right">
            <span>></span>
          </div>
        </a>
    
        <a href="logout.php" class="sub-menu-link">
          <div class="link-left">
            <ion-icon name="log-out-sharp"></ion-icon>
            <p>Logout</p>
          </div>
          <div class="link-right">
            <span>></span>
          </div>
        </a>
      </div>
    </div>
    </nav>

    <div class="main-container">

      <aside class="left-panel">
        <div class="profile-banner">
        <img src="<?php echo htmlspecialchars($banner_pic); ?>" 
     style="width: 100%; height: 150px; object-fit: cover; border-radius: 0; cursor: pointer;" 
     alt="Banner">
        <div class="profile-info">
        <img src="<?php echo htmlspecialchars($profile_pic); ?>" 
     style="width: 80px; height: 80px; border-radius: 15%; object-fit: cover; border: 2px solid #ccc; cursor: pointer;" 
     alt="Profile Pic">
    <h3><?php echo htmlspecialchars($full_name ?: $username); ?></h3>
    <p>@<?php echo htmlspecialchars($username); ?></p>
          </div>
        </div>
      
        <div class="podcast-box">
  <h4>Podcasts</h4>
  <ul>
    <li><a href="podcast.html">BloomTalk #1: Launching Bloom</a></li>
    <li><a href="podcast.html">Tech & Talk: AI in Social Media</a></li>
    <li><a href="podcast.html">Real Users: Building a Community</a></li>
  </ul>
</div>
      </aside>
      
    
      <div class="center-content">
        <section class="post-section">
          <div class="post-box">
          <img src="<?php echo htmlspecialchars($profile_pic); ?>" style = "border-radius: 15%; object-fit: cover; border: 2px solid #ccc; cursor: pointer;"  alt="Profile" class="post-profile-pic" />
          <textarea placeholder="What's blooming?" class="post-input" id="postInput"></textarea>
          </div>
      
          <div class="post-controls">
            <div class="post-actions-icons-left">
              <label for="postImage">
                <box-icon name="image-add" id="image-icon"></box-icon>
              </label>
              <input type="file" id="postImage" accept="image/*" style="display: none;" />
            </div>
      
            <div class="post-actions-right">
              <button class="post-btn" id="postBtn">Blossom</button>
            </div>
          </div>
        </section>
      
        <section class="feed-section" id="feed">
          <!-- Dynamic posts   here -->

        </section>
      </div>
      

    <aside class="right-panel">
    <div class="trends-box">
  <h4>Trends</h4>
  <ul>
    <li><a href="#">#BloomSeason</a></li>
    <li><a href="#">#AIin2025</a></li>
    <li><a href="#">#OpenDesign</a></li>
    <li><a href="#">#TechTalk</a></li>
  </ul>
</div>

    
<div class="who-box" style="gap: 5px;">
  <h4>Who to follow</h4>
  <div class="follow-suggestion">
  <img src="assets/Bloom.png" class="lp" style="  width: 45px;
  height: 45px;
  background: palevioletred;
  border-radius: 15%;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;"/> 
  <div class="follow-info">
      <strong>@techguru</strong>
      <p>Tech Analyst | AI Enthusiast</p>
    </div>
    <button class="follow-btn" style="background: palevioletred; cursor: pointer;">Follow</button>
  </div>
  <div class="follow-suggestion">
  <img src="assets/download (1).png" class="lp" style="  width: 45px;
  height: 45px;
  background: palevioletred;
  border-radius: 15%;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;"/>     <div class="follow-info">
      <strong>@creativeBloom</strong>
      <p>Design & UX</p>
    </div>
    <button class="follow-btn" style="background: palevioletred; cursor: pointer;" >Follow</button>
  </div>
</div>

    
      <div class="terms-box">
        <p class="policy">
          © Pietech. All rights reserved.<br>
          <a href="">Terms Of Service |</a>
          <a href=""> Privacy Policy |</a>
          <a href=""> Cookies Policy |</a>
          <a href=""> Community Guidelines.</a>
        </p>
      </div>
    </aside>
    
<div id="commentPopup" class="comment-popup hidden">
  <div class="popup-content">
    <span class="close-btn">&times;</span>
    <div class="popup-header">
      <img src="" alt="User" class="popup-profile-pic" />
      <strong class="popup-user-name"></strong>
      <span class="popup-user-handle"></span>
    </div>
    <p class="popup-post-text"></p>
    <div class="comments-section">
      
    </div>
    <div class="comment-input-section">
  <img src="<?php echo htmlspecialchars($profile_pic); ?>" class="comment-profile-pic" />
  <input type="text" id="newComment" placeholder="Write a comment..." />
  <button id="submitComment">Comment</button>
</div>
  </div>
</div>

<iframe
  id="chat-popup"
  src="/build/index.html"
  style="display: none; position: fixed; bottom: 20px; right: 20px; width: 400px; height: 550px; border: 2px solid red; border-radius: 12px; z-index: 9999;">
</iframe>
  <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
  <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons.js"></script>

  <script>
const currentUser = {
  id: <?php echo json_encode($_SESSION['user_id']); ?>,
  name: "<?php echo htmlspecialchars($_SESSION['fname'] . ' ' . $_SESSION['lname']); ?>",
  handle: "@<?php echo htmlspecialchars($_SESSION['username']); ?>",
  profilePic: "<?php echo htmlspecialchars($_SESSION['profile_pic'] ?? 'assets/profileUser.png'); ?>"
};

</script>

<script src="js/postInteractions.js"></script>
<script src="js/postActions.js"></script>
<script src="js/toggleForms.js"></script>
<script src="js/chat-toggle.js"></script>
<script src="js/script.js"></script>
<script src="js/homeposts.js"></script>


</body>
</html>
