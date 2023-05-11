export async function postData(url, data) {
    let response = await fetch(`http://localhost:8080/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    let json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
}
