<?php include '../view/header.php';?>
<!--This is where successful login attempts are sent, This is the configuration hub for new "Questions" and rooms owned by the user-->
<main>
<div class="row">
    <div id="FolderColumn" class="column left">
        <div id="FolderBox">
            <div id="HeaderBox">
                <!--TODO check user for login status-->
                <div id="NewFolder"></div>
            </div>
            <!--Pull Folders From User-->
            <?php ?>
        </div>
    </div>
    <div id="QuestionColumn" class="column center">
        <div id="QuestionBox">
            <!--Question List Generator-->
            <?php   ?>
            
            <div id="NewQuestionButton">
            </div>
        </div>
    </div>
    <div id="QuestionSetColumn" class="column right">
        <div id="QuestionSetBox">
            <div id="QuestionSetHeader">
                <div id="NewSet"></div>
                
            </div>
            <!--Pull Set List from database-->
            <?php  ?>
        </div>
    </div>
</div>
</main>
<?php include '../view/footer.php';?>