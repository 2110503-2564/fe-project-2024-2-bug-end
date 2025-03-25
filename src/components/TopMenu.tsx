import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import TopMenuItemDropdown from './TopMenuItemDropDown';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';
import getUserProfile from '@/libs/getUserProfile';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    const profile = (!session || !session.user.token) 
        ? null 
        : await getUserProfile(session.user.token);

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
            <TopMenuItem title='Hotel & Home' pageRef='/' />
            <TopMenuItem title='About us' pageRef='/about' />

            <div className='flex flex-row fixed absolute right-0 h-full'>
                {profile && profile.data ? (
                    <TopMenuItemDropdown
                        title={profile.data.name}
                        subItems={[
                            { label: "Profile", href: "/profile" },
                            { label: "My Booking", href: "/booking" },
                            ...(profile.data.role === 'admin'
                                ? [{ label: "Manage User", href: "/manageuser" }]
                                : []),
                            { label: "Sign-Out", href: "/api/auth/signout" },
                        ]}
                    />
                ) : (
                    <TopMenuItem title={`Sign-In`} pageRef='/api/auth/signin' />
                )}

                {!profile && <TopMenuItem title='Register' pageRef='/register' />}
            </div>
        </div>
    );
}