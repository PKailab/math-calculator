# Project Auto-Documentation Guide

**CRITICAL RULE FOR ALL FUTURE AI AGENTS:**
1. This project maintains meticulous, self-updating documents called `PROJECT_BLUEPRINT.md`, `MAP.txt`, and `keyboard-layout.json`.
2. `PROJECT_BLUEPRINT.md` contains the absolute source of truth for the total number of files, their names, detailed descriptions of what each file does, and the core functions inside them.
3. `MAP.txt` contains the exact visual tree directory of all files inside the project.
4. `keyboard-layout.json` contains the exact array map of the keyboard buttons currently being rendered in `App.tsx`.
5. **WHENEVER YOU ADD, DELETE, RENAME A FILE, OR SIGNIFICANTLY MODIFY A FUNCTION WITHIN A FILE:** You *MUST* automatically update `PROJECT_BLUEPRINT.md` and `MAP.txt` before finishing the user's turn. 
6. **WHENEVER YOU CHANGE THE KEYBOARD LAYOUT IN THE REACT APP:** You *MUST* also update `keyboard-layout.json` with the new design before finishing the user's turn.
7. The user relies on these files to feed into other AI systems or do manual code updates. DO NOT LEAVE THESE FILES OUTDATED.
8. If the user asks for a feature, implement the feature, and then as the final step, update the corresponding documentation sections in `PROJECT_BLUEPRINT.md`, `MAP.txt`, and `keyboard-layout.json` (if applicable).
9. Maintain the language of `PROJECT_BLUEPRINT.md` heavily in a mixture of Hindi / Simple English (Hinglish/English) as initially set so the original author can easily read it and make manual modifications.
