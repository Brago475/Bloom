<?php
session_start();
include 'connect.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

$result = $conn->query("
SELECT posts.content, posts.image_url, users.username, users.profile_pic
FROM posts
JOIN users ON posts.user_id = users.user_id
ORDER BY posts.created_at DESC

");

$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

header('Content-Type: application/json');
echo json_encode($posts);
?>
