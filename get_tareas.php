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
	$sql = "select tareas.nombre as nombre_tarea, trabaja.tiempo_tarea as tiempo_tarea ".
			"from usuarios ".
			"inner join trabaja on usuarios.id_usuario = trabaja.id_usuario ".
			"inner join tareas on trabaja.id_tarea = tareas.id_tarea ".
			"where usuarios.id_usuario = '".$usuario_seleccionado."' ".
			"and trabaja.fecha_tarea = '".$fecha_seleccionada."' ";
	$total_time = "00:00";
	$result = mysqli_query($con,$sql);
?>
<table>
	<tr>
		<th>Task</th>
		<th>Time</th>
	</tr>
	<?php
		while($row = mysqli_fetch_array($result)) 
		{
	?>
			<tr>
				<td>
					<?php echo $row["nombre_tarea"]; ?>
				</td>
				<td>
					<?php 
						$array_actual_time = explode(":", $row["tiempo_tarea"]);
						$actual_hours = $array_actual_time[0];
						$actual_mins = $array_actual_time[1];
						echo $actual_hours."h ".$actual_mins." min";  
					?>
				</td>
			</tr>
	<?php 
			$array_total_time = explode(":", $total_time);
			$sum_mins = $actual_mins + $array_total_time[1];
			$sum_hours = $actual_hours + $array_total_time[0];
			if($sum_mins>59)
			{
				$sum_hours-=60;
				$sum_hours+=1;
			}
			$total_time = $sum_hours.":".$sum_mins;
		}
	?>
	<tr>
		<td>Total: </td>
		<td><?php $array_total_time = explode(":", $total_time); echo $array_total_time[0]."h ".$array_total_time[1]." min";   ?></td>
	</tr>
</table>
	