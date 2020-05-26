import React from "react";
import {Button, ButtonGroup, Dropdown, DropdownItem} from "react-bootstrap";

export default function ControlPanel({handleRefresh, handleChangeC}) {
    const options = [
        "EN",
        "RU",
        "BE",
    ];

    const [language, setLanguage] = React.useState(options[0]);

    const handleChangeLanguage = (event) => {
        console.log(event.target);
        setLanguage(event.target.textContent);
    };

    const handleChangeTemp = (event) => {
        handleChangeC(event.target);
    };

    return (
        <div className="control-panel">
            <Button
                variant="secondary"
                className="button button_refresh"
                onClick={handleRefresh}
            >
                <div className="icon-refresh"/>
            </Button>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" className="button button_medium">
                    {language}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="secondary">
                    { options.map((option, index) => {
                        return <DropdownItem key={index} onClick={handleChangeLanguage}>{option}</DropdownItem>
                    }) }
                </Dropdown.Menu>
            </Dropdown>
            <ButtonGroup>
                <Button
                    variant="secondary"
                    className="button button_active"
                    onClick={handleChangeTemp}
                    data="true"
                >&deg;C</Button>
                <Button
                    variant="secondary"
                    className="button"
                    onClick={handleChangeTemp}
                    data="false"
                >&deg;F</Button>
            </ButtonGroup>
        </div>
    );
}
