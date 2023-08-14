// src/App.tsx
import styled from '@emotion/styled';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSingleRecord } from '../../hooks/entities/useRecords';
import DataGridTable from '../../components/data-grid-table/DataGridTable';

const ViewRecord: React.FC = () => {

    // has :modelName params in the url get it from there
    let { modelName, id } = useParams();

    const { data, error, isLoading } = useSingleRecord(modelName, id);



    if (!data?.data) return null;


    return (
        <ViewContainer>
            <ViewCard>
                {Object.keys(data.data).map((key, index) => {
                    // skip if it's null or object or array
                    if (data.data[key] === null || Array.isArray(data.data[key])) return null;

                    if (typeof data.data[key] === 'object') {
                        const title = Object.keys(data.data[key]).filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt')[0];

                        const findRelation = data?.data?.["relationsMetadata"]?.find((relation: any) => relation.propertyName === key);

                        if (!findRelation) return null;

                        return <Field key={index}>
                            <div>{key}</div>
                            <div>
                                <Link to={`/records/${findRelation.model}/${data.data[key].id}`}>{data.data[key][title]}</Link>
                            </div>
                        </Field>
                    }
                    return <Field key={index}>
                        <div>{key}</div>
                        <div>{data.data[key]}</div>
                    </Field>
                })}
            </ViewCard>


            {
                Object.keys(data.data)
                    .filter(key => {
                        // skip if it's null  and only show object and ony show array
                        if (data.data[key] === null || typeof data.data[key] !== 'object' || !Array.isArray(data.data[key])) return false;
                        return true;
                    })
                    .filter(key => {
                        // skitp relationsMetadata
                        if (key === 'relationsMetadata') return false;
                        return true;
                    })
                    .map((key, index) => {
                        // get first key of the object except id to display it as a title
                        const rows = data?.data[key];
                        const title = !!rows?.length ? Object.keys(rows?.[0])?.filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt')?.[0] : null
                        const findRelation = data?.data?.["relationsMetadata"]?.find((relation: any) => relation.propertyName === key);

                        return (
                            <RelationContainer key={key}>
                                <h1>{key}</h1>
                                <RelationCard>
                                    <DataGridTable
                                        columns={[
                                            {
                                                accessorKey: 'id',
                                                header: 'ID',
                                            },
                                            ...(!!title ? [{
                                                accessorKey: title,
                                                header: title,
                                                cell: (params: any) => {
                                                    console.log(params)
                                                    return <Link to={`/records/${findRelation.model}/${params.row?.original.id}`}>{
                                                        params?.row?.original?.[title]
                                                    }</Link>
                                                }
                                            }] : []
                                            )

                                        ]}
                                        data={rows}
                                    />

                                </RelationCard>
                            </RelationContainer>
                        )
                    })
            }
        </ViewContainer>
    )
}


const ViewCard = styled.div`
            display: flex;
            flex-direction: column;
            padding: 10px;
            width: 100%;
            border-radius: ${props => props.theme.borderRadius.lg};
            background-color: ${props => props.theme.colors.white};
            box-shadow:${props => props.theme.boxShadow.md};
            `;

const Field = styled.div`
            display: flex;
            flex-direction: row;
            padding: 10px;
            margin: 10px;
            width: 100%;
            border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
            &:last-child{
                border - bottom: none;
    }
            div:first-child{
                width: 20%;
            font-size:${props => props.theme.fontSize.base};
            font-weight: 600;
    }

            div:last-child{
                width: 80%;
            font-size:${props => props.theme.fontSize.base};
            font-weight: 400;
    }

            `;


const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
`;

const RelationContainer = styled.div`
    display: flex;
    flex-direction: column;
    h1{
        text-transform: capitalize;
        font-size: ${props => props.theme.fontSize.xl};
        font-weight: 600;
        margin-bottom: ${props => props.theme.spacing[8]};
    }
`;

const RelationCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow:${props => props.theme.boxShadow.md};
    padding: ${props => props.theme.spacing[4]};
    background-color: ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.borderRadius.lg};
`;
export default ViewRecord;

