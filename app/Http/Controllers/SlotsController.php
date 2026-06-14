<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Slots;
use Auth; 						// facade for user
use App\User;						
use DB;

class SlotsController extends Controller
{
    public function index()
    {
    	$sl = new Slots();
    	$slots = $sl->slots;

    	$user = Auth::user()->name; // authenticated user via facade
    	$cash = Auth::user()->cash; // money
    	$id = Auth::user()->id; 

    	//dd($slots);


    	return view('slots', ['slots' => $slots, 'user' => $user, 'cash' => $cash, 'id' => $id]);

    }
}
