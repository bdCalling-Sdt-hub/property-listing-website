/* eslint-disable @next/next/no-img-element */
"use client"
import { imageUrl } from '@/redux/base/baseApi';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GrUserManager } from 'react-icons/gr';
import { IoLocationOutline } from 'react-icons/io5';
import { PiUsersThree } from 'react-icons/pi';
import { RiCalendarScheduleLine } from 'react-icons/ri';

type Property = {
  name: string;
  image: string;
  location: string;
  employees: number;
  ownership: string;
  revenue: string;
  createdAt: string; 
  _id: number; 
};  
const SidePropertyCard = ({ property }:{property:Property}) => { 
    const router = useRouter();
    return (
         <div key={property?._id} className="bg-white rounded-lg overflow-hidden shadow-md  flex flex-row gap-7 cursor-pointer"  onClick={() => router.push(`/business-listing/${property?._id}`)}>
               <div className="relative">
                 <img 
                   src={property?.image[0]?.startsWith("https") ? property?.image[0] : `${imageUrl}${property?.image[0]}`} 
                   alt={property?.name}
                   className="w-[450px] h-[200px] object-cover"
                 />
               </div>
               
               <div className="p-4 w-full">
                 <div className="flex  flex-col gap-2 mb-2">
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                   <div className='flex items-center gap-1'> 
                     <span> <IoLocationOutline size={18} color='#757575' /> </span>  
                   <p className="text-sm text-[#757575]">{property.location}</p> 
                       </div> 
                   </div>

                   <div className=" mt-4">
                     <p className="text-[16px] font-bold text-[#348DE8]">price: {property.revenue}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center justify-between  py-4 ">
                 
                     <div className='flex items-center gap-2'> 
                       <p><PiUsersThree size={24} color='#757575' /> </p>
                       <p className="text-[16px] font-semibold text-gray-900">{property?.employees}</p>
                     </div>
                     <div className='flex items-center gap-2'> 
                       <p> <GrUserManager size={20} color='#757575' /> </p>
                       <p className="text-[16px] font-semibold text-gray-900">{property.ownership}</p>
                     </div>
                   
                   <div className='flex items-center gap-2'> 
                       <p> <RiCalendarScheduleLine size={20} color='#757575' /> </p>
                     <p className="text-[16px] font-semibold text-gray-900">{moment(property?.createdAt).format('D-MM-YY')}</p>
                   </div>
                 </div>
               </div>
             </div>
    );
};

export default SidePropertyCard;