import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "./api"; // Подставьте путь к вашему API запросу обновления токена
import { useAuth } from "./AuthContext"; // Подставьте путь к вашему контексту аутентификации

const TokenRefreshManager = () => {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res.status === 204) {
          console.log("204");
          setToken(null);
          navigate("/");
        } else {
          console.log("in effect1", res.accessToken);
          setToken(res.accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
        setToken(null);
        navigate("/");
      });
  }, []);

  useEffect(() => {
    let refreshAccessTokenTimerId;

    if (user.isAuthenticated) {
      const tokenExpirationTime = Date.now() + user.user.expiresAt;
      const refreshTime = tokenExpirationTime - Date.now() - 10 * 1000;

      console.log("refreshTime", refreshTime);

      refreshAccessTokenTimerId = setTimeout(() => {
        refreshToken()
          .then((res) => {
            if (res.status === 204) {
              console.log("204");
              setToken(null);
              navigate("/");
            } else {
              console.log("in effect2", res.accessToken);
              setToken(res.accessToken);
            }
          })
          .catch((err) => {
            console.log(err);
            setToken(null);
            navigate("/login");
          });
      }, refreshTime);
    }

    return () => {
      if (user.isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [user, setToken, navigate]);

  return null; // Этот компонент не рендерит ничего, поэтому можно просто вернуть null
};

export default TokenRefreshManager;

// old
useEffect(() => {
  refreshToken()
    .then((res) => {
      if (res.status === 204) {
        console.log("204");
        setToken(null);

        navigate("/");
      } else {
        console.log("in effect1", res.accessToken);
        setToken(res.accessToken);
      }
    })
    .catch((err) => {
      console.log(err);
      setToken(null);
      navigate("/");
    });
}, []);

useEffect(() => {
  let refreshAccessTokenTimerId;

  if (user.isAuthenticated) {
    const tokenExpirationTime = Date.now() + user.user.expiresAt;
    const refreshTime = tokenExpirationTime - Date.now() - 10 * 1000;

    console.log("refreshTime", refreshTime);

    refreshAccessTokenTimerId = setTimeout(() => {
      refreshToken()
        .then((res) => {
          if (res.status === 204) {
            console.log("204");
            setToken(null);

            navigate("/");
          } else {
            console.log("in effect2", res.accessToken);
            setToken(res.accessToken);
            cookies.set("jwt_authorization", res.accessToken);
            //cookies.set("refresh_token", res.refreshToken);
          }
        })
        .catch((err) => {
          console.log(err);
          setToken(null);
          navigate("/login");
        });
    }, refreshTime);
  }

  return () => {
    if (user.isAuthenticated && refreshAccessTokenTimerId) {
      clearTimeout(refreshAccessTokenTimerId);
    }
  };
}, [user]);

// useEffect(() => {
//   refreshToken()
//     .then((res) => {
//       if (res.status === 204) {
//         console.log("204");
//         setToken(null);

//         navigate("/");
//       } else {
//         console.log("in effect1", res.accessToken);
//         setToken(res.accessToken);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       setToken(null);
//       navigate("/");
//     });
// }, []);

// useEffect(() => {
//   let refreshAccessTokenTimerId;

//   if (user.isAuthenticated) {
//     const tokenExpirationTime = Date.now() + user.user.expiresAt;
//     const refreshTime = tokenExpirationTime - Date.now() - 10 * 1000;

//     console.log("refreshTime", refreshTime);

//     refreshAccessTokenTimerId = setTimeout(() => {
//       refreshToken()
//         .then((res) => {
//           if (res.status === 204) {
//             console.log("204");
//             setToken(null);

//             navigate("/");
//           } else {
//             console.log("in effect2", res.accessToken);
//             setToken(res.accessToken);
//             cookies.set("jwt_authorization", res.accessToken);
//             //cookies.set("refresh_token", res.refreshToken);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           setToken(null);
//           navigate("/login");
//         });
//     }, refreshTime);
//   }

//   return () => {
//     if (user.isAuthenticated && refreshAccessTokenTimerId) {
//       clearTimeout(refreshAccessTokenTimerId);
//     }
//   };
// }, [user]);
