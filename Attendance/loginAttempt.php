<?php 

    session_start();
    include_once '../function-modules/phplogin/psl-config.php';

    #Initialize login database connection from configuration
    $MYSQLi = new mysqli(HOST,USER,PASSWORD,DATABASE);

    if ($MYSQLi->connect_errno) {
        printf("Connection Failed: $s\n", $MYSQLi->connect_error);
        die('Failed To Connect, Terminating Script');
    }

    $attendee_id = $course_key = "";

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        
        if($statement = $MYSQLi->prepare('INSERT INTO AttendanceRecords Values (?, ?)')) {
            $attendee_id = filter_var($_POST['attendee_id'], FILTER_SANITIZE_NUMBER_INT);
            $course_key = filter_var($_POST['course_key'], FILTER_SANITIZE_STRING);
            $statement->bind_param('ds', $attendee_id, $course_key);
            if(!$statement->execute()) {
                printf("Failed. %s", $statement->error);
            }
            $statement->close();
        }

        
    }
    else {
        ?>
        <form method="post" style="hidden" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            Account ID: <input type="number" name="attendee_id">
            Course ID: <input type="text" name="course_key">
            <input type="submit">
        </form>
        <?php
    }
    

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }


?>
