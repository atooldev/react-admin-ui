// src/App.tsx
import styled from '@emotion/styled';
import { faBell, faEdit, faEye, faRemove } from '@fortawesome/free-solid-svg-icons';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DataGridTable from '../../components/data-grid-table/DataGridTable';
import StatusCard from '../../components/status-card/StatusCard';
import {useRecordList} from '../../hooks/entities/useRecords';
import theme from '../../helpers/theme/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Records: React.FC = () => {

    // has :modelName params in the url get it from there
    let { modelName } = useParams();

    const { data, error, isLoading } = useRecordList(
        modelName
    );


    // create columns from the data object keys

    const columns: ColumnDef<any>[] = !!data?.data?.[0] ? Object.keys(data?.data?.[0]).map((key) => {
        return {
            accessorKey: key,
            header: key,
        }
    }) : [];

    // add actions column
    columns.push({
        accessorKey: 'actions',
        header: 'Actions',
        cell: (props) => {
            console.log(props);
            return (
                <ActionContainer>
                    <Link to={`/records/${modelName}/edit/${props.row.original.id}`}>
                        <ActionItem>
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionItem>
                    </Link>

                    <Link to={`/records/${modelName}/delete/${props.row.original.id}`}>
                        <ActionItem variant='danger'>
                            <FontAwesomeIcon icon={faRemove} />
                        </ActionItem>
                    </Link>

                    <Link to={`/records/${modelName}/${props.row.original.id}`}>
                        <ActionItem variant='secondary'>
                            <FontAwesomeIcon icon={faEye} />
                        </ActionItem>
                    </Link>
                </ActionContainer>
            );
        },
    });



    if (!data) return null;

    return (
        <>
            <StatusContainer >
                <StatusCard
                    title={`${modelName} Record`}
                    // value={data?.total?.toString()}
                    description="All related information about the model"
                    variant="secondary"
                />
                <StatusCard
                    title={"Total Record"}
                    value={data?.total?.toString()}
                    description="Total number of Records in the database"
                    icon={faBell}
                    variant="primary"
                />
            </StatusContainer>

            <AddNewRecordContainer>
                <Link to={`/records/${modelName}/create`}>
                    <AddNewRecord>Add New Record</AddNewRecord>
                </Link>
            </AddNewRecordContainer>

            <hr />
            <DataGridTable
                columns={columns}
                data={data?.data || []}
            />
        </>
    );
};


export const StatusContainer = styled.div`
  display: flex;
  gap: 16px;
`;


const AddNewRecord = styled.button`
    background-color: ${theme.colors.primary};
    color: #fff;
    border: 1px solid ${theme.colors.primary};
    padding: ${theme.spacing[3]} ${theme.spacing[6]};
    border-radius: 8px;
    font-size: ${theme.fontSize.sm};
    font-weight: 500;
    cursor: pointer;

    

    &:hover {
        background-color: ${theme.colors.indigo[500]};
        border: 1px solid ${theme.colors.indigo[500]};

    }
`;

const AddNewRecordContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${theme.spacing[4]};
    margin-top: ${theme.spacing[4]};
`;


const ActionContainer = styled.div`
    display: flex;
    gap: 16px;

`;

const ActionItem = styled.div<{
    variant?: 'primary' | 'secondary' | 'danger';
}>`
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    color: ${theme.colors.white};
    padding: ${theme.spacing[2]} ${theme.spacing[4]};
    border-radius: ${theme.borderRadius.md};
    // based on the variant prop change the background color
    background-color:${props => {
        switch (props.variant) {
            case 'primary':
                return theme.colors.primary;
            case 'secondary':
                return theme.colors.indigo[500];
            case 'danger':
                return theme.colors.red[500];
            default:
                return theme.colors.primary;
        }
    }};
    font-size: ${theme.fontSize.sm};
    font-weight: 500;

    &:hover {
        background-color:${props => {
        switch (props.variant) {
            case 'primary':
                return theme.colors.indigo[400];
            case 'secondary':
                return theme.colors.indigo[300];
            case 'danger':
                return theme.colors.red[300];
            default:
                return theme.colors.indigo[400];
        }
    }};
    }
`;



export default Records;
