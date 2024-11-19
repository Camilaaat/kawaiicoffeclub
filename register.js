document.getElementById("register-form").addEventListener("submit", async(e) => {
    e.preventDefault();
    //console.log(e.target.children.user.value);
   //console.log(e.target.children.email.value);
   // console.log(e.target.children.password.value);
    //console.log(e.target.children.url_imagen.value);

const res = await fetch("http://localhost:3000/api/register",{
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user: e.target.children.user.value,
        email: e.target.children.email.value,
        password: e.target.children.password.value,
        url_imagen: e.target.children.url_imagen.value
    })
});
if(!res.ok) return mensajeError.cassList.toggle("invisible_visible", false);
const resJson = await res.json();
if(resJason.redirect){
    window.location.href = resJson.redirect;
}
})
