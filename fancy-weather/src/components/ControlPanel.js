import React from "react";
import {Button, ButtonGroup, Dropdown, DropdownItem} from "react-bootstrap";

export default function ControlPanel(props) {
    const options = [
        "EN",
        "RU",
        "BE",
    ];

    const [language, setLanguage] = React.useState(options[0]);

    const handleChange = (event) => {
        console.log(event.target);
        setLanguage(event.target.textContent);
    };

    return (
        <div className="control-panel">
            <Button
                variant="secondary"
                className="button button_refresh"
                onClick={props.handleRefresh}
            >
                <div className="icon-refresh"/>
            </Button>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" className="button button_medium">
                    {language}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="secondary">
                    { options.map((option, index) => {
                        return <DropdownItem key={index} onClick={handleChange}>{option}</DropdownItem>
                    }) }
                </Dropdown.Menu>
            </Dropdown>
            <ButtonGroup>
                <Button variant="secondary" className="button">&deg;C</Button>
                <Button variant="secondary" className="button">&deg;F</Button>
            </ButtonGroup>
        </div>
    );
}
