import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Oops...</h1>
            <h3>Something went wrong...</h3>
            {err && (
                <>
                    <h2>{err.status} - {err.statusText}</h2>
                    <p>{err.message}</p>
                </>
            )}
            {!err && <p>Unknown error occurred</p>}
        </div>
    );
};

export default Error;
