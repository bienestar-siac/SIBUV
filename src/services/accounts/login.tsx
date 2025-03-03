import { fetchPostGeneral, fetchGetGeneral } from '../fetch'

export const isUserRegistered = (data) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/isLogin`
    })
}

export const getDataSheet = (data) => {
    return fetchPostGeneral({
        dataSend: data, 
        urlEndPoint: `/api/v1/sheets/get`
    })
}

export const getProcessItems = () => {
    return fetchGetGeneral({
        urlEndPoint: `/api/v1/sheets/process`
    })
}