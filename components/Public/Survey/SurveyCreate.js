import { useEffect, useState } from 'react';
import { ApiHandler } from '../../Api/ApiHandler';
import { Toast, LocalStorage } from '../../Common/Commons';
import GeoLocation from '../../Services/GeoLocation';
import { LocalStorageKeys } from '../../Common/Constants';

export default function SurveyCreate({ survey, setSurveyResponse, setCreatingResponse }) {
    const [Location, setLocation] = useState();
    const [Coordinates, setCoordinates] = useState();
    const [toastMessage, setToastMessage] = useState(null);
    const [IsLoadingIpAddress, setIsLoadingIpAddress] = useState(true);
    const [cookieId, setCookieId] = useState(null);
    const [cookieIdLoading, setCookieIdLoading] = useState(true);

    let abortController = new AbortController();

    useEffect(() => {
        setIsLoadingIpAddress(true);
        GetSurveyCookie();

        try {
            GeoLocation(SetLocationModel);
        }
        catch (error) {
            console.log(error);
            console.log(`Unable to get geo location for survey: ${survey.Id}. Setting default location.`);
            SetLocationModel(null);
        }

        try {
            if (!navigator || !navigator.geolocation) {
                setToastMessage({ message: 'Geo location is not supported by your browser', severity: 'error' });
                return;
            }

            navigator.geolocation.getCurrentPosition((location) => SetLatLong(location), ShowErrorLocation, {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
            });
        }
        catch (ex) {
            console.log(ex);
            console.log(`Unable to get latitude and longitude for survey: ${survey.Id}. Setting default location.`);
            setCoordinates(null);
        }
    }, [])

    useEffect(() => {
        if (IsLoadingIpAddress || cookieIdLoading) {
            return;
        }

        createSurvey();

        return (() => {
            abortController.abort();
        })
    }, [IsLoadingIpAddress, cookieIdLoading])

    function GetSurveyCookie() {
        setCookieIdLoading(true);
        let surveyCookie;

        try {
            let SurveyCookieIds = LocalStorage.GetData(LocalStorageKeys.SurveyCookieIds);
            let surveyCookies;

            if (SurveyCookieIds) {
                surveyCookies = JSON.parse(SurveyCookieIds);
                surveyCookie = surveyCookies.find(s => s.SurveyId === survey.Id);
                if (surveyCookie) {
                    setCookieId(surveyCookie.Id);
                }
            }

            setCookieIdLoading(false);
        }
        catch (error) {
            setCookieIdLoading(false);
        }
    }

    function SetSurveyCookie(newCookieId) {
        try {
            let SurveyCookieIds = LocalStorage.GetData(LocalStorageKeys.SurveyCookieIds);
            let surveyCookies;
            let newSurveyCookies;
            let surveyCookie;
            let pushNewCookie = true;

            if (SurveyCookieIds) {
                surveyCookies = JSON.parse(SurveyCookieIds);
                if (surveyCookies) {
                    newSurveyCookies = surveyCookies.filter(f => f.SurveyId !== survey.Id);
                    surveyCookie = surveyCookies.find(s => s.SurveyId === survey.Id);

                    if (surveyCookie) {
                        if (surveyCookie.Id === newCookieId) {
                            return;
                        }

                        surveyCookie.Id = newCookieId;

                        if (!newSurveyCookies) {
                            newSurveyCookies = [];
                        }

                        newSurveyCookies.push(surveyCookie);
                        pushNewCookie(false);
                    }
                }
            }

            if (!newSurveyCookies) {
                newSurveyCookies = [];
            }

            if (pushNewCookie) {
                newSurveyCookies.push({ Id: newCookieId, SurveyId: survey.Id });
            }

            LocalStorage.SetData(LocalStorageKeys.SurveyCookieIds, JSON.stringify(newSurveyCookies));
        }
        catch (error) { }
    }

    function ShowErrorLocation() {
        setToastMessage({ message: 'Error while fetching location. Please enable location access from browser settings', severity: 'error' });
    }

    function SetLocationModel(locationModel) {
        setLocation(locationModel);
        setIsLoadingIpAddress(false);
    }

    function SetLatLong(location) {
        if (!location || !location.coords || !location.coords.latitude) {
            setCoordinates(null);
            return;
        }

        let coordinates = new Object();
        coordinates.Latitude = location.coords.latitude.toString();
        coordinates.Longitude = location.coords.longitude.toString();
        setCoordinates(coordinates);
    }

    function createSurvey() {
        try {
            setCreatingResponse(true);
            let saveModel = {};
            saveModel.SurveyId = survey.Id;
            saveModel.CookieSettingId = cookieId;

            if (Location) {
                saveModel.IpAddress = Location.IpAddress;
                saveModel.CountryCode = Location.CountryCode;
            }

            if (Coordinates) {
                saveModel.Latitude = Coordinates.Latitude;
                saveModel.Longitude = Coordinates.Longitude;
            }

            ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.Survey.Create, abortController)
                .then(
                    (result) => {
                        if (abortController.signal.aborted) {
                            return;
                        }

                        if (result && result.Data) {
                            setSurveyResponse(result.Data);
                            SetSurveyCookie(result.Data.CookieSettingId);
                        }

                        setCreatingResponse(false);
                    },
                    (error) => {
                        setCreatingResponse(false);
                        console.error(error);
                    }
                )
        }
        catch (err) {
            setCreatingResponse(false);
            console.error(err);
        }
    }

    return (
        <>
            {
                toastMessage ?
                    <Toast open={toastMessage.Message ? true : false}
                        severity={toastMessage.Severity}
                        message={toastMessage.Message}
                        onHide={() => setToastMessage(undefined)}
                    />
                    : null
            }
        </>
    )
}