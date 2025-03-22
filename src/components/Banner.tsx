import styles from './banner.module.css'
import Image from 'next/image'

export default function Banner() {
    return (
        <div className={ styles.banner }>
            <Image 
                src={ '/img/cover1.png' }
                alt='cover'
                fill
                objectFit='cover'
            />

            <div className={ styles.bannerText }>
                <h1>See the world for yourself</h1>
                <h3>Make Your great Trip with us</h3>
            </div>
        </div>
    )
}