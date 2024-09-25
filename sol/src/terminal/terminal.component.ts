/*********************************************************************
 * Copyright (c) Intel Corporation 2023
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { Terminal } from '@xterm/xterm'
@Component({
  selector: 'amt-terminal',
  templateUrl: './terminal.component.html',
  standalone: true
})
export class TerminalComponent implements OnInit {
  @Input() term: Terminal
  @Output() handleKeyPress: EventEmitter<any> = new EventEmitter<any>()
  container!: HTMLElement | null
  ngOnInit(): void {
    if (this.term == null) throw new Error('Terminal not found')
    this.container = document.getElementById('terminal')
    if (this.container == null) throw new Error('Container not found')
    this.term.open(this.container)
    this.term.onKey(({ key, domEvent }) => {
      domEvent.preventDefault()
      if (domEvent.ctrlKey && domEvent.key === 'c') {
        if (this.term.hasSelection()) {
          navigator.clipboard
            .writeText(this.term.getSelection())
            .then(() => {})
            .catch((err) => {
              console.error('Failed to copy to clipboard', err)
            })
        } else {
          // Send interrupt signal (SIGINT) to terminal
          this.term.write('\x03') // Sends Ctrl + C (ASCII code 03)
        }
        // Prevent the default browser behavior (like opening menus)
        return false
      }
      if (domEvent.ctrlKey && domEvent.key === 'v') {
        navigator.clipboard
          .readText()
          .then((text) => {
            this.handleKeyPress.emit(text)
          })
          .catch((err) => {
            console.error('Failed to read clipboard', err)
          })
        return false
      }
      this.handleKeyPress.emit(key)
    })
  }
}
