// const axios = import('axios')
;(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      'submit',
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      },
      false
    )
  })
})()

const clearCart = document.getElementById('clear-cart')
if (clearCart) {
  clearCart.addEventListener('click', async ev => {
    const data = await axios.delete('/clear-cart')
  })
}

// Register user
// const registerForm = document.getElementById('register-form')
// if (registerForm) {
//   registerForm.addEventListener('submit', async ev => {
//     ev.preventDefault()
//     const userData = {
//       name: document.querySelector('#name').value,
//       email: document.querySelector('#email').value,
//       password: document.querySelector('#password').value,
//       confirmPassword: document.querySelector('#confirm-password').value,
//       seller: document.querySelector('#seller').checked
//     }

//     console.log(userData)
//     try {
//       const res = await fetch('http://localhost:4000/register', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//       })
//       if (res.status !== 200) {
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   })
// }

// const quantities = document.querySelectorAll('.quantity')
// if (quantities) {
//   quantities.forEach(quantity => {
//     const productId = document.querySelector('product-id').value

//     quantity.addEventListener('change', async ev => {
//       ev.preventDefault()
//       const quantityVal = { quantity: ev.target.value, id: productId }
//       try {
//         const res = await fetch('http://localhost:4000/update-cart', {
//           method: 'PATCH',
//           mode: 'cors',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(quantityVal)
//         })
//         console.log(res.json())
//       } catch (error) {
//         console.log(error)
//       }
//     })
//   })
// }
