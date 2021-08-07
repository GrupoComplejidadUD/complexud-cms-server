# Complexud Cms Server

Servidor de gestión de contenido del grupo complejidad de la Universidad Distrital Francisco José de Caldas.

## Comenzando 🚀

Para obtener una copia del proyecto basta con descargar los archivos comprimidos (_zip_) o clonar el repositorio mediantemediante:

```bash
git clone https://github.com/complexUD/complexud-cms-server.git
```

### Pre-requisitos 📋

Para correr el proyecto es necesario tener instalado [nodejs v14](https://nodejs.org/es/download/) y npm (_viene al instalar nodejs_) en su máquina

También es necesario un archivo llamado **".env"** en la raiz del proyecto con las variables de entorno secretas necesarias para establecer la conexión con base datos y el repositorio de imagenes.

### Instalación 🔧

Una vez instalado nodejs se debe situar en la carpeta del proyecto y ejecutar los siguientes comandos (_uno a la vez_):

```bash
npm install
npm run build
npm start
```

Si se desea levantar el servidor en modo desarrollo para realizar modificaciones en el código entonces ejecute:

```bash
npm run develop
```

## Despliegue 📦

Cualquier modificación que se realice en el código que se suba o se mezcle con la rama **master** hará que se despliegue automáticamente el servidor en [heroku](https://dashboard.heroku.com/appshttps://dashboard.heroku.com/apps)

## Construido con 🛠️

- [Strapi](https://strapi.io/) - CMS sin cabeza para la gestión de los datos e imagenes del grupo.
- [React](https://es.reactjs.org/) - Librería para la construcción de la interfaz de usuario

## Guia de Uso 📖

Puedes encontrar toda la información sobre cómo utilizar este proyecto en nuestra [Wiki](https://github.com/complexUD/complexud-cms-server/wiki), Adicionalmente puedes encontrar más información sobre Strapi en su [guia de usuario](https://strapi.io/documentation/user-docs/latest/getting-started/introduction.html)

## Versionado 📌

Usamos versionamiento basado en la api, si se realizan cambios en el api del servidor se generará una nueva versión mayor, mientras que cualquier corrección de errores agregará una versión menor. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/complexUD/complexud-cms-server/tags).

## Autores ✒️

- **Edison Peñuela** - _Trabajo Inicial y Personalización_ - [edisonpem](https://github.com/edisonpem)
- **Tatiana Velandia** - _Descripción de Datos y Relaciones_ - [tayay](https://github.com/tatyay)
