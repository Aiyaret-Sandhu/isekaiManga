import { GetSearchMangaOrder, GetSearchMangaRequestOptions } from "@/api/manga";
import { Order } from "@/api/static";

export default function buildQueryString(options: GetSearchMangaRequestOptions): string {
    const queryParams = [];

    if (options === undefined || Object.keys(options).length === 0) {
        return '';
    }

    for (const key of Object.keys(options)) {
        if (options[key as keyof GetSearchMangaRequestOptions] instanceof Array) {
            queryParams.push(transformArrayForQueryString(key, options[key as keyof GetSearchMangaRequestOptions] as string[]));
        } else if (key === 'order') {
            const order = options[key];
            if (order !== undefined) {
                for (const o of Object.keys(order)) {
                    queryParams.push(`order[${o}]=${order[o as keyof GetSearchMangaOrder] as Order}`);
                }
            }
        } else {
            queryParams.push(`${key}=${options[key as keyof GetSearchMangaRequestOptions] as string}`);
        }
    }

    const ret = `?${queryParams.join('&')}`;
    return ret === '?' ? '' : ret;
}

const transformArrayForQueryString = function (name: string, array: string[]) {
    let qs = '';

    for (const s of array) {
        if (qs === '') {
            qs += `${name}[]=${s}`;
        } else {
            qs += `&${name}[]=${s}`;
        }
    }

    return qs;
};