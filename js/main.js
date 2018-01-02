var interval;
var seconds = 0;
var mins = 0;
var hours = 0;
$(document).on('click','#boton_crear_tarea', function() {
	if($("#nombre_nueva_tarea").val() == "")
	{
		alert("No se puede crear una tarea vacía");
	}
	else
	{
		$.ajax({
			url: get_url_web()+'insertar_tarea.php',
			type: 'POST',
			data: 
			{ 
				nombre_tarea: $("#nombre_nueva_tarea").val()
			},
			dataType:"json",
			success: function (response) {
				if(response.status == "existe")
				{
					alert("Task name already exists")
				}
				else
				{
					$('#listado_tareas select').append($('<option>', {value: response.new_id,text: $("#nombre_nueva_tarea").val()}));
					alert("Task created");
				}
			}
		});
	}
});

$(document).on('click','#boton_iniciar_tarea', function() {
	clearInterval(interval);
	$.ajax({
		url: get_url_web()+'iniciar_tarea.php',
		type: 'POST',
		data: 
		{ 
			usuario: $("#selector_usuario select").val(),
			fecha: $("#selector_fecha input").val(),
			tarea: $("#listado_tareas select").val()
		},
		dataType:"json",
		success: function (response) {
			if(response.status == "tarea_ya_iniciada")
			{
				debugger;
				var array_tiempo = response.tiempo_tarea.split(":");
				//hacer el calculo entre la fecha y hora actual y establecer las variables a ese y ya copiar el intervalo
				seconds = array_tiempo[2];
				mins = array_tiempo[1];
				hours = array_tiempo[0];
				interval = setInterval(function() {
					var now = new Date().getTime();
					seconds++;
					if(seconds > 59) 
					{
						mins++;
						seconds = 0;
					}
					if(mins > 59)
					{
						hours++;
						mins = 0;
					}
					$("#horas_tarea").html(hours);
					$("#minutos_tarea").html(mins);
					$("#segundos_tarea").html(seconds);
				}, 1000);
			}
			else
			{
				seconds = 0;
				mins = 0;
				hours = 0;
				interval = setInterval(function() {
					var now = new Date().getTime();
					seconds++;
					if(seconds > 59) 
					{
						mins++;
						seconds = 0;
					}
					if(mins > 59)
					{
						hours++;
						mins = 0;
					}
					$("#horas_tarea").html(hours);
					$("#minutos_tarea").html(mins);
					$("#segundos_tarea").html(seconds);
				}, 1000);
			}
		}
	});
});

$(document).on('click','#boton_pausar_tarea', function() {
	
});

$(document).on('change','#selector_fecha input', function() {
	if ($("#selector_usuario select").val() == "")
	{
		alert("You must select a user");
		$("#contenedor_tareas").html("");
		return;
	}
	$.ajax({
		url: get_url_web()+'get_tareas.php',
		type: 'POST',
		data: 
		{ 
			usuario: $("#selector_usuario select").val(),
			fecha: $("#selector_fecha input").val()
		},
		success: function (response) {
			$("#contenedor_tareas").html(response);
		}
	});
});

$(document).on('change','#selector_usuario select', function() {
	if ($("#selector_usuario select").val() == "")
	{
		alert("You must select a user");
		$("#contenedor_tareas").html("");
		return;
	}
	$.ajax({
		url: get_url_web()+'get_tareas.php',
		type: 'POST',
		data: 
		{ 
			usuario: $("#selector_usuario select").val(),
			fecha: $("#selector_fecha input").val()
		},
		success: function (response) {
			$("#contenedor_tareas").html(response);
		}
	});
	
	$.ajax({
		url: get_url_web()+'tarea_en_curso.php',
		type: 'POST',
		data: 
		{ 
			usuario: $("#selector_usuario select").val(),
			fecha: $("#selector_fecha input").val()
		},
		dataType:"json",
		success: function (response) {
			if(response.status == "tarea_en_curso")
			{
				
			}
		}
	});
});

function get_url_web ()
{
	var url = window.location.href;
	return url;
}