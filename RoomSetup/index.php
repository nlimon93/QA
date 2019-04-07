<?php include '../view/header.php';?>
<?php include '../model/question_db.php'?>
<!--This is where successful login attempts are sent, This is the configuration hub for new "Questions" and rooms owned by the user-->
<main>
<div class="row">
    <div id="FolderColumn" class="column left">
        <div id="FolderBox" class="box">
            <div id="HeaderBox" class="lheader">
                <!--TODO check user for login status-->
                <div id="NewFolder">
                    <button>NEW FOLDER ICON</button>
                </div>
            </div>
            <!--Pull Folders From User-->
            <?php 
                $folders = getFolders($_SESSION['id']);
                $fnames = $folders[0];
                $fdescript = $folders[1];
            ?>
            <?php foreach($fnames as $index=>$fname) :?>
                <div class="folderIter">
                    <h1><?php echo $fname?></h1>
                    <p><?php echo $fdescript[$index]?></p>
                    <button>TRASHICON</button>
                </div>
            <?php endforeach;?>
        </div>
    </div>
    <div id="QuestionColumn" class="column center">
        <div id="QuestionBox" class="box">
            <!--Question List Generator-->
            <?php   ?>
            
            <div id="NewQuestionButton">
            </div>
        </div>
    </div>
    <div id="QuestionSetColumn" class="column right">
        <div id="QuestionSetBox" class="box">
            <div id="QuestionSetHeader" class="lheader">
                <div id="NewSet">
                    <button>New Set Icon</button>
                </div>
                
            </div>
            <!--Pull Set List from database-->
            <?php  ?>
        </div>
    </div>
</div>
</main>
<?php include '../view/footer.php';?>