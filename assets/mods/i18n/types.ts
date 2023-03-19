export type Language = string

export type Translation = {
    one?: string,
    other: string,
}

export type Translations = Record<Language, Translation>

export type Context = Record<string, number | string>
