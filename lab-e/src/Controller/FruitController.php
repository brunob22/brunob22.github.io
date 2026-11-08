<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Fruit;
use App\Service\Router;
use App\Service\Templating;

class FruitController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $fruits = Fruit::findAll();
        $html = $templating->render('fruit/index.html.php', [
            'fruits' => $fruits,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestFruit, Templating $templating, Router $router): ?string
    {
        if ($requestFruit) {
            $fruit = Fruit::fromArray($requestFruit);
            // @todo missing validation
            $fruit->save();

            $path = $router->generatePath('fruit-index');
            $router->redirect($path);
            return null;
        } else {
            $fruit = new Fruit();
        }

        $html = $templating->render('fruit/create.html.php', [
            'fruit' => $fruit,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $fruitId, ?array $requestFruit, Templating $templating, Router $router): ?string
    {
        $fruit = Fruit::find($fruitId);
        if (! $fruit) {
            throw new NotFoundException("Missing fruit with id $fruitId");
        }

        if ($requestFruit) {
            $fruit->fill($requestFruit);
            // @todo missing validation
            $fruit->save();

            $path = $router->generatePath('fruit-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('fruit/edit.html.php', [
            'fruit' => $fruit,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $fruitId, Templating $templating, Router $router): ?string
    {
        $fruit = Fruit::find($fruitId);
        if (! $fruit) {
            throw new NotFoundException("Missing fruit with id $fruitId");
        }

        $html = $templating->render('fruit/show.html.php', [
            'fruit' => $fruit,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $fruitId, Router $router): ?string
    {
        $fruit = Fruit::find($fruitId);
        if (! $fruit) {
            throw new NotFoundException("Missing fruit with id $fruitId");
        }

        $fruit->delete();
        $path = $router->generatePath('fruit-index');
        $router->redirect($path);
        return null;
    }
}
