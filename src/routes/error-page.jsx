import { useRouteError } from 'react-router-dom'
import './error-page.css'

function ErrorPage() {
    const error = useRouteError()
    console.error(error)


    return (
        <div className='valign-wrapper' style={{ height: "100vh", width: "100vw" }}>
            <div style={{ width: "100vw" }}>
                <h1 className='center-align'>Aconteceu um erro:</h1>
                <p className='center-align'>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    )
}

export default ErrorPage