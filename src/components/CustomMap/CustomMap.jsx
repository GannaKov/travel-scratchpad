import { useCallback, useEffect, useRef, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { InfoWindow } from "@vis.gl/react-google-maps";
//import { AdvancedMarker } from "./advanced-marker";
import styles from "./CustomMap.module.css";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";

const CustomMap = () => {
  // store clicked location
  const [selectedLocation, setSelectedLocation] = useState({});
  // store show dialog state to add location
  const [showDialog, setShowDialog] = useState(false);
  // store dialog location
  const [dialogLocation, setDialogLocation] = useState("");
  // shows marker on London by default
  // store list of all locations selected

  const [markerLocations, setMarkerLocations] = useState([]);
  const [markerLocation, setMarkerLocation] = useState({
    lat: 52.52,
    lng: 13.405,
  });
  const [listOfLocations, setListOfLocations] = useState([]);
  const [isListOfLocations, setIsListOfLocations] = useState(false);
  const [hasCenter, setHasCenter] = useState(false);
  //const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // handle click on map
  const handleMapClick = (mapProps) => {
    // console.log("mapProps", mapProps.detail);
    // checks if location clicked is valid
    if (mapProps.detail) {
      // console.log("mapProps", mapProps.detail);
      //mapProps.detail.placeId
      const lat = mapProps.detail.latLng.lat;
      const lng = mapProps.detail.latLng.lng;

      setShowDialog(true);
      setDialogLocation({ lat, lng });
      setSelectedLocation({ lat, lng });
      // console.log("Clicked location:", { lat, lng });
    } else {
      // show alert message
      alert("Please select the specific location");
    }
  };
  // console.log("showDialog", showDialog, "dialogLocation", dialogLocation);
  // alert("add to map?");
  // add location to show in a list

  const onAddLocation = () => {
    // Create a Google Maps Geocoder instance
    const geocoder = new window.google.maps.Geocoder();

    // Reverse geocode the coordinates to get the place name
    geocoder.geocode({ location: selectedLocation }, (results, status) => {
      if (status === "OK") {
        console.log("res 0", results[0]);
        if (results[0]) {
          setListOfLocations([
            ...listOfLocations,
            { name: results[0].formatted_address, location: selectedLocation },
          ]);
          setMarkerLocations((prev) => [...prev, selectedLocation]);
          setShowDialog(false);
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };
  // console.log("list", listOfLocations);
  // console.log(" markerLocations", markerLocations);
  // console.log(" markerLocation", markerLocation);

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
  };
  const notCentered = () => {
    setHasCenter(false); // Переключаем наличие свойства center
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
              <button className={styles.mapBtn} onClick={onAddLocation}>
                Add this location
              </button>
            </InfoWindow>
          )}
          {/* <AdvancedMarker position={markerLocation} /> */}
          {markerLocations.length > 0 &&
            markerLocations.map((loc, i) => (
              <Marker key={i + loc.lat + loc.lng} position={loc} />
            ))}
          {/* <Marker position={center} /> */}
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
        <div className={styles.componentChunkList}>
          {isListOfLocations &&
            listOfLocations.length > 0 &&
            listOfLocations.map((loc) => (
              <div
                key={loc.location.lat + loc.location.lng}
                className={styles.componentChunkListItem}
              >
                <p className={styles.componentChunkTitle}>{loc.name}</p>
                <div className={styles.componentChunkBtnWrp}>
                  <ButtonsTemplate
                    color="darkGreen"
                    size="small"
                    variant="outlined"
                    onClick={() => onViewLocation(loc.location)}
                  >
                    View
                  </ButtonsTemplate>

                  <ButtonsTemplate
                    color="pink"
                    size="small"
                    variant="outlined"
                    onClick={() => onDeleteLocation(loc.location)}
                  >
                    Delete
                  </ButtonsTemplate>
                </div>
              </div>
            ))}

          {isListOfLocations && listOfLocations.length === 0 && (
            <div>
              <p className="list-heading">
                Your List is still empty. Select a location from map to show in
                a list
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomMap;
