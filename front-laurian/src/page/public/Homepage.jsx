import Banner from "../../components/public/Banner";
import Description from "../../components/public/Description";
import Footer from "../../components/public/Footer";
import Header from "../../components/public/Header";
import PhotosGrid from "../../components/public/PhotosGrid";

function Homepage() {
  return (
    <>
      <Header />
      <Banner />
      <Description />
      <PhotosGrid />
      <Footer />
    </>
  );
}

export default Homepage;
