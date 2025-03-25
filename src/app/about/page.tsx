import Image from "next/image"

export default function AboutPage() {
    return (
        <main className="flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-semibold my-8">Group Member</h1>
            <div className="flex gap-[100px]">
                <div key={1} className="flex flex-col items-center">
                    <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-lg flex items-center justify-center text-gray-600 text-lg">
                        <Image 
                            src="/img/tonnam.png"
                            alt="tonnam"
                            width={300}
                            height={400}
                            className="object-cover rounded-2xl"
                            priority
                        />
                    </div>
                    <p className="mt-2 text-gray-700 text-xl">Natthaphat Jitthaworn</p>
                    <p className="mt-2 text-gray-700 text-xl">6733070221</p>
                </div>
                <div key={2} className="flex flex-col items-center">
                    <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-lg flex items-center justify-center text-gray-600 text-lg">
                        <Image 
                            src="/img/maipai.png"
                            alt="maipai"
                            width={300}
                            height={400}
                            className="object-cover rounded-2xl"
                            priority
                        />
                    </div>
                    <p className="mt-2 text-gray-700 text-xl">Natthawit LaongSiri</p>
                    <p className="mt-2 text-gray-700 text-xl">6733072521</p>
                </div>
                <div key={3} className="flex flex-col items-center">
                    <div className="w-[300px] h-[400px] bg-white rounded-2xl shadow-lg flex items-center justify-center text-gray-600 text-lg">
                        <Image 
                            src="/img/mhoo.png"
                            alt="mhoo"
                            width={300}
                            height={400}
                            className="object-cover rounded-2xl"
                            priority
                        />
                    </div>
                    <p className="mt-2 text-gray-700 text-xl">Teetath Sukhawattana </p>
                    <p className="mt-2 text-gray-700 text-xl">6733110721</p>
                </div>
            </div>
        </main>
    )
}