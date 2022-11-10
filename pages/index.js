
import { BASE1_URL } from "../constants/constants.js";
import ApiHepler from "../services/services.js";

const getToken = localStorage.getItem('token');
console.log("TOKEN", getToken);
const logoutButton  = document.querySelector('.logout-button')


const getListUser = async (params,token) => {
    try {
        ApiHepler.setJwtToken(token)
        const resposne = await ApiHepler.get({ path: 'user/list', params: params })
        if (resposne.success === true) {
            renderTable()
        }
    } catch (e) {
       console.log(e);
    }
}
logoutButton.addEventListener('click', function(){
    logout()
})
const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
}
const renderTable = () => {
  alert('get list user')
}
if(getToken){
    getListUser( { page: BASE1_URL },getToken )
}
else{
    window.location.href = '../slogin.html';
}
