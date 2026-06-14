<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blackjack;
use Auth; 						// facade for user
use App\User;						
use DB;


class BlackjackController extends Controller
{
    public function index()
    {

    	$bj = new Blackjack();
    	$cards = $bj->cards; // get the entire deck
    	$user = Auth::user()->name; // authenticated user via facade
    	$cash = Auth::user()->cash; // money
    	$id = Auth::user()->id;    	
    	
    	return view('blackjack',['cards' => $cards, 'user' => $user, 'cash' => $cash, 'id' => $id]);
    }

    public function updatecash(Request $request)
    {
    	$user = User::find(Auth::id()); // get player ID directly

    	$cash=$request->cash;
    	$user->cash=$cash;
    	$user->save();

    	return ['cash' => $user->cash]; // verify cash on server
    }


}
