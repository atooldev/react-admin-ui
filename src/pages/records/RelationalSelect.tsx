import { useFieldList, useGetFormRelationRecords } from "../../hooks/entities/useFields";
import { FieldModel } from "../../services/enitities/EntitiyServiceModel";

const RelaitionalSelect = ({
    item,
    value,
    onChange
}: {
    item: FieldModel
    value: any
    onChange: (e: any) => void
}) => {


    const { data } = useGetFormRelationRecords(item);


    if (!data) return null;


    // pcickup a title from data object that is not id or created at or updated at
    const title = Object.keys(data[0]).filter((key) => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt')[0];





    return (
        <div className="form-group">
            <label htmlFor={item.propertyName}>{item.propertyName}</label>
            <select
                value={value}
                onChange={onChange}
                name={item.propertyName}
                required={!item.isNullable}
                className="form-control" id={item.propertyName}>
                <option value="">Select</option>
                {data.map((item: any) => (

                    <option key={item?.id} value={item?.id}>
                        {item[title]}

                    </option>
                ))}
            </select>
        </div>
    )

}

export default RelaitionalSelect;