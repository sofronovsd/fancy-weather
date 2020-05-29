import React from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import localesJson from "../utils/localesJson";

export default function SearchInput({language, handleSearchClick}) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = () => {
        handleSearchClick(value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClick()
        }
    };

    return (
        <div className="search-container">
            <InputGroup>
                <FormControl
                    placeholder={localesJson[language.toUpperCase()]['searchPlaceholder']}
                    className="search-input"
                    value={value}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <InputGroup.Append>
                    <Button
                        className="button button_wide text text__search"
                        variant="secondary"
                        onClick={handleClick}
                    >{localesJson[language.toUpperCase()]['search']}</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}
