import Link from 'next/link';

export default function Admin() {
    return (
        <div className="admin-container">
            <Link className="admin-button" href="/edit-movies">
                <button className="edit-button">Manage Movies</button>
            </Link>
            <Link className="admin-button" href="/edit-promotion">
                <button className="edit-button">Manage Promotions</button>
            </Link>
            <Link className="admin-button" href="/edit-users">
                <button className="edit-button">Manage Users</button>
            </Link>
        </div>
    );
}