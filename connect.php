<?php
$servername = "localhost";
$username = "Central_46"; 
$password = "Goat!"; 
$dbname = "pietech_bloom2"; 

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
