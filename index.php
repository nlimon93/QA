<?php include 'function-modules/view/header.php';?>
<main>
	<div class="sections">
		<div class="Quiz">
			<button id="Q" onclick="window.location.href = '/<?php $ex = explode(DIRECTORY_SEPARATOR ,__DIR__); $rev = array_reverse($ex); echo $rev[0] ?>/function-modules/roomConfiguration'">Q</button>
		</div>
		<div class="Answer">
			<button id="A" onclick="">A</button>
		</div>
	</div>
</main>
<?php include 'function-modules/view/footer.php';?>