import { useMemo, useState } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useTable } from 'react-table';

const EditableCell = ({ value: initialValue, row, column, updateRecord, editable }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        setIsEditing(false);
        updateRecord(row.index, column.id, value);
    };

    return (
        <div className="dark:text-neutral-300" onClick={() => editable && setIsEditing(true)} style={{ cursor: editable ? "pointer" : "default" }}>
            {isEditing
                ? <input className="text-black" value={value} onChange={e => setValue(e.target.value)} autoFocus onBlur={onBlur} style={{ width: '100%' }} />
                : typeof value === 'string' ? value : value.toString()}
        </div>
    );
};

export const FinancialRecordList = () => {
    const { records, updateRecord, deleteRecord } = useFinancialRecords();

    const updateCellRecord = (rowIndex, columnId, value) => {
        const id = records[rowIndex]._id;
        updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
    };

    const columns = useMemo(() => [
        {
            Header: 'Description',
            accessor: 'description',
            Cell: (props) => (
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
            )
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            Cell: (props) => (
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
            )
        },
        {
            Header: 'Category',
            accessor: 'category',
            Cell: (props) => (
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
            )
        },
        {
            Header: 'Payment Method',
            accessor: 'paymentMethod',
            Cell: (props) => (
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
            )
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: (props) => {
                const date = new Date(props.value);
                const formattedDate = date.toLocaleDateString();
                return <EditableCell {...props} value={formattedDate} updateRecord={updateCellRecord} editable={false} />;
            }
        },
        {
            Header: 'Delete',
            id: 'delete',
            Cell: ({ row }) => (
                <button onClick={() => deleteRecord(row.original._id ?? "")} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                    Delete
                </button>
            )
        },
    ], [records]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: records });

    return (
        <div className="table-container">
            <table {...getTableProps()} className="min-w-full text-left">
                <thead>
                    {headerGroups.map(hg => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map(column => (
                                <th {...column.getHeaderProps()} className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, idx) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="px-4 py-2 border-b border-gray-200">
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};


