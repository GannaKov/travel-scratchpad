import { useEffect, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";

import styles from "./CustomMap.module.css";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";
import LocationList from "./LocationList";
import useAuth from "../../context/useAuthHook";
import { getUserLocations, putUserLocations } from "../../services/requests";

const CustomMap = () => {
  const { user } = useAuth();
  // store clicked location
  const [selectedLocation, setSelectedLocation] = useState({});
  // store show dialog state to add location
  const [showDialog, setShowDialog] = useState(false);
  // store dialog location
  const [dialogLocation, setDialogLocation] = useState("");

  const [markerLocations, setMarkerLocations] = useState([]);
  const [markerLocation, setMarkerLocation] = useState({
    lat: 52.52,
    lng: 13.405,
  });
  const [listOfLocations, setListOfLocations] = useState([]);
  const [isListOfLocations, setIsListOfLocations] = useState(false);
  const [hasCenter, setHasCenter] = useState(false);
  //const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  useEffect(() => {
    const userLocations = async (userId) => {
      try {
        const res = await getUserLocations(userId);
        setListOfLocations(res.data.listOfLocations);

        const coordinatesArray = res.data.listOfLocations.map(
          (item) => item.location
        );
        setMarkerLocations(coordinatesArray);
      } catch (error) {
        console.log(error);
      }
    };
    userLocations(user.user.id);
  }, [user.user.id]);

  // handle click on map
  const handleMapClick = (mapProps) => {
    // checks if location clicked is valid
    if (mapProps.detail) {
      //mapProps.detail.placeId
      const lat = mapProps.detail.latLng.lat;
      const lng = mapProps.detail.latLng.lng;

      setShowDialog(true);
      setDialogLocation({ lat, lng });
      setSelectedLocation({ lat, lng });
    } else {
      // show alert message
      alert("Please select the specific location");
    }
  };

  // add location to show in a list
  const onAddLocation = async () => {
    // Create a Google Maps Geocoder instance
    const geocoder = new window.google.maps.Geocoder();

    // Reverse geocode the coordinates to get the place name
    geocoder.geocode({ location: selectedLocation }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const newArr = [
            ...listOfLocations,
            { name: results[0].formatted_address, location: selectedLocation },
          ];
          setListOfLocations([
            ...listOfLocations,
            { name: results[0].formatted_address, location: selectedLocation },
          ]);
          setMarkerLocations((prev) => [...prev, selectedLocation]);
          setShowDialog(false);
          try {
            putUserLocations(newArr, user.user.id);
          } catch (error) {
            console.log(error);
          }
        }
        //

        //
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  // displays marker on the map for the selected location
  const onViewLocation = (loc) => {
    setMarkerLocation({ lat: loc.lat, lng: loc.lng }); //!!!!!!!!!!!
    setHasCenter(true);
  };

  // deletes selected location from the list
  const onDeleteLocation = (loc) => {
    let updatedList = listOfLocations.filter(
      (l) => loc.lat !== l.location.lat && loc.lng !== l.location.lng
    );

    setListOfLocations(updatedList);

    const updatedMarkerLocations = markerLocations.filter(
      (location) => location.lat !== loc.lat || location.lng !== loc.lng
    );
    setMarkerLocations(updatedMarkerLocations);
    try {
      putUserLocations(updatedList, user.user.id);
    } catch (error) {
      console.log(error);
    }
  };
  const notCentered = () => {
    setHasCenter(false);
  };

  return (
    <div>
      <div className={styles.mapContainer}>
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
          //center={markerLocation}
          reuseMaps={true}
          onClick={(mapProps) => handleMapClick(mapProps)}
          {...(hasCenter ? { center: markerLocation } : {})}
        >
          {showDialog && dialogLocation && (
            <InfoWindow position={dialogLocation}>
              <ButtonsTemplate
                type="button"
                color="black"
                size="small"
                variant="outlined"
                onClick={onAddLocation}
              >
                Add this location
              </ButtonsTemplate>
            </InfoWindow>
          )}
          {/* <AdvancedMarker position={markerLocation} /> */}
          {markerLocations.length > 0 &&
            markerLocations.map((loc, i) => (
              <Marker key={i + loc.lat + loc.lng} position={loc} />
            ))}
        </Map>
      </div>
      <div className={styles.componentAfterMapWrp}>
        <div className={styles.componentChunk}>
          <p className={styles.componentChunkTitle}>
            Select a place on the map and add it to your list
          </p>
        </div>

        <div className={styles.componentChunk}>
          <p>Would you like to enable scrolling?</p>
          <ButtonsTemplate
            type="button"
            color="black"
            size="small"
            variant="outlined"
            onClick={notCentered}
          >
            Enable Scrolling
          </ButtonsTemplate>
        </div>
        <div className={styles.componentChunk}>
          <p className={styles.componentChunkTitleList}>
            Your list of locations
          </p>
          <ButtonsTemplate
            type="button"
            color="darkGreen"
            size="small"
            variant="outlined"
            onClick={() => setIsListOfLocations((prev) => !prev)}
          >
            {isListOfLocations ? "Close" : "Open"}
          </ButtonsTemplate>
        </div>

        <LocationList
          isListOfLocations={isListOfLocations}
          listOfLocations={listOfLocations}
          onViewLocation={onViewLocation}
          onDeleteLocation={onDeleteLocation}
        />
      </div>
    </div>
  );
};

export default CustomMap;
