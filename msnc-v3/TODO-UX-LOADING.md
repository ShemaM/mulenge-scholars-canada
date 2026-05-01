# UX Loading Fix

## Issue: 
Page navigation >1min without loader.

## Plan:
1. Add to Navbar.tsx Link onClick: sessionStorage.setItem('loadingIntent', JSON.stringify({type: 'page-nav', path}))
2. Update loading.tsx consume.

Status: Implementing.
