export const searchServices = async (id) => {
    let url = process.env.REACT_APP_SEARCH_URL
    if (id) {
    	url+="/"+id;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}