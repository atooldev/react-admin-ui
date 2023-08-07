// src/App.tsx
import styled from '@emotion/styled';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import React from 'react';
import DataGridTable from '../../components/data-grid-table/DataGridTable';
import { Person, makeData } from '../../components/data-grid-table/makeData';
import StatusCard from '../../components/status-card/StatusCard';
import { Tab, TabContainer } from '../../components/tab-bar/TabBar';

const Dashboard: React.FC = () => {


    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState('')

    const columns = React.useMemo<ColumnDef<Person, any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>Index</span>,
                footer: props => props.column.id,
            },

            {
                accessorKey: 'firstName',
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => `${row.firstName} ${row.lastName}`,
                id: 'fullName',
                header: 'Full Name',
                cell: info => info.getValue(),
                footer: props => props.column.id,

            },

            {
                accessorKey: 'age',
                header: () => 'Age',
                footer: props => props.column.id,
            },
            {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: props => props.column.id,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                footer: props => props.column.id,
            },
            {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: props => props.column.id,
            },

        ],
        []
    )

    const [data, setData] = React.useState<Person[]>(() => makeData(100))


    const tabs = [
        {
            title: 'All',
            count: 452,
        },
        {
            title: 'Pending',
            count: 20,
        },
        {
            title: 'Completed',
            count: 432,
        },
    ];
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <>
            <StatusContainer >
                <StatusCard
                    title="Total Orders"
                    value="452"
                    description="Total number of orders"
                    icon={faBell}
                    variant="primary"
                />

                <StatusCard
                    title="Total Orders"
                    value="452"
                    description="Total number of orders"
                    icon={faBell}
                    variant="secondary"
                />
                <StatusCard
                    title="Total Orders"
                    value="452"
                    description="Total number of orders"
                    icon={faBell}
                    variant="success"
                />
            </StatusContainer>


            <TabContainer>
                {
                    tabs.map((tab, index) => (
                        <Tab
                            key={tab.title}
                            onClick={() => setActiveTab(index)}
                            active={index === activeTab}
                        >
                            {tab.title} ({tab.count})
                        </Tab>
                    ))
                }
            </TabContainer>


            <DataGridTable
                columns={columns}
                data={data}
                columnFilters={columnFilters}
                onColumnFiltersChange={setColumnFilters}
                globalFilter={globalFilter}
            // onGlobalFilterChange={setGlobalFilter}
            />
        </>
    );
};


export const StatusContainer = styled.div`
  display: flex;
  gap: 16px;
`;



export default Dashboard;
