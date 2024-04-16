import { createContext, useContext, useState } from "react";

interface ObjT {
    [key: string]: string
}

type ContextT = {
    submit: () => any
    getValue: (key: string) => string
    setValue: (key: string, newVal: string) => void
    getError: (key: string) => string
    setError: (key: string, newVal: string) => void
   
}

type FormT = {
    children: React.ReactNode | React.ReactNode[]
    values: string[],
    submit: () => any
}

function createDataFromArray(arr: string[]) {
    const dict: ObjT = {}
    for (let el of arr) {
        dict[el] = ""
    }

    return dict
}

const FormContext = createContext<null | ContextT>(null)

export const Form = ({ children, values, submit }: FormT) => {
    const [data, setData] = useState<ObjT>(createDataFromArray(values))
    const [errors, setErrors] = useState<ObjT>(createDataFromArray(values))

    function getValue(key: string) {
        if (data[key] === null) throw new Error("this key does not exist")
        return data[key]
    }

    function setValue(key: string, newVal: string) {
        setData(p => {
            p[key] = newVal
            return { ...p }
        })
    }

    function getError(key: string) {
        if (errors[key] === null) throw new Error("this key does not exist")
        return errors[key]
    }

    function setError(key: string, newVal: string) {
        setErrors(p => {
            p[key] = newVal
            return { ...p }
        })
    }

    return (
        <FormContext.Provider value={{ getValue, setValue, getError, setError, submit }}>
            {children}
        </FormContext.Provider>
    )
}

export const useForm = () => {
    const context = useContext(FormContext)
    if (!context) throw new Error("This hook might be used only in Form component children")

    return context
}