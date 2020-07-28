import store from '@/store/store'

import ru from "@/locale/ru"
import en from "@/locale/en"

const locales = {  
    'ru-RU': ru, 
    'en-US': en
}

export default function localizeFilter(key){
    const locale = store.getters.info.locale || 'ru-RU' 
    console.log(locales[locale])
    return locales[locale][key] || `[localize error]: key ${key} not found`
}