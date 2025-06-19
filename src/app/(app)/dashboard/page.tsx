"use client"
import { useSession } from 'next-auth/react';

import React from 'react'

export default function  page() {
    const user = useSession();
    console.log("user", user);
  return (
    <div>page</div>
  )
}
