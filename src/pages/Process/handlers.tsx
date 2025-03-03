// Redux
import { setDataProcess } from "../../hooks/process";

// Fetchs
import { getDataProcessModule } from '../../services/accounts/decryptdata'

export default ({ dispatch }) => {

    const init = async () => {
        try {
            const response = await getDataProcessModule()
            if (response?.length <= 0) return
            dispatch(setDataProcess({ data: response }));
        } catch (e) {
            console.error(e);
        }
    }

    return { init }
}