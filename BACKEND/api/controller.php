<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

function optionsCatalogue(Request $request, Response $response, $args)
{
	$response = $response->withHeader("Access-Control-Max-Age", 600);
	return addHeaders($response);
}

function getFullCatalogue(Request $request, Response $response, $args)
{
	global $entityManager;

	$produitsRepository = $entityManager->getRepository('Produits');
	$produits = $produitsRepository->findAll();

	$data = [];

	foreach ($produits as $produit) {
		$data[] = [
			'id' => $produit->getId(),
			'nom' => $produit->getNom(),
			'prix' => $produit->getPrix() / 100,
			'description' => $produit->getDescription(),
			'image' => $produit->getImage(),
		];
	}

	$response = addHeaders($response);
	$response->getBody()->write(json_encode($data));

	return $response;
}


function getSearchCatalogue(Request $request, Response $response, $args)
{
	global $entityManager;
	$filtre = $args['filtre'] ?? null;

	$produitsRepository = $entityManager->getRepository('Produits');
	$produits = $produitsRepository->findAll();

	$data = [];

	if ($filtre) {
		foreach ($produits as $produit) {
			if (strpos($produit->getNom(), $filtre) !== false) {
				$data[] = [
					'id' => $produit->getId(),
					'nom' => $produit->getNom(),
					'prix' => $produit->getPrix() / 100,
					'description' => $produit->getDescription(),
					'image' => $produit->getImage(),
				];
			}
		}
	} else {
		foreach ($produits as $produit) {
			$data[] = [
				'id' => $produit->getId(),
				'nom' => $produit->getNom(),
				'prix' => $produit->getPrix() / 100,
				'description' => $produit->getDescription(),
				'image' => $produit->getImage(),
			];
		}
	}

	$response = addHeaders($response);
	$response->getBody()->write(json_encode($data));

	return $response;
}


function optionsUtilisateur(Request $request, Response $response, $args)
{
	$response = $response->withHeader("Access-Control-Max-Age", 600);
	return addHeaders($response);
}

function getProfil(Request $request, Response $response, $args)
{
	global $entityManager;

	$login = $args['login'] ?? "";

	if (!preg_match("/^[a-zA-Z0-9\-_]+$/", $login)) {
		$response = $response->withStatus(400);
		return addHeaders($response);
	}

	$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
	$utilisateur = $utilisateurRepository->findOneBy(['login' => $login]);

	if ($utilisateur) {
		$response = addHeaders($response);
		$data = array(
			'nom' => $utilisateur->getNom(),
			'prenom' => $utilisateur->getPrenom(),
			'adresse' => $utilisateur->getAdresse(),
			'codePostal' => $utilisateur->getCodePostal(),
			'ville' => $utilisateur->getVille(),
			'email' => $utilisateur->getEmail(),
			'sexe' => $utilisateur->getSexe(),
			'telephone' => $utilisateur->getTelephone()
		);
		$response->getBody()->write(json_encode($data));
	} else {
		$response = $response->withStatus(404);
	}

	return addHeaders($response);
}

function postLogin(Request $request, Response $response, $args)
{
	global $entityManager;
	$err = false;
	$body = $request->getParsedBody();
	$login = $body['login'] ?? "";
	$pass = $body['password'] ?? "";

	if (!preg_match("/^[a-zA-Z0-9\-_]+$/", $login)) {
		$err = true;
	}
	if (!preg_match("/^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>]+$/", $pass)) {
		$err = true;
	}
	if (!$err) {
		$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
		$utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $pass));
		if ($utilisateur and $login == $utilisateur->getLogin() and $pass == $utilisateur->getPassword()) {
			$response = addHeaders($response);
			$response = createJwT($response);
			$data = array(
				'nom' => $utilisateur->getNom(),
				'prenom' => $utilisateur->getPrenom(),
				'adresse' => $utilisateur->getAdresse(),
				'codePostal' => $utilisateur->getCodePostal(),
				'ville' => $utilisateur->getVille(),
				'email' => $utilisateur->getEmail(),
				'sexe' => $utilisateur->getSexe(),
				'telephone' => $utilisateur->getTelephone()
			);
			$response->getBody()->write(json_encode($data));
		} else {
			$response = $response->withStatus(403);
		}
	} else {
		$response = $response->withStatus(500);
	}

	return addHeaders($response);
}

