const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm));
    fetch('/api/session/login' , {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => {
        window.location.href = '/products'
    })
})
 .catch((err) => {
    Swal.fire({
        title: ' Credenciales incorrectas',
        icon: ' warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }) .then((result) => {
        if(result.isConfirmed) {
            window.location.href = '/login'
        }
    })
}) 