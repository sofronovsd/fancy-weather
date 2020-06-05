import React from "react";
import {Button, ButtonGroup, Dropdown, DropdownItem} from "react-bootstrap";

export default function ControlPanel({language, isC, handleRefreshImage, handleChangeC, handleChangeLanguage}) {
    const options = [
        "EN",
        "RU",
        "BE",
    ];

    const handleLanguageSelect = (event) => {
        handleChangeLanguage(event.target.textContent);
    };

    const handleChangeTemp = (event) => {
        handleChangeC(event.target);
    };

    const buttonCClassName = `button ${isC  && 'active'}`;
    const buttonFClassName = `button ${!isC && 'active'}`;

    return (
        <div className="control-panel">
            <Button
                data-testid="button"
                variant="secondary"
                className="button button_refresh"
                onClick={handleRefreshImage}
            >
                <div className="icon-refresh"/>
            </Button>
            <Dropdown data-testid="dropdown">
                <Dropdown.Toggle variant="secondary" className="button button_medium">
                    {language}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="secondary">
                    { options.map((option, index) => {
                        return <DropdownItem key={index} onClick={handleLanguageSelect}>{option}</DropdownItem>
                    }) }
                </Dropdown.Menu>
            </Dropdown>
            <ButtonGroup data-testid="optionButtons">
                <Button
                    data-testid="cButton"
                    variant="secondary"
                    className={buttonCClassName}
                    onClick={handleChangeTemp}
                    data="true"
                >&deg;C</Button>
                <Button
                    data-testid="fButton"
                    variant="secondary"
                    className={buttonFClassName}
                    onClick={handleChangeTemp}
                    data="false"
                >&deg;F</Button>
            </ButtonGroup>
        </div>
    );
}
