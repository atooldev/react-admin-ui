// src/App.tsx
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFieldList, useGetFormRelationRecords } from '../../hooks/entities/useFields';
import { FieldModel } from '../../services/enitities/EntitiyServiceModel';
import { useAddRecordMutation } from '../../hooks/entities/useRecords';
import { fi } from '@faker-js/faker';
import RelaitionalSelect from './RelationalSelect';

const NewRecord: React.FC = () => {
    const navigate = useNavigate();
    // has :modelName params in the url get it from there
    let { modelName } = useParams();

    const { data, error, isLoading } = useFieldList(
        modelName
    );
    const addRecordMutation = useAddRecordMutation(modelName)

    const handleFormSubmit = (formData: any) => {
        addRecordMutation.mutate(formData)
        // go back to the list page
        navigate(`/records/${modelName}`)
    }

    if (!data?.forms) return null;

    const filteredFields = data?.forms.filter((field) => field.isPrimary === false && field.isBaseDate === false)



    return (
        <NewFieldContainer>
            <h1>New {modelName}</h1>
            <DynamicForm
                handleFormSubmit={handleFormSubmit}
                fields={filteredFields} />
        </NewFieldContainer>
    )
}


export default NewRecord;



const DynamicForm = ({ fields, handleFormSubmit }: {
    fields: FieldModel[]
    handleFormSubmit?: (formData: any) => void
}) => {
    const [formData, setFormData] = useState<{
        [key: string]: string | number | readonly string[] | undefined
    }>({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // You can use the formData for your API submission
        handleFormSubmit && handleFormSubmit(formData)
    };


    const renderFields = ({
        item,
        index
    }: {
        item: FieldModel
        index: number
    }) => {
        if (item?.relationsMetadata) {
            return (
                <RelaitionalSelect
                    key={index}
                    onChange={handleInputChange}
                    value={formData[item.propertyName] || ''}
                    item={item} />
            )
        }
        if (item?.type === 'enum' && item?.enums) {
            return (
                <div key={index}>
                    <label htmlFor={item.propertyName}>
                        {item.propertyName} <span className="required">{item.isNullable ? '' : '*'}</span>
                    </label>
                    <select
                        name={item.propertyName}
                        required={!item.isNullable}
                        onChange={handleInputChange}
                        value={formData[item.propertyName] || ''}
                    >
                        <option value="">Select an option</option>
                        {item?.enums?.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )
        }
        return (
            <div key={index}>
                <label htmlFor={item.propertyName}>
                    {item.propertyName} <span className="required">{item.isNullable ? '' : '*'}</span>
                </label>
                <input
                    type={item.type}
                    name={item.propertyName}
                    required={!item.isNullable}
                    onChange={handleInputChange}
                    value={formData[item.propertyName] || ''}
                />

            </div>
        )

    }



    return (
        <Form onSubmit={handleSubmit}>
            {fields?.map((field, index) => (
                renderFields({
                    item: field,
                    index
                })
            ))}
            <button type="submit">Submit</button>
        </Form>
    );
};



const Form = styled.form`
    display: flex;
    box-shadow: ${props => props.theme.boxShadow.md};
    border-radius: ${props => props.theme.borderRadius.md};
    background-color: ${props => props.theme.colors.white};
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    padding: 1rem;

    label {
        display: flex;
        gap: 0.5rem;
        font-weight: 600;
        margin-bottom: ${props => props.theme.spacing[2]};
        .required {
            color: ${props => props.theme.colors.red[500]};
        }
      
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: ${props => props.theme.spacing[4]};
        input {
            width: 100%;
            padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
            margin-bottom: ${props => props.theme.spacing[3]};
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        select {
            width: 100%;
            padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
            margin-bottom: ${props => props.theme.spacing[3]};
            border: 1px solid #ccc;
            border-radius: 4px;

        }
    }

    
    button {
        width: 100%;
        background-color: ${props => props.theme.colors.primary};
        border: 1px solid ${props => props.theme.colors.primary};
        padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
        color: ${props => props.theme.colors.white};
        font-size: ${props => props.theme.fontSize.base};
        font-weight: 600;
        border-radius: ${props => props.theme.borderRadius.md}; 
        cursor: pointer;
        transition: all 0.3s ease-in-out;
         
        &:hover {
            background-color: ${props => props.theme.colors.indigo[500]};
            color: ${props => props.theme.colors.white};

        }
    }
`;


const NewFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.spacing[4]};
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    h1 {
        font-size: ${props => props.theme.fontSize['3xl']};
        font-weight: 600;
        margin-bottom: ${props => props.theme.spacing[4]};
        
    }
`;
