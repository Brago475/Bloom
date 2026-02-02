<?php
session_start();
include 'connect.php';

$user_id = $_SESSION['user_id'];

$new_fname = trim($_POST['new_fname']);
$new_lname = trim($_POST['new_lname']);
$new_username = trim($_POST['new_username']);

if ($new_fname && $new_lname && $new_username) {
    $stmt = $conn->prepare("UPDATE users SET fname = ?, lname = ?, username = ? WHERE user_id = ?");
    $stmt->bind_param("sssi", $new_fname, $new_lname, $new_username, $user_id);

    if ($stmt->execute()) {
        $_SESSION['fname'] = $new_fname;
        $_SESSION['lname'] = $new_lname;
        $_SESSION['username'] = $new_username;
        header("Location: setting.html?updated=true");
    } else {
        echo "Error updating: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
