/* eslint-disable react/prop-types */
import styles from "./CustomMap.module.css";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";

const LocationList = ({
  isListOfLocations,
  listOfLocations,
  onViewLocation,
  onDeleteLocation,
}) => {
  return (
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
          <p>
            Your List is still empty. Select a location from map to show in a
            list
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationList;
