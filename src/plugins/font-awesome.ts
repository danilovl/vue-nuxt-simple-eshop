import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faMoneyBill1} from '@fortawesome/free-regular-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {faDollarSign} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faMinus} from '@fortawesome/free-solid-svg-icons'
import {faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import {faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin(nuxtApp => {
    library.add(faHeart)
    library.add(faMoneyBill1)
    library.add(faCartShopping)
    library.add(faDollarSign)
    library.add(faPlus)
    library.add(faMinus)
    library.add(faAnglesRight)
    library.add(faScrewdriverWrench)
    library.add(faStar)
    library.add(faHouse)
    library.add(faRightFromBracket)

    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
