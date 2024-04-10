import { FASTElement, attr, customElement, html, css, Observable, DOM } from '@microsoft/fast-element';
import './main-view';
import {
  MatchSelectionResult,
  ShorelineFindResult,
  ShorelineFindResultCollectionState
} from './sidebar-search-find-on-page-mojom';

import { result  } from './mock-data-results';

export const template = html<MyApp>`
  <template>
    <div id="main-view-container">
    <find-on-page-main-view
    id="main-view"
    :activeMatchOrdinal="${x => x.activeMatchOrdinal}"
    :matchSurroundingTexts="${x => x.matchSurroundingTexts}"
    :findResultState="${x => x.findResultState}"
    :selectMatchCallback="${x => x.selectMatch}"
</find-on-page-main-view></div>
  </template>
`;
export const styles = css`
  :host {
    --button-fill-color: #40527c;
    --button-text-color: white;
    --button-border-radius: 10rem;
    --border-color: #40527c;
    --border-size: 2px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    line-height: 1;
    cursor: pointer;
    border: solid var(--border-size) var(--border-color);
    border-radius: var(--button-border-radius);
    color: var(--button-text-color);
    background-color: var(--button-fill-color);
  }
  #main-view-container {
    overflow-y:auto;
    overflow-x: hidden;
    flex: auto;
    height: 50vh;
    border: 2px solid brown;
    padding: 15px;
  }

`;

@customElement({
  name: 'find-on-page',
  template,
  styles,
})
export class MyApp extends FASTElement {
  @attr value = 0;
  private _findResultState: ShorelineFindResultCollectionState
    = ShorelineFindResultCollectionState.kInitialState;
  private _numberOfMatches: number = -1;
  private _activeMatchOrdinal: number = -1;
  private _matchSurroundingTexts: ShorelineFindResult[] = [];

  public connectedCallback(): void {
    console.log("connected")
    super.connectedCallback();
    // simulate browser pageCallback router listener for initial results list
    setTimeout(() => {
      this.findResultState = result.findResultCollectionState;
      this.numberOfMatches = result.numberOfMatches;
      this.activeMatchOrdinal = result.activeMatchOrdinal;
      this.matchSurroundingTexts = result.matchSurroundingTexts;
    }, 200)

    // simulate browser page back listener with event callback each time click event happens
    document.addEventListener('IndexUpdate', (event) => {
      const { result } = (event as CustomEvent)?.detail;
      console.log('IndexUpdate', result);
      this.findResultState = result.findResultCollectionState;
      this.numberOfMatches = result.numberOfMatches;
      this.activeMatchOrdinal = result.activeMatchOrdinal;
      this.matchSurroundingTexts = result.matchSurroundingTexts;
    })
  }

  get numberOfMatches(): number {
    Observable.track(this, 'numberOfMatches');
    return this._numberOfMatches;
  }

  set numberOfMatches(value: number) {
    this._numberOfMatches = value;
    Observable.notify(this, 'numberOfMatches');
  }

  get activeMatchOrdinal(): number {
    Observable.track(this, 'activeMatchOrdinal');
    return this._activeMatchOrdinal;
  }

  set activeMatchOrdinal(value: number) {
    this._activeMatchOrdinal = value;
    Observable.notify(this, 'activeMatchOrdinal');

    if (value < 1 || value > this.matchSurroundingTexts.length) { return; }

    // The match have an unique identifier (global match id) different from the
    // index (position in the `matchSurroundingTexts` array).
    const matchIdentifier = this.matchSurroundingTexts[value - 1].identifier;

    // Scroll the match into view. We need to wait for the next frame update
    // to ensure that the match is rendered.
    DOM.queueUpdate(() => {
      const contextualResultsContainer =
        this.shadowRoot?.getElementById('main-view') || this.closest("#main-view");
      const contextualResult =
        contextualResultsContainer?.shadowRoot?.getElementById(
          `contextual-find-result-${matchIdentifier}`
        );

      contextualResult?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  }

  get matchSurroundingTexts(): ShorelineFindResult[] {
    Observable.track(this, 'matchSurroundingTexts');
    return this._matchSurroundingTexts;
  }

  set matchSurroundingTexts(value: ShorelineFindResult[]) {
    this._matchSurroundingTexts = value;
    Observable.notify(this, 'matchSurroundingTexts');
  }

  get findResultState(): ShorelineFindResultCollectionState {
    Observable.track(this, 'findResultState');
    return this._findResultState;
  }

  set findResultState(value: ShorelineFindResultCollectionState) {
    this._findResultState = value;
    Observable.notify(this, 'findResultState');
  }

  public async selectMatch(identifier: number, matchIndex: number): Promise<void> {
    console.log('Match Index', matchIndex)
    const selection_result: any = { response: MatchSelectionResult.kSuccess };
    document.dispatchEvent(new CustomEvent("IndexUpdate", {
      detail: { result },
      bubbles: true,
      cancelable: true,
      composed: false
    }));

    if (selection_result.response === MatchSelectionResult.kSuccess) {
      const contextualResultsContainer =
        this.shadowRoot?.getElementById('main-view') || this.closest("#main-view");

      const contextualResult =
        contextualResultsContainer?.shadowRoot?.getElementById(
          `contextual-find-result-${identifier}`);

      contextualResult?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}