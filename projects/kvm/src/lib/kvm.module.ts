import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { KvmComponent } from './kvm.component'
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [KvmComponent],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  exports: [KvmComponent],
  schemas: []

})
export class KvmModule { }
