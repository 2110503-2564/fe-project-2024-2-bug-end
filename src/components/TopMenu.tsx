import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import TopMenuItemDropdown from './TopMenuItemDropDown';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Link } from '@mui/material';
import { useState } from 'react';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    console.log(session?.user)

    return (
        <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 flex flex-row">
            <Link href='/'>
                <Image 
                    src={'/img/logo.png'} 
                    className="h-full w-auto rounded-br-sm rounded-tr-sm"
                    alt='logo' 
                    width={0} 
                    height={0} 
                    sizes="100vh"
                />
            </Link>
            <TopMenuItem title='Hotel & Home' pageRef='/'/>
            <TopMenuItem title='About us' pageRef='/about'/>

            <div className='flex flex-row fixed absolute right-0 h-full'>
                
            {
                session? 
                <TopMenuItemDropdown title={session.user.name} subItems={[
                    { label: "Profile", href: "/profile" },
                    { label: "My Booking" , href: "/booking"},
                    { label: "Sign-Out", href: "/api/auth/signout" }
                ]}
                />
                :
                <TopMenuItem title={`Sign-In`} pageRef='/api/auth/signin'/>
            }
            
            {
                session? 
                null
                :
                <TopMenuItem title='Register' pageRef='/register'/>
            }
                
            </div>
            
        </div>
    );
}