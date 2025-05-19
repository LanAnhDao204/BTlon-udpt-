import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from './Card';
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

const FreeBook = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [freebooks, setFreebooks] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                setLoading(true)
                const res = await axios.get(`${API_URL}/books`)
                setFreebooks(res.data)
                setLoading(false)
            } catch(error){
                console.error(error);
                setLoading(false)
            }
        }
        fetchData();
    },[])

    // Filter theo thể loại hoặc hiển thị 3 sách đầu tiên nếu không có sách loại "Free"
    const filterData = freebooks.filter((item) => item.category === "Fiction").slice(0, 3)
    
    if (loading) {
        return (
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-7">
                <div className="flex justify-center items-center h-60">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                </div>
            </div>
        );
    }
    
    return (
        <>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-7" >
                <div className='mt-20 mb-10 md:mt-0'>
                    <h1 className='font-bold text-xl md:text-2xl pd-2 mb-5'>
                        Sách nổi bật
                    </h1>

                    <p className="text-sm md:text-xl">Dưới đây là một số sách nổi bật trong thư viện của chúng tôi. Để truy cập toàn bộ sách, bạn có thể truy cập mục Sách từ thanh điều hướng và tìm sách mình mong muốn, bạn chỉ cần đăng ký và đăng nhập để truy cập toàn bộ sách của chúng tôi.</p>
                </div>
                <div className='m-5'>
                    <div className="slider-container">
                        {freebooks.length > 0 ? (
                            <Slider {...settings}>
                                {filterData.length > 0 ? (
                                    filterData.map((item) => (
                                        <Card item={item} key={item.id} />
                                    ))
                                ) : (
                                    freebooks.slice(0, 3).map((item) => (
                                        <Card item={item} key={item.id} />
                                    ))
                                )}
                            </Slider>
                        ) : (
                            <div className="text-center py-10">
                                <p>Không có sách nào</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreeBook;
