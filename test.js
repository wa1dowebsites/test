(() => {
    class AuthChecker {
        constructor(runtime) {
            this.runtime = runtime;
            this.lastStatus = 0;
            this.lastText = '';
            this.lastRedirected = false;
        }

        getInfo() {
            return {
                id: 'authchecker',
                name: 'Auth Checker',
                blocks: [
                    {
                        opcode: 'checkAuth',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'check authentication',
                    },
                    {
                        opcode: 'authStatusCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last status code',
                    },
                    {
                        opcode: 'authResponseText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last response text',
                    },
                    {
                        opcode: 'authRedirected',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'was redirected?',
                    }
                ]
            };
        }

        // Trigger the async fetch
        async checkAuth() {
            try {
                const response = await fetch('https://blankzzgamehub.pythonanywhere.com/check-auth', {
                    method: 'GET',
                    credentials: 'include',
                    redirect: 'manual', // important: prevent auto-follow
                });

                this.lastStatus = response.status;
                this.lastRedirected = response.type === 'opaqueredirect' || response.status === 302;

                // Try to read text, will fail if redirected
                try {
                    this.lastText = await response.text();
                } catch (err) {
                    this.lastText = '[Redirected, no content]';
                }
            } catch (err) {
                this.lastStatus = 0;
                this.lastText = `Fetch error: ${err.message}`;
                this.lastRedirected = false;
            }
        }

        authStatusCode() {
            return this.lastStatus;
        }

        authResponseText() {
            return this.lastText;
        }

        authRedirected() {
            return this.lastRedirected;
        }
    }

    if (typeof Scratch !== 'undefined' && Scratch.extensions) {
        Scratch.extensions.register(new AuthChecker());
    }
})();
