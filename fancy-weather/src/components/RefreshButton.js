import React from "react";

export default function RefreshButton({ onClick}) {

    return (
        <div
            className="refresh-button"
            onClick={onClick}
        >
            <div className="icon-refresh"/>
        </div>
    );
}
