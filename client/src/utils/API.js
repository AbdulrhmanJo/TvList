export function handleInitialData() {
    return fetch("/movies")
        .then(res => res.json())
}