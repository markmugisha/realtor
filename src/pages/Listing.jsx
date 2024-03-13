import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper slidesPerView={1} navigation pagination={{type: "progressbar"}} effect="fade" modules={[EffectFade]} Autoplay={{ delay:3000 }}>
        {listing.imgUrls.map((url, index)=>(<SwiperSlide key={index}>
            <div className="relative w-full overflow-hidden h-[300px]" style={{background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: "cover"}}>

            </div>

        </SwiperSlide>))}
      </Swiper>
    </main>
  );
};

export default Listing;
