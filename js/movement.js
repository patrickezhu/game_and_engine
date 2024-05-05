function keydown(event){
	switch(event.keyCode)
	{
		case 87: forward = true; break;
		case 83: backward = true; break;
	    case 65: left = true; break;
		case 68: right = true; break;

		case 38: pan_up = true; break;
		case 40: pan_down = true; break;
        case 37: pan_left = true; break;
        case 39: pan_right = true; break;
	}
}

function keyup(event){
	switch(event.keyCode)
	{
		case 87: forward = false; break;
		case 83: backward = false; break;
	    case 65: left = false; break;
		case 68: right = false; break;

		case 38: pan_up = false; break;
		case 40: pan_down = false; break;
        case 37: pan_left = false; break;
        case 39: pan_right = false; break;
	}
}