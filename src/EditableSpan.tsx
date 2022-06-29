import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle:(editedTitle:string)=>void
}


const EditableSpan: React.FC<EditableSpanPropsType> = ({title, changeTitle}) => {
    let [text, setText] = useState<string>(title)

    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(text)
    }
    const onKeyPresChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            offEditMode();
        }
    }
    return (
        editMode
            ? <input
                value={text}
                onChange={onChangeHandler}
                onBlur={offEditMode}
                onKeyPress={onKeyPresChangeTitle}
                autoFocus
                />
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};

export default EditableSpan;