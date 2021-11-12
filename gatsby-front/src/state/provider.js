import React, { useState } from "react";

export const AppContext = React.createContext();

const Provider = (props) => {
    const [lang, setLang] = useState("#cn");

    return (
        <AppContext.Provider
            value={{
                lang,
                changeLang: (la) => setLang(la),
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default Provider;
