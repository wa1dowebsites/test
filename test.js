(() => {
    class OpenAuthTab {
        constructor(runtime) {
            this.runtime = runtime;
            this.lastOpened = false; // tracks if the tab was opened
        }

        getInfo() {
            return {
                id: 'openauthtab',
                name: 'Open Auth Tab',
                blocks: [
                    {
                        opcode: 'openAuthTab',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'open authentication tab',
                    },
                    {
                        opcode: 'wasTabOpened',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'was tab opened?',
                    }
                ]
            };
        }

        // Opens the URL in a new browser tab
        openAuthTab() {
            try {
                window.open("https://blankzzgamehub.pythonanywhere.com/check-auth", "_blank");
                this.lastOpened = true;
            } catch (err) {
                console.error("[OpenAuthTab]", err);
                this.lastOpened = false;
            }
        }

        // Returns true if the tab was successfully opened
        wasTabOpened() {
            return this.lastOpened;
        }
    }

    // Register the extension safely
    if (typeof Scratch !== 'undefined' && Scratch.extensions) {
        Scratch.extensions.register(new OpenAuthTab());
    }
})();
