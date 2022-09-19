const handleForm = () => {
    const validation = new window.JustValidate('#form')

    validation
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Email is required',
            },
            {
                rule: 'email',
                errorMessage: 'The email is invalid!',
            },
        ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Password is required',
            },
            {
                rule: 'password',
            },
        ])
        .onSuccess((event) => {
            const email = event.target.querySelector('[name="email"]')
            const password = event.target.querySelector('[name="password"]')

            const data = {
                email: email.value,
                password: password.value,
            }

            console.log(data)
        })
}

const handleShowWidget = () => {
    const renderWidget = (data) =>
        data
            .map(
                ({ date, name }) => `<li class="login__item">
        <p class="login__date">${date}</p>
        <h6 class="login__holiday">${name}</h2>
    </li>`
            )
            .join('')

    const fetchHolidayData = async () => {
        const url = 'https://date.nager.at/api/v3/publicholidays/2022/US'
        try {
            const res = await fetch(url)
            return await res.json()
        } catch (error) {
            console.log(error)
        }
    }

    const showWidget = async () => {
        const data = await fetchHolidayData()
        const widget = renderWidget(data)

        document.getElementById('list').innerHTML = widget
    }

    showWidget()
}

document.addEventListener('DOMContentLoaded', () => {
    handleForm()
    handleShowWidget()
})
