// src/App.tsx
import styled from '@emotion/styled';
import { faBell, faCalendar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Layout from './components/layout/Layout';
import StatusCard from './components/status-card/StatusCard';
import DataGridTable from './components/data-grid-table/DataGridTable';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { Person, makeData } from './components/data-grid-table/makeData';

const App: React.FC = () => {

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
    <Layout>

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
    </Layout>
  );
};


const StatusContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Tab = styled.div<{ active?: boolean }>`
  padding: 16px;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[400]};
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  margin-bottom: ${props => props.theme.spacing[4]};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  font-size: ${props => props.theme.fontSize['lg']};
  cursor: pointer;
`;


const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[8]};
  gap: 16px;
`;


export default App;
