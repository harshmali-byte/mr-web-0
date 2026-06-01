import { createContext, useState, useContext, useEffect } from 'react';
import { IDBStore, Crypto } from '../Common/Commons';
import { ApiHandler } from '../Api/ApiHandler';

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    function loadStorageData() {
        try {
            IDBStore.Read(IDBStore.StoreNames.Profile)
                .then(
                    secureData => {
                        if (secureData) {
                            let data = Crypto.Decrypt(secureData)
                            if (data) {
                                let profileData = JSON.parse(data);
                                setAuthData(profileData);
                            }
                        }
                    },
                    error => console.log(error)
                )

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const signIn = (model) => {
        return ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.Login);
    };

    const signOut = () => {
        setAuthData(null);
        IDBStore.ClearAll();
        //cookie.remove('bemr');
    };

    const onLogin = (data) => {
        setAuthData(data);
    };

    return (
        //This component will be used to encapsulate the whole App,
        //so all components will have access to the Context
        <AuthContext.Provider value={{ authData, loading, signIn, signOut, onLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
    try {
        const context = useContext(AuthContext);
        if (!context) {
            throw new Error('useAuth must be used within an AuthProvider');
        }

        return context;
    }
    catch (err) {
        console.log('error in context: ' + err);
    }
}

export { AuthContext, AuthProvider, useAuth }

