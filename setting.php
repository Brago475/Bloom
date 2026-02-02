<?php
session_start();
include 'connect.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT email, dob, fname, lname, username FROM users WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Settings | Bloom</title>
  <link rel="stylesheet" href="styles/setting.css">
</head>
<body>
  <div class="sidebar">
    <h2>Settings</h2>
    <ul>
      <li class="active" onclick="showSection('account')">Your Account</li>
      <li onclick="showSection('profile')">Profile Settings</li>
      <li onclick="showSection('bookmarks')">Bookmarks</li>
      <li onclick="showSection('blocked')">Blocked Users</li>
      <li onclick="showSection('help')">Help Center</li>
      <li><a href="index.php" class="back-button">&#8592; Back</a></li>
    </ul>
  </div>

  <div class="settings-content">
    <div id="account" class="settings-section active">
      <h2>Your Account</h2>
      <p>Email: <?php echo htmlspecialchars($user['email']); ?></p>
      <p>Date of Birth: <?php echo htmlspecialchars($user['dob']); ?></p>
      <form action="update_password.php" method="POST" class="upload-form">
        <label>Current Password</label>
        <input type="password" name="current_password" required>
        <label>New Password</label>
        <input type="password" name="new_password" required>
        <button type="submit">Change Password</button>
      </form>
    </div>

    <div id="delete-account" class="settings-section">
      <h2>Danger Zone</h2>
      <form action="delete_account.php" method="POST" class="upload-form">
        <button type="submit" class="btn danger">Delete My Account</button>
      </form>
    </div>

    <div id="profile" class="settings-section">
      <h2>Profile Settings</h2>
      <form action="update_user.php" method="POST" class="upload-form">
        <input type="text" name="new_fname" value="<?php echo htmlspecialchars($user['fname']); ?>" required>
        <input type="text" name="new_lname" value="<?php echo htmlspecialchars($user['lname']); ?>" required>
        <input type="text" name="new_username" value="<?php echo htmlspecialchars($user['username']); ?>" required>
        <button type="submit">Update Info</button>
      </form>
      <form action="upload_pic.php" method="POST" enctype="multipart/form-data" class="upload-form">
        <label>Change Profile Picture</label>
        <input type="file" name="profile_pic" accept="image/*">
        <button type="submit">Upload</button>
      </form>
      <form action="upload_banner.php" method="POST" enctype="multipart/form-data" class="upload-form">
        <label>Change Banner</label>
        <input type="file" name="banner_pic" accept="image/*">
        <button type="submit">Upload</button>
      </form>
    </div>

    <div id="bookmarks" class="settings-section">
      <h2>Bookmarks</h2>
      <p>This section will display bookmarked posts.</p>
    </div>

    <div id="blocked" class="settings-section">
      <h2>Blocked Users</h2>
      <p>You have not blocked anyone yet.</p>
    </div>

    <div id="help" class="settings-section">
      <h2>Help Center</h2>
      <p>Find answers to common questions or contact support.
        or press this link <a href="#">Help and support</a>
      </p>
    </div>
  </div>

  <script>
    function showSection(id) {
      document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');

      document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
      document.querySelector(`.sidebar ul li[onclick*="${id}"]`)?.classList.add('active');
    }
  </script>
</body>
</html>
