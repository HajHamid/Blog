export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 border rounded-lg p-4 shadow">SideBar</div>
            <div className="col-span-3 border p-4 rounded-lg w-full">{children}</div>
        </div>
    )
}
