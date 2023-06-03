const avatarColors = ['#ef5350', '#f06292', '#ab47bc', '#5c6bc0', '#26a69a', '#8d6e63', '#66bb6a', '#29b6f6', '#ffa726', '#ffeb3b'];
const tagColors = ['#ef9a9a', '#f48fb1', '#ce93d8', '#9fa8da', '#90caf9', '#a5d6a7', '#e6ee9c', '#ffcc80', '#ffab91'];

function hashString(string, maxNumber) {
    let total = 0;
    for (let i = 0; i < string.length; i++) {
        total += string.charCodeAt(i);
    }

    return total % maxNumber;
}

export function nameToColor(name) {
    const colorIndex = hashString(name, 10);
    return avatarColors[colorIndex];
}

export function tagToColor(tag) {
    const colorIndex = hashString(tag, 9);
    return tagColors[colorIndex];
}
