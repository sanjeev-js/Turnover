export function asyncWrap(promise) {
    return promise.then((result) => [null, result]).catch((err) => [err]);
}

export function getUrl() {
    if (process.env.NODE_ENV === "production") {
        return `${window.location.origin}/api`;
    }
    return import.meta.env.VITE_BACKEND;
}