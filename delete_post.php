<?php
session_start();
include 'connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$post_id = (int)$data['post_id'];
$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("DELETE FROM posts WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $post_id, $user_id);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
?>
