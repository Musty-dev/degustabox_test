<?php
	if($_POST == null)
	{
		http_response_code(404);
		include('404.html'); 
		die();
	}
	
	$con = mysqli_connect('localhost','root','','degustabox');
	
	$sql_select = "select * from tareas where nombre = '".$_POST["nombre_tarea"]."'";
	$result = mysqli_query($con,$sql_select);
	if ($result->num_rows > 0)
	{
		$data = array('status' => 'existe', 'new_id' => 0);
		echo json_encode($data);
		die();
	}
	$sql_insert = "INSERT INTO tareas (id_tarea, nombre) VALUES (NULL, '".$_POST["nombre_tarea"]."');";
	$result = mysqli_query($con,$sql_insert);
	$data = array('status' => 'ok', 'new_id' => mysqli_insert_id($con));
	echo json_encode($data);
	