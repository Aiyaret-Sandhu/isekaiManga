/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/********************
 * IMPORT STATEMENTS
 ********************/

import axios, { AxiosRequestConfig } from 'axios';
import Config from '@/config'

/*******************
 * TYPE DEFINITIONS
 *******************/

/** HTTPS request options with an optional body property */
// export type AxiosRequestConfig = https.AxiosRequestConfig & {
//     body?: object
// };

/************************
 * CONSTANT DECLARATIONS
 ************************/

const MANGADEX_API_URL = 'https://api.mangadex.org';
const CORS = Config.CORS

/************************
* FUNCTION DECLARATIONS
************************/

/**
 * Transform an array of strings to query string params of the form
 * `name[]=value1&name[]=value2` etc
 * 
 * @param {string} name
 * @param {string[]} [array]
 * @returns {string} Formatted query string params
 */
const transformArrayForQueryString = function (name: string, array?: string[]) {
    let qs = '';

    if (array === undefined || array.length === 0) {
        return qs;
    }

    for (const s of array) {
        if (qs === '') {
            qs += `${name}[]=${s}`;
        } else {
            qs += `&${name}[]=${s}`;
        }
    }

    return qs;
};

/**
 * Build a query string from a request options object.
 * 
 * @param {object} [options] A request options object to parse
 * @returns {string} The query string, including the starting '?' character
 */
export const buildQueryStringFromOptions = function (options?: { [key: string]: any }) {
    const queryParams = [];

    if (options === undefined || Object.keys(options).length === 0) {
        return '';
    }

    for (const key of Object.keys(options)) {
        if (options[key] instanceof Array) {
            queryParams.push(transformArrayForQueryString(key, options[key] as string[]));
        } else if (options[key] instanceof Date) {
            if (!isNaN(options[key] as number)) {
                /** @type {Date} */
                const d = options[key] as Date;
                queryParams.push(`${key}=${d.toISOString().substring(0, d.toISOString().indexOf('.'))}`);
            }
        } else if (key === 'order') {
            const order = options[key];

            for (const o of Object.keys(order)) {
                queryParams.push(`order[${o}]=${order[o]}`);
            }
        } else {
            queryParams.push(`${key}=${options[key]}`);
        }
    }

    const ret = `?${queryParams.join('&')}`;
    return ret === '?' ? '' : ret;
};

/**
 * @template T
 * @param {string} method The HTTP method.
 * @param {string} path The endpoint path.
 * @param {AxiosRequestConfig} [options] Additional request options (such as request body, headers, etc.)
 * @returns A promise that resolves to a specific response object T.
 */
export const createHttpsRequestPromise = function <T>(method: string, path: string, options?: AxiosRequestConfig) {
    if (method === undefined) {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `method` cannot be undefined');
    } else if (method === '') {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `method` cannot be blank');
    } else if (path === undefined) {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `path` cannot be undefined');
    } else if (path === '') {
        return Promise.reject('ERROR - createHttpsRequestPromise: Parameter `path` cannot be blank');
    }

    const encodedUrl = btoa(`${MANGADEX_API_URL}${path}`).replace(/\+/g, "-").replace(/\//g, "_")
    console.log('call api...', path, encodedUrl)
    const headers = new Headers()
    headers.set('x-requested-with', 'cubari')
    const httpsRequestOptions: AxiosRequestConfig = {
        method: method,
        url: `${CORS}/v1/cors/${encodedUrl}`,
        headers: {
            'x-requested-with': 'cubari',
        }
    };

    if (options && ('body' in options)) {
        delete options.body;
    }

    // merge the options object if it was provided
    if (options) {
        Object.assign(httpsRequestOptions, options);
    }

    return new Promise<{ data: T, statusCode?: number, statusMessage?: string }>((resolve) => {
        axios(httpsRequestOptions).then(res => {
            const resObj = {
                data: res.data,
                statusCode: res.status,
                statusMessage: res.statusText,
            }
            resolve(resObj)
        }).catch(err => console.log(err))
    });
};
