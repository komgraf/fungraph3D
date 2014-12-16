$(document).ready( function() {
	init();/*
	$(document).scroll( function() {
		if( $(document).scrollTop() >= 275 )
			$('#super-header').slideDown(200);
		else
			$('#super-header').slideUp(200);
	} );*/
} );

function init() {
	//var axes3D = new Axes3D( new THREE.WebGLRenderer( {	antialias: true } ) );
	/*
	var object3D = new Object3D( "#A00", false, scene );
	var box, sphere;
	/*
	for( ;; )
		axes3D.animate();*/
	
	$('#function-1').hide();
	$('#function-2').hide();
	$('#function-3').hide();
	
	$('#gaweKotak').click( function() {
		createCube( $('#length').val(), $('#r').val(), $('#g').val(), $('#b').val(), $('#x').val(), $('#y').val(), $('#z').val() );
	} );
	
	$('#gaweBal').click( function() {
		createSphere( $('#length').val(), $('#r').val(), $('#g').val(), $('#b').val(), $('#x').val(), $('#y').val(), $('#z').val() );
	} );
	
	$('#rKotak').click( function() {
		rotateCube( $('#rx').val(), $('#ry').val(), $('#rz').val() );
	} );
	
	$('#rBal').click( function() {
		rotateSphere( $('#rx').val(), $('#ry').val(), $('#rz').val() );
	} );
	
	$('#tKotak').click( function() {
		translateCube( $('#tx').val(), $('#ty').val(), $('#tz').val() );
	} );
	
	$('#tBal').click( function() {
		translateSphere( $('#tx').val(), $('#ty').val(), $('#tz').val() );
	} );
	
	$('#sKotak').click( function() {
		scaleCube( $('#scale').val() );
	} );
	
	$('#sBal').click( function() {
		scaleSphere( $('#scale').val() );
	} );
	
	$('#reset').click( function() {
		clear();
	} );
	
	$('#control-function-1').click( function() {
		tampilkan( $('#function-1') );
	} );
	
	$('#control-function-2').click( function() {
		tampilkan( $('#function-2') );
	} );
	
	$('#control-function-3').click( function() {
		tampilkan( $('#function-3') );
	} );
	
	/*
	var tKotak = $('#tKotak');
	tKotak.onclick = function() {
		translateCube( $('#tx').val(), $('#ty').val(), $('#tz').val() );
		//alert( $('#tx').val() +" "+ $('#ty').val() +" "+ $('#tz').val() );
		//translateCube( 0, 0, -20 );
	}*/
}

var activeFuu;
function tampilkan( myFuu ) {
	if( activeFuu!=null ) {
		if( activeFuu.attr('id')===myFuu.attr('id') )
			return;
		activeFuu.slideToggle(400);
	}
	activeFuu = myFuu;
	activeFuu.slideToggle(400);
	//alert("masuuuk");
}
/*
function get(id) {
	return document.getElementById(id);
}*/