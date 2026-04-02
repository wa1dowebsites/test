(() => {
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
                const response = await fetch('https://blankzzgamehub.pythonanywhere.com/check-auth', {
                    method: 'GET',
                    credentials: 'include', // include cookies for session
                });
                return response.ok && response.status !== 302;
            } catch (err) {
                console.error('[AuthChecker]', err);
                return false;
            }
        }

        async checkAuthMessage() {
            try {
                const response = await fetch('https://blankzzgamehub.pythonanywhere.com/check-auth', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok && response.status !== 302) return 'Authenticated';
                else if (response.status === 302) return 'Redirected (not authenticated)';
                else return `Error: ${response.status}`;
            } catch (err) {
                return `Fetch error: ${err.message}`;
            }
        }
    }

    // Register the extension safely
    if (typeof Scratch !== 'undefined' && Scratch.extensions) {
        Scratch.extensions.register(new AuthChecker());
    } else {
        console.warn('[AuthChecker] TurboWarp/Scratch environment not found');
    }
})();
