<?php

$app->options('/api/catalogue', 'optionsCatalogue');

$app->options('/api/utilisateur', 'optionsUtilisateur');

// APi d'authentification générant un JWT
$app->post('/api/utilisateur/login', 'postLogin');

// APi pour s'inscrire, dans la ignoreList
$app->post('/api/utilisateur/inscription', 'postInscription');

// API Nécessitant un Jwt valide
$app->get('/api/utilisateur', 'getUtilisateur');

// API Nécessitant un Jwt valide
$app->get('/api/fullCatalogue', 'getFullCatalogue');

// API Nécessitant un Jwt valide
$app->get('/api/catalogue/{filtre}', 'getSearchCatalogue');
