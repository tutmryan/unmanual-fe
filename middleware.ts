import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@types/supabase'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}
