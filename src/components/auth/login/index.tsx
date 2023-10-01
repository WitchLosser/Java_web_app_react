import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage.tsx";

const Login = () => {
    return (
    <GoogleReCaptchaProvider reCaptchaKey={"6LeOnGooAAAAAPqq4C_QHmgGwJ1UTILOJa8Xw5BB"}>
        <LoginPage/>
    </GoogleReCaptchaProvider>
    );
}

export default Login;