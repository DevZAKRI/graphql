export const userinfo = (user) => {
    let ctr = document.createElement('div')
    ctr.classList.add("container")

    const createRow = (labelText, valueText, valueClass) => {
        let row = document.createElement('div')
        row.classList.add('row')

        let label = document.createElement('div')
        label.classList.add('label')
        label.innerText = labelText

        let value = document.createElement('div')
        value.classList.add(valueClass)
        value.innerText = valueText

        row.append(label, value)
        return row
    }

    ctr.append(
        createRow('Username:', user.login, 'username'),
        createRow('Full Name:', `${user.firstName} ${user.lastName}`, 'fullName'),
        createRow('City:', user.city, 'city'),
        createRow('Campus:', user.campus, 'campus'),
        createRow('Created At:', new Date(user.createdAt).toLocaleDateString(), 'createdAt'),
        createRow('Email:', user.email, 'email')
    )

    return ctr
}