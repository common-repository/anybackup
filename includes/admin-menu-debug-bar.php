<?php
  if (! defined( 'ABSPATH' )) {
    exit; // Exit if accessed directly
  }
?>
<div id='debugBar' ng-hide='true'>
  <label class='pull-left'>Debug: </label>
  <form method="POST" action="#" class='pull-left'>
    <input type='hidden' name='createNewApiKey' value='true'/>
    <input type='submit' value='New Server'/>
  </form>

  <a href="?page=backup_bits_anybackup&runSpecs=true"> Run Specs </a>


</div>
