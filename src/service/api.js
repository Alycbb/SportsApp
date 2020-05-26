

//Local IP address
const BASE_URL = "http://192.168.0.166:3333";


//analyze request api
export const api = async (url, method, body = null, headers = {}) => {

    try{
        const endPoint = BASE_URL.concat(url);
        
        const fetchParams = {method, headers};

        console.log(body);

        // console.log(mongoose.connection.readyState);

        //set headers as text or json
        
        if(typeof body === "string"){
            fetchParams.headers["Content-type"] = "text/plain";
            fetchParams.body = body;
        }else{
            body = body ? JSON.stringify(body) : null;
            fetchParams.headers["Content-type"] = "application/json";
            fetchParams.body = body;
        }

        if((method === "POST" || method ==="PUT") && ! body){
            throw new Error("Request body required");
        }

        const fetchPromise = fetch(endPoint, fetchParams);
        const timeOutPromise = new Promise((resolve, reject) =>{
            setTimeout(() =>{
                reject("Database Disconnected!");
            },3000);
        });

        const response = await Promise.race([fetchPromise,timeOutPromise]);

        console.log(response);

        return response;
    } catch(e){
        return e;
    }
} 


//will be called in action(/src/actions)
//will return the response back
export const fetchApi = async(url, method, body, statusCode, token = null, loader = false) => {
    try{
        const headers = {};
        const result = {
            token: null,
            success: false,
            responseBody: null
        };

        if(token){
            headers["x-auth"] = token;
        }

        const response = await api(url, method, body, headers);
        
        console.log(response);

        if(response.status === statusCode ){

              
            result.success = true;

            if(response.headers.get("x-auth")){
                result.token = response.headers.get("x-auth");
            }

            let responseBody;
            const responseText = await response.text();

            try {
                responseBody = JSON.parse(responseText);
            } catch (e) {
                responseBody = responseText;
            }

            result.responseBody = responseBody;            
            return result;
        }

        let errorText, errorBody;
        if(response.status === 404 || response.status === 400){
            console.log("1")
            errorText = await response.text();
        }else{
            console.log("2")
            errorText = await response;
        }

        try {
            errorBody = JSON.parse(errorText);
        } catch (e) {
            errorBody = errorText;
        }

        result.responseBody = errorBody;


        throw result;
    } catch (error){
        return error;
    }
}



