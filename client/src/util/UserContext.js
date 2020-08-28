import React from 'react';

const UserContext = React.createContext({
    userIDContext: '',
    currentlyOnline: []
});

export default UserContext;
