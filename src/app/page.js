import Image from "next/image";
import "./page.css";
import Hero from "../../Components/Hero/Hero";
import Card from "../../Components/Card/Card";
import Card2 from "../../Components/Card/Card2";
import Link from "next/link";
import {
  TfiFacebook,
  TfiInstagram,
  TfiLinkedin,
  TfiTwitter,
  TfiYoutube,
} from "react-icons/tfi";

const Home = () => {
  return (
    <>
      <div className="homePage">
        {/* Hero Section */}
        <section className="heroSection">
          <Hero />
        </section>

        {/* Top Stories Section */}
        <section>
          <div className="container">
            <div className="row">
              {/* Left Column */}
              <div className="col-8">
                <nav className="my-3">
                  <div className="tabsContainer d-flex  justify-content-between align-items-center px-2">
                    <button className="btn btn-outline-primary">
                      Top Stories
                    </button>
                    <div className="tabslinks d-flex justify-content-between gap-3">
                      <div>
                        <span className="Links" href={"/"}>
                          All
                        </span>
                        {/* here i need to search blogs based on tabs query in database and show the filterd items */}
                      </div>
                      <div>
                        <span className="Links" href={"/"}>
                          World
                        </span>
                      </div>
                      <div>
                        <span className="Links" href={"/"}>
                          BUSINESS
                        </span>
                      </div>
                      <div>
                        <span className="Links" href={"/"}>
                          ENTERTANMENT
                        </span>
                      </div>
                      <div>
                        <span className="Links" href={"/"}>
                          FASHION
                        </span>
                      </div>
                    </div>
                  </div>
                </nav>

                <div className="top-Stories">
                  <div className="d-flex justify-content-between flex-wrap mb-4">
                    <Card />
                    <Card />
                  </div>

                  <div className="smallCards d-flex flex-wrap gap-3">
                    <div className="d-flex gap-3 w-100">
                      <Card2 />
                      <Card2 />
                    </div>
                    <div className="d-flex gap-3 w-100">
                      <Card2 />
                      <Card2 />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-4 my-3 px-4 rightColumn">
                {/* Follow Us Section */}
                <div className="followUs">
                  <div className="mb-3">
                    <button className="btn btn-outline-primary">
                      Follow Us
                    </button>
                  </div>

                  {/* Social Media Icons Section */}
                  <div className="socialContainer p-0 bg-light rounded">
                    <div className="row text-center g-0 border">
                      {/* Social Icon 1 */}
                      <Link
                        href={"/"}
                        className="col-4 p-3 border-end border-bottom"
                      >
                        <TfiYoutube className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">456</p>
                        <p className="m-0 text-muted">Subscribers</p>
                      </Link>

                      {/* Social Icon 2 */}
                      <Link
                        href={"/"}
                        className="col-4 p-3 border-end border-bottom"
                      >
                        <TfiFacebook className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">789</p>
                        <p className="m-0 text-muted">Followers</p>
                      </Link>

                      {/* Social Icon 3 */}
                      <Link href={"/"} className="col-4 p-3 border-bottom">
                        <TfiTwitter className="fs-2 text-info" />
                        <p className="m-0 fw-bold">320</p>
                        <p className="m-0 text-muted">Followers</p>
                      </Link>

                      {/* Social Icon 4 */}
                      <Link href={"/"} className="col-4 p-3 border-end">
                        <TfiInstagram className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">540</p>
                        <p className="m-0 text-muted">Followers</p>
                      </Link>

                      {/* Social Icon 5 */}
                      <Link href={"/"} className="col-4 p-3 border-end">
                        <TfiLinkedin className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">300</p>
                        <p className="m-0 text-muted">Connections</p>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="advertisment">
                  <div className="my-4">
                  <Image
                    className="card-img-top"
                    width={750}
                    height={450}
                    alt="advertisment-img"
                    src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/345x345.jpg"
                    // style={{
                    //   objectFit: "cover",
                    //   width: "100%",
                    //   height: "250px",
                    // }}
                  />
                  </div>
                </div>

                <div className="businessSection">

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
