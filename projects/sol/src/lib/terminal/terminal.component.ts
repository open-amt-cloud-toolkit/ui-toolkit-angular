/*********************************************************************
 * Copyright (c) Intel Corporation 2023
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { C, V } from '@angular/cdk/keycodes'
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
    this.term.attachCustomKeyEventHandler(async (e: any) => {
      e.stopPropagation()
      // Due to a new 'HACK' in xtermjs, calling e.preventDefault() here
      // results in all upper case characters being dropped,
      // so only call it if we 'consume' the keydown here.
      // Note: this function can be called for 'keypress' and 'keyup' events as well as 'keydown' events
      if (e.type === 'keydown') {
        if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === C) {
          e.preventDefault()
          await navigator.clipboard.writeText(this.term.getSelection())
        } else if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === V) {
          e.preventDefault()
          await navigator.clipboard.readText().then(text => {
            this.handleKeyPress.emit(text)
          })
        } else if (e.code === 'Space') { // or e.keyCode === SPACE
          e.preventDefault()
          this.handleKeyPress.emit(e.key)
        }
      }
    })
  }
}
