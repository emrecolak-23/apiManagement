# Api Key Management App

# Backend Node.js

In this project, I use node.js for backend. I select using MVC design pattern and this include application data model and controllers. Also programming done according to ecma script 6 standards so i benefit from babal packages to transform node.js into ecma6 

## Some Packages Used in Node.js
```
    "@babel/cli": "^7.17.6",
    "@babel/core": "^7.17.9",
    "@babel/node": "^7.16.8",
    "@babel/preset-env": "^7.16.11",
    "axios": "^0.26.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "ip": "^1.1.5",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.3.1",
    "morgan": "^1.10.0",
    "slugify": "^1.6.5"
```


# Front End Vue.js
In this project i use Vue3 and composition api for front end. Also i benefit from vuex and vue-router.

## Some Packages Used in Vue.js
```
    "axios": "^0.26.1",
    "core-js": "^3.8.3",
    "jsonwebtoken": "^8.5.1",
    "vue": "^3.2.13",
    "vue-router": "^4.0.3",
    "vuex": "^4.0.0"
```

You can see folder structure below


```
app/
    ├── server/
    │   ├── controllers/
    │   │   ├── AppController.js
    │   │   ├── AuthController.js
    │   │   ├── LogController.js
    │   │   └── RequestController.js
    │   ├── middlewares/
    │   │   ├── apiKey.js
    │   │   ├── unique.js
    │   │   └── validate.js
    │   ├── models/
    │   │   ├── appLogModels.js
    │   │   ├── appModels.js
    │   │   └── logModels.js
    │   ├── routes/
    │   │   ├── AppRoutes.js
    │   │   ├── AuthRoutes.js
    │   │   ├── LogRoutes.js
    │   │   └── ReqRoutes.js
    │   ├── utils/
    │   │   └── index.js
    │   ├── validations/
    │   │   └── App.js
    │   └── app.js
    └── client/
        ├── public/
        │   ├── scripts/
        │   │   ├── bilboard.js
        │   │   └── scripts.js
        │   ├── styles/
        │   │   ├── bilboard.css
        │   │   └── styles.css
        │   └── index.html
        └── src/
            ├── assets/
            │   └── logo.png
            ├── components/
            │   ├── Account/
            │   │   ├── AccountActivities.vue
            │   │   └── AccountSettings.vue
            │   ├── Api/
            │   │   ├── ApiCreate.vue
            │   │   ├── ApiDetail.vue
            │   │   ├── ApiError.vue
            │   │   └── ApiList.vue
            │   ├── Dashboard/
            │   │   └── DashboardContent.vue
            │   ├── Home/
            │   │   ├── BaseContent.vue
            │   │   ├── BreadCrumb.vue
            │   │   └── SideBar.vue
            │   └── Shared/
            │       ├── AppAlert.vue
            │       ├── appHeader.vue
            │       └── AppModal.vue
            ├── router/
            │   └── index.js
            ├── store/
            │   ├── modules/
            │   │   ├── app.js
            │   │   ├── auth.js
            │   │   └── log.js
            │   ├── contant.js
            │   └── index.js
            ├── utils/
            │   └── index.js
            ├── views/
            │   ├── HomeView.vue
            │   └── LoginView.vue
            ├── App.vue
            └── main.js
```

