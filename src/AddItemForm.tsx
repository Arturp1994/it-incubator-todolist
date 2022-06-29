import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType ={
    addItem: (title:string)=>void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem})=>{
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandlerItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            onClickAddTaskItem();
        }
    }
    const onClickAddTaskItem = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return(
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandlerItem}
                   className={error ? "error" : ""}
            />
            <button onClick={onClickAddTaskItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}