let idUpdate
let id
document.addEventListener('DOMContentLoaded', () => {
    idUpdate = location.search.substring(1).split("&")
    id = idUpdate[0].substring(3, idUpdate[0].length)
    getUser(id)
    console.log('@@@ idUpdate => ', idUpdate)
})

const getUser = async (id) => {
    const user = await fetch(`http://localhost:9000/get-update/${id}`)
    const result = await user.json()
    console.log('@@@ result => ', result)
}