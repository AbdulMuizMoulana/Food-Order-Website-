<?php
// orderform.php

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sizzle_spice";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$errors = []; // Array to store validation errors

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $tableNumber = $_POST['tableNumber'];
    $deliveryTime = $_POST['deliveryTime'];
    $paymentMethod = $_POST['paymentMethod'];
    $notes = $_POST['notes'];

    // Validate required fields
    if (empty($name) || empty($phone) || empty($tableNumber) || empty($deliveryTime) || empty($paymentMethod)) {
        $errors[] = "All required fields must be filled out.";
    } else {
        // Prepare an SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO orders (name, phone, email, table_number, delivery_time, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssisss", $name, $phone, $email, $tableNumber, $deliveryTime, $paymentMethod, $notes);

        // Execute the statement
        if ($stmt->execute()) {
            header("Location: orderform-response.html"); // Redirect to the response page
            exit();
        } else {
            echo 'Error: ' . $stmt->error; // Send error response
        }

        // Close the statement
        $stmt->close();
    }
}

// Close the connection
$conn->close();
?>
