const btnUpdate = document.getElementById('btnUpdate')
const btnCancel = document.getElementById('btnCancel') // Agregamos el botón "Cancel"
let idUpdate
let id

document.addEventListener('DOMContentLoaded', () => {
    idUpdate = location.search.substring(1).split("&")
    id = idUpdate[0].substring(3, idUpdate[0].length)
    getUser(id)
})

btnCancel.addEventListener('click', (e) => {
    e.preventDefault()
    // Redirigir al index sin hacer cambios
    window.location.replace('/')
})

btnUpdate.addEventListener('click', (e) => {
    e.preventDefault()
    // Agregar confirmación antes de actualizar
    const confirmation = confirm('¿Seguro que deseas actualizar este usuario?')
    if (confirmation) {
        const firstname = document.getElementById('firstname').value
        const lastname = document.getElementById('lastname').value
        const address = document.getElementById('address').value // Corrección aquí
        const phone = document.getElementById('phone').value
        const city = document.getElementById('city').value
        const cp = document.getElementById('zipcode').value

        if (firstname.trim().length !== 0 && lastname.trim().length !== 0) {
            const obj = {
                id,
                firstname,
                lastname,
                address, // Corrección aquí
                phone,
                city,
                cp
            }

            fetch('http://localhost:9000/update', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(async (res) => {
                const result = await res.json()
                if (result.msg === 'success') {
                    window.location.replace('/')
                }
            }).catch((error) => {
                console.log('@@@@@ error => ', error)
            })
        }
    }
})

const getUser = async (id) => {
    const user = await fetch(`http://localhost:9000/get-update/${id}`)
    const result = await user.json()
    if (result.msg === 'success') {
        loadDataUser(result.data)
    } else {
        alert('User Not Found')
    }
}

const loadDataUser = (user) => {
    const id = document.getElementById('id')
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const address = document.getElementById('address')
    const phone = document.getElementById('phone')
    const city = document.getElementById('city')
    const zipcode = document.getElementById('zipcode')

    id.value = id
    firstname.value = user.firstname
    lastname.value = user.lastname
    address.value = user.address
    phone.value = user.phone
    city.value = user.city
    zipcode.value = user.cp
}