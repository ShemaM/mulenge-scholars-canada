/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/// <reference types="@payloadcms/next/types" />
import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'

type Args = {
  children: React.ReactNode
}

/**
 * Server Action for Payload 3.0 Admin
 */
const serverFunction = async (args: any) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: Args) {
  return (
    <RootLayout serverFunction={serverFunction} config={config} importMap={importMap}>
      {children}
    </RootLayout>
  )
}
