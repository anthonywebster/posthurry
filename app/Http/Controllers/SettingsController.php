<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Illuminate\Http\Request;

/**
 * Class SettingsController
 * @package App\Http\Controllers
 */
class SettingsController extends Controller {

    /**
     * @return mixed
     */
    public function getIndex() {
        return view( 'settings/forms', [ 'user' => Auth::user() ] );
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function postIndex( Request $request ) {
        User::where( 'id', Auth::user()->id )->update( [ 'timezones' => $request->get( 'timezones' ) ] );

        return redirect( url( 'settings' ) );
    }
}
