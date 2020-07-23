export const SEARCH = "SEARCH"


export function search(token) {
    return {
        type: SEARCH,
        search: token
    }
}