# Projet OpenClassrooms: Groupomania

Prérequis:

    - Frontend: Vue.js
    - Backend: Node.js (avec Express.js)
    - ORM: Sequelize (avec sequelize CLI)
    - Database: MySQL

Installation:

    - Clonez ce projet depuis GitHub

    - Ouvrir un terminal depuis la racine du projet

    - FRONTEND:
        cd vue-frontend
        npm install
        npm run serve

    - BACKEND:
        cd backend
        npm install
        npm i sequelize-cli
        npx sequelize-cli db:create
        node server.js

    - Ouvrir un navigateur: http://localhost:8080
        
Description du projet:

    - Ce projet simule le fonctionnement d'un réseau social d'entreprise appelé GROUPOMANIA
    - Le framework choisi pour le frontend est vue.js
    - Le backend tourne avec Node.js/Express.js et l'ORM Sequelize
    - la database est MySQL