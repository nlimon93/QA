<?php
    session_start();
    include_once 'psl-config.php';

    #Initialize login database connection from configuration
    $MYSQLi = new mysqli(HOST,USER,PASSWORD,DATABASE);

    if ($MYSQLi->connect_errno) {
        printf("Connection Failed: $s\n", $MYSQLi->connect_error);
        die('Failed To Connet, Terminating Script');
    }

    if ( !isset($_POST['username'], $_POST['password'])){
        # No Reason for this script to run
        die('No Username or Password');
    }

    if($statement = $MYSQLi->prepare('SELECT id, password FROM accounts where username = ?')){
        $statement->bind_param('s', $POST['username']);
        $statement->execute();
        $statement->store_result();
        if ($statement->num_rows > 0) {
            $statement->bind_result($id,$password);
            $statement->fetch();

            if(password_verify($_POST['password'], $password)) {
                
                session_regenerate_id();
                $_SESSION['loggedin'] = TRUE;
                $_SESSION['name'] = $_POST['username'];
                $_SESSION['id'] = $id;
                echo 'Login Successful';
            }
            else {
                echo 'Incorrect Login Information ID:PASSWORD(REMOVE ID BIT ON RELEASE)';
            }
        }
        else {
            echo 'Incorrect Login Information ID:USER(REMOVE ID BIT ON RELEASE)';
        }
    }


?>