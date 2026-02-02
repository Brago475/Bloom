<?php
session_start();
include 'connect.php';

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("DELETE FROM users WHERE user_id = ?");
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    session_destroy();
    header("Location: goodbye.html");
} else {
    echo "Account deletion failed: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
