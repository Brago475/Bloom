<?php
session_start();
include 'connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$post_id = (int)$data['post_id'];
$content = $data['content'];
$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("UPDATE posts SET content = ? WHERE id = ? AND user_id = ?");
$stmt->bind_param("sii", $content, $post_id, $user_id);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
?>
