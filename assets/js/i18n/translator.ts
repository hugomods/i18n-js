import { Context, Language, Translations } from "./types"

export default class Translator {
    private lang = ''

    constructor(private translations: Translations, private fallback: Language) {
    }

    private getLang() {
        if (this.lang === '') {
            this.lang = document.documentElement.getAttribute('lang') ?? this.fallback
        }

        return this.lang
    }

    translate(key: string, ctx?: Context): string {
        const lang = this.getLang()
        if (!(lang in this.translations) || !(key in this.translations[lang])) {
            return ''
        }

        const translation = this.translations[lang][key]

        if (!ctx) {
            return translation.other
        }

        let format = ctx.count === 1 ? translation.one : translation.other
        for (let name in ctx) {
            format = format.replace(`{${name}}`, ctx[name])
        }

        return format
    }
}
