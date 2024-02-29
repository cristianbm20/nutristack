document.addEventListener('DOMContentLoaded', (event) => {
  const loginForm = document.getElementById('login-form')

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const user = document.getElementById('usuario').value
    const password = document.getElementById('contrasena').value
    const errors = []

    // User validation
    if (!user || user.length < 3) {
      errors.push('El email no es válido')
    }

    // Password validation
    if (!password || password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres')
    }

    // Error handling
    if (errors.length > 0) {
      const errorList = document.getElementById('error-messages')
      errorList.innerHTML = ''
      errors.forEach((error) => {
        const li = document.createElement('li')
        li.textContent = error
        errorList.appendChild(li)
      })
    } else {
      loginForm.submit()
    }
  })
})
