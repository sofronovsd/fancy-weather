import React from "react";
import {Alert} from "react-bootstrap";
import localesJson from "../utils/localesJson";

export default function MyAlert({alert, closeAlert, language}) {
    let message = localesJson[language][alert.text];
    if (alert.searchValue) {
        message += alert.searchValue;
    }
    return (
        alert.isShow ?
                <div className="alert-container">
                    <Alert data-testid="alert" variant="danger" onClose={closeAlert} dismissible>
                        {message}
                    </Alert>
                </div>
                : null
    );
}
