 import config from "~/config";
 
 
 import Home from "~/pages/Home";
 import Detail from "~/pages/Detail";
 import Profile from "~/pages/Profile";
 import Login from "~/pages/Login/Login";
 import Signup from "~/pages/Signup/Signup";
import AuthenLayout from "~/layouts/AuthenLayout";

 const publicRoutes = [
    {path : '/', component: Home},
    {path :  config.routes.home ,component: Home},
    {path :  config.routes.detail, component: Detail},
    {path :  config.routes.profile, component: Profile},
    {path :  config.routes.login, component: Login, layout : AuthenLayout},
    {path :  config.routes.signup, component: Signup, layout : AuthenLayout}
]
const privateRoutes = [
    
]

export{publicRoutes, privateRoutes}