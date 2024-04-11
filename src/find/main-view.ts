// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  Observable,
  repeat,
  when,
} from '@microsoft/fast-element';

import {
  initialStateFluentCardTemplate,
  noResultsFoundCardTemplate,
  tooManyResultsCardTemplate
} from './info-card';
import {
    ShorelineFindResult,
    ShorelineFindResultCollectionState,
  } from './sidebar-search-find-on-page-mojom';
import { ShorelineFindResultAsClass } from './mock-data-results';

  const styles = css`
  :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Segoe UI Variable Static Small', sans-serif;
      width: 500px;
  }

  #contextual-result-container {
    width: 100%;
  }

  .contextual-find-result, .find-on-page-info-card {
    font-weight: normal;
    padding: 12px;
    margin: 8px 0px;
    border-radius: 6px;
    border: 1px solid grey;
    font-size: 0px;
    box-shadow: none;
    cursor: pointer;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  div.selected-contextual-find-result {
    -ms-high-contrast-adjust: none;
  }


  .info-card-container {
    display: flex;
    align-items: center;
    font-family: 'Segoe UI Variable Static Small', sans-serif;
    padding: 12px;
    flex-direction: column;
    gap: 16px;
    align-self: stretch;
  }

  .initial-state-card{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: 'Segoe UI Variable Static Small', sans-serif;
    padding: 1px;
  }


  .title-content {
    text-align: center;
    font-family: 'Segoe UI Variable Static Small', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  }

  .text-content {
    font-family: 'Segoe UI Variable Static Small', sans-serif;
    font-weight: 400;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    line-height: 16px;
  }
  
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
  }
`;
  const kNonBreakingSpace = '\u00A0';

// Template to build the contextual results. The recycle option is set to true
// to avoid re-creating the DOM elements when new results are added. That ways,
// the elements creation/display will be optimized.
// The positioning argument is set to true to allow us to get the index of each
// items in the array.
export const contextualResultsTemplate =
  (activeMatchOrdinal: number, onFindMatchContextualResultClicked: any): any =>
    html`
        ${repeat(x => x.resultAsClass.matchSurroundingTexts, html<ShorelineFindResult>`
                <div
                  id='contextual-find-result-${x => x.identifier}'
                  @click="${(x, c) => onFindMatchContextualResultClicked(x.identifier, c.index)}"
                  class="${(x, c) => activeMatchOrdinal === c.index + 1 ?
    'selected-contextual-find-result' : 'non-selected-contextual-find-result'} contextual-find-result"
                  aria-label="${x => x.surroundingText}"
                  title="${x => x.surroundingText}">
                  <span id="fragment-before-match" style="font-size: 14px;">${x => x.surroundingText.substring(
    0, x.matchStartPosition)}</span>
                  <span id="match" style="font-weight: bold; font-size: 14px;">${x => x.surroundingText.substring(
    x.matchStartPosition, x.matchEndPosition + 1)}</span>
                  <span id="fragment-after-match" style="font-size: 14px;">${x => x.surroundingText.substring(
    x.matchEndPosition + 1).replace(
    ' ', kNonBreakingSpace)}</span>
                </div>
              `, { positioning: true, recycle: true })}`;


@customElement({
  name: 'find-on-page-main-view',
  styles,
  template:
  html<FindOnPageMainView>`
    <div id="contextual-result-container">
      ${when(x => x.resultAsClass.findResultCollectionState === ShorelineFindResultCollectionState.kInitialState,
    html`${initialStateFluentCardTemplate()}`
  )}
  ${when(x => x.resultAsClass.findResultCollectionState === ShorelineFindResultCollectionState.kOkResult,
    html`${x => contextualResultsTemplate(
      x.activeMatchOrdinal,
      x.getOnFindMatchContextualResultClickedCallback()
    )}`
  )}
      ${when(x => x.resultAsClass.findResultCollectionState === ShorelineFindResultCollectionState.kOkNoResult,
    html` ${noResultsFoundCardTemplate()}`
  )}
      ${when(x => x.resultAsClass.findResultCollectionState === ShorelineFindResultCollectionState.kTooManyResults,
    html` ${tooManyResultsCardTemplate()}`
  )}
    </div>`
  })
export class FindOnPageMainView extends FASTElement {
  // Tracks the state of the find result collection. This is used to determine
  // whether to show the contextual results or not.
  private _findResultState: ShorelineFindResultCollectionState = 0;

  // Array of contextual results to be displayed. This is used to build the
  // contextual results view.
  private _matchSurroundingTexts: ShorelineFindResult[] = [];

  // The index of the active match in the contextual results. This is used to
  // highlight the active match in the contextual results.
  private _activeMatchOrdinal!: number;

  private _resultAsClass!: ShorelineFindResultAsClass;

  get resultAsClass(): ShorelineFindResultAsClass {
    Observable.track(this, 'resultAsClass');
    return this._resultAsClass;
  }

  set resultAsClass(value: ShorelineFindResultAsClass) {
    this._resultAsClass = value;
    Observable.notify(this, 'resultAsClass');
  }

  // Callback to select a match from the contextual results. It is passed by
  // the App view.
  @attr
    selectMatchCallback!: (matchIdentifier: number, resultIndex: number) => Promise<void>;

  connectedCallback(): void {
    super.connectedCallback();
  }

  @attr
  get findResultState(): ShorelineFindResultCollectionState {
    Observable.track(this, 'findResultState');
    return this._findResultState;
  }

  set findResultState(value: ShorelineFindResultCollectionState) {
    this._findResultState = value;
    Observable.notify(this, 'findResultState');
  }

  @attr
  get activeMatchOrdinal(): number {
    Observable.track(this, 'activeMatchOrdinal');
    return this._activeMatchOrdinal;
  }

  set activeMatchOrdinal(value: number) {
    this._activeMatchOrdinal = value;
    Observable.notify(this, 'activeMatchOrdinal');
  }

  @attr
  get matchSurroundingTexts(): ShorelineFindResult[] {
    Observable.track(this, 'matchSurroundingTexts');
    return this._matchSurroundingTexts;
  }

  set matchSurroundingTexts(value: ShorelineFindResult[]) {
    this._matchSurroundingTexts = value;
    Observable.notify(this, 'matchSurroundingTexts');
  }

  public getOnFindMatchContextualResultClickedCallback(): any {
    // Since this method will be invoked from the template
    // `contextualResultsTemplate`, we need to bind the `this` context to allow
    // the method to access the class properties.
    return this.onFindMatchContextualResultClicked.bind(this);
  }

  public async onFindMatchContextualResultClicked(
    contextualFindResultIdentifier: number, resultIndex: number): Promise<void> {
    // We always want to call selectMatch when a contextual result is clicked.
    // This allows us to scroll the webpage to the location of the selected
    // match in case the user has scrolled away from the match.
    this.selectMatchCallback(contextualFindResultIdentifier, resultIndex);
  }
}
