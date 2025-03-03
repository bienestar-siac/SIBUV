import { decryptData } from '../../services/utils/utils'
import { getProcessItems } from './login'

export const getDataProcessModule = async () => {
    const response = await getProcessItems()
    return JSON.parse(await decryptData(response?.data) || '{}')
}