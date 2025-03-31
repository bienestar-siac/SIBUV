// Redux
import { setWorkPlan, setFormProcess } from "../../hooks/viewProcess";

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
                const responseForm = await getViewDataProcess({ 
                    sheet_name: 'INFORME'
                })

                console.log(responseForm,"response",plan)

                if (response?.length <= 0) return 
                if (responseForm?.length <= 0) return
                
                dispatch(setWorkPlan({ workPlan: response.find(
                    (item) => item?.plan_de_trabajo  ===  String(capitalizedText(plan) || '').toUpperCase()) 
                }))
                
                dispatch(setFormProcess({ formProcess: responseForm.filter(
                    (item) => item?.proceso  ===  String(capitalizedText(plan) || '').toUpperCase()) 
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