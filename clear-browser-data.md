# Clear Browser Data Instructions

If you're still seeing loading spinners, clear your browser's cached data:

## Quick Fix (Recommended)
1. Open your browser's Developer Tools (F12 or Cmd+Option+I)
2. Go to the **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Under **Storage**, click **Clear site data**
4. Refresh the page

## Manual Clear
1. Open Developer Tools (F12)
2. Go to Console tab
3. Run this command:
```javascript
sessionStorage.clear();
localStorage.clear();
location.reload();
```

## Clear Specific Items
If you only want to clear auth-related data:
```javascript
sessionStorage.removeItem('comrade_auth_initialized');
localStorage.removeItem('comrade_user');
localStorage.removeItem('userData');
location.reload();
```

## Hard Refresh
- **Chrome/Edge**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Firefox**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- **Safari**: Cmd+Option+E (then Cmd+R)

