<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RolePermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (Auth::check()) {
            $user = Auth::user();
            if ($user->role === 'admin' && $request->route()->getName() === 'dashboard') {
                return redirect()->route('admin.dashboard');
            }

            if ($user->role === 'user' && $request->route()->getName() === 'dashboard') {
                return redirect()->route('user.dashboard');
            }
        }

        return $next($request);
    }
}
