/* eslint-disable @next/next/no-img-element */
"use client"
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const data = [
  {
    icon: <img src="/we1.png" alt="" className=' w-[40px] h-[40px]' />,
    title: "Full-Service Handling",
    description: "Full-service handling means we manage every detail, ensuring a smooth process from start to finish, so you stay stress-free."
  },
  {
    icon: <img src="/we2.png" alt="" className=' w-[40px] h-[40px]' />,
    title: "Price Negotiation",
    description: "Price negotiation ensures you get the best deal. We handle discussions professionally, maximizing value while meeting your budget."
  },
  {
    icon: <img src="/we3.png" alt="" className=' w-[40px] h-[40px]' />,
    title: "Paperwork Handling",
    description: "We manage all paperwork efficiently, ensuring accuracy and compliance, so you can focus on what matters most."
  }
]
const WeHandle = () => {

  const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
    return (
      <div
        className="h-full bg-[#F8F8F8] border-0 shadow-sm hover:shadow-md transition-shadow p-5 rounded-2xl"

      >
        <div className="flex flex-col items-start gap-4">
          <div className="w-[80px] h-[80px] flex items-center justify-center bg-[#FFF7EC] rounded-full">
            {icon}
          </div>
          <h3 className="text-[32px] font-semibold text-[#000000]">{title}</h3>
          <p className="text-[18px] text-[#757575] font-normal">{description}</p>
        </div>
      </div>
    );
  }



  return (
    <div>
      <div className=" mb-[60px]">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 container mx-auto">
          <div className="text-start mb-10 w-full">
            <p className="text-4xl md:text-[48px] font-semibold  mb-5 ">
              We handle everything
            </p>
            <p className="text-[20px] font-normal  text-[#757575] w-2/3  leading-8 ">
              We handle everything, from start to finish, ensuring a seamless experience with no hassle, so
              you can relax.
            </p>
          </div>

          {/* Services Cards */}
          <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
            {
              data.map((item, index) => (
                <ServiceCard key={index} icon={item.icon} title={item.title} description={item.description} />
              ))
            }
          </div>
        </section>


      </div>
    </div>
  );
};

export default WeHandle;