
export default function stringAvatar(name) {
    if (name.indexOf(' ') === -1) {
        return `${name.split(' ')[0][0]}`;
    }

    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
}
