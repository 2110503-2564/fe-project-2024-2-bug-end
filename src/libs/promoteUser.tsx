export default async function promoteUser(token: string, userId: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/promote/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to promote user");
    }

    return await response.json();
}