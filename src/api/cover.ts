/********************
 * IMPORT STATEMENTS
 ********************/

import { CoverEdit, CoverList, CoverResponse, ReferenceExpansionCoverArt, Response } from './schema';
import { Order } from './static';
import * as util from './util';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Order object for GetCoverRequestOptions */
export type GetCoverOrder = {
    createdAt: Order
    updatedAt: Order
    volume: Order
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /cover` */
export type GetCoverRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 0
     * Maximum: 100
     * ``` */
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
    /**
     * UUID formatted strings
     * 
     * Limit of 100 per request
     */
    manga?: string[]
    /**
     * UUID formatted strings
     * 
     * Limit of 100 per request
     */
    ids?: string[]
    /**
     * UUID formatted strings
     * 
     * Limit of 100 per request
     */
    uploaders?: string[]
    /**
     * Pattern: ^[a-z]{2}(-[a-z]{2})?$
     * 
     * Limit of 100 per request
     */
    locales?: string[]
    order?: GetCoverOrder
    includes?: ReferenceExpansionCoverArt
};

/** Response from `GET /cover` */
export type GetCoverResponse = CoverList;

/** Request parameters for `GET /cover/{mangaOrCoverId}` */
export type GetCoverIdRequestOptions = {
    includes?: ReferenceExpansionCoverArt
};

/** Response from `GET /cover/{mangaOrCoverId}` */
export type GetCoverIdResponse = CoverResponse;

/** Request parameters for `PUT /cover/{mangaOrCoverId}` */
export type EditCoverRequestOptions = CoverEdit;

/** Response from `PUT /cover/{mangaOrCoverId}` */
export type EditCoverResponse = CoverResponse;

/** Response from `DELETE /cover/{mangaOrCoverId}` */
export type DeleteCoverResponse = Response;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Search for manga covers based on some search criteria.
 * 
 * @param {GetCoverRequestOptions} [options] See {@link GetCoverRequestOptions}
 * @returns A promise that resolves to a {@link GetCoverResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const getCover = function (options?: GetCoverRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/cover${qs}`;

    return util.createHttpsRequestPromise<GetCoverResponse>('GET', path);
};

/**
 * Get manga cover art by ID.
 * 
 * @param {string} id UUID formatted string.
 * @param {GetCoverIdRequestOptions} [options] See {@link GetCoverIdRequestOptions}
 * @returns A promise that resolves to a {@link GetCoverIdResponse} object.
 * Can also reject to an {@link ErrorResponse} object.
 */
export const getCoverId = function (id: string, options?: GetCoverIdRequestOptions) {
    if (id === undefined) {
        return Promise.reject('ERROR - getCoverId: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - getCoverId: Parameter `id` cannot be blank');
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/cover/${id}${qs}`;

    return util.createHttpsRequestPromise<GetCoverIdResponse>('GET', path);
};