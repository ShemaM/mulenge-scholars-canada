/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

// 1. Define the Server Action
const serverFunction = async (args: any) => {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

// 2. Fix the Component Definition
// Removed the 'serverFunction' from the props destructuring to avoid collision
export default function Layout({ children }: Args) {
  return (
    <RootLayout 
      serverFunction={serverFunction} 
      config={config} 
      importMap={importMap}
    >
      {children}
    </RootLayout>
  )
}