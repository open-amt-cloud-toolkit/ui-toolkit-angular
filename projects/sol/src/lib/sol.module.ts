import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { SolComponent } from './sol.component'
import { TerminalComponent } from './terminal/terminal.component'

@NgModule({
  declarations: [
    SolComponent,
    TerminalComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule
  ],
  exports: [
    SolComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SolModule {
}
