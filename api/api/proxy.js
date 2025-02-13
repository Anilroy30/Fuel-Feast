export default async function handler(req, res) {
    const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8234&lng=80.0462");
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
}
