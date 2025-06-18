document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const contrasena = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena }),
    });

    if (!res.ok) throw new Error('Credenciales inválidas');

    const data = await res.json();

    localStorage.setItem('token', data.token);
    alert(`Bienvenido, ${data.nombre}`);
window.location.href = "/pages/admin/admin.html";
  } catch (err) {
    alert(err.message);
  }
});
