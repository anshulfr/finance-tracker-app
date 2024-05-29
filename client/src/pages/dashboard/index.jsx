import { useMemo } from "react"
import { useUser } from "@clerk/clerk-react"
import { FinancialRecordForm } from "./financial-record-form"
import { FinancialRecordList } from "./financial-record-list"
import { useFinancialRecords } from "../../contexts/financial-record-context"
export const Dashboard = () => {
    const { user } = useUser()
    const { records } = useFinancialRecords()
    const totalMonthly = useMemo(() => {
        let totalAmount = 0;
        records.forEach(record => {
            totalAmount += record.amount
        })
        return totalAmount
    }, [records])
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="dark:text-neutral-300 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold text-center mt-8">Welcome {user?.firstName}! Here are your finances:</h1>
            <FinancialRecordForm />
            <div className="dark:text-neutral-300 text-lg sm:text-xl md:text-2xl"> Total Monthly: ₹{totalMonthly} </div>
            <FinancialRecordList />
        </div>
    )
}