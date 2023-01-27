const routes = {
    home: '/home',
    profile: '/profile',
    detail : '/detail',
    detailId: '/detail/:id',
    contact: '/contact',
    login: '/login',
    signup: '/signup',
    forgot: '/forgot',
    change: '/change',
    cart: '/cart',
    bookmark: '/bookmark',
    product: '/product',
    search: '/search/',
    changePassword: '/profile/changePass',
    order: '/order',
    orderSuccess: '/order/success/:token',
    //Admin route
    adminHome: '/admin-home',
    //Admin Product
    adminProduct: '/admin-product',
    adminProductInsert: '/admin-product-insert',
    adminProductUpdate: '/admin-product-update',
    //Admin Order
    adminOrder: '/admin-order',
    adminOrderUpdate: '/admin-order-update',
    //Admin User
    adminUser: '/admin-user',
    adminUserInsert: '/admin-user-insert',
    adminUserUpdate: '/admin-user-update'
    
};

export default routes;
