/* eslint-disable @next/next/no-img-element */
"use client";

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { RiCalendarScheduleLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { Montserrat } from "next/font/google";
import { GrLocation } from "react-icons/gr";
import { useState } from "react";
import EnquireNowModal from "./EnquireNowModal";
import { useParams } from "next/navigation";
import { useGetBusinessByIdQuery } from "@/redux/features/businessListApi";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import moment from "moment";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import ProposalModal from "./ProposalModal";

const montserrat = Montserrat({ subsets: ["latin"] });

const ProductDetails = () => { 
    const [ open , setOpen]  = useState(false) 
    const {id} = useParams()  
    const {data:detailsData} = useGetBusinessByIdQuery(id) 
    const {data:category} = useGetCategoryQuery(undefined)  
    const {data:profile} = useProfileQuery(undefined)  
    const  [openProposal , setOpenProposal] = useState(false)
    const userRole = profile?.role
    console.log(detailsData); 

    const matchedCategory = category?.find(
        (cat:{_id:string}) => cat?._id === detailsData?.category
      ); 
    
const overview = [
    {
        id: 1,
        title: "Business type ",
        icon: <LuBriefcaseBusiness size={24} color="#757575" />,
        value: matchedCategory?.name
    },
    {
        id: 2,
        title: "Employees",
        icon: <PiUsers size={24} color="#757575" />,
        value: detailsData?.employees
    },
    {
        id: 3,
        title: "Inception",
        icon: <RiCalendarScheduleLine size={24} color="#757575" />,
        value: moment(detailsData?.createdAt).format('D-MM-YY')
    },
    {
        id: 4,
        title: "Headquarters",
        icon: <HiOutlineBuildingOffice2 size={24} color="#757575" />,
        value: detailsData?.location
    },
    {
        id: 5,
        title: "Ownership Type",
        icon: <PiUsers size={24} color="#757575" />,
        value: detailsData?.ownership
    },
    {
        id: 6,
        title: "Funding",
        icon: <RiMoneyDollarCircleLine size={24} color="#757575" />,
        value: "$40k"
    },
]

const propertyImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
]; 
    return (
        <div className='container lg:py-[60px] py-[30px]'>
            <div className=''>
                <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center mb-6">
                    <div>
                        <p className="lg:text-[32px] text-[24px] text-primary font-semibold lg:mb-0 mb-2 ">{detailsData?.name}</p>
                        <p className="text-gray-500 text-[14px] lg:mb-0 mb-2 flex items-center gap-1"> <span> <GrLocation size={16} />  </span> <span> {detailsData?.location} </span></p>
                    </div>
                    <div className="flex flex-col  gap-y-2">
                        <div className="block font-semibold lg:text-[32px] text-[20px] text-[#0171E2]">Price: ${detailsData?.revenue}</div> 

                        {
                              userRole === "CUSTOMER" &&          <div className=" lg:block hidden"> 
                              <div className=" flex items-center lg:justify-end gap-4 ">
                                  <button className=" bg-primary text-white font-bold h-[40px]  px-5 rounded-lg text-[16px]  " onClick={() => setOpenProposal(true)} > Send Proposal </button>
                                  <button className=" bg-[#FFF7EC] text-primary font-bold h-[40px]  px-5 rounded-lg text-[16px]  " onClick={() => setOpen(true)}> Enquire Now </button>
                              </div>
      
                              </div>
                        } 
                 

                    </div>
                </div>

                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mb-8  ">
                    <div className="col-span-2">
                        <img alt="Main Property Image" src={propertyImages[0]} className="h-auto w-full object-cover shadow-lg rounded-lg" />
                    </div>
                    <div className="col-span-2 ">
                        <div className="grid grid-cols-2 gap-x-4 lg:gap-y-0 gap-y-2">
                            {propertyImages.slice(1).map((image, index) => (
                                <img key={index} alt={`Property Image ${index + 2}`} src={image} className="h-auto w-full object-cover shadow-md rounded-lg" />
                            ))}

                        </div>
                    </div>
                </div>


                <div className="flex items-center justify-center mb-[30px]   ">
                    <div className="w-[90%] bg-[#F8F8F8] lg:px-[77px] px-4 lg:py-10 py-4 rounded-xl">
                        <p className="text-[32px] font-semibold mb-6">Overview</p>
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mb-8 text-center">
                            {
                                overview?.map((item, index) => (
                                    <div key={index} className="p-4  flex items-center justify-center gap-x-5 border border-gray-300 rounded-lg">
                                        <p className="flex items-center  justify-center bg-white w-12 h-12 rounded-full"> {item.icon}  </p>

                                        <div className=" flex items-start flex-col">
                                            <p className="font-medium text-[#757575] text-[16px] ">{item.title}</p>
                                            <p className="text-[#000000] text-[20px] font-semibold">{item.value}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>

                <div>
                    <p className="lg:text-[32px] text-[24px] font-semibold mb-3 text-[#000000] ">Business Description</p>
                    <p className={`${montserrat.className} lg:text-lg text-sm font-normal pb-3 text-[#000000] `}>
{detailsData?.reason}
                    </p>

                </div>

                <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-16 gap-8 mb-8">

                    <div className="w-full col-span-2">
                        <p className="lg:text-[32px] text-[24px] font-semibold mb-3 text-[#000000]">Business Details</p>
                        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-16 gap-8 ">

                            <div className="flex flex-col gap-10 gap-y-2  w-full">
                                <div className="flex items-center justify-between gap-10 "><p className="text-gray-500 font-medium">Business ID : </p>  <p className="font-semibold">RT48</p></div>
                                <div className="flex items-center justify-between "><p className="text-gray-500 font-medium">Price :</p><p className="font-semibold">${detailsData?.revenue
                                }</p></div>
                                <div className="flex items-center justify-between "><p className="text-gray-500 font-medium">Total employees :</p><p className="font-semibold">{detailsData?.employees}</p></div>
                            </div>

                            <div className="flex flex-col gap-y-2  w-full">
                                <div className="flex items-center justify-between "><p className="text-gray-500 font-medium">Inception :</p><p className="font-semibold">{detailsData?.founded}</p></div>

                                <div className="flex items-center justify-between "><p className="text-gray-500 font-medium">Business Type :</p><p className="font-semibold"> {matchedCategory?.name}</p></div>

                                <div className="flex items-center justify-between "><p className="text-gray-500 font-medium">Ownership Type :</p><p className="font-semibold">{detailsData?.ownership}</p></div>
                            </div>


                        </div>
                    </div>

                    <div className="col-span-1">
                        <p className="lg:text-[32px] text-[24px] font-semibold mb-3 text-[#000000]">Address</p>
                        <div className=" ">

                            <div className="flex flex-col gap-10 gap-y-2  w-full">
                                <div className="flex items-center justify-between gap-10 "><p className="text-gray-500 font-medium">Address : </p>  <p className="font-semibold">{detailsData?.location}</p></div>
                                <div className="flex items-center justify-between "><p className="text-gray-500 font-medium">City :</p><p className="font-semibold">Woodlands</p></div>
                                <div className="flex items-center justify-between "><p className="text-gray-500 font-medium">State/County :</p><p className="font-semibold">Singapore City</p></div>
                            </div>
                        </div>

                    </div>
                </div>  

            {
                userRole === "CUSTOMER" &&   <div className=" block lg:hidden mt-5"> 
                <div className=" flex items-center justify-end gap-4 ">
                    <button className=" bg-primary text-white font-bold h-[40px]  px-5 rounded-lg text-[16px]  " onClick={() => setOpenProposal(true)} > Send Proposal </button>
                    <button className=" bg-[#FFF7EC] text-primary font-bold h-[40px]  px-5 rounded-lg text-[16px]  " onClick={() => setOpen(true)}> Enquire Now </button>
                </div>
                </div>
            }

              
            </div>  

            <ProposalModal open={openProposal} setOpen={setOpenProposal} id={id} />
            <EnquireNowModal open={open} setOpen={setOpen} id={id} />
        </div>
    );
};

export default ProductDetails;