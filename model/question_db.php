<?php
    
    include_once 'database.php';
    #functions to pull the crap

    $MYSQLi = new mysqli(HOST,USER,PASSWORD,DATABASE);
    if ($MYSQLi->connect_errno) {
        printf("Connection Failed: \n", $MYSQLi->connect_error);
        die('Failed To Connect, Terminating Script');
    }

    function getFolders($user) {
        global $MYSQLi;
        if ($statement = $MYSQLi->prepare('SELECT folderName, folderDescription FROM questionfolders WHERE ownerID = ?')) {
            $statement->bind_param('s', $user);
            $statement->execute();
            $statement->use_result();
            $return = $statement->fetch_all();

            return $return;
        }
        else {
            //Throw Error
        }

    }

    function makeFolder($user, $folderName, $folderDescr) {
        global $MYSQLi;

    }

    function getQuestions($folder) {
        global $MYSQLi;

    }

    function getQuestion($folder, $questionID) {
        global $MYSQLi;

    }

    function setQuestion($folder, $question, $arguments, $answerArray) {
        global $MYSQLi;

    }

    function getQSets($folder) {
        global $MYSQLi;

    }

    function getQset($folder, $setID) {
        global $MYSQLi;

    }
    
    function makeSet($folder, $setName) {
        global $MYSQLi;

    }

    function addToSet($folder, $setID, $setName, $questionID) {
        global $MYSQLi;

    }

?>