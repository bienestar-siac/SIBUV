import { ShowType } from "../../interfaces/interfaces";

/* Types */
export default (props: ShowType) => {
    return <>{props.when && props.children}</>
}

/**  INTERFACES  */
export interface ForProps<Type> {
    func: (e: Type, index: number, shared: any) => JSX.Element;
    list: Type[];
    shared: any
}