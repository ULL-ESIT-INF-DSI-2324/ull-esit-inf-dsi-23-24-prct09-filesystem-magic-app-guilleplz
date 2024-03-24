
# Practica 9: Aplicación para coleccionistas de cartas Magic

**Alumno:** *Guillermo Plaza Gayán - alu0101495354@ull.edu.es*

**Fecha:** 12/03/2024

**Estudios:** Ingeniería Informática

**Asignatura:** Desarrollo en Sistemas Informáticos

**Profesor:** Eduardo Manuel Segredo González

# Indice

1. [objetivo](#objetivo)
2. [requisitos previos](#requisitos-previos)
3. [programa](#programa-de-cartas-magic)
4. [conclusiones](#conclusión)

# Objetivo

En esta practica realizaremos un programa que use el paquete fs de node.js para que multiples usuarios puedan tener una colección de cartas magic independiente e interactuar con ella. Cada usuario tendrá un fichero dentro de un directorio con su nombre y, en el fichero, las cartas en formato json.
Al realizar esta practica aprenderemos los conceptos del paquete fs síncrono, además de familiarizarnos con paquetes como yargs para obtener de manera sencilla argumentos por linea de comandos, o chalk para dar color y formato a la salida por terminal.

# Requisitos previos

Para iniciar la practica deberemos primero seguir una serie de pasos:

## Inicialización del repositorio

Tenemos nuestro repositorio asignado en github classroom. Simplemente tenemos que ejecutar el siguiente comando en nuestra carpeta de practicas en la máquina virtual 
``` bash
git clone git@github.com:ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-guilleplz.git
```

Con esto ya tendremos el repositorio listo para trabajar.


## Paquetes instalados

Lo primero que deberemos hacer es iniciar npm: 
``` bash
npm init --yes
```
Esto, iniciará node en nuestro repositorio, generando un fichero package.json que tendrá el siguiente formato:

``` json
{
  "name": "theory-examples",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

A continuación, iniciaremos typescript ejecutando el comando `tsc --init`, lo cual generará un fichero tsconfig.json el cual modificaremos algunas opciones para que quede de la siguiente manera

``` json
{
  "exclude": [
    "./node_modules",
    "./dist",
    "./test",
    ".nyc_output"
  ],
  "compilerOptions": {
    "target": "es2022",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    /* Modules */
    "module": "node16",                                /* Specify what module code is generated. */
    "rootDir": "./src",                                  /* Specify the root folder within your source files. */
    "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

```

hemos de fijarnos que hemos puesto la opción module a node16 para poder usar modulos ESM. Además, para esto, deberemos añadir la opción "type": "module" a nuestro fichero package.json

Una vez hecho esto, deberemos instalar los paquetes necesarios con los giguientes comandos:

``` bash
eslint --init
npm i --save-dev typedoc
npm i --save-dev mocha chai@4.4.1 @types/mocha @types/chai ts-node
npm i --save-dev chalk yargs @types/yargs
npm i --save-dev nyc c8

```
También deberemos cambiar y añadir algunos ficheros:

**.mocharc.json**
``` json
{
  "extension": "ts",
  "spec": "test/**/*.spec.ts",
  "loader": "ts-node/esm"
}
```

**typedoc.json**
``` json
{
  "entryPoints": [
    "./src/**/*.ts"
  ],
  "out": "./docs"
}
```

**.eslintrc.json**
``` json
{
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "valid-jsdoc": "off",
        "require-jsdoc": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off"
    }
}
```

De esta forma tendremos los paquetes necesarios para la practica. Una breve explicación de los paquetes nuevos de esta práctica:

- **yargs**: permite recoger argumentos por linea de comandos de manera muy sencilla y rápida
- **chalk**: permite dar formato a la salida por terminal, podiendo hacer los textos de colores

## Estructura de directorios

Para terminar de preparar el repositorio para empezar el programa debemos crear la estructura:

- carpeta test para los test
- carpeta dist para los archivos compilados
- carpeta src para los archivos en ts de nuestro programa
- carpeta cartas donde se guardarán las colecciones de todos los usuarios

## Actions

Deberemos añadir a nuestro repositorio de github las acciones de los test, coveralls y sonarcloud

### Tests

debemos añadir la action de node.js y moodificar el fichero para que quede le la siguiente manera:

``` yml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: tests

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 19.x, 20.x, 21.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm install
    - run: npm test

```

### Coveralls

Coveralls nos permitirá tener a disposición el cubrimiento de nuestro programa y seguirlo a desde la página de coveralls.
Para llevarlo a cabo, añadimos el fichero coveralls.yml y lo modificamos para que quede de la siguiente manera:

``` yml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Coveralls

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Cloning repo
      uses: actions/checkout@v4
    - name: Use Node.js 21.x
      uses: actions/setup-node@v4
      with:
        node-version: 21.x
    - name: Installing dependencies
      run: npm ci
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@v2.2.3
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```
Debemos tener en cuenta que necesitamos tener el repositorio público para que nos haga el cubrimiento de nuestro programa

### Sonarcloud

SonarCloud nos proporciona la información de si nuestro proyecto pasa las puertas de calidad. Para ponerlo en funcionamiento iremos a la página de SonarCloud y añadiremos nuestro repositorio siguiendo las instrucciones. Nos deberán quedar los siguientes ficheros:

**sonarcloud.yml**

``` yml
name: Sonar-Cloud 
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - name: Cloning repo
        uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Using Node.js 19.x
        uses: actions/setup-node@v3
        with:
          node-version: 19.x
      - name: Installing dependencies
        run: npm i
      - name: Generating coverage report
        run: npm run coverage
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**sonar-project.properties**

``` properties
sonar.projectKey=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-guilleplz
sonar.organization=ull-esit-inf-dsi-2324

# This is the name and version displayed in the SonarCloud UI.
#sonar.projectName=ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-guilleplz
#sonar.projectVersion=1.0


# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
#sonar.sources=.

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
```

Hecho esto, ya tendremos nuestro repositorio listo para empezar nuestro programa

# Programa de cartas magic

El proyecto se organiza en varios archivos TypeScript que contienen clases, interfaces, enums y funciones relacionadas con la gestión de cartas Magic. A continuación, se describe la estructura de archivos del proyecto:

card.ts: Define las enums Color, TimeLine y Rarity, así como los tipos Strength y Carta.

``` ts

export enum Color {
  blanco,
  azul,
  negro,
  rojo,
  verde,
  incoloro,
  multicolor
}

export enum TimeLine {
  tierra,
  criatura,
  encantamiento,
  conjuro,
  instantaneo,
  artefacto,
  planeswalker
}

export enum Rarity {
  comun,
  infrecuente,
  rara,
  mitica,
  legendaria
}

export type Strength = [number, number];

export type Carta = {
  ID: number;
  Name: string;
  ManaCost: number;
  Color: Color;
  TimeLine: TimeLine;
  Rarity: Rarity;
  Rules: string;
  Value: number;
  Strength: Strength | undefined;
  Loyalty: number | undefined;
};
```

Lo más importante en este fichero es el tipo carta que contiene toda la información necesaria para representar este objeto. Los atributos strength y loyalty al ser opcionales, cuando no es el tipo de carta indicada se ponen a undefined

cardmanager.ts: Contiene la implementación de la clase CardManager, que se encarga de gestionar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las cartas.

La clase CardManager implementa la interfaz Manager que contiene los métodos necesarios para la correcta ejecución del programa

``` ts
import { Carta, Color, Rarity, TimeLine } from "./card.js"
import chalk from "chalk";
import * as Functions from './functions.js'
import { argv } from "process";

// tipo que define un array de parámetros que pueden ser numéricos o string
type Params = (number | string)[];

/**
 * Interfaz que define los métodos que implementará la clase CardManager
 */
interface Manager {
  addCard(carta: Carta): void;
  removeCard(id: number): void;
  updateCard(id: number, params: Params): void;
  listCards(): void;
  readSpecificCard(id: number): void;
}


export class CardManager implements Manager {
  // atributo cartas --> array de cartas
  private cartas: Carta[];

  /**
   * Constructor de la clase, tiene un array de cartas que se inicia con las cartas en la base de datos
   * @param cartasinbd array de cartas sacadas de la base de datos
   */
  constructor(cartasinbd: Carta[]) {
    this.cartas = cartasinbd;
  }

  /**
   * Getter del array de cartas
   * @returns array de cartas
   */
  GetCards(): Carta[] {
    return this.cartas;
  }

  /**
   * Método que añade una carta al array de cartas
   * @param carta carta a añadir al array
   */
  addCard(carta: Carta): void {
    if (this.cartas.find((cardinbd: Carta) => cardinbd.ID === carta.ID )) {
      throw new Error("La carta ya existe en la base de datos.");
    } else {
      this.cartas.push(carta)
    }
  }

  /**
   * Método que elimina una carta del array de cartas
   * @param id id de la carta a eliminar
   */
  removeCard(id: number): void {
    const index = this.cartas.findIndex((carta) => carta.ID === id);
    // si la carta no está en el array
    if (index == -1) {
      throw new Error("no se ha encontrado la carta")
    }

    this.cartas.splice(index, 1)
  }

  /**
   * Método que lista todas las cartas del array
   */
  listCards(): void {
    // para cada una de las cartas
    this.cartas.forEach((carta, index) => {
      console.log("\n------------------" + index + "--------------------\n");
      this.PrintCardInfo(carta);
    })
  }

  /**
   * Método que muestra la información de una carta
   * @param id id de la carta a leer
   */
  readSpecificCard(id: number): void {
    const index = this.cartas.findIndex((carta) => carta.ID === id);
    // si la carta no está en el array
    if (index == -1) {
      throw new Error("no se ha encontrado la carta")
    }

    this.PrintCardInfo(this.cartas[index]);
    
  }

  /**
   * Método que modifica la información de una carta
   * @param id id de la carta a modificar
   * @param params información a modificar de la carta
   */
  updateCard(argstochange: any): void {
    const index = this.cartas.findIndex((carta) => carta.ID === argstochange.id);
    // si la carta no está en el array
    if (index == -1) {
      throw new Error("no se ha encontrado la carta")
    }

    if (argstochange.name) this.cartas[index].Name = argstochange.name;
    if (argstochange.manacost) this.cartas[index].ManaCost = argstochange.manacost;
    if (argstochange.color) this.cartas[index].Color = Functions.GetColorValue(argstochange.color);
    if (argstochange.timeline) this.cartas[index].TimeLine = Functions.GetTimeLineValue(argstochange.timeline);
    if (argstochange.rarity) this.cartas[index].Rarity = Functions.GetRarityValue(argstochange.rarity);
    if (argstochange.rules) this.cartas[index].Rules = argstochange.rules;
    if (argstochange.value) this.cartas[index].Value = argstochange.value;
    if (argstochange.strength) this.cartas[index].Strength = argstochange.strength;
    if (argstochange.loyalty) this.cartas[index].Loyalty = argstochange.loyalty;
    
  }

  PrintCardInfo(card: Carta): void {
    console.log("ID: " + card.ID);
      console.log("Nombre: " + card.Name);
      console.log("Coste de mana: " + card.ManaCost);
      // diferencio entre coloress
      switch (card.Color) {
        case Color.blanco:
          console.log("Color: " + chalk.white("blanco"));
          break;
        case Color.azul:
          console.log("Color: " + chalk.blue("azul"));
          break;
        case Color.negro:
          console.log("Color: " + chalk.black("negro"));
          break;
        case Color.rojo:
          console.log("Color: " + chalk.red("rojo"));
          break;
        case Color.verde:
          console.log("Color: " + chalk.green("verde"));
          break;
        case Color.incoloro:
          console.log("Color: " + chalk.white("incoloro"));
          break;
        case Color.multicolor:
          console.log("Color: " + chalk.red("mu") + chalk.green("lti") + chalk.blue("col") + chalk.yellow("or"));
          break;
      }
      
      // diferencio entre las lineas de tiempo
      switch (card.TimeLine) {
        case 0:
          console.log("Linea de tiempo: tierra");
          break;
        case 1:
          console.log("Linea de tiempo: criatura");
          break;
        case 2:
          console.log("Linea de tiempo: encantamiento");
          break;
        case 3:
          console.log("Linea de tiempo: conjuro");
          break;
        case 4:
          console.log("Linea de tiempo: instantáneo");
          break;
        case 5:
          console.log("Linea de tiempo: artefacto");
          break;
        case 6:
          console.log("Linea de tiempo: planeswalker");
          break;
      }

      // diferencio entre las rarezas
      switch (card.Rarity) {
        case 0:
          console.log("Rareza: común");
          break;
        case 1:
          console.log("Rareza: infrecuente");
          break;
        case 2:
          console.log("Rareza: rara");
          break;
        case 3:
          console.log("Rareza: mítica");
          break;
        case 4:
          console.log("Rareza: legendaria");
          break;
      }
      console.log("Reglas: " + card.Rules);
      console.log("Fuerza / resistencia: " + (card.Strength || "No aplica"));
      console.log("Lealtad: " + (card.Loyalty || "No aplica"));
      console.log("Valor de mercado: " + card.Value);
  }

}
```

functions.ts: Define funciones utilitarias para cargar y guardar cartas desde/hacia archivos, así como funciones para obtener los valores numéricos de los enums Color, TimeLine y Rarity dado una string.

``` ts
import fs, { stat } from 'fs'
import * as Carta from './card.js'
import chalk from 'chalk';


/**
 * función para guardar la colección en el fichero
 * @param user usuario que posee la colección
 * @param cartas cartas que desea guardar
 */
export function SaveCard(user: string, cartas: Carta.Carta[]): void {
  const userDirectory = "./cartas/" + user;
  const fileName = userDirectory + "/" + user + ".json";
  fs.truncateSync(fileName, 0)
  fs.writeFileSync(fileName, JSON.stringify(cartas));
}

/**
 * Función para cargar las cartas de un usuario
 * @param user usuario que posee la colección
 * @returns cartas del usuario
 */
export function LoadCards(user: string): Carta.Carta[] {
  const userDirectory = "./cartas/" + user
  const fileName = userDirectory + "/" + user + ".json";
  
  // Comprobamos si existe el directorio del usuario
  if (!fs.existsSync(userDirectory)) {
    fs.mkdirSync(userDirectory, { recursive: true });
    fs.writeFileSync(fileName, JSON.stringify(""))
  }

  // sacamos las estadisticas del fichero
  const stats = fs.statSync(fileName);

  // si el fichero está vacío
  if (stats.size === 2) {
    
    // devolvemos un array vacío
    console.log(chalk.green("No se encontró colección, creando una nueva colección al usuario " + user));
    fs.writeFileSync(fileName, JSON.stringify([]));
    return []
    
  } else { // si el fichero tiene contenido creamos las cartas y devolvemos el array de cartas

    const jsoncontent = fs.readFileSync(fileName, 'utf-8');
    const jsoncards = JSON.parse(jsoncontent);
    
    const cards: Carta.Carta[] = jsoncards.map((carta: Carta.Carta) => ({
      ID: carta.ID,
      Name: carta.Name,
      ManaCost: carta.ManaCost,
      Color: carta.Color,
      TimeLine: carta.TimeLine,
      Rarity: carta.Rarity,
      Rules: carta.Rules,
      Strength: carta.Strength,
      Loyalty: carta.Loyalty,
      Value: carta.Value
    }));

    return cards;

  }
}

/**
 * Función que devuelve el index del enum Color
 * @param colorstring color de la carta
 * @returns index del enum Color
 */
export function GetColorValue(colorstring: string): number {
  const colorValue = colorstring.toLowerCase() as keyof typeof Carta.Color;
  return Carta.Color[colorValue];
}

/**
 * Función que devuelve el index del enum TimeLine
 * @param timelinestring linea temporal de la carta
 * @returns index del enum TimeLine
 */
export function GetTimeLineValue(timeline: string): number {
  const timelinevalue = timeline.toLowerCase() as keyof typeof Carta.TimeLine;
  return Carta.TimeLine[timelinevalue];
}

/**
 * Función que devuelve el index del enum Rarity
 * @param rarity rareza de la carta
 * @returns index del enum Rarity
 */
export function GetRarityValue(rarity: string): number {
  const rarityValue = rarity.toLowerCase() as keyof typeof Carta.Rarity;
  return Carta.Rarity[rarityValue];
}

/**
 * Función que crea una carta
 * @param argv argumentos de la carta
 * @returns carta
 */
export function CreateCard(argv: any): Carta.Carta {
  const { id, name, manacost, color, timeline, rarity, rules, strength, loyalty, value} = argv
  const cardcolor = GetColorValue(color);
  const cardTimeline = GetTimeLineValue(timeline);
  const cardRarity = GetRarityValue(rarity);

  if (cardTimeline == 6) {
    const micarta: Carta.Carta = {
      ID: id,
      Name: name,
      ManaCost: manacost,
      Color: cardcolor,
      TimeLine: cardTimeline,
      Rarity: cardRarity,
      Rules: rules,
      Value: value,
      Loyalty: loyalty,
      Strength: undefined
    }
    return micarta;

  } else if (cardTimeline == 1) {
    const micarta: Carta.Carta = {
      ID: id,
      Name: name,
      ManaCost: manacost,
      Color: cardcolor,
      TimeLine: cardTimeline,
      Rarity: cardRarity,
      Rules: rules,
      Value: value,
      Strength: strength as [number, number],
      Loyalty: undefined
    }
    return micarta;
    
  } else {
    const micarta: Carta.Carta = {
      ID: id,
      Name: name,
      ManaCost: manacost,
      Color: cardcolor,
      TimeLine: cardTimeline,
      Rarity: cardRarity,
      Rules: rules,
      Value: value,
      Strength: undefined,
      Loyalty: undefined
    }
    return micarta;
  }
}
```

index.ts: Es el punto de entrada de la aplicación. Aquí se utilizan las librerías yargs y chalk para manejar la línea de comandos y dar formato a la salida por consola.

``` ts
// salida de consola
import chalk from 'chalk';

// api sincrona de node para leer ficheros
import fs from 'fs'

// linea de comandos
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// clases, interfaces, tipos ...
import * as Carta from './card.js'
import { CardManager } from './cardmanager.js';
import * as Functions from './functions.js'
import { exit } from 'process';

const log = console.log;

// pedimos los parámetros

yargs(hideBin(process.argv))

//-------------------------------------------ADD-------------------------------------------

.command('add', 'Añade una carta a la colección del usuario', {
  user: {
    description: 'nombre del usuario al que añadir la carta',
    type: 'string',
    demandOption: true
  },

  id: {
    description: 'Identificador de la carta',
    type: 'number',
    demandOption: true
  },

  name: {
    description: 'Nombre de la carta magic',
    type: 'string',
    demandOption: true
  },

  manacost: {
    description: 'Coste de mana para utilizar la carta',
    type: 'number',
    demandOption: true
  },

  color: {
    description: 'Color de la carta',
    type: 'string',
    choices: ['blanco', 'azul', 'negro', 'rojo', 'verde', 'incoloro', 'multicolor'],
    demandOption: true
  },

  timeline: {
    description: 'linea de tiempo de la carta',
    type: 'string',
    choices: ['tierra', 'criatura', 'encantamiento', 'conjuro', 'instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: true
  },

  rarity: {
    description: 'rareza de la carta',
    type: 'string',
    choices: ['comun', 'infrecuente', 'rara', 'mitica'],
    demandOption: true
  },

  rules: {
    description: 'texto de reglas de la carta',
    type: 'string',
    demandOption: true
  },

  strength: {
    description: 'fuerza y resistencia de la carta de tipo criatura. Formato: [fuerza, resistencia]',
    type: 'array',
    demandOption: false,
    coerce: (arg) => arg.map(Number),
    nargs: 2
  },

  loyalty: {
    description: 'marcas de lealtad que tiene un Planeswalker',
    type: 'number',
    default: undefined,
    demandOption: false
  },

  value: {
    description: 'valor de mercado de la carta',
    type: 'number',
    demandOption: true
  }

}, (argv) => {                // Elegimos que hacer con los parámetros introducidos

  try {
  
    // leemos las cartas del fichero y creamos el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    // Creamos la carta que queremos añadir y la añadimos
    log(chalk.green("Añadiendo carta a la colección del usuario " + argv.user))
    const myCard: Carta.Carta = Functions.CreateCard(argv);
    mymanager.addCard(myCard);
    log(chalk.green("Carta añadida con éxito"))

    // guardamos las cartas sobreescribiendo el fichero
    log(chalk.green("Guardando cartas ..."))
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Cartas guardadas con éxito ..."))
  
  } catch (error) {   // detección de errores
    log(chalk.red("Error al añadir la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }

})

//-------------------------------------------LIST-------------------------------------------

.command('list', 'lista las cartas de un usuario', {
  user: {
    description: 'nombre del usuario que tiene la colección que deseamos listar',
    type: 'string',
    demandOption: true
  }
}, (argv) => {
  
  try {
    
    // cargo las cartas del fichero y creo el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    //listo las cartas por consola
    log(chalk.green("Listando las cartas del usuario " + argv.user + " ..."))
    mymanager.listCards();
    log(chalk.green("\ncartas listadas con éxito ..."));

  } catch (error) { // detección de errores

    log(chalk.red('\nError al listar las cartas del usuario ' + argv.user + ":", error instanceof Error ? error.message : error));

  }

})

//-------------------------------------------UPDATE-------------------------------------------

.command('update', 'Actualiza la información de una carta', {
  user: {
    desciption: 'nombre del usuario al que le queremos actualizar una carta',
    type: 'string',
    demandOption: true
  },

  id: {
    desciption: 'id de la carta que queremos actualizar',
    type: 'number',
    demandOption: true
  },

  name: {
    description: 'Nombre de la carta magic',
    type: 'string',
    demandOption: false
  },

  manacost: {
    description: 'Coste de mana para utilizar la carta',
    type: 'number',
    demandOption: false
  },

  color: {
    description: 'Color de la carta',
    type: 'string',
    choices: ['blanco', 'azul', 'negro', 'rojo', 'verde', 'incoloro', 'multicolor'],
    demandOption: false
  },

  timeline: {
    description: 'linea de tiempo de la carta',
    type: 'string',
    choices: ['tierra', 'criatura', 'encantamiento', 'conjuro', 'instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: false
  },

  rarity: {
    description: 'rareza de la carta',
    type: 'string',
    choices: ['comun', 'infrecuente', 'rara', 'mitica'],
    demandOption: false
  },

  rules: {
    description: 'texto de reglas de la carta',
    type: 'string',
    demandOption: false
  },

  strength: {
    description: 'fuerza y resistencia de la carta de tipo criatura. Formato: [fuerza, resistencia]',
    type: 'array',
    demandOption: false,
    coerce: (arg) => arg.map(Number),
    nargs: 2
  },

  loyalty: {
    description: 'marcas de lealtad que tiene un Planeswalker',
    type: 'number',
    default: undefined,
    demandOption: false
  },

  value: {
    description: 'valor de mercado de la carta',
    type: 'number',
    demandOption: false
  },
}, (argv) => {

  try {
    
    // leo las cartas del fichero de usuario y creo el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    // actualizo la carta
    log(chalk.green("Actualizando la carta con id " + argv.id + " del usuario " + argv.user + " ..."))
    mymanager.updateCard(argv);
    log(chalk.green("Carta actualizada con éxito ..."));

    // guardo las cartas en el fichero del usuario
    log(chalk.green("Guardando cartas ..."));
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Cartas guardadas con éxito ..."));

  } catch (error) { // detección de errores
    log(chalk.red("Error al actualizar la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }


})

//-------------------------------------------READ-------------------------------------------

.command('read', 'Lee una carta de la colección de un usuario', {
  user: {
    description: 'Usuario que posee la carta',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'id de la carta a leer',
    type: 'number',
    demandOption: true
  }
}, (argv) => {

    try {
      
      // leo las cartas del fichero del usuario y creo el manejador
      log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
      const cards = Functions.LoadCards(argv.user);
      const mymanager = new CardManager(cards);
      log(chalk.green("Lectura realizada con éxito ..."));

      // leo la carta que se pide
      log(chalk.green("Leyendo la carta con id " + argv.id + " del usuario " + argv.user + " ..."))
      mymanager.readSpecificCard(argv.id);
      log(chalk.green("\nCarta leida con éxito ..."))

    } catch (error) { // detección de errores
    log(chalk.red("Error al leer la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }

})

//-------------------------------------------REMOVE-------------------------------------------

.command('remove', 'Elimina una carta de la colección de un usuario', {
  user: {
    description: 'Usuario que posee la carta a eliminar',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'id de la carta a eliminar',
    type: 'number',
    demandOption: true
  }
}, (argv) => {

  try {

    // leo las cartas del fichero del usuario y creo el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    // elimino la carta que se pide 
    log(chalk.green("Eliminando carta con id " + argv.id + " ..."))
    mymanager.removeCard(argv.id);
    log(chalk.green("\nCarta eliminada con éxito ..."));

    // sobreescribo los datos en el fichero
    log(chalk.green("Guardando cartas ..."))
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Cartas guardadas con éxito ..."))


  } catch (error) { // detección de errores
    log(chalk.red("Error al eliminar la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }

})

// ayuda al usuario
.help()
.argv
```

Funcionalidades Principales:

El sistema de gestión de cartas Magic implementado ofrece las siguientes funcionalidades principales:

**Agregar Carta (add):** Permite agregar una nueva carta a la colección de un usuario especificado. Se solicitan los datos de la carta como nombre, costo de maná, color, rareza, etc., y se añade a la colección.

**Listar Cartas (list):** Muestra por consola todas las cartas de un usuario especificado, junto con su información detallada como nombre, costo de maná, color, rareza, etc.

**Actualizar Carta (update):** Permite modificar la información de una carta existente en la colección de un usuario. Se pueden actualizar diversos campos como nombre, costo de maná, color, etc.

**Leer Carta Específica (read):** Muestra por consola la información detallada de una carta específica de un usuario, identificada por su ID.

**Eliminar Carta (remove**): Permite eliminar una carta específica de la colección de un usuario, identificada por su ID.

# Conclusión

El sistema de gestión de cartas Magic implementado proporciona una solución completa y eficiente para manejar las colecciones de cartas de los usuarios. El uso de enums y funciones utilitarias facilita la manipulación de los datos relacionados con las cartas. Este sistema puede ser ampliado y mejorado para incluir nuevas funcionalidades según las necesidades del usuario