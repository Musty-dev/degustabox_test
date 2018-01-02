var interval;
var seconds = 0;
var mins = 0;
var hours = 0;
$(document).on('click','#boton_crear_tarea', function() {
	if($("#nombre_nueva_tarea").val() == "")
	{
		alert("Cannot create empty task");
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
					$("nombre_nueva_tarea").val("");
				}
			}
		});
	}
});

$(document).on('click','#boton_crear_usuario', function() {
	if($("#nombre_nuevo_usuario").val() == "")
	{
		alert("Cannot create empty user");
	}
	else
	{
		$.ajax({
			url: get_url_web()+'insertar_usuario.php',
			type: 'POST',
			data: 
			{ 
				nombre_usuario: $("#nombre_nuevo_usuario").val()
			},
			dataType:"json",
			success: function (response) {
				if(response.status == "existe")
				{
					alert("User name already exists")
				}
				else
				{
					$('#selector_usuario select').append($('<option>', {value: response.new_id,text: $("#nombre_nuevo_usuario").val()}));
					alert("User created");
					$("nombre_nuevo_usuario").val("");
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
			$("#tiempo_tareas").removeClass("oculto");
			$("#id_tarea_actual").html($("#listado_tareas select").val());
			$("#nombre_tarea_actual").find('option:selected').text();
			if(response.status == "tarea_ya_iniciada")
			{
				var array_tiempo = response.tiempo_tarea.split(":");
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
	$.ajax({
		url: get_url_web()+'actualizar_tarea.php',
		type: 'POST',
		data: 
		{ 
			usuario: $("#selector_usuario select").val(),
			fecha: $("#selector_fecha input").val(),
			tarea: $("#listado_tareas select").val()
		},
		dataType:"json",
		success: function (response) {
			clearInterval(interval);
			$("#tiempo_tareas").addClass("oculto");
		}
	});
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
		async:false,
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
		async:false,
		dataType:"json",
		success: function (response) {
			if(response.status == "tarea_en_curso")
			{
				debugger;
				//hacer el calculo entre la fecha y hora actual y establecer las variables a ese y ya copiar el intervalo
				var array_tiempo = response.tiempo_tarea.split(":");
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
		}
	});
});

function get_url_web ()
{
	var url = window.location.href;
	return url;
}