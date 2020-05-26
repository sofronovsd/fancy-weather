import React from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";

export default function SearchInput({handleSearchClick}) {
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
                    placeholder="Search city..."
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
                    >Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}
