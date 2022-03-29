# Congressional App Challenge project for 2021
## Bus Map - Proof of Concept

## WARNING: RELEASES v1.0 AND v2.0 CONTAIN MAJOR SECURITY VULNERABILITIES. YOU SHOULD NOT CURRENTLY HAVE BUSMAP INSTALLED. 
 
Created by Windzyboy and Mistakd.

Let me tell you a story. In our "disclaimer" page, the button didn't work because of Electron shenanigans with almost no understandable documentation. First, I gave up. Then, I made it use a function deprecated 4 years ago (that didn't work). Then, I used almost the same function that worked, still deprecated. Then, I found a modern solution that just straight up crashed the window. Finally, I found obscure modern documentation that gets it to work ALMOST right which I had to combine with the old stuff for a modern AND functioning solution. Long story short, opening links is hard. https://github.com/electron/electron/blob/v12.0.2/docs/api/window-open.md#opening-windows-from-the-renderer.
```js
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https://github.com/')) {
            shell.openExternal(url);
        }
        return { action: 'deny' }
      })
```
