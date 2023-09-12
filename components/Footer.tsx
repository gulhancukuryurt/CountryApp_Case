import React from 'react'
import Image from 'next/image'

function Footer() {
    return (
        <footer
            className="flex flex-col items-center bg-neutral-200 text-center text-white dark:bg-neutral-600 dark:text-neutral-200 mt-24">
            <div className="container p-6">
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="mb-6 lg:mb-0">
                        <Image
                            src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
                            className="w-full rounded-md shadow-lg" 
                            alt='Footer Photo'
                            width={200}
                            height={200}

                            />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <Image
                            src="https://tecdn.b-cdn.net/img/new/fluid/city/111.webp"
                            className="w-full rounded-md shadow-lg" 
                            alt='Footer Photo'
                            width={200}
                            height={200}
                            />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <Image
                            src="https://tecdn.b-cdn.net/img/new/fluid/city/112.webp"
                            className="w-full rounded-md shadow-lg"
                            alt='Footer Photo'
                            width={200}
                            height={200}
                            />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <Image
                            src="https://tecdn.b-cdn.net/img/new/fluid/city/114.webp"
                            className="w-full rounded-md shadow-lg" 
                            alt='Footer Photo'
                            width={200}
                            height={200}
                            />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <Image
                            src="https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
                            className="w-full rounded-md shadow-lg" 
                            alt='Footer Photo'
                            width={200}
                            height={200}
                            />
                    </div>
                    <div className="mb-6 lg:mb-0">
                        <Image
                            src="https://tecdn.b-cdn.net/img/new/fluid/city/116.webp"
                            className="w-full rounded-md shadow-lg" 
                            alt='Footer Photo'
                            width={200}
                            height={200}
                            />
                    </div>
                </div>
            </div>

            <div
                className="w-full bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                © 2023 Copyright:
                <a className="dark:text-neutral-400" href=""
                >Countries</a
                >
            </div>
        </footer>
    )
}

export default Footer