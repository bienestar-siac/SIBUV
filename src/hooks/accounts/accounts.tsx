// Fetchs
import { getDataSheet } from '../../services/accounts/login'
import { decryptData } from '../../services/utils/utils'

export async function dataUser(email) {
    let user = {}
    try {
            const dataEmails     = await getDataSheet({sheet_name: "Accesos"})
            const avaibleAccount = await decryptData(String(dataEmails?.data))
            const findUser = JSON.parse(avaibleAccount || [])?.find((item) => item?.correo === email)
            user = findUser
    } catch(e) {
        console.error(e);
    }
    return user
}