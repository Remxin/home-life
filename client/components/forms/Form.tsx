import { createContext, useContext, useState } from "react";
import { FieldViolation } from "@/utils/converter";

interface ObjT {
    [key: string]: string
}

type ContextT = {
    errors: {[key: string]: string}
    getValuesList: () => string[]
    getKeyValuesList: () => [string, string][]
    submit: (args: string[]) => Promise<
    FieldViolation[] | null>
    getValue: (key: string) => string
    setValue: (key: string, newVal: string) => void
    getError: (key: string) => string
    setError: (key: string, newVal: string) => void
    clearErrors: () => void
    optionalFields: string[],
   
}

type FormT = {
    children: React.ReactNode | React.ReactNode[]
    values: string[],
    submit: (args: string[]) => Promise<
    FieldViolation[] | null>
    optionalFields?: string[]
}

function createDataFromArray(arr: string[]) {
    const dict: ObjT = {}
    for (let el of arr) {
        dict[el] = ""
    }

    return dict
}

const FormContext = createContext<null | ContextT>(null)

export const Form = ({ children, values, submit, optionalFields = [] }: FormT) => {
    const [data, setData] = useState<ObjT>(createDataFromArray(values))
    const [errors, setErrors] = useState<ObjT>(createDataFromArray(values))

    function getValuesList(): string[] {
        return Object.values(data)
    }

    function getKeyValuesList(): [string, string][] {
        return Object.entries(data)
    }

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

    function setError(key: string, err: string) {
        setErrors(p => {
            p[key] = err
            return { ...p }
        })
    }

    function clearErrors() {
        setErrors(createDataFromArray(values))
    }

    return (
        <FormContext.Provider value={{ errors, getValuesList, getKeyValuesList, optionalFields, getValue, setValue, getError, setError, submit, clearErrors }}>
            {children}
        </FormContext.Provider>
    )
}

export const useForm = () => {
    const context = useContext(FormContext)
    if (!context) throw new Error("This hook might be used only in Form component children")

    return context
}