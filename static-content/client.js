// See the JQuery documentation at ...
// http://api.jquery.com/
// http://learn.jquery.com/
// See my JQuery and Ajax notes

var username = "John";
var pwd = "Doe";

function login(){
	// verify credentials
	$.ajax({
		method: "GET",
		url: "/api/ftd/"+$("#username").val()+"/"+$("#pwd").val()+"/"
	}).done(function(data){
		console.log("Got back:"+JSON.stringify(data));
		console.log(data);
		if("error" in data){ 
		}
		else { 
			username = data["username"].username;
			pwd = data["password"].password;
			console.log(username, pwd);
			setupGame();
			startGame();
			setInterval(beginCircle, 2000);
			$("#ui_login").hide();
			$("#ui_registration").hide();
			$("#ui_memberManagement").hide();
			$("#ui_game").show();
		 }
	}).fail(function(err){
		console.log(err.status);
		console.log(JSON.stringify(err.responseJSON));
		var errors = "";
		console.log(err.responseText);
		$("#loginErrors").html(err.responseText); 
	});
}


function showProfile(){
	// verify credentials
	// $.ajax({ 
	// 	method: "GET", 
	// 	url: "/api/ftd/"+"John"+"/"+"DOE"+"/"
	// }).done(function(data){
	// 	console.log("Got back:"+JSON.stringify(data));
	// 	if("error" in data){ 
	// 		console.log(data["error"]);
	// 		var errors = "";
	// 		for(i=0;i<data["error"].length;i++){
	// 			errors += "<br/>"+data["error"];
	// 		}
	// 		$("#loginErrors").html(errors); 
	// 	}
	// 	else { 
			// console.log(username + " " + pwd);
			// $("#updateUsername").val() = data["username"].username;
			// $("#updatePwd").val() = data["password"].password;
			$("#ui_memberManagement").show();
			$("#ui_game").hide(); 
			pauseGame();
	// 	 }
	// });
}


// Request all counters from the server
function retrieveAll(){
	// For a completely restful api, we would need to send some king of authentication
	// token for each request. A simple trivial one is sending the user and password
	// an alternative is to send something hashed with the user and password
	$.ajax({
		method: "GET",
		url: "/api/ftd/"
	}).done(function(data){
		console.log(JSON.stringify(data));
	});
}

// add a counter new counter
function create(){
	$.ajax({
		method: "PUT",
		url: "/api/ftd/"+$("#createUsername").val()+"/"+$("#createPwd").val()+"/"
	}).done(function(data){
		console.log("Got back:"+JSON.stringify(data));
		if("error" in data){ console.log(data["error"]); }
		else { retrieveAll(); }
	});
}

// increment a counter
function update(){
	$.ajax({
		method: "POST",
		url: "/api/ftd/"+$("#updateUsername").val()+"/",
		data: { username:$("#updateUsername").val(), password: $("#updatePwd").val() }
	}).done(function(data, text_status, jqXHR){
		console.log(JSON.stringify(data));
		console.log(text_status);
		console.log(jqXHR.status);
		retrieveAll();
	}).fail(function(err){
		console.log(err.status);
		console.log(JSON.stringify(err.responseJSON));
	});
}

// This is executed when the document is ready (the DOM for this document is loaded)
$(function(){
	// Setup all events here and display the appropriate UI
	$("#loginSubmit").on('click',function(){ login(); });
	$("#RegistrationSubmit").on('click',function(){ create(); });
	$("#showProfile").on('click',function(){ showProfile(); });
	$("#updateSubmit").on('click',function(){ update(); });

	$("#ui_login").show();
	$("#ui_registeration").show();
	$("#ui_memberManagement").hide();
	$("#ui_game").hide();
});
