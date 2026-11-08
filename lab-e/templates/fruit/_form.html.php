<?php
    /** @var $fruit ?\App\Model\Fruit */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="fruit[name]" value="<?= $fruit ? $fruit->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" name="fruit[description]"><?= $fruit? $fruit->getDescription() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
