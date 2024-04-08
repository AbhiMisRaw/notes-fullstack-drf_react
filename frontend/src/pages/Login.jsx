import Form from "../components/Form"

function Login(){
    return <div>
        <div>
            <Form route="/api/token/" method="login" />
        </div>
    </div>
}

export default Login;