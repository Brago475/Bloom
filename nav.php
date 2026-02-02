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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="styles/style.css" />
    <link rel="stylesheet" href="styles/style2.css" />
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
          <a href="features.html" class="nav-icon"><box-icon name='bell'></box-icon>Notifications</a>
          <a href="about.html" class="nav-icon"><box-icon name='message'></box-icon>Messages</a>
          <a href="articles.html" class="nav-icon"><box-icon name='microphone'></box-icon>Podcast</a>
      
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
        
            <a href="profile.html" class="sub-menu-link">
              <div class="link-left">
                <ion-icon name="create-sharp"></ion-icon>
                <p>Edit Profile</p>
              </div>
              <div class="link-right">
                <span>></span>
              </div>
            </a>
        
            <a href="setting.html" class="sub-menu-link">
              <div class="link-left">
                <ion-icon name="settings-sharp"></ion-icon>
                <p>Setting & Privacy</p>
              </div>
              <div class="link-right">
                <span>></span>
              </div>
            </a>
        
            <a href="support.html" class="sub-menu-link">
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
    



        <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
        <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons.js"></script>
      
        <script>
      const currentUser = {
        name: "<?php echo htmlspecialchars($_SESSION['fname'] . ' ' . $_SESSION['lname']); ?>",
        handle: "@<?php echo htmlspecialchars($_SESSION['username']); ?>",
        profilePic: "<?php echo htmlspecialchars($_SESSION['profile_pic'] ?? 'assets/profileUser.png'); ?>"
      };
      </script>
      
      
      <script src="js/postInteractions.js"></script>
      <script src="js/postActions.js"></script>
      <script src="js/toggleForms.js"></script>
      <script src="js/script.js"></script>
</body>
</html>