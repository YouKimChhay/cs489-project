const header = (accessToken) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    };
}

export default header;