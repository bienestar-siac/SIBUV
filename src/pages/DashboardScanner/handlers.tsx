// Redux
import { setQrProcess } from "../../hooks/qr";

// // Fetch
import { getViewDataProcess } from '../../services/process/decryptdata'

// // Redux
import { useDispatch } from "react-redux";

// Handlers
export default ({ plan, set }) => {
    const dispatch = useDispatch();
    
    const 
        init = async () => {
            try {
                const response = await getViewDataProcess({ 
                    sheet_name: 'SCANNER'
                })
                if (response?.length <= 0) return 
                dispatch(setQrProcess({ data: response }))
                set(false)
            } catch (e) {
                console.error(e);
                set(true)
            }
        },
        capitalizedText = (text: string) => {
            return text
            ?.split("-")
            ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
            ?.join(" ");
        }

    return { init, capitalizedText }
}