# Diary App

## Description

Diary App es una aplicación que permite crear, actualizar y eliminar notas diarias, a modo de agenda, para usuarios registrados o logueados, permite además, agregarle una imagen a cada nota creada. Cada nota contiene título, descripción, imagen y fecha de creación. La información de usuarios y notas se guardan en una base de datos. Usa autenticación de usuario a través de tokens (JWT).

_Diary App is an application that allows you to create, update and delete daily notes, as an agenda, for registered or logged in users, it also allows you to add an image to each note created. Each note contains title, description, image, and creation date. User information and notes are stored in a database. Use user authentication through tokens (JWT)._

## Run app

Luego de [ejecutar](https://aac-diary-app.herokuapp.com) la aplicación se debe registrar de modo que cada usuario tenga la posibilidad de crear y mantener sus notas.

_After [running](https://aac-diary-app.herokuapp.com) the application must be registered so that each user has the possibility to create and maintain their notes._

## About this repo

Este repositorio contiene el lado cliente de la aplicación Diary-App, el lado servidor se puede encontrar [aquí](https://github.com/aac-devs/diary-api).

_This repository contains the client side of the Diary-App, the server side can be found [here](https://github.com/aac-devs/diary-api)._

## Technologies

Las tecnologías usadas para desarrollar este frontend son: React.js, Redux y Material UI, hace uso además de la librería dayjs, prop-types y eslint para garantizar buenas prácticas de codificación.

_The technologies used to develop this frontend are: React.js, Redux and Material UI, it also makes use of the dayjs library, prop-types and eslint to guarantee good coding practices._

## Installation

Luego de clonar el repositorio instale las dependencias a través de:

_After cloning the repository, install the dependencies through:_

```bash
npm install
```

## Usage

&nbsp;
Para producción, desarrollo y testing:

&nbsp; _For production, development and testing:_

```bash
npm start
npm run dev
npm run test
```
