import type {RouterOptions} from '@nuxt/schema'

export default <RouterOptions>{
    routes(originalRoutes) {
        return [
            {
                path: '',
                meta: {
                    display: true,
                    title: 'Main Menu'
                },
                component: (): Promise<any> => import('~/layout/Main.vue'),
                children: [
                    {
                        path: '',
                        name: 'home',
                        meta: {
                            display: true,
                            title: 'Home Page - Example App'
                        },
                        component: (): Promise<any> => import('~/page/Home.vue')
                    },
                    {
                        path: 'products',
                        component: (): Promise<any> => import('~/layout/Default.vue'),
                        children: [
                            {
                                path: '/',
                                name: 'product_list',
                                meta: {
                                    display: true,
                                    title: 'Product list'
                                },
                                component: (): Promise<any> => import('~/page/Home.vue')
                            },
                            {
                                path: 'detail/:id(\\d+)',
                                name: 'product_detail',
                                meta: {
                                    display: true,
                                    title: 'Product detail'
                                },
                                component: (): Promise<any> => import('~/page/product/ProductDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/cart',
                        name: 'cart',
                        meta: {
                            display: true,
                            title: 'Shopping cart '
                        },
                        component: (): Promise<any> => import('~/page/cart/ShoppingCart.vue')
                    },
                    {
                        path: '/favorite',
                        name: 'favorite',
                        meta: {
                            display: true,
                            title: 'Favorite cart '
                        },
                        component: (): Promise<any> => import('~/page/favorite/FavoriteCart.vue')
                    },
                    {
                        path: '/order',
                        name: 'order',
                        meta: {
                            display: true,
                            title: 'Checkout cart '
                        },
                        component: (): Promise<any> => import('~/page/order/Order.vue')
                    },
                    {
                        path: '/order-thanks',
                        name: 'order_thanks',
                        meta: {
                            display: true,
                            title: 'Order thanks'
                        },
                        component: (): Promise<any> => import('~/page/order/OrderThanks.vue')
                    },
                    {
                        path: '/login',
                        name: 'login',
                        component: (): Promise<any> => import('~/page/admin/Authentication.vue')
                    },
                    {
                        path: '/admin',
                        name: 'admin',
                        component: (): Promise<any> => import('~/page/admin/Admin.vue'),
                        beforeEnter(to, from, next) {
                            if (process.client) {
                                const loggedIn = localStorage.getItem('user-token')
                                if (!loggedIn) {
                                    next('/login')
                                }
                            }

                            next()
                        },
                        children: [
                            {
                                path: 'products/:op(create|edit)/:id(\\d+)?',
                                name: 'admin_product',
                                meta: {
                                    display: true,
                                    title: 'Admin create/edit'
                                },
                                component: (): Promise<any> => import('~/page/admin/ProductEditor.vue')
                            },
                            {
                                path: 'products',
                                name: 'admin_product_list',
                                meta: {
                                    display: true,
                                    title: 'Admin product list'
                                },
                                component: (): Promise<any> => import('~/page/admin/ProductAdmin.vue')
                            },
                            {
                                path: 'orders',
                                name: 'admin_order_list',
                                meta: {
                                    display: true,
                                    title: 'Admin order list'
                                },
                                component: (): Promise<any> => import('~/page/admin/OrderAdmin.vue')
                            }
                        ]
                    }
                ]
            },
            {
                path: '',
                meta: {
                    display: false
                },
                component: (): Promise<any> => import('~/layout/Main.vue'),
                children: [
                    {
                        path: '/error',
                        name: 'error',
                        meta: {
                            display: false,
                            title: 'Error Page'
                        },
                        component: (): Promise<any> => import('~/page/Error404.vue')
                    }
                ]
            },
            {
                path: '/:pathMatch(.*)*',
                redirect: '/error'
            }
        ]
    }
}
