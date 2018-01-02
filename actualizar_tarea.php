<?php
	if($_POST == null)
	{
		http_response_code(404);
		include('404.html'); 
		die();
	}
	$con = mysqli_connect('localhost','root','','degustabox');
	
	$sql = "UPDATE trabaja SET tiempo_tarea = '".$_POST["tiempo"]."', fecha_hora_inicio = '' ".
			" WHERE fecha_tarea = '".$_POST["fecha"]."' and id_usuario = '".$_POST["usuario"]."' and id_tarea = '".$_POST["tarea"]."' ";
	
	if ($con->query($sql) === TRUE) 
	{
		echo "ok";
	} 
	else 
	{
		echo "Error updating record: " . $con->error;
	}