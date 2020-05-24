import React from "react";
import DropdownItem from "./DropdownItem";

export default function Dropdown( { options } ) {

    return (
        <button className="dropdown">
            {options.map((option, index) => {
                return <DropdownItem option={option} key={index}/>
            })}
        </button>
    );
}
