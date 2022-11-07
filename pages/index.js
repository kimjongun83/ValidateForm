
import ApiHepler from "../services/services.js";

const getToken = localStorage.getItem('token');
const logoutButton  = document.querySelector('.logout-button')
logoutButton.addEventListener('click', function(){
    logout()
})
const getListUser = async (params,token) => {
    try {
        ApiHepler.setJwtToken(token)
        const resposne = await ApiHepler.get({ path: 'user/list', params: params })
        if (resposne.success === true) {
            renderTable()
        }
    } catch (e) {
        if (e) {
            alert(e)
        }
    }
}
const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
}
const renderTable = () => {
  alert('get list user')
}
if(getToken){
    getListUser( { page: ETypeList.PAGE },getToken )
}
else{
    window.location.href = '../public/login.html';
}