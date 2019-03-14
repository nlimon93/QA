<?php
    session_start();
    include_once 'psl-config.php';

    #Initialize login database connection from configuration
    $MYSQLi = new mysqli(HOST,USER,PASSWORD,DATABASE);

    if ($MYSQLi->connect_errno) {
        printf("Connection Failed: $s\n", $MYSQLi->connect_error);
        die('Failed To Connect, Terminating Script');
    }

    if ( !isset($_POST['uname'], $_POST['psw'])){
        # No Reason for this script to run
        die('No Username or Password'.$_POST['uname'].$_POST['psw']);
    }
    # if () { LOGIN ATTEMPT CHECK
    if($statement = $MYSQLi->prepare('SELECT id, password FROM accounts WHERE username = ?')){
        $statement->bind_param('s', $_POST['uname']);
        $statement->execute();
        $statement->store_result();
        if ($statement->num_rows > 0) {
            $statement->bind_result($id, $password);
            $statement->fetch();

            if(password_verify($_POST['psw'], $password)) {
                
                session_regenerate_id();
                $_SESSION['loggedin'] = TRUE;
                $_SESSION['name'] = $_POST['uname'];
                $_SESSION['id'] = $id;
                echo 'Login Successful';
                header('index.php');
            }
            else if ($_POST['psw'] == $password) {
                #Remove when encryption enabled
                session_regenerate_id();
                $_SESSION['loggedin'] = TRUE;
                $_SESSION['name'] = $_POST['uname'];
                $_SESSION['id'] = $id;
                echo 'Login Successful';
                header('index.php');
            }
            else{
                echo 'Incorrect Login Information ID:PASSWORD(REMOVE ID BIT ON RELEASE)';
                echo $_POST['uname']." ".$_POST['psw'];
                #trigger login attempt strike
            }
        }
        else {
            echo 'Incorrect Login Information ID:USER(REMOVE ID BIT ON RELEASE)';
            echo $_POST['uname']." ".$_POST['psw'];
            echo "info output:".$MYSQLi->info;
            #trigger login attempt strike
        }
    }
    #} LOGIN ATTEMPT CHECK


?>