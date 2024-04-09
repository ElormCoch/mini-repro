// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import {
  html,
} from '@microsoft/fast-element';
import { FindOnPageMainView } from './main-view';


export const initialStateFluentCardTemplate = (): any => html<FindOnPageMainView>
`<div class="info-card-container">
        <div class="text-container">
          <div class="title-content">
            <h>
              <b> ${('initialStateCardTitle')} </b>
            </h>
          </div>
          <div class="text-content">
            <p> ${('initialStateCardBody')} </p>
          </div>
        </div>
  </div>
`;

export const tooManyResultsCardTemplate = (): any => html
`<div class="info-card-container">
        <div class="text-container">
          <div class="title-content">
            <h>
              <b> ${('tooManySearchResultCardTitle')} </b>
            </h>
          </div>
          <div class="text-content">
            <p> ${('tooManySearchResultCardBody')} </p>
          </div>
        </div>
</div>
`;

export const noResultsFoundCardTemplate = (): any => html
`<div class="info-card-container">
      <div class="text-container">
        <div class="title-content">
          <h>
          <b> ${('noSearchResultCardTitle')} </b>
          </h>
        </div>
        <div class="text-content">
          <p> ${('noSearchResultCardBody')} </p>
        </div>
      </div>
</div>
`;
