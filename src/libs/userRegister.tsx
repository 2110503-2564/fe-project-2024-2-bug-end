import userLogIn from "./userLogin"

export default async function userRegister( {
    userName,
    userTel,
    userEmail,
    userPassword
} : {
    userName : string , 
    userTel : string ,
    userEmail : string ,
    userPassword : string
}) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register` , {
        method : 'POST',
        headers : { 
            "Content-Type" : "application/json" 
        },
        body : JSON.stringify({ 
            name : userName, 
            telephoneNumber : userTel, 
            email : userEmail, 
            password : userPassword
        }),
    })

    if(!response.ok) throw new Error("Failed to register")

    const signInResponse = await userLogIn(userEmail, userPassword)
    if (signInResponse?.error) throw new Error("Login failed");

    return signInResponse
}