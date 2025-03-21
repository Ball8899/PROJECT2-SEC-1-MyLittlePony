async function getItems(url) {
    try {
        const data = await fetch(url)
        const finalData = await data.json()
        return finalData
    } catch (error) {
        console.error(error)
    }
}
export {getItems}