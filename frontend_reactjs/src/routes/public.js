 import config from "~/config";
 
 
 import Home from "~/pages/Home";
 import Detail from "~/pages/Detail";
 import Profile from "~/pages/Profile";

 const publicRoutes = [
    {path : '/', component: Home},
    {path :  config.routes.home ,component: Home},
    {path :  config.routes.detail, component: Detail},
    {path :  config.routes.profile, component: Profile}
]
const privateRoutes = []

export{publicRoutes, privateRoutes}