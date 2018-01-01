<?php 
	$con = mysqli_connect('localhost','root','','degustabox');
	
?>
<html>
	<head>
		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/main.js"></script>
		<link rel="stylesheet" type="text/css" href="css/main.css">
	</head>
	<body>
		<div id="contenedor_web">
			<div id="selector_usuario">
				<span>Select user: </span>
				<select>
					<option value=""></option>
					<?php 
						$sql = "SELECT * FROM usuarios";
						$result = mysqli_query($con,$sql);
						while($row = mysqli_fetch_array($result)) 
						{
							echo "<option value='".$row['nombre']."'>".$row['nombre']."</option>";
						}
					?>	
				</select>
			</div>
			<div id="selector_fecha">
				<span>Select date: </span>
				<input type="date" value="<?php echo date('Y-m-d'); ?>" />
			</div>
			<div id="selector_tarea">
				<div id="crear_tareas">
					<span>Create task: </span>
					<input id="nombre_nueva_tarea" />
					<button id="boton_crear_tarea" type="button">Create new task</button>
				</div>
				<div id="listado_tareas">
					<span>Select task</span>
					<select>
						<option value=""></option>
						<?php 
							$sql = "SELECT * FROM tareas";
							$result = mysqli_query($con,$sql);
							while($row = mysqli_fetch_array($result)) 
							{
								echo "<option value='".$row['id_tarea']."'>".$row['nombre']."</option>";
							}
						?>	
					</select>
					<button id="boton_iniciar_tarea" type="button">Init task</button>
				</div>
			</div>
			<div id="tiempo_tareas">
				<span>Task list </span>
				<div id="contenedor_tareas">
				</div>
			</div>
		</div>
		
	</body>
</html>