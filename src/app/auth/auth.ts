import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone:true,
})
export class Auth {
  userType = input.required<Permission>({alias:'appAuth'});
  private authSerivce = inject(AuthService);
  private templateRef = inject(TemplateRef);  //Gives access to the content of template
  private viewContainerRef = inject(ViewContainerRef);  //Gives access to the place in the DOM where this template/directive is being used
 
  constructor() {
    effect(()=>{
      if(this.authSerivce.activePermission()===this.userType()){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
      else{
        this.viewContainerRef.clear();
      }
    });
   }
  


}
