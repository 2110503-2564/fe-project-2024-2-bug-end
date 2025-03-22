import Image from 'next/image'
import styles from './productcard.module.css'

export default function ProductCard() {
    return (
        <div className={ styles.card }>
            <div className={ styles.cardimg }>
                <Image 
                    src={'/img/hotel1.png'}
                    alt='Hotel'
                    fill
                    objectFit='cover'
                />
            </div>
            <div className={ styles.cardtext }>Hotel 1</div>
        </div>
    )
}