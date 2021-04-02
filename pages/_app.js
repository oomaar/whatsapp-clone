import '../styles/globals.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Login from './login';
import { Loading } from '../components';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  if (!user) return <Login />;
  if (loading) return <Loading />;

  return <Component {...pageProps} />
}

export default MyApp
