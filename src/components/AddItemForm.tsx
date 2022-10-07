import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add, HighlightOff} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField
            size={"small"}
            variant={"outlined"}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            label={"Title"}
            helperText={!!error}
            style = {{width: 196, backgroundColor: "rgba(255, 255, 255, 0.5)"}}
        />
        <IconButton aria-label="delete" onClick={addItem}>
            <Add/>
        </IconButton>

        {error && <div className="error-message">{error}</div>}
    </div>
})
