import Link from 'next/Link';

export default function Admin() {
    return (
        <div className="admin-container">
            <Link className="admin-button" href="/manage-movies">
                <button className="edit-button">Manage Movies</button>
            </Link>
            <Link className="admin-button" href="/manage-promotions">
                <button className="edit-button">Manage Promotions</button>
            </Link>
            <Link className="admin-button" href="/manage-users">
                <button className="edit-button">Manage Users</button>
            </Link>
        </div>
    );
}