# Oneiric Chat

## Description
Vue 3 + Node chat with rooms using socket.io library

## Project Setup

### Server-side
#### Create a local copy of env.template in ./server-side directory
```
PORT=3000
```

#### Install dependencies
```
npm install
```

#### Run development server
```
npm run dev
```

### Client-side

#### Create a local copy of env.local.template in ./client-side directory
```
VUE_APP_SERVER_HOST='http://localhost:3000'
```

#### Install dependencies
```
npm install
```

#### Run development server
```
npm run serve
```

## Dependencies
- npm: 14.17.0
### Server-side
- dotenv: ^10.0.0
- express: ^4.17.1
- moment: ^2.29.1
- socket.io: ^4.3.1
- dev dependencies:
    * nodemon: ^2.0.14

### Client-side
- core-js: ^3.6.5
- socket.io-client: ^4.3.2
- vue: ^3.0.0
- vue-router: ^4.0.0-0
- vue3-cookies: ^1.0.1
- dev dependencies:
    * @vue/cli-plugin-babel: ~4.5.0
    * @vue/cli-plugin-eslint: ~4.5.0
    * @vue/cli-plugin-router: ~4.5.0
    * @vue/cli-service: ~4.5.0
    * @vue/compiler-sfc: ^3.0.0
    * babel-eslint: ^10.1.0
    * eslint: ^6.7.2"
    * eslint-plugin-vue: ^7.0.0
    * less: ^4.1.2
    * less-loader: ^7.3.0

## TODO
- [ ] Squash bugs related to cookies based validation
- [ ] Implement MongoDB for room chat history and user validation
- [ ] Review styling of room layout (pretty rough at the moment)