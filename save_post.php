<?php
session_start();
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $content = $_POST['content'] ?? '';
    $user_id = $_SESSION['user_id'];
    $image_url = ''; 

    if (!$content) {
        echo json_encode(['success' => false, 'error' => 'Empty post content.']);
        exit;
    }

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imageTmpName = $_FILES['image']['tmp_name'];
        $imageName = $_FILES['image']['name'];
        $imagePath = 'uploads/' . time() . '_' . basename($imageName);

        if (move_uploaded_file($imageTmpName, $imagePath)) {
            $image_url = $imagePath; 
        } else {
            echo json_encode(['success' => false, 'error' => 'Image upload failed.']);
            exit;
        }
    }

    $post_id = time() . rand(1000, 9999); 
    $stmt = $conn->prepare("INSERT INTO posts (post_id, content, image_url, user_id) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("issi", $post_id, $content, $image_url, $user_id);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'content' => $content,
            'image_url' => $image_url,
            'username' => $_SESSION['username'],
            'fname' => $_SESSION['fname'],
            'lname' => $_SESSION['lname'],
            'profile_pic' => $_SESSION['profile_pic'] ?? 'assets/profileUser.png'
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
    

    $stmt->close();
    $conn->close();
}
?>
