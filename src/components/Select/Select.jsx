import './Select.css'


const Select = ({ labelText, id, className, name, selectValue, onChange, initialOptionText, options }) => {
    return (
        <>
            <label htmlFor={id}>{labelText}</label>
            <select
                id={id}
                className={`select ${className}`}
                name={name}
                value={selectValue}
                onChange={onChange}
            >
                <option value="">{initialOptionText}</option>
                {options.map(option =>
                    <option key={option} value={option}>{option}</option>
                )}
            </select>
        </>
    )
}

export default Select