// Hook
function useSetThemeColor() {

    function androidChangeThemeColor(color) {
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", color);
        // setTimeout(function () {
        //     androidChangeThemeColor(color);
        // }, 0);
    }

    function iosChangeThemeColor(color) {
        const appleThemeColor = document.querySelector("meta[name=apple-mobile-web-app-status-bar-style]");
        appleThemeColor.setAttribute("content", color);
        // setTimeout(function () {
        //     iosChangeThemeColor(color);
        // }, 0);
    }

    function setThemeColor(color) {
        androidChangeThemeColor(color);
        iosChangeThemeColor(color);
    }

    return setThemeColor;
}

export { useSetThemeColor };
