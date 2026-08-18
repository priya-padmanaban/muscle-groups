'use client';
export const anatomyDebugEnabled = process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('anatomyDebug');
