import React from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";

export default function SearchInput() {

    return (
        <div className="search-container">
            <InputGroup>
                <FormControl
                    placeholder="Search city..."
                />
                <InputGroup.Append>
                    <Button variant="secondary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}
