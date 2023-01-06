import { Context, Language, Translations } from "./types"

export default class Translator {
    private lang = ''

    constructor(private translations: Translations, private fallback: Language) {
    }

    private getLang(): string {
        if (this.lang === '') {
            this.lang = document.documentElement.getAttribute('lang') ?? this.fallback
        }

        return this.lang
    }

    private getTranslations() {
        const lang = this.getLang()
        return lang in this.translations ? this.translations[this.getLang()] : this.translations[this.fallback]
    }

    private getFallbackTranslation(key: string) {
        return this.translations[this.fallback][key] ?? ''
    }

    translate(key: string, ctx?: Context): string {
        const translations = this.getTranslations()
        const translation = translations[key] ?? this.getFallbackTranslation(key)

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
