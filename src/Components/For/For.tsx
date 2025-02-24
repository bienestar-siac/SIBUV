import { ForProps } from "../../interfaces/interfaces";

export default function For<Type>({ func, list, shared }: ForProps<Type>): JSX.Element {
    if (list.length <= 0) return <></>;
    return (
        <>
            {list.map((e, index) => func(e, index, shared))}
        </>
    );
}