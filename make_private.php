<?php
session_start();
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = $_SESSION['user_id'];
    $post_id = $data['post_id'];

    $stmt = $conn->prepare("UPDATE posts SET is_private = 1 WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $post_id, $user_id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
}
?>