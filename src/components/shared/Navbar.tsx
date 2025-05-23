/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { imageUrl } from "@/redux/base/baseApi";
import CmnButton from "./CmnButton";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import { Menu } from "lucide-react";

const Navbar = () => { 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); 
    const menuRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter(); 
    const { data: profile } = useProfileQuery(undefined); 

  
    const navOptions = [
      { label: "Home", path: "/" },
      { label: "Business listing", path: "/business-listing" },
      { label: "About", path: "/about" },
      { label: "Blogs", path: "/blogs" },
      { label: "Contact Us", path: "/contact" },
    ]; 
  
    const image  = profile?.profile?.startsWith("https") ? profile?.profile : `${imageUrl}${profile?.profile }` 
    const userName  = profile?.name   

    const profileDropdownRef = useRef<HTMLDivElement>(null);
  
    // Handle click outside dropdowns
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          profileDropdownRef.current &&
          !profileDropdownRef.current.contains(event.target as Node)
        ) {
          setIsProfileDropdownOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);  

    const handleLogOut = () => {
      localStorage.removeItem("accessToken"); 
      router.push("/login")
    }
    return (
        <div className=" text-black  bg-[#F8F8F8] w-full">
        <div className="navbar flex  py-6 container  justify-between items-center relative">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden z-50"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <HiX size={30} /> : <HiOutlineMenuAlt3 size={30} />}
          </button>
  
          {/* Logo */}
         
          <img src="/logo.svg" alt="" className="lg:w-auto lg:h-[50px] w-auto h-8" />
          {/* Nav Menu */}
          <div
            ref={menuRef}
            className={`absolute lg:relative top-20 left-0 lg:top-0  lg:left-auto w-full lg:w-auto lg:flex flex-col lg:flex-row  lg:rounded-full lg:px-6 shadow-lg lg:shadow-none p-5 lg:p-0 space-y-4 lg:space-y-0 lg:space-x-6 transition-all duration-300 z-50 text-[16px] ${isMenuOpen ? "block bg-white" : "hidden "
              }`}
          >
            {navOptions.map((option, index) => {
              if (!option.path) {
              
                return (
                  <div
                    key={index}
                    className="nav-link flex items-center justify-center flex-col px-3 "
                  >
                    {option.label}
                  </div>
                );
              }
              
              return (
                <Link key={index} href={option.path}
  
                  className={`nav-link flex flex-col items-center justify-center px-3 py-4 rounded-lg ${pathname === option.path
                      ? "text-primary font-semibold"                
                            : "hover:text-primary "
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {option.label}
  
                </Link>
              );
            })}
          </div>
  
          {/* Right Icons */}
          <div className="nav-icons flex gap-4">  

            {  
  
  profile ? <div className="flex items-center gap-2"                
  
> 
<div className="flex items-center gap-x-2 lg:border border-[#999999] rounded-full px-4 "   onClick={() =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }> 
   <p className="text-black text-lg lg:block hidden cursor-pointer"><Menu size={20} color="#999999" /> </p>
   <img className="lg:w-11  lg:h-11 w-12 h-12 rounded-full cursor-pointer" src={image} alt="profile" /> 
  </div> 
  </div>  :  <Link href="/login">
              <CmnButton className=" py-3 px-8 rounded-xl font-medium">Login</CmnButton>
            </Link>
            } 

{isProfileDropdownOpen && (
                <div   ref={profileDropdownRef} className="absolute top-20 right-4 mt-2 bg-white border rounded shadow-lg w-[200px] z-50">
                  <div className="p-4 flex flex-col gap-3 items-center">          
                    <Image src={image} alt="" height={55} width={55} style={{ borderRadius: "100%", width: "55px", height: "55px" }} />
                    <div className="font-bold ">{userName}</div>
                    <Link href="/edit-profile">
                      <button className="text-white bg-primary w-full px-6 py-2 rounded-lg text-[14px]" >
                        Visit Your Profile
                      </button>
                    </Link>

                  </div>
                  <div className="border-t">
                    <button className="px-4 py-3 text-primary hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={handleLogOut}>
                      <IoIosLogOut size={24} />
                      <p>Log Out</p>
                    </button>
                  </div>
                </div>
              )} 
           
          </div>
        </div>
      </div>
    );
};

export default Navbar;