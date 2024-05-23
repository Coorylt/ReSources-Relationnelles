const getApiUrl = (path, apiPort = 8000) => {
    // const host = '192.168.1.37';
    const host = '10.162.129.187';
    return `http://${host}:${apiPort}/api${path}`;
};

export default getApiUrl;
