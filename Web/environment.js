/**
 * @file Environment / ES module
 * @module environment
 * @author Surmon <https://github.com/surmon-china>
 */

export const environment = process.env
export const NODE_ENV = environment.NODE_ENV
export const isDevMode = Object.is(NODE_ENV, 'development')
export const isProdMode = Object.is(NODE_ENV, 'production')

export const isStatic = process && process.static
export const isServer = process && process.server
export const isBrowser = process && process.browser
export const isModern = process && process.modern


export const Api_Domain = isDevMode ? "http://127.0.0.1:9991/" : "http://guipie.com:90/";
export const File_Domain = isDevMode ? "http://127.0.0.1:9991/" : "http://guipie.com:90/";
export const GetFileUrl = (url) => {
    return (url || "").startsWith("http") ? url : File_Domain + url;
};