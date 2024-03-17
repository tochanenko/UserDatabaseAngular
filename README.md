**User Database Angular**\
**Author**: Vladyslav Tochanenko

# How to Run
This app consists of two parts:

* Frontend Angular App
* Mock server

To run this project correctly you should first install `json-server` globally:

```bash
npm install -g json-server
```

Then run mock server using following command:

```bash
json-server .\mock-server\db.json
```

After the json-server successfully started up, we can launch Frontend App. Open separate console window and install dependencies using:

```bash
npm install
```

Then run project using the following command:

```bash
npm run start
```

It will lauch Frontend App on [http://localhost:4200/](http://localhost:4200/). You can open this page in your browser of choice.

**Important!** You might run into an error if you try to run `json-server` or `npm` command in PowerShell:

```
File ... cannot be loaded because the execution of scripts is disabled on this system. 
```

To fix it you should set execution policy to `Unrestricted` or `Bypass`:


```sh
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass -Force
```

# Main Features

**Clean Code Principles**

This App was written with [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), [KISS](https://en.wikipedia.org/wiki/KISS_principle) and [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) principles in mind. This way this project can be expanded with new functionality with little to none changes to its architecture.

**SCSS and BEM methodology**

Fully hand-written CSS styles with complience with the [BEM](https://en.bem.info/methodology/) methodology. No frameworks were used to style components. SCSS was used for creating simpler CSS files and to keep up with [BEM](https://en.bem.info/methodology/) methodology with less code. All colors, dimentions and common styles were moved to separate files located in `./src/app/styles/` folder. This way it will be easy to modify styles across the whole project.

**Custom `text-input` Component**

A couple of custom components were implemented for delivering better functionality for default HTML elements. For example, `text-input` component enchances functionality of default `<input>` and `<select>` elements. `text-input` component behaves like a full-fledged Form Component, so no additinal methods for getting and setting its value are required. `text-input` component can also display custom icons, such as email icon.

**Custom Validators and Directives**

Custom `mandatory`, `name-characters` and `password-strength` validators were implemented with correspondable directives for easier use in HTML code. These directives also work with custom `text-input` component without any need for additional code.

* `mandatory` validator is used to determine if field is empty
* `name-characters` validator is used for validating User's First and Last Names. Names with latin, cyrillic special characters like `Ґ` or `ß`, and symbols ` `, `-`, `'` are valid
* `password-strength` validator is used to determine whether password is at least 8 characters long and has at least one number and one letter

**Success and Error Notifications**

A custom `NotificationService` was implemented to show Success and Error notifications. It's simple to use architecture allows any component and service to display notifications with 1 line of code. Notifications also fade overtime so they won't interfeer with user experience.

**Other Features**

* `UserService` service with implementations of CRUD operations for Users was implemented. It also displays handy errors if backend service is absent.

* A custom 404 Error page was implemented.

* This app uses [NgRx Store](https://ngrx.io/) for saving users for better and faster operations. Actions, Effects, Selectors and Reducers for Creating, Reading, Updating and Deleting Users were implemented.

* [RxJs](https://rxjs.dev/) was used to simplify work with streams of data.

* [Redux Devtools](https://github.com/reduxjs/redux-devtools) integration is also available for easier future development.

* This app uses new [Angular Standalone App](https://angular.io/guide/standalone-components) architecture.

# Limitations & Ways to Improve

**Screen Size**

This App has a fixed display size of `1920px`. This way it is best suited for using on special hardware like POS Terminals or Smart Car displays.

This limitation can be overcome by developing an adaptive design for a whole project. However it will take some time due to a need for mockups. They can be developed in Figma or Adobe XD.

**Custom Components**

There is a `text-input` custom component that implements functionality for both `<input>` and `<select>` elements. A new `select-input` can be implemented to enchance app structure and simplify `text-input` component. A custom `button-input` component can also enchance default button functionality.

# Design

The App was developed with pixel-perfect precision according to **[REDACTED]** design file.

<img src="https://materials.tochanenko.com/files/users_list_angular.png">

&copy; Vladyslav Tochanenko, 2024 \
[tochanenko.com](https://tochanenko.com)