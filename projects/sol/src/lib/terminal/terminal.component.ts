import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { C, V, SPACE } from '@angular/cdk/keycodes'
@Component({
  selector: 'amt-terminal',
  templateUrl: './terminal.component.html'
})

export class TerminalComponent implements OnInit {
  @Input() term: any
  @Output() handleKeyPress: EventEmitter<any> = new EventEmitter<any>()
  container!: any
  ngOnInit (): void {
    this.container = document.getElementById('terminal')
    this.term.open(this.container)
    this.term.onData((data: any) => {
      this.handleKeyPress.emit(data)
    })
    this.term.attachCustomKeyEventHandler((e: any) => {
      e.stopPropagation()
      e.preventDefault()
      if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === C) {
        return navigator.clipboard.writeText(this.term.getSelection())
      } else if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === V) {
        return navigator.clipboard.readText().then(text => {
          this.handleKeyPress.emit(text)
        })
      } else if (e.code === SPACE) {
        return this.handleKeyPress.emit(e.key)
      }
    })
  }
}
