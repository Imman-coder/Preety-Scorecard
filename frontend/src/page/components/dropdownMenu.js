import { useState, useEffect } from "react"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export function Dropdown({ label, k, items, getter, setter }) {


    const [skip, setSkip] = useState(false)

    function handleChange(event) {
        setter(event.target.value)
        setSkip(true)
    }

    useEffect(() => {
        if (!skip) {
            setter(items[0]||"")
            setSkip(false)
        }
    }, [items])


    return <div>
        <InputLabel id={k + "dropdown-label"}>{label}</InputLabel>
        <Select
            labelId={k + "dropdown-label"}
            id={k + "dropdown"}
            value={getter}
            label={label}
            size="small"
            onChange={handleChange}
        >
            {items.map((item) => (
                <MenuItem key={item+"-item"} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>

    </div>

}