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
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaRegCopy } from "react-icons/fa";


const IconWithTooltip = ({ icon, tooltip }) => {
    return (
        <div className="icon-container" title={tooltip}>
        {icon}
        </div>
    );
};


const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopy, setShareLinkCopy] = useState(false);
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
      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border- border-gray-400 rounded-full w-12 h-12 flex justify-center items-center" onClick={()=>{
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopy(true);
        setTimeout(()=>{
          setShareLinkCopy(false);
        }, 2000);
      }}>
        <IconWithTooltip icon={<FaRegCopy className="text-lg text-slate-500" />} tooltip="Copy link" />
      </div>
      {shareLinkCopy && (
        <p className="fixed top-[23%] right-[5%] font-semibold bg-white z-10 p-2 rounded-full">Link copied</p>
      )}
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className="h-[200px] w-full lg-[400px]">
            <p className="text-2xl font-bold mb-3 text-blue-900 ">
                {listing.name} - ${listing.offer ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                {listing.type === "rent" ? "/month" : ""}
            </p>
            <p className="flex items-center mt-6 mb-3 text-semibold "><FaMapMarkerAlt className="text-green-700 mr-1"/> {listing.address}</p>
            <div className="flex justify-start items-center space-x-4 w-[75%] ">
                <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">{listing.type === "rent" ? "Rent" : "Sale"}</p>
                <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">{listing.offer && (
                    <p>${listing.regularPrice-listing.discountedPrice} discount</p>
                )}</p>
            </div>
                    <p className="mt-3 mb-3 "><span className="font-semibold">Description: </span> <span>{listing.description}</span></p>
                    <ul className="flex items-center space-x-2 lg:space-x-10 text-sm font-semibold">
                        <li className="flex items-center whitespace-nowrap">
                            <FaBed className="text-lg mr-1 "/>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : "1 bedroom"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaBath className="text-lg mr-1 "/>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : "1 bathroom"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaParking className="text-lg mr-1 "/>
                            {listing.parking ? "Parking slot": "No parking"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaChair className="text-lg mr-1 "/>
                            {listing.furnished ? "Furnished" : "Unfurnished"}
                        </li>
                    </ul>

        </div>
        <div className="bg-blue-300 h-[200px] w-full lg-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
};

export default Listing;
