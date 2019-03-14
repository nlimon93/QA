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
	<!--script src="https://www.google.com/recaptcha/api.js" async defer></script-->
</head>
<body>
<header>
	<!--Generate Login Bar based on login status, Check Viewport size and apply necisary adjustments-->
	<div id="login">
    <?php if (true) : ?>

		<button onclick="document.getElementById('id01').style.display='block'">Login</button>

	<?php endif;?>

    <!--If Logged in, Grant access to new menu options and replace login button with logut-->
    <?php if (false) :?>


        <form action="/function-modules/phplogin/Logout.php" method="POST">
            <input type="hidden" name="user" value="<?php #this user;?>"/>
            <input type="submit" name="logout" value="Logout"/>
        </form>

	<?php endif;?>
    </div>
    <!--The Login Box-->
    <div id="id01" class="modal">
		<span onclick="document.getElementById('id01').style.display='none'" class="close Mspan" title="Close Modal">&times;</span>
		<form class="modal-content Mform animate" action="/qna/function-modules/phplogin/loginAttempt.php" method="post">
			<div class="container">
				<label for="uname"><b>Username</b></label>
				<input type="text" class="Minput" placeholder="Enter Username" name="uname" required>
				<label for="psw"><b>Password</b></label>
				<input type="password" class="Minput" placeholder="Enter Password" name="psw" required>
				<button class="Mbutton" type="submit">Login</button>
				<div class="container" style="background-color:$f1f1f1">
                	<button class="Mbutton" type="button">Register</button>
           		</div>
				<!--div class="g-recaptcha" data-sitekey="your_site_key"></div-->
				<br>
				<br>
				<label>
					<input type="checkbox" checked="checked" name="remember"> Remember Me
				</label>
			</div>
			<div class="container " style="background-color:$f1f1f1">
				<button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">cancel</button>
				<span class="psw Mspan">Forgot <a href="#">password?</a></span>
            </div>
            <!--Close Login Screen open Registrar Screen-->
		</form>
	</div>
    <!---->
</header>