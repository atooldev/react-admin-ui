// src/App.tsx
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFieldList } from '../../hooks/entities/useFields';
import { FieldModel } from '../../services/enitities/EntitiyServiceModel';
import { useAddRecordMutation, useSingleRecord, useUpdateRecordMutation } from '../../hooks/entities/useRecords';

const EditRecord: React.FC = () => {
    const navigate = useNavigate();
    // has :modelName params in the url get it from there
    let { modelName, id } = useParams();

    const { data, error, isLoading } = useFieldList(
        modelName
    );

    const { data: singleData } = useSingleRecord(modelName, id)
    const updateRecordMutation = useUpdateRecordMutation(modelName, id)

    const handleFormSubmit = (formData: any) => {
        updateRecordMutation.mutate(formData)
        // go back to the list page
        navigate(`/records/${modelName}`)
    }

    if (!data?.data) return null;

    return (
        <NewFieldContainer>
            <h1>Update ${id}</h1>
            <DynamicForm
                values={singleData?.data}
                handleFormSubmit={handleFormSubmit}
                fields={data?.data} />
        </NewFieldContainer>
    )
}


export default EditRecord;



const DynamicForm = ({ fields, handleFormSubmit, values }: {
    fields: FieldModel[]
    values?: any
    handleFormSubmit?: (formData: any) => void
}) => {
    const [formData, setFormData] = useState<{
        [key: string]: string | number | readonly string[] | undefined
    }>({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        // set the values if there are any
        // add the values based on the fields
        if (values) {
            const newFormData: any = {}
            fields.forEach(field => {
                newFormData[field.name] = values[field.name]
            }
            )
            setFormData(newFormData)
        }



    }, [fields, values])
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // You can use the formData for your API submission
        handleFormSubmit && handleFormSubmit(formData)
    };

    return (
        <Form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <div key={index}>
                    <label htmlFor={field.name}>{field.name}</label>
                    {field.enum ? (
                        <select
                            name={field.name}
                            required={field.required}
                            onChange={handleInputChange}
                            value={formData[field.name] || ''}
                        >
                            <option value="">Select an option</option>
                            {field.enum.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            // type={field.type}
                            name={field.name}
                            required={field.required}
                            onChange={handleInputChange}
                            value={formData[field.name] || ''}
                        />
                    )}
                </div>
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
        display: block;
        font-weight: 600;
        margin-bottom: ${props => props.theme.spacing[2]};
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