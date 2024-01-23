<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
	'host' => 'dpg-cm23hi7qd2ns73d8dut0-a.frankfurt-postgres.render.com',

	'driver' => 'pdo_pgsql',
	'user' => 'webpostgresql_user',
	'password' => 'lhQABVBFJNU6f2C3LoYWmQmhH5a5zMKx',
	'dbname' => 'webpostgresql',
	'port' => '5432'
);


$entityManager = EntityManager::create($conn, $config);
