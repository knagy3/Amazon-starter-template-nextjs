import { Provider } from 'react-redux'
import { Provider as AuthProvider } from "next-auth/client";

import { store } from '../app/store'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
      <AuthProvider session={pageProps.session}>
          {/* Gives the session's info to the components via a Provider 
          which means we will have an acces to the auth in the whole env.*/}
          <Provider store={store}>
              <Component {...pageProps} />
              {/* <ToastContainer transition={Zoom} /> */}
          </Provider>
      </AuthProvider>
  );
};

export default MyApp;