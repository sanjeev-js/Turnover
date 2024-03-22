import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth-context";

const AppProviders = (props) => (
    <BrowserRouter>
        <AuthProvider>{props.children}</AuthProvider>
    </BrowserRouter>
);

export { AppProviders };
