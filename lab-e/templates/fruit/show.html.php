<?php

/** @var \App\Model\Fruit $fruit */
/** @var \App\Service\Router $router */

$title = "{$fruit->getName()} ({$fruit->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $fruit->getName() ?></h1>
    <article>
        <?= $fruit->getDescription();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('fruit-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('fruit-edit', ['id'=> $fruit->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
