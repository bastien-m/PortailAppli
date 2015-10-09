# Portail Web SPB

L'objectif du site est de lister les différents sites gérés par SPB au sein de la DSI.
Le site disposera des fonctionnalités suivantes:

- Gestion de compte utilisateur (web / dpg), web compte spécifique, dpg pas d'authentification
- Création d'un site
- Modification d'un site
- Suppression d'un site
- Recherche par critère (nom, technos, serveurs)

## Fonctionnalités

### Utilisateur
Un objet utilisateur contenant login / password (apikey => id mongo)
Pas de création d'utilisateur possible pour le moment (aucune utilité), un utilisateur pour les devs

- login
- password

### Site
Un objet site contenant toutes les informations possibles pour la description du site,
vu la quantité de données affichable, une définition courte sera affichée sur la page principale,
au clique on pourra voir plus de détail (soit dans une nouvelle page, soit dans la page courante
en utilisant le système de card de materialize)

- Nom
- Technos (liste)
- url liste d'objet {name, link}
- description
- en dev (on/off)
- serveurs


en dev (on/off)
