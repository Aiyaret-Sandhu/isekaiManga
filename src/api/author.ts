/********************
 * IMPORT STATEMENTS
 ********************/

import type { AuthorList, AuthorResponse, AuthorCreate, AuthorEdit, Response, ReferenceExpansionAuthor } from './schema';
import type { Order } from './static';
import * as util from './util';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Order object for GetAuthorRequestOptions */
export type GetAuthorOrder = {
    name?: Order
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /author` */
export type GetAuthorRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 0
     * Maximum: 100
     * ```*/
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
    /**
     * UUID formatted strings
     * 
     * Author IDs (limited to 100 per request)
     */
    ids?: string[]
    name?: string
    order?: GetAuthorOrder
    includes?: ReferenceExpansionAuthor
};

/** Response from `GET /author` */
export type GetAuthorResponse = AuthorList;

/** Request parameters for `GET /author/{id}` */
export type GetAuthorIdRequestOptions = {
    includes?: ReferenceExpansionAuthor
};

/** Request parameters for `POST /author` */
export type PostAuthorRequestOptions = AuthorCreate;

/** Response from `POST /author` */
export type PostAuthorResponse = AuthorResponse;

/** Response from `GET /author/{id}` */
export type GetAuthorIdResponse = AuthorResponse;

/** Request parameters for `PUT /author/{id}` */
export type PutAuthorIdRequestOptions = AuthorEdit;

/** Response from `PUT /author/{id}` */
export type PutAuthorIdResponse = AuthorResponse;

/** Response from `DELETE /author/{id}` */
export type DeleteAuthorIdResponse = Response;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Search for author based on search criteria
 * 
 * @param {GetAuthorRequestOptions} [options] See {@link GetAuthorRequestOptions}
 * @returns A promise that resolves to a {@link GetAuthorResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const getAuthor = function (options?: GetAuthorRequestOptions) {
    const qs = util.buildQueryStringFromOptions(options);
    const path = `/author${qs}`;

    return util.createHttpsRequestPromise<GetAuthorResponse>('GET', path);
};


/**
 * Get author info by ID
 * 
 * @param {string} id UUID formatted string
 * @param {GetAuthorIdRequestOptions} [options] See {@link GetAuthorIdRequestOptions}
 * @returns A promise that resolves to a {@link GetAuthorIdResponse} object.
 * Can also resolve to an {@link ErrorResponse} object.
 */
export const getAuthorId = function (id: string, options?: GetAuthorIdRequestOptions) {
    if (id === undefined) {
        return Promise.reject('ERROR - getAuthorId: Parameter `id` cannot be undefined');
    } else if (id === '') {
        return Promise.reject('ERROR - getAuthorId: Parameter `id` cannot be blank');
    }

    const qs = util.buildQueryStringFromOptions(options);
    const path = `/author/${id}${qs}`;

    return util.createHttpsRequestPromise<GetAuthorIdResponse>('GET', path);
};

