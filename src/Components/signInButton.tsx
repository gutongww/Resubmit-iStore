import React from "react";
import gitHubLogo from '../logos/github_logo.svg'
export interface SigninButtonProps {
   
};

const CLIENT_ID = "efbbd8c7661a607c8a65";
const REDIRECT_URI = "https://istorewww.netlify.app/welcome";

const SigninButton = () =>
    <div className="signinGithub">
        <a id="githubLink" href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>  
        Sign in with GitHub
        </a>
    </div>


export default SigninButton;