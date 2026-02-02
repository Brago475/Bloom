<?php
session_start();
include 'connect.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

$result = $conn->query("
    SELECT posts.*, users.username, users.profile_pic 
    FROM posts 
    JOIN users ON posts.user_id = users.user_id 
    ORDER BY created_at DESC
");

$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

echo json_encode($posts);
?>
