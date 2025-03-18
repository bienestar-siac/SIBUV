// Redux
import { setWorkPlan } from "../../hooks/viewProcess";

// Fetch
import { getViewDataProcess } from '../../services/process/decryptdata'

// Redux
import { useDispatch } from "react-redux";

// Handlers
export default ({ plan, set }) => {
    const dispatch = useDispatch();
    
    const 
        init = async () => {
            try {
                const response = await getViewDataProcess({ 
                    sheet_name: 'Planes de Trabajo'
                })

                if (response?.length <= 0) return 
                console.log(response,"SetWorkPlan",capitalizedText(plan))
                dispatch(setWorkPlan({ workPlan: response.find(
                    (item) => item?.plan_de_trabajo  ===  String(capitalizedText(plan) || '').toUpperCase()) 
                }))
                
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