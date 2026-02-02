<?php

session_start();
include 'connect.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);



if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $fname = trim($_POST['Fname'] ?? '');
    $lname = trim($_POST['Lname'] ?? '');
    $dob = $_POST['DOB'] ?? '';
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone_number = trim($_POST['phone_number'] ?? '');
    $security_question = $_POST['security_question'] ?? '';
    $security_answer = trim($_POST['security_answer'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    
    if (!$fname || !$lname || !$dob || !$username || !$email || !$password || !$confirm_password || !$security_answer) {
        die("All required fields must be filled.");
    }

    if ($password !== $confirm_password) {
        die("Passwords do not match.");
    }

    
    $checkStmt = $conn->prepare("SELECT user_id FROM users WHERE username = ? OR email = ?");
    $checkStmt->bind_param("ss", $username, $email);
    $checkStmt->execute();
    $checkStmt->store_result();
    if ($checkStmt->num_rows > 0) {
        die("Username or Email already exists.");
    }
    $checkStmt->close();


    $hashed_password = password_hash($password, PASSWORD_DEFAULT);


    $user_id = time() . rand(1000, 9999);


    $stmt = $conn->prepare("INSERT INTO users (user_id, fname, lname, dob, username, email, password, secret_question) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssssss", $user_id, $fname, $lname, $dob, $username, $email, $hashed_password, $security_answer);

    if ($stmt->execute()) {
        $_SESSION['user_id'] = $user_id;


        $log_stmt = $conn->prepare("INSERT INTO user_logins (user_id) VALUES (?)");
        $log_stmt->bind_param("i", $user_id);
        $log_stmt->execute();
        $log_stmt->close();
        
        header("Location: home.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
