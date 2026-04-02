class AuthChecker {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'authchecker',
            name: 'Auth Checker',
            blocks: [
                {
                    opcode: 'checkAuth',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'is user authenticated?',
                },
                {
                    opcode: 'checkAuthMessage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'auth status message',
                }
            ]
        };
    }

    async checkAuth() {
        try {
            // Make GET request
            const response = await fetch('https://blankzzgamehub.pythonanywhere.com/check-auth', {
                method: 'GET',
                credentials: 'include', // important for cookies/session
            });

            // If the response is 200 OK, assume authenticated
            return response.ok && response.status !== 302;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async checkAuthMessage() {
        try {
            const response = await fetch('https://blankzzgamehub.pythonanywhere.com/check-auth', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok && response.status !== 302) {
                return 'Authenticated';
            } else if (response.status === 302) {
                return 'Redirected (not authenticated)';
            } else {
                return `Error: ${response.status}`;
            }
        } catch (err) {
            return `Fetch error: ${err.message}`;
        }
    }
}

// Register the extension
Scratch.extensions.register(new AuthChecker());
