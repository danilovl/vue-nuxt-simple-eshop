import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library, config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {
    faHeart as faHeartRegular,
    faStar as faStarRegular
} from '@fortawesome/free-regular-svg-icons'
import {
    faArrowLeft,
    faArrowRight,
    faBagShopping,
    faBoxOpen,
    faCartShopping,
    faCheck,
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faEye,
    faGlobe,
    faHeart,
    faHouse,
    faLock,
    faMagnifyingGlass,
    faMinus,
    faMoon,
    faPen,
    faPlus,
    faReceipt,
    faRightFromBracket,
    faRotateLeft,
    faShieldHalved,
    faStar,
    faSun,
    faTrashCan,
    faTriangleExclamation,
    faTruckFast,
    faUser,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

// The CSS is imported above; injecting it at runtime would make SSR render huge unstyled icons.
config.autoAddCss = false

library.add(
    faHeartRegular,
    faStarRegular,
    faArrowLeft,
    faArrowRight,
    faBagShopping,
    faBoxOpen,
    faCartShopping,
    faCheck,
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faEye,
    faGlobe,
    faHeart,
    faHouse,
    faLock,
    faMagnifyingGlass,
    faMinus,
    faMoon,
    faPen,
    faPlus,
    faReceipt,
    faRightFromBracket,
    faRotateLeft,
    faShieldHalved,
    faStar,
    faSun,
    faTrashCan,
    faTriangleExclamation,
    faTruckFast,
    faUser,
    faXmark
)

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
