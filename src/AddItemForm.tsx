import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";


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
            <TextField
            size={"small"}
            variant={'outlined'}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandlerItem}
            label={"Title"}
            />
            <IconButton onClick={onClickAddTaskItem}>
                <Add/>
            </IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}