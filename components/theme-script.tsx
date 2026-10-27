// Runs before first paint (inline, in <head>). Dark is the default; only a
// saved "light" choice adds the `light` class, so there is no flash.
const themeInitScript = `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
}
