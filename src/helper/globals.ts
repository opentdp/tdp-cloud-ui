export { }

window.addEventListener("unhandledrejection", event => {

    event.preventDefault()
    console.warn(event.reason)

})
