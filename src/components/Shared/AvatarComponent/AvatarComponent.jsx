/* eslint-disable react/prop-types */
import Avatar from "@mui/material/Avatar";

export default function FallbackAvatars({ userOwnerTrip, size }) {
  return (
    <>
      {userOwnerTrip.avatar && (
        <Avatar
          src={userOwnerTrip.avatar}
          sx={{ width: size, height: size }}
          alt={userOwnerTrip.username}
        />
      )}
      {!userOwnerTrip.avatar && (
        <Avatar
          sx={{ bgcolor: "#e84b80", width: size, height: size }}
          alt={userOwnerTrip.username}
          src="/broken-image.jpg"
        />
      )}
    </>
  );
}
