import { Router, ActivatedRouteSnapshot } from '@angular/router';


export abstract class BaseGuard {


    constructor(protected router: Router){}

    protected validarClaims(routeAc: ActivatedRouteSnapshot) : boolean {

        return true;
    }


}
