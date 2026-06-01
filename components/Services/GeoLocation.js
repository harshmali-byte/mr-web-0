export default function GeoLocation(callbackFn) {
    callbackFn(null);

    // Commenting this as geolocation-db is no longer working.

    // fetch('https://geolocation-db.com/json/')
    //     .then(async function (res) {
    //         try {
    //             let data = await res.json();
    //             if (!data || !data.IPv4 || data.IPv4.toLowerCase() === 'not found') {
    //                 callbackFn(null);
    //             }

    //             let model = new Object();
    //             model.IpAddress = data.IPv4;
    //             // model.Latitude = data.latitude.toString();
    //             // model.Longitude = data.longitude.toString();
    //             model.CountryCode = data.country_code;
    //             model.CountryName = data.country_name;
    //             model.City = data.city;
    //             model.Postal = data.postal;
    //             model.State = data.state;

    //             callbackFn(model);
    //         }
    //         catch (e) {
    //             console.error(e);
    //             callbackFn(null);
    //         }
    //     })
    //     .catch(function (e) {
    //         console.error(e);
    //         callbackFn(null);
    //     });
}