import {clean_auth_headers} from "/src/plugins/axios/tools";
// import router from "@/router";
// import {apiAlert} from "@/plugins/alerts";

const loginRequiredInterceptor = (error) => {
    // const { response = {} } = error;
    // // coolicion con el otro interceptor
    // let { push_message, push_error } = response.data || {};
    // if (!!push_message || !!push_error) return Promise.reject(error);
    //
    // if (
    //   error.status === 403 &&
    //   error.data.detail === "Authentication credentials were not provided."
    // ) {
    //
    //   console.log("loginRequiredInterceptor 403", response);
    //   // router.push({name: 'Login'});
    //   Vue.$alert.error("Authentication credentials were not provided.");
    // }
    return Promise.reject(error);
};
const errorPushNotificationSystem = ({response}) => {
    return Promise.reject(pushNotificationSystem(response));
};
const unauthorizedInterceptor = (error) => {
    if (
        error.response &&
        error.response.status === 401 &&
        error.response.data &&
        (
            error.response.data.detail.includes("please re-login")
            || error.response.data.detail.includes("Not authenticated")
        )
    ) {
        clean_auth_headers();
        // router.push({name: 'login'});
    }
    return Promise.reject(error);
};

const pushNotificationSystem = (response) => {
    let {data} = response;
    if (data == null){
        return Promise.resolve(response);
    }
    // let {push_message, push_error} = response.data;
    // if (push_message) {
    //     apiAlert.info(push_message);
    // }
    // if (push_error) {
    //     apiAlert.error(push_error);
    // }
    return Promise.resolve(response);
};

function createInterceptor(response, error) {
    return {
        response,
        error,
    };
}

let refreshingToken = false;

async function verifyTokenExpiration(request) {
    // reset-password
    if (request.url.includes("password-reset/")) {
        clean_auth_headers();
        return request;
    }
    // if request is to /token and no session... just forward it to get a new one
    if (request.url.includes("/token")) {
        clean_auth_headers();
        return request;
    }
    // if request is to api-token-auth/ and no token... just forward it to get a new one
    if (request.url.includes("api-token-auth/")) {
        clean_auth_headers();
        return request;
    }
    // if request is to /logout... just forward it. no matter if no token, if 401 received,
    // session remains in browser until next login/logout.
    // but DO NOT continue with this request because can fall into dispatcher,
    // and in a future dispatch can be unexpected results cause /logout perform a deletion of credentials in back
    // debugger;
    if (request.url.includes("/logout")) {
        clean_auth_headers();
        return request;
    }
    return request;
}

export const requestInterceptor = [{request: verifyTokenExpiration}];
export const responseInterceptor = [
    // createInterceptor(null, loginRequiredInterceptor),
    createInterceptor((res) => res, unauthorizedInterceptor),
    createInterceptor(pushNotificationSystem, errorPushNotificationSystem),
];
// lockNotificationInterceptor,
