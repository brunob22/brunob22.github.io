<?php

/** @var \App\Model\Fruit $fruit */
/** @var \App\Service\Router $router */

$title = "Edit Fruit {$fruit->getName()} ({$fruit->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('fruit-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="fruit-edit">
        <input type="hidden" name="id" value="<?= $fruit->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('fruit-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('fruit-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="fruit-delete">
                <input type="hidden" name="id" value="<?= $fruit->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
