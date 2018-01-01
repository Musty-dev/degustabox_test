var interval;
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
			tarea: $("#selector_tarea select").val()
		},
		dataType:"json",
		success: function (response) {
			debugger;
			if(response.status == "tarea_ya_iniciada")
			{
				
			}
			else
			{
				
			}
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