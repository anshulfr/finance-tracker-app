import { useState, useContext, createContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export const FinancialRecordContext = createContext(undefined);

const apiurl = process.env.REACT_APP_API_URL || 'http://localhost:3001'

export const FinancialRecordProvider = ({ children }) => {
    const [records, setRecords] = useState([])
    const { user } = useUser()
    const fetchRecords = async () => {
        if (!user) return
        const response = await fetch(`${apiurl}/financial-records/getAllByUserID/${user.id}`)

        if (response.ok) {
            const records = await response.json()
            setRecords(records)
        }
    }

    useEffect(() => {
        fetchRecords()
    }, [user])

    const addRecord = async (record) => {
        const response = await fetch(`${apiurl}/financial-record`, {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        try {
            if (response.ok) {
                const newRecord = await response.json()
                setRecords((prev) => [...prev, newRecord])
            }
        } catch (err) {
            console.error('Error adding record', err)
        }
    }

    const updateRecord = async (id, newRecord) => {
        const response = await fetch(`${apiurl}/financial-records/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        try {
            if (response.ok) {
                const newRecord = await response.json()
                setRecords((prev) => prev.map(record => {
                    if (record._id === id) {
                        return newRecord;
                    } else {
                        return record;
                    }
                }))
            }
        } catch (err) {
            console.error('Error updating record', err)
        }
    }

    const deleteRecord = async (id) => {
        const response = await fetch(`${apiurl}/financial-records/${id}`, {
            method: 'DELETE',
        })
        try {
            if (response.ok) {
                const deletedRecord = await response.json()
                setRecords(prev => prev.filter(record => record._id !== deletedRecord._id))
            }
        } catch (err) {
            console.error('Error deleting record', err)
        }
    }

    return (
        <FinancialRecordContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
            {" "}
            {children}
        </FinancialRecordContext.Provider>
    )
}

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordContext)
    if (!context) {
        throw new Error('useFinancialRecord must be used within a FinancialRecordProvider')
    }
    return context
}
