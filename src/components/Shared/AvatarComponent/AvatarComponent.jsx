/* eslint-disable react/prop-types */
// import Avatar from "@mui/material/Avatar";

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = "#";

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }

//   return color;
// }

// function stringAvatar(name) {
//   const length = name.split(" ").length;
//   const second = length > 1 ? name.split(" ")[1][0] : name.split(" ")[0][1];
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//       width: "56px",
//       height: "56px",
//     },
//     children: `${name.split(" ")[0][0]}${second}`,
//   };
// }

// export default function BackgroundLetterAvatars({ userName }) {
//   return <Avatar {...stringAvatar(userName)} />;
// }
