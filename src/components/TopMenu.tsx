import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return (
        <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row">
            <Image src={'/img/logo.png'} className="h-full w-auto"
            alt='logo' width={0} height={0} sizes="100vh"/>
            <TopMenuItem title='Hotel' pageRef='/car'/>
            <TopMenuItem title='Booking' pageRef='/reservations'/>
            <TopMenuItem title='About' pageRef='/about'/>
            <TopMenuItem title='Cart' pageRef='/cart'/>

            {
                session? 
                <Link href={'/api/auth/signout'}>
                    <div className='flex items-center absolute right-0 h-full px-2
                    absolute right-0 text-cyan-600 text-sm'>
                        Sign-Out of {session.user?.name}
                    </div>
                </Link> :
                <Link href={'/api/auth/signin'}>
                    <div className='flex items-center absolute right-0 h-full px-2
                    absolute right-0 text-cyan-600 text-sm'>
                        Sign-In
                    </div>
                </Link>
            }
        </div>
    );
}