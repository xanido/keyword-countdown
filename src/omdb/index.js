import omdb from "omdb-client"
import promisify from "../util/promisify"

/**
 * Expose the omdb API as a promise-based API
 */
export default {
    get: promisify(omdb.get),
    search: promisify(omdb.search)
}