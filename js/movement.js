function keydown(event){
	switch(event.keyCode)
	{
	    case 65: left = true; console.log("hey");break;
		case 87: forward = true; break;
		case 68: right = true; break;
		case 83: backward = true; break;

        case 37: pan_left = true; break;
        case 39: pan_right = true; break;
	}
}

function keyup(event){
	switch(event.keyCode)
	{
	    case 65: left = false; break;
		case 87: forward = false; break;
		case 68: right = false; break;
		case 83: backward = false; break;

        case 37: pan_left = false; break;
        case 39: pan_right = false; break;
	}
}