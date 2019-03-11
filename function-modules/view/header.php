<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="resources/Stylesheets/main.css">
	<link rel="stylesheet" href="resources/Stylesheets/login.css">
	<script src="resources/javascript/main.js" type="text/javascript" async="true"></script>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body>
<header>
    <!--Generate Login Bar based on login status, Check Viewport size and apply necisary adjustments-->
    <?php ?>
	<div id="login">
		<button onclick="document.getElementById('id01').style.display='block'">Login</button>
    </div>
    <?php ?>

    <!--If Logged in, Grant access to new menu options and replace login button with logut-->
    <?php ?>

    <div id="login">
        <form action="/function-modules/phplogin/Logout.php" method="POST">
            <input type="hidden" name="user" value="<?php #this user;?>"/>
            <input type="submit" name="logout" value="Logout"/>
        </form>
    </div>
    <?php ?>

    <!--The Login Box-->
    <div id="id01" class="modal">
		<span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
		<form class="modal-content animate" action="/function-modules/phplogin/LoginAttempt.php">
			<div class="container">
				<label for="uname"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="uname" required>
				<label for="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" required>
    			<button type="submit">Login</button>
				<div class="g-recaptcha" data-sitekey="your_site_key"></div>
				<br>
				<br>
				<label>
					<input type="checkbox" checked="checked" name="remember"> Remember Me
				</label>
			</div>
			<div class="container" style="background-color:$f1f1f1">
				<button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">cancel</button>
				<span class="psw">Forgot <a href="#">password?</a></span>
            </div>
            <!--Close Login Screen open Registrar Screen-->
            <div class="container" style="background-color:$f1f1f1">
                <button type="button"></button>
            </div>
		</form>
	</div>
    <!---->
</header>