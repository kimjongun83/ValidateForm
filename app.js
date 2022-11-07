import ApiHepler from "./services/services.js";
import { parseObjectToFormData } from './utils/function.js'
const body = {
    keyword: 'acv  ádsad',
    page: 1,
    sort: 'asd'
}
const object = {
    name: 'bui quang linh',
    email: 'linhasd13@gmail.com',
    avatar: 'a.png',
    tel: '0904567721',
    address: 'ha noi',
    description: 'ha asdasdasdnoi',
}
let spinner = document.querySelector('.loading');
const getListUser = async () => {
    try {
        ApiHepler.setJwtToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzU3Mjk1ZDE4ZjcxY2IwNzNkNTRkNzgzNmI1MTQzNDM0YmI3OTBhZTEyMmRkMTI5N2MyN2U0YmYzMGMzZGRjNTcyNTQ1NWQ4M2ZlOWMwMmUiLCJpYXQiOjE2NTIyMDAwMTEuMjc4MjIyMSwibmJmIjoxNjUyMjAwMDExLjI3ODIyNzEsImV4cCI6MTY4MzczNjAxMS4yNDc2NDIsInN1YiI6IjE4Iiwic2NvcGVzIjpbXX0.gvoRPBc-qJgwBPX9iOFLvGcnKDCT-6MwsG3c6_AAEbzRJ7E5fKL-rju9XuP0uYd75oMkq0YdXeNs_A8fTDVMTYQ-0184qkDyNzg1L_QDyZQXAEF4q52YybNrMhYOYqLMUU5jWvo88CnBHUx1egK6tVZ1QDeTYeWasVlzfBfYvushH1u9ti892DT9ZFha2ds83FNv6PiXI9iYIClBP6pZ44r_PgG7lHSPenHORpErnPzEvEBNW_tQ6IuOKjNF885sBnk0dV9S2tJBxKYAX4xXcMoIz5_DxjdAafOsiHZxcvGWop_ch-82E1xKlqRfS1Oi5usRrGTJmBeDcs2G0E7xpe0FzrISsM2sQQ5RIkoEP7YPcxcvLu1jUOLGtQEXKQFQXFrYlzY12DJW2IGQ12P2Nc0wcAlqPlS8-j_QTGXpQvWel3pOIDkNmjgcrB2jG0MDz4cieQlCXrFqo_HXVl2L1K91mK2dazSvROJD4r9FiU0IyGRa8Z4WjGf2zDCiVRrO2E4T8qoT3mvMcN3ys97F7vLxV8lSUOEsWRTZEEhKn2bMTCzwrOFmu1Urct_BBKO10fWy2vQ19DglzCmAaPcAmwWu_lYKzoVz_zhagTTTLB7DFqHDHU9Te93q_HHurS29xFnyQiye21-p5p_4i-kle6UPw37dULW4UJGSe2OBWB0')
        spinner.classList.add('show');
        const resposne = await ApiHepler.get({ path: 'user/list', params: body })
        if (resposne.success === true) {
            spinner.classList.remove('show');
            alert('get list user succes')
        }
    } catch (e) {
        if (e) {
            spinner.classList.add('show');
            alert(e)
        }
    }
}
getListUser()
const saveUser = async () => {
    const response = await ApiHepler.post({ path: 'customer/save', payload: parseObjectToFormData(object) })
    console.log('response', response);
}
// saveUser()