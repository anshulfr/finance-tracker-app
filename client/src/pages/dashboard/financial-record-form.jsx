import { useState } from 'react';
import { useUser } from "@clerk/clerk-react"
import { useFinancialRecords } from '../../contexts/financial-record-context';

export const FinancialRecordForm = () => {
    const { user } = useUser()
    const { addRecord } = useFinancialRecords()
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = {
            userID: user?.id ?? "",
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod
        }

        addRecord(newRecord)
        setDescription('')
        setAmount('')
        setCategory('')
        setPaymentMethod('')

    }
    return (
        <div className="mx-4 sm:mx-0">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className='dark:text-neutral-300'>Description:</label>
                    <input type="text" required className="w-full h-8 px-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className='dark:text-neutral-300'>Amount:</label>
                    <input type="number" required className="w-full h-8 px-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className='dark:text-neutral-300'>Category:</label>
                    <select required className="w-full h-8 px-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className='dark:text-neutral-300'>Payment Method:</label>
                    <select required className="w-full h-8 px-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">Select a payment method</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Credit-card">Credit Card</option>
                    </select>
                </div>
                <div className="text-center">
                    <button type="submit" className="px-4 py-2 bg-yellow-400 text-white rounded">Add Record</button>
                </div>
            </form>
        </div>
    )
}