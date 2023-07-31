function stripPrefixes(obj) {
    return Object.entries(obj).reduce((p, [key, value]) => {
        p[key.split('/').slice(-1)[0].replace('.json', '')] = value;
        return p
    }, {})
}

export const locales = stripPrefixes(import.meta.glob("/node_modules/bytemd/locales/*.json", { eager: true }));
export const gfmLocales = stripPrefixes(
    import.meta.glob("/node_modules/@bytemd/plugin-gfm/locales/*.json", {
        eager: true,
    })
);
export const mathLocales = stripPrefixes(
    import.meta.glob("/node_modules/@bytemd/plugin-math/locales/*.json", {
        eager: true,
    })
);
export const mermaidLocales = stripPrefixes(
    import.meta.glob("/node_modules/@bytemd/plugin-mermaid/locales/*.json", {
        eager: true,
    })
);

