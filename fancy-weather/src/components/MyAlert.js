import React from "react";
import {Alert} from "react-bootstrap";

export default function MyAlert({alert, closeAlert}) {
    return (
        <div>
            {alert.isShow ?
                <Alert variant="danger" onClose={closeAlert} dismissible>
                        {alert.text}
                </Alert>
                : null}
        </div>
    );
}
