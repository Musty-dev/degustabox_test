<?php
	if($_POST == null)
	{
		http_response_code(404);
		include('404.html'); 
		die();
	}
	$con = mysqli_connect('localhost','root','','degustabox');
	$usuario_seleccionado = $_POST["usuario"];
	$fecha_seleccionada = $_POST["fecha"];
	$sql = "select tareas.nombre as nombre_tarea, trabaja.tiempo_tarea as tiempo_tarea, trabaja.fecha_hora_inicio as fecha_inicio_tarea ".
			"from usuarios ".
			"inner join trabaja on usuarios.id_usuario = trabaja.id_usuario ".
			"inner join tareas on trabaja.id_tarea = tareas.id_tarea ".
			"where usuarios.nombre = '".$usuario_seleccionado."' ".
			"and trabaja.fecha_tarea = '".$fecha_seleccionada."' ".
			"and trabaja.fecha_hora_inicio <> '' ";
	$result = mysqli_query($con,$sql);
	if ($result->num_rows == 0)
	{
		$data = array('status' => 'no_tarea');
		echo json_encode($data);
		die();
	}
	
	$row = mysqli_fetch_assoc($result);
	$data = array('status' => 'tarea_en_curso','tiempo_tarea' => $row["tiempo_tarea"], 'fecha_inicio_tarea' => $row["fecha_inicio_tarea"]);
	echo json_encode($data);
	