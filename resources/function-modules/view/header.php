<?php session_start();?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="/qna/resources/Stylesheets/main.css">
	<link rel="stylesheet" href="/qna/resources/Stylesheets/login.css">
	<link rel="stylesheet" href="local.css">
	<script src="/qna/resources/javascript/main.js" type="text/javascript" async="true"></script>
	<!--script src="https://www.google.com/recaptcha/api.js" async defer></script-->
</head>
<body>
<header>
	<!--Generate Login Bar based on login status, Check Viewport size and apply necisary adjustments-->
	<div id="login">
    <?php if (array_key_exists('loggedin', $_SESSION) == false) : ?>

		<button onclick="document.getElementById('logform').style.display='block'" class="raised">Login</button>

	<?php endif;?>

    <!--If Logged in, Grant access to new menu options and replace login button with logut-->
    <?php if (array_key_exists('loggedin', $_SESSION)) :?>

        <form action="/function-modules/phplogin/Logout.php" method="POST">
            <input type="hidden" name="user" value="<?php echo $_SESSION['username'];?>"/>
            <input type="submit" name="logout" value="Logout"/>
        </form>

	<?php endif;?>
    </div>
    <!--The Login Box-->
    <div id="logform" class="modal">
		<span onclick="document.getElementById('logform').style.display='none'" class="close Mspan" title="Close Modal">&times;</span>
		<form class="modal-content Mform animate" action="/qna/function-modules/phplogin/loginAttempt.php" method="post">
			<div class="container">
				<input type="hidden" id="regswitch" name="register" value="false">
				<label for="email" class="register" style="display:none">Email</label>
				<input type="email" id="regemail" class="Minput register" style="display:none" placeholder="example@example.com" name="email">
				<label for="uname"><b>Username</b></label>
				<input type="text" class="Minput" placeholder="Enter Username" name="uname" required>
				<label for="psw"><b>Password</b></label>
				<input type="password" class="Minput" placeholder="Enter Password" name="psw" required>
				<label for="rpsw" class="register" id="regpswconf" style="display:none"><b>Confirm Password</b></label>
				<input type="password" id="retypepsw" class="Minput register" style="display:none" placeholder="Enter Password" name="rpsw">
				<button class="Mbutton login" type="submit">Login</button>
				<button class="Mbutton register" style="display:none" type="submit">Register</button>
                <button class="Mbutton login" onclick="adjustFormToRegister()" type="button">Register?</button>
				<button class="Mbutton register" onclick="adjustFormToLogin()" style="display:none" type="button">Login?</button>
				<!--div class="g-recaptcha" data-sitekey="your_site_key"></div-->
				<br>
				<br>
				<label>
					<input type="checkbox" checked="checked" name="remember"> Remember Me
				</label>
			</div>
			<div class="container " style="background-color:$f1f1f1">
				<button type="button" onclick="document.getElementById('logform').style.display='none'" class="cancelbtn">cancel</button>
				<span class="psw Mspan login">Forgot <a href="#">password?</a></span>
            </div>
            <!--Close Login Screen open Registrar Screen-->
		</form>
	</div>
    <!---->
</header>