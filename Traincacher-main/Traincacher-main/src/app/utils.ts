export function haversine_distance(coord1, coord2) {

    let lat1 = coord1.lat;
    let lon1 = coord1.lng;
    let lat2 = coord2.lat;
    let lon2 = coord2.lng;

    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
}

export function extractDate(date: Date) {
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = ("0" + date.getFullYear()).slice(-2);

    return day + month + year;
}

export function extractTime(date: Date) {
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);

    return hour + minute;
}

