import { Directive, ElementRef, inject, input } from "@angular/core";
import { Log } from "./log";

@Directive({
    selector:'a[appSafeLink]',
    standalone: true,
    hostDirectives:[Log],
    host:{
        '(click)':'onConfirmLeavePage($event)'
    }
})
export class SafeLinkDirective{
queryParam=input('myapp');
private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

constructor(){
    console.log('safelink is active');
}

onConfirmLeavePage(event : MouseEvent){
    const wantsToLeave = window.confirm('Do you want to leave the app');
    if(wantsToLeave){
        // const address = (event.target as HTMLAnchorElement).href;
        // (event.target as HTMLAnchorElement).href = address+'?from='+this.queryParam();
        const address = this.hostElementRef.nativeElement.href;
        this.hostElementRef.nativeElement.href =  address+'?from='+this.queryParam();

        return;
    }
    event?.preventDefault();

}
} 