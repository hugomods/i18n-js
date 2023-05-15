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
        return this.translations[lang] ?? this.getFallbackTranslations()
    }
    
    private getFallbackTranslations() {
        return this.translations[this.fallback]
    }

    private getFallbackTranslation(key: string) {
        const translations = this.getFallbackTranslations()
        return translations[key] ?? ''
    }

    translate(key: string, ctx?: Context, fallback = ''): string {
        const translations = this.getTranslations()
        if (!translations) {
            return fallback === '' ? key : fallback
        }

        const translation = translations[key] ?? this.getFallbackTranslation(key)
        if (!translation) {
            return fallback === '' ? key : fallback
        }

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
