export const StorageKey = {
    USER: "user",
    TOKEN: "token",
    TOKEN_TYPE: "token_type",
    TOKEN_EXPIRATION: "tokenExpiration",
    RECENTLY_ACCOUNTS: "recentlyAccounts",
};

export const isDevelopmentMode = process.env.NODE_ENV === "development";
export const DEFAULT_SEARCH_DEBOUNCE = 1500;
