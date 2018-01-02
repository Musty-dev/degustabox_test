<?php
	if($_POST == null)
	{
		http_response_code(404);
		include('404.html'); 
		die();
	}
	
	