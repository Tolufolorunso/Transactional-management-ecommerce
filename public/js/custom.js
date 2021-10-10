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

// fade out for flash messages
setTimeout(function () {
  const error = document.getElementById('error')
  const success = document.getElementById('success')
  const info = document.getElementById('info')
  if (error) {
    error.classList.add('fade')
  }
  if (success) {
    success.classList.add('fade')
  }
  if (info) {
    info.classList.add('fade')
  }
}, 3000)

// delete product
const deleteBtns = document.querySelectorAll('.delete-btn')
deleteBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const isSure = confirm('Are you sure?')
    if (!isSure) {
      e.preventDefault()
      return false
    }
  })
})

// Sort By
// const sortBy = document.getElementById('sort-by')

// if(sortBy) {
//   sortBy.addEventListener('change', (e) => {
//     try {
//       const res = await fetch('http://localhost:4000/products?sort=5', {
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
