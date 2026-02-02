<?php
session_start();
include 'connect.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$username || !$password) {
        die("Both fields are required.");
    }

    $stmt = $conn->prepare("SELECT user_id, password, fname, lname, profile_pic, banner_pic FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($user_id, $hashed_password, $fname, $lname, $profile_pic, $banner_pic);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $username;
            $_SESSION['fname'] = $fname;
            $_SESSION['lname'] = $lname;
            $_SESSION['profile_pic'] = $profile_pic ?: 'assets/profileUser.png';
            $_SESSION['banner_pic'] = $banner_pic ?: 'assets/bannerPh.png';

            // Log login event
            $log_stmt = $conn->prepare("INSERT INTO user_logins (user_id, login_time) VALUES (?, NOW())");
            $log_stmt->bind_param("i", $user_id);
            $log_stmt->execute();
            $log_stmt->close();

            header("Location: home.php");
            exit();
        } else {
            die("Invalid password.");
        }
    } else {
        die("No user found with that username.");
    }

    $stmt->close();
}

$conn->close();
?>
