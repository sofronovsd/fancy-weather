import React from "react";

export default function DropdownItem( { option } ) {

    return (
        <button className="dropdown_item">
            {option}
        </button>
    );
}
