import React from 'react'


import {
    Column,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowData,
    Table,
    useReactTable
} from '@tanstack/react-table'
import { makeData, Person } from './makeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faArrowDown, faArrowUp, faChevronLeft, faSortAlphaDown, faSortAlphaUp, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'



export type DataGridTable = {
    columnFilters: ColumnFiltersState
    data: any
    globalFilter: string
    columns: ColumnDef<Person, any>[]
    onColumnFiltersChange?: (columnFilters: ColumnFiltersState) => void
    // setColumnFilters: (columnFilters: ColumnFiltersState) => void
    // setGlobalFilter: (globalFilter: string) => void

}
export default function DataGridTable({
    columnFilters,
    data,
    columns,
    globalFilter,

}: DataGridTable) {



    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
        },
        // onColumnFiltersChange: setColumnFilters,
        // onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })

    React.useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])

    return (
        <DataGridContainer>
            <StyledTable>
                <StyledTableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                    {{
                                                        asc: <FontAwesomeIcon icon={faArrowUp} />,
                                                        desc: <FontAwesomeIcon icon={faArrowDown} />,

                                                    }[header.column.getIsSorted() as string] ??
                                                        <div className='sort-placeholder'>
                                                            <FontAwesomeIcon
                                                                color='gray'
                                                                icon={faArrowUp} />
                                                        </div>
                                                    }
                                                </div>
                                            </>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </StyledTableHeader>
                <StyleTableBody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <Row key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Row>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </StyleTableBody>
            </StyledTable>
            <PaginationContainer>
                <PaginationButton
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </PaginationButton>
                <PaginationButton
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </PaginationButton>
                <PaginationButton
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} flip="horizontal" />
                </PaginationButton>
                <PaginationButton
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <FontAwesomeIcon icon={faAngleDoubleLeft} flip="horizontal" />
                </PaginationButton>
                <PageDesc>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()} - <strong>{data?.length}</strong>
                </PageDesc>
                <PageSizeSelect
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </PageSizeSelect>
            </PaginationContainer>
        </DataGridContainer>
    )
}

function Filter({
    column,
    table,
}: {
    column: Column<any, unknown>
    table: Table<any>
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = React.useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return typeof firstValue === 'number' ? (
        <div>
            <div className="flex space-x-2">
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
                        ? `(${column.getFacetedMinMaxValues()?.[0]})`
                        : ''
                        }`}
                    className="w-24 border shadow rounded"
                />
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
                        ? `(${column.getFacetedMinMaxValues()?.[1]})`
                        : ''
                        }`}
                    className="w-24 border shadow rounded"
                />
            </div>
            <div className="h-1" />
        </div>
    ) : (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="w-36 border shadow rounded"
                list={column.id + 'list'}
            />
            <div className="h-1" />
        </>
    )
}

// A debounced input react component
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}



const DataGridContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const PaginationContainer = styled.div`
    display: flex;

    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    margin-top: ${props => props.theme.spacing[2]};
    margin-bottom: ${props => props.theme.spacing[8]};
`;


const StyledTable = styled.table`
    height:300px;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    overflow: auto;
`;

const StyleTableBody = styled.tbody`
    tr {
        border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
        &:hover {
            background-color: ${props => props.theme.colors.gray[100]};
        }
    }
`;


const Row = styled.td`
    padding: ${props => props.theme.spacing[6]};
    border-bottom: 1.1px solid ${props => props.theme.colors.gray[200]};
    &:last-child {
        border-right: none;
    }
`;

const PaginationButton = styled.button`
    background-color: ${props => props.theme.colors.gray[100]};
    padding: ${props => props.theme.spacing[2]};
    border: none;
    &:hover {
        background-color: ${props => props.theme.colors.gray[200]};
    }
`;


const PageSizeSelect = styled.select`
    background-color: ${props => props.theme.colors.gray[100]};
    padding: ${props => props.theme.spacing[2]};
    border: none;
    &:hover {
        background-color: ${props => props.theme.colors.gray[200]};
    }
`;
const PageDesc = styled.div`
    font-size: ${props => props.theme.fontSize['sm']};
    color: ${props => props.theme.colors.gray[800]};
    font-weight: 500;
`;

const StyledTableHeader = styled.thead`
    background-color: ${props => props.theme.colors.white};
    tr {
    }
    th {

        text-align: left;
        padding: ${props => props.theme.spacing[6]};
        &:last-child {
            border-right: none;
        }
        // on hover show the sort icon
        &:hover {
            .sort-placeholder {
                opacity: 1;
                transition: opacity 0.2s ease-in-out;
            }
        }
                  

        div {
            font-weight: 500;
            font-size: ${props => props.theme.fontSize['base']};
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: flex-start;
        }
        .sort-placeholder {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
        }
    }
`;
