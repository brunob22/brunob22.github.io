<?php

/** @var \App\Model\Fruit[] $fruits */
/** @var \App\Service\Router $router */

$title = 'Fruit List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Fruits List</h1>

    <a href="<?= $router->generatePath('fruit-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($fruits as $fruit): ?>
            <li><h3><?= $fruit->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('fruit-show', ['id' => $fruit->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('fruit-edit', ['id' => $fruit->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
