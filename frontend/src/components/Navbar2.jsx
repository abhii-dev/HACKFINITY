import React, { useState } from 'react'
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { motion } from "motion/react"
import { Link } from "react-scroll";
import Button from "./LogoutButton.jsx"
import ThemeToggle from './ThemeToggle.jsx';




const Navbar = () => {
    const variants = {
        open: {
            clipPath: "circle(1200px at 43px 43px)",
            transition: { type: "spring", duration: 0.8 }
        },
        closed: {
            clipPath: "circle(25px at 43px 37px)",
            transition: { type: "spring", duration: 0.8 }
        }
    };
    


    const [menu, setMenu] = useState(false)
    const items =[
        {id:1, text:"About", to: "about" },
        // {id:2, text:"Projects", to: "projects"},
        // {id:3, text:"Contact", to: "contact"},
        // {id:4, text:"Education", to: "education"},
    ];
  return (
    <div>
        <motion.div
        initial={{opacity:0, y:-100}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5}}
        
        className='container bg-white mx-auto hidden md:flex justify-between items-center py-6 '>
            <div className='text-xl lg:text-2xl flex font-bold items-center gap-1'>
                <span className='text-purple-500'>SPORTIFY</span>
            </div>
           <div>
    {/* <ul className='flex gap-6 text-black font-medium text-base'>
        <li className='px-4 py-2 rounded hover:text-purple-500 hover:bg-purple-100 transition duration-300 cursor-pointer'>
            Borrow Items
        </li>
        <li className='px-4 py-2 rounded hover:text-purple-500 hover:bg-purple-100 transition duration-300 cursor-pointer'>
            Return Items
        </li>
    </ul> */}
</div>

            <div className='flex items-center gap-4'>
                <ul className='hidden md:flex text-black bg-white space-x-6 lg:text-lg md:text-base list-none items-center'>
                   {items.map(({id,text,to})=>(
                    <li key={id}
                    className='hover:text-purple-500 duration-200 cursor-pointer'
                    >
                        <Link
                        to={to}
                        smooth= {true}
                        duration={500}
                        offset={-70}

                        >
                        {text}
                        </Link>
                    </li>
                   ))}
                </ul>
                <ThemeToggle />
                
                <Button/>
            </div>
            {/* <a href={resume} target="_blank" rel="noopener noreferrer" className='md:text-base lg:text-lg text-white bg-purple-500 py-2 px-4 rounded-full hover:bg-purple-900'>Download Resume</a> */}
        </motion.div>
        <div className='flex md:hidden justify-between'>
            <motion.div
                animate={menu? "open": "closed"}>
                <motion.div 
                variants={variants}
                onClick={()=> setMenu((open) => !open)}  
                className='bg-[#1c1a2b] w-2/3 h-screen text-white fixed z-10'>
                    <div className='px-7 py-6 '>
                        {menu? (<IoMdClose />)  :  <LuMenu /> }
                    </div>
                    {menu &&(
                        <div className='flex flex-col justify-center items-center'>
                            <ul className='tex-lg text-white mb-3 space-y-6'>
                        {items.map(({id, text,to})=>(
                            <li key={id}
                            className='hover:text-purple-500 duration-200 cursor-pointer'>
                                 <Link
                                    to={to}
                                    smooth= {true}
                                    duration={500}
                                    offset={-70}
                                    onClick={()=> setMenu(false)}
                                >
                        {text}
                        </Link>
                            </li>
                        ))}
                            </ul>
            
                        </div>
                    )}
                </motion.div>
            </motion.div>
            <motion.div 
            initial={{opacity:0, x:100, y:-100}}
            animate={{opacity:1, x:0, y:0}}
            transition={{duration:0.5}}
            className='text-l font-bold flex items-center gap-2 py-6 px-4 '>
                <span className='text-white'>PORTFOLIO</span>
                <span className='text-purple-500'>WEBSITE</span>
            </motion.div>
        </div>
    </div>
  )
}

export default Navbar