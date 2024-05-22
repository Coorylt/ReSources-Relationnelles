const getApiUrl = (path, apiPort = 8000) => {
    const host = '192.168.1.37';
    return `http://${host}:${apiPort}/api${path}`;
};

export default getApiUrl;
