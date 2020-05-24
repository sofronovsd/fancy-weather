import React from "react";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import RefreshButton from "./RefreshButton";
import Dropdown from "./Dropdown";

export default function ControlPanel(props) {
    const [language, setLanguage] = React.useState('en');

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const options = [
        "en",
        "ru",
        "be",
    ];

    return (
        <div className="control-panel">
            <RefreshButton onClick={props.handleRefresh} />
            <Dropdown options={options}/>
            {/*<FormControl variant="outlined">*/}
            {/*    <Select*/}
            {/*        value={language}*/}
            {/*        onChange={handleChange}*/}
            {/*    >*/}
            {/*        <MenuItem value="en">EN</MenuItem>*/}
            {/*        <MenuItem value="ru">RU</MenuItem>*/}
            {/*        <MenuItem value="be">BE</MenuItem>*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
        </div>
    );
}
