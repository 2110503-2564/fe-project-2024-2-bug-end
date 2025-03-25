export default async function getAllUsers(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/getUsers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorMessage = `Failed to fetch users with status code: ${response.status}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}