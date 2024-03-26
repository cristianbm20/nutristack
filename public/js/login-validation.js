document.addEventListener('DOMContentLoaded', (event) => {
  const loginForm = document.getElementById('login-form')

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const user = document.getElementById('usuario').value
    const password = document.getElementById('contrasena').value
    const errors = []

    // User validation
    if (!user || user.length < 3 || !user.includes('@') || !user.includes('.')) {
      errors.push('El correo electrónico no es válido')
    }

    // Password validation
    if (!password || password.length < 6 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('La contraseña debe tener al menos 6 caracteres, un número y un carácter especial')
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