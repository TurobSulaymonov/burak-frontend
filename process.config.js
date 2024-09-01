module.exports = {
   apps : [{
     name   : "BURAKK-REACT",
     args: "run start:prod",
     cwd: "C:/Users/User/OneDrive/Рабочий стол/burakk-react",
     script : "./build",
     false: false,
     env_production: {
        NODE_ENV: "production"
     },
     env_development: {
        NODE_ENV: "development"
     },
     instances: 1,
     exec_mode: "cluster" 
   }]
 }