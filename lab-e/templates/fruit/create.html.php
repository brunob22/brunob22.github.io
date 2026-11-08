<?php

/** @var \App\Model\Fruit $fruit */
/** @var \App\Service\Router $router */

$title = 'Create Fruit';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Fruit</h1>
    <form action="<?= $router->generatePath('fruit-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="fruit-create">
    </form>

    <a href="<?= $router->generatePath('fruit-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
