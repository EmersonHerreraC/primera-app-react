<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("conexion.php");

if ($conn->connect_error) {
    die("La conexión a la base de datos falló: " . $conn->connect_error);
}

header("Access-Control-Allow-Origin: *");


$dni = $_POST['dni'];
$nombres = $_POST['nombres'];
$apellidos = $_POST['apellidos'];
$sexo = $_POST['sexo'];


$sql = "INSERT INTO react (dni, nombres, apellidos, sexo) VALUES (?, ?, ?, ?)";

// Preparar la consulta
$stmt = $conn->prepare($sql);

// Verificar si la preparación de la consulta fue exitosa
if ($stmt === false) {
    die('Error en la preparación de la consulta: ' . $conexion->error);
}

// Vincular los parámetros y tipos de datos
$stmt->bind_param("ssss", $dni, $nombres, $apellidos, $sexo);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Enviar una respuesta JSON de éxito
    echo json_encode(array('message' => 'Registro exitoso'));
} else {
    // Enviar una respuesta JSON de error
    echo json_encode(array('error' => 'No se pudo insertar el registro. Error: ' . $stmt->error));
}

// Cerrar la declaración preparada y la conexión a la base de datos
$stmt->close();
$conexion->close();
?>
