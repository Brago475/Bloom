<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['banner_pic'])) {
    $user_id = $_SESSION['user_id'];
    $upload_dir = 'uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $file_tmp = $_FILES['banner_pic']['tmp_name'];
    $file_name = $user_id . "_banner_" . time() . "_" . basename($_FILES['banner_pic']['name']);
    $file_path = $upload_dir . $file_name;

    if (move_uploaded_file($file_tmp, $file_path)) {
        
        $stmt = $conn->prepare("UPDATE users SET banner_pic = ? WHERE user_id = ?");
        $stmt->bind_param("si", $file_path, $user_id);

        if ($stmt->execute()) {
            $_SESSION['banner_pic'] = $file_path; 
            echo "Banner upload successful!";
        } else {
            echo "Database update failed: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Banner upload failed.";
    }

    $conn->close();
}
?>
