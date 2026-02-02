<?php
session_start();

header('Content-Type: application/json');

// Only allow authenticated users
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

// Get raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate and store
if (isset($data['photoURL'])) {
    $_SESSION['firebase_photo'] = $data['photoURL'];
    echo json_encode(['success' => true]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Missing photoURL']);
}
?>
