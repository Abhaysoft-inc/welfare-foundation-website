import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Source_Sans_3 } from 'next/font/google'

const sourcesans3 = Source_Sans_3();

const Navbar = () => {
    return (
        <>

            <div className={`${sourcesans3.className} navbar shadow`}>
                <div className="upper-nav bg-[#0275dd] py-2 leading-4">
                    <p className="text-center text-white font-semibold">Contact: +91 8948041722</p>
                    <p className="text-center text-white font-semibold">Email: abhayofc@yahoo.com</p>

                </div>

                <div className="flex justify-between px-3 items-center py-4">
                    <p className="">Logo Here</p>
                    <div className="flex gap-4 items-center">
                        <button className='bg-gradient-to-r from-orange-400  via-[#ee9a40] to-orange-400 text-white rounded-full px-4 py-1 text-md '>Donate</button>
                        <FaBars size={26} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar