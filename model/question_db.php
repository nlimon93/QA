<?php    
    include_once 'database.php';
    #functions to pull the crap

    //Initializes connection to database
    $MYSQLi = new mysqli(HOST,USER,PASSWORD,DATABASE);
    if ($MYSQLi->connect_errno) {
        printf("Connection Failed: \n", $MYSQLi->connect_error);
        die('Failed To Connect, Terminating Script');
    }
    //Returns rows from SQL about the folders
    function getFolders($user) {
        global $MYSQLi;
        if ($statement = $MYSQLi->prepare('SELECT folderName, folderDescription, folderID FROM questionfolders WHERE ownerID = ?')) {
            $statement->bind_param('s', $user);
            $statement->execute();
            $return = $statement->get_result();
            $statement->close();
            return $return->fetch_all(MYSQLI_ASSOC);;
        }
        else {
            //Throw Error
            
        }
    }
    //Updates a folder's data
    function updateFolder($user, $folderID, $folderName, $folderDescr) {
        global $MYSQLi;
        if ($statement = $MYSQLi->prepare('UPDATE questionfolders SET folderName = ?, folderDescription = ? WHERE ownerID = ? AND folderID = ?') ) {
            $statement->bind_param('ssss', $folderName, $folderDescr, $user, $folderID);
            $statement->execute();
            $statement->close();
        }
        else {
            //Throw Error
            return "an error apparently occured";
        }
    }

    //SQL to make a folder using the data provided from JS
    function makeFolder($user, $folderName, $folderDescr) {
        global $MYSQLi;
        if ($statement = $MYSQLi->prepare('INSERT into questionfolders (ownerID, folderName, folderDescription) VALUES (?, ?, ?)')) {
            $statement->bind_param('sss', $user, $folderName, $folderDescr);
            $statement->execute();
            $result = $statement->insert_id;
            $statement->close();
            if ($result == 0) {
                $result = $user." ".$folderName." ".$folderDescr;
            }
            return $result;
        }
        else {
            //Throw Error
            return "an error has occured, blame matt ".$user." ".$folderName." ".$folderDescr;
        }
    }
    function deleteFolder($user, $folderID) {
        global $MYSQLi;
        if ($statement = $MYSQLi->prepare('DELETE LOW_PRIORITY FROM questionfolders WHERE ownerID = ? AND folderID = ?')) {
            $statement->bind_param('ss', $user, $folderID);
            $result = $statement->execute();
            $statement->close();
            return $result;
        }
        else {
            //Throw Error
            return " ";
        }
    }
    //Returns a list of Questions provided folder,
    function getQuestions($folder) {
        global $MYSQLi;
        if (true) {
        }
        else {
            //Throw Error
        }
    }
    //Returns Single Question Data
    function getQuestion($folder, $questionID) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Updates a Question
    function updateQuestion($folder, $question, $arguments, $questionID) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Makes a Question's Data.
    function makeQuestion($folder, $question, $arguments) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Gets answeres associated with question
    function getAnswers($question) {
        global $MYSQLi;
        if (true) {
        }
        else {
            //Throw Error
        }
    }
    //Gets Single Answer Associated With Question
    function getAnswer($question) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Updates Answer associated with question
    function updateAnswer($question, $answer) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Adds answer too question
    function makeAnswer($question) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Gets the list of Question Sets
    function getQSets($folder) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Gets a Single Set
    function getQset($folder, $setID) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Sets.. a question..set?
    function makeSet($folder, $setName) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
    //Adds a Question to the set, should be run quite often.. need a way to diferentiate between sets for questions in multiple sets
    function updateSet($folder, $setID, $setName, $questionID) {
        global $MYSQLi;
        if (false) {
        }
        else {
            //Throw Error
        }
    }
?>