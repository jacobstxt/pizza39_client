import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {AppWrapper} from "./components/common/PageMeta.tsx";
import {HelmetProvider} from "react-helmet-async";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <>
        <HelmetProvider>
          <ThemeProvider>
            <AppWrapper>
                <Provider store={store}>
                    <GoogleOAuthProvider clientId="1088225135754-rstar5vvfn10atk429337g44it582ck3.apps.googleusercontent.com">
                    <App />
                    </GoogleOAuthProvider>
                </Provider>
            </AppWrapper>
          </ThemeProvider>
        </HelmetProvider>
    </>
)
