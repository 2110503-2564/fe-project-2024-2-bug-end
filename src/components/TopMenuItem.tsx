import Link from 'next/link'

export default function TopMenuItem({ title , pageRef } : { title:string , pageRef:string }) {
    return (
        <Link 
            className="w-[120px] text-center mt-auto mb-auto font-sans text-md text-gray-600 hover:text-cyan-600 hover:font-medium" 
            href={pageRef}
        >
            { title }
        </Link>
    );
}