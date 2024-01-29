/*********************************************************************
 * Copyright (c) Intel Corporation 2023
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { C, V } from '@angular/cdk/keycodes'
import { Terminal } from 'xterm'
@Component({
  selector: 'amt-terminal',
  templateUrl: './terminal.component.html'
})

export class TerminalComponent implements OnInit {
  @Input() term: Terminal
  @Output() handleKeyPress: EventEmitter<any> = new EventEmitter<any>()
  container!: HTMLElement | null
  ngOnInit (): void {
    this.container = document.getElementById('terminal')
    if (this.container == null) throw new Error('Container not found')
    this.term.open(this.container)
    this.term.onData((data: any) => {
      this.handleKeyPress.emit(data)
    })
    this.term.attachCustomKeyEventHandler((e: KeyboardEvent): boolean => {
      e.stopPropagation()
      // Due to a new 'HACK' in xtermjs, calling e.preventDefault() here
      // results in all upper case characters being dropped,
      // so only call it if we 'consume' the keydown here.
      // Note: this function can be called for 'keypress' and 'keyup' events as well as 'keydown' events
      if (e.type === 'keydown') {
        if (e.ctrlKey && e.shiftKey && e.keyCode === C) {
          e.preventDefault()
          navigator.clipboard.writeText(this.term.getSelection()).then(() => {

          }).catch(err => {
            console.error('Failed to copy to clipboard', err)
          })
        } else if (e.ctrlKey && e.shiftKey && e.keyCode === V) {
          e.preventDefault()
          navigator.clipboard.readText().then(text => {
            this.handleKeyPress.emit(text)
          }).catch(err => {
            console.error('Failed to read clipboard', err)
          })
        } else if (e.code === 'Space') { // or e.keyCode === SPACE
          e.preventDefault()
          this.handleKeyPress.emit(e.key)
        }
      }
      return false
    })
  }
}