function postInscription(Request $request, Response $response, $args)
{
	global $entityManager;
	$err = false;

	$body = $request->getParsedBody();

	$nom = $body['nom'] ?? "";
	$prenom = $body['prenom'] ?? "";
	$adresse = $body['adresse'] ?? "";
	$codePostal = $body['codePostal'] ?? "";
	$ville = $body['ville'] ?? "";
	$email = $body['email'] ?? "";
	$sexe = $body['sexe'] ?? "";
	$telephone = $body['telephone'] ?? "";
	$password = $body['password'] ?? "";
	$login = $body['login'] ?? "";

	$errorDetails = [];

	$errorDetails['request'] = $request->getParsedBody();
	$errorDetails['body'] = $body;

	// Vérification pour le nom et prénom
	if (!preg_match("/^[a-zA-ZÀ-ÿ\-' ]+$/", $nom)) {
		$err = true;
		$errorDetails['nom'] = 'Le champ "nom" est invalide.';
	}

	if (!preg_match("/^[a-zA-ZÀ-ÿ\-' ]+$/", $prenom)) {
		$err = true;
		$errorDetails['prenom'] = 'Le champ "prénom" est invalide.';
	}

	// Vérification pour le code postal
	if (!preg_match("/^\d{5}$/", $codePostal)) {
		$err = true;
		$errorDetails['codePostal'] = 'Le champ "code postal" est invalide.';
	}

	// Vérification pour la ville
	if (!preg_match("/^[a-zA-ZÀ-ÿ\-' ]+$/", $ville)) {
		$err = true;
		$errorDetails['ville'] = 'Le champ "ville" est invalide.';
	}

	// Vérification pour le sexe
	if (!preg_match("/^[MF]$/", $sexe)) {
		$err = true;
		$errorDetails['sexe'] = 'Le champ "sexe" est invalide.';
	}

	// Vérification pour le mot de passe et login
	if (!preg_match("/^[a-zA-Z0-9\-_]+$/", $login)) {
		$err = true;
		$errorDetails['login'] = 'Le champ "login" est invalide.';
	}

	if (!preg_match("/^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>]+$/", $password)) {
		$err = true;
		$errorDetails['password'] = 'Le champ "password" est invalide.';
	}

	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$err = true;
		$errorDetails['email'] = 'Le champ "email" est invalide.';
	}

	if (!$err) {
		$existingUserByEmail = $entityManager->getRepository('Utilisateurs')->findOneBy(['email' => $email]);
		$existingUserByLogin = $entityManager->getRepository('Utilisateurs')->findOneBy(['login' => $login]);

		if (!$existingUserByEmail && !$existingUserByLogin) {
			$newUser = new Utilisateurs();
			$newUser->setNom($nom);
			$newUser->setPrenom($prenom);
			$newUser->setAdresse($adresse);
			$newUser->setCodePostal($codePostal);
			$newUser->setVille($ville);
			$newUser->setEmail($email);
			$newUser->setSexe($sexe);
			$newUser->setTelephone($telephone);
			$newUser->setLogin($login);
			$newUser->setPassword($password);

			$entityManager->persist($newUser);
			$entityManager->flush();

			$response = addHeaders($response);
			$response = createJwT($response);
			$data = array(
				'nom' => $newUser->getNom(),
				'prenom' => $newUser->getPrenom(),
				'adresse' => $newUser->getAdresse(),
				'codePostal' => $newUser->getCodePostal(),
				'ville' => $newUser->getVille(),
				'email' => $newUser->getEmail(),
				'sexe' => $newUser->getSexe(),
				'telephone' => $newUser->getTelephone(),
				'login' => $newUser->getLogin()
			);

			$response->getBody()->write(json_encode($data));
		} else {
			$response = $response->withStatus(409);
		}
	} else {
		$response = $response->withStatus(400);
		$response->getBody()->write(json_encode(['errors' => $errorDetails]));
	}

	return addHeaders($response);
}
