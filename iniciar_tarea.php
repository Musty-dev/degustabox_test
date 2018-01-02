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
	$tarea_seleccionada = $_POST["tarea"];
	$sql = "select tareas.nombre as nombre_tarea, trabaja.tiempo_tarea as tiempo_tarea, trabaja.fecha_hora_inicio as fecha_inicio_tarea ".
			"from usuarios ".
			"inner join trabaja on usuarios.id_usuario = trabaja.id_usuario ".
			"inner join tareas on trabaja.id_tarea = tareas.id_tarea ".
			"where usuarios.id_usuario = '".$usuario_seleccionado."' ".
			"and trabaja.fecha_tarea = '".$fecha_seleccionada."' ".
			"and tareas.id_tarea = '".$tarea_seleccionada."' ".
			"and trabaja.fecha_hora_inicio <> '' ";
	$result = mysqli_query($con,$sql);
	if ($result->num_rows == 0)
	{
		
		$sql_insert = "INSERT INTO trabaja (id_trabaja, id_usuario,id_tarea,fecha_tarea,fecha_hora_inicio,tiempo_tarea) ".
					" VALUES (NULL, '".$usuario_seleccionado."','".$tarea_seleccionada."','".date('Y-m-d')."','".date('Y-m-d H:i:s')."','00:00:00')";
		$result = mysqli_query($con,$sql_insert);
		$data = array('status' => 'tarea_creada');
		echo json_encode($data);
		die();
	}
	
	$row = mysqli_fetch_assoc($result);
	$data = array('status' => 'tarea_ya_iniciada','tiempo_tarea' => $row["tiempo_tarea"], 'fecha_inicio_tarea' => $row["fecha_inicio_tarea"]);
	echo json_encode($data);