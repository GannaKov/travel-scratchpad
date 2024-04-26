import {
  useNavigate,
  useLoaderData,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";
import BlogSingleTrip from "../../../components/BlogComponents/BlogSingleTrip/BlogSingleTrip";
import GoBack from "../../../components/GoBack/GoBack";
import styles from "./BlogSinglePage.module.css";
import { useEffect, useState } from "react";
import { getTripById } from "../../../services/requests";

const BlogSinglePage = () => {
  const singleTrip = useLoaderData();
  const location = useLocation();
  const backLinkHref = location.state ?? "/blog-main";
  //-----
  // const { travel_id } = useParams();
  // const [error, setError] = useState();
  // const [singleTrip, setSingleTrip] = useState(null);
  // useEffect(() => {
  //   getTripById(travel_id)
  //     .then((res) => {
  //       console.log("res in Ef", res);
  //       setSingleTrip(res);
  //     })
  //     .catch((error) => {
  //       console.log(error.status, error.message);
  //       setError(error.response.status);
  //     });
  // }, [travel_id]);
  //----
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <GoBack state={backLinkHref} />
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>single Map</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}></div>
      </div>
      <div className={styles.sectionBlog}>
        {singleTrip && (
          <div className={styles.containerBlog}>
            <BlogSingleTrip singleTrip={singleTrip} />
          </div>
        )}
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>single Photos</p>
        </div>
      </div>
    </div>
  );
};

export default BlogSinglePage;
