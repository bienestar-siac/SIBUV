// Redux
import { setCommiteePeace } from "../../hooks/committeePeace";

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
                    sheet_name: 'CommitteePeace'
                })
                if (response?.length <= 0) return
                console.log(response," R E S P O N S E")
                dispatch(setCommiteePeace({ data: response }))
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