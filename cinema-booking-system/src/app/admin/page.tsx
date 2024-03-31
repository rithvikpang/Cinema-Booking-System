import Link from 'next/Link';
import Image from 'next/image';

export default function Admin() {
    return (
        <div className="admin-container">
            <div className="admin-func">
                <Link href="/manage-movies">
                    <Image
                    className="admin-icons"
                    src="/action.png"
                    width={200}
                    height={200}
                    alt="camera"
                    />
                </Link>
                <Link className="admin-button" href="/manage-movies">
                    <button className="seats">Manage Movies</button>
                </Link>
            </div>
            <div className="admin-func">
                <Link href="/manage-promotions">
                    <Image
                    className="admin-icons"
                    src="/promo.png"
                    width={200}
                    height={200}
                    alt="camera"
                    />
                </Link>
                <Link className="admin-button" href="/manage-promotions">
                    <button className="seats">Manage Promotions</button>
                </Link>
            </div>
            <div className="admin-func">
                <Link href="/manage-users">
                    <Image
                    className="admin-icons"
                    src="/users.png"
                    width={200}
                    height={200}
                    alt="camera"
                    />
                </Link>
                <Link className="admin-button" href="/manage-users">
                    <button className="seats">Manage Users</button>
                </Link>
            </div>
        </div>
    );
}