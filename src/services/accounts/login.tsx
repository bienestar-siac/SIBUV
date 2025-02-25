import { fetchPostGeneral } from '../fetch'

export const isUserRegistered = (data) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/isLogin`
    })
}