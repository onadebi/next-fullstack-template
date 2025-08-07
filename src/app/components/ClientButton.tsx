'use client';

export const ClientButton = () => {
    // Generate a simple random string for browser compatibility
    function generateRandomId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    async function createUser() {
        try {
            const res = await fetch('/api/users/create-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: `test${generateRandomId()}@onax.me`,
                    full_name: 'Test User',
                }),
            });

            const result = await res.json();

            if (result.success) {
                alert('User created!');
            } else {
                alert('Failed to create user.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        }
    }

    return (
        <button type="button" className="cursor-pointer" onClick={createUser}>
            Create User
        </button>
    );
};
