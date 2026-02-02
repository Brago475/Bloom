<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require __DIR__ . '/../vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;

session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated.']);
    exit();
}

try {
    $userId = (string)$_SESSION['user_id'];

    $photoURL = $_SESSION['profile_pic'] ?? 'assets/profileUser.png';

    $factory = (new Factory)->withServiceAccount(__DIR__ . '/firebase-service-account.json');
    $auth = $factory->createAuth();

    $customToken = $auth->createCustomToken($userId, [
        'photoURL' => $photoURL
    ]);

    echo json_encode(['token' => $customToken->toString()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to generate Firebase token', 'details' => $e->getMessage()]);
    exit();
}
